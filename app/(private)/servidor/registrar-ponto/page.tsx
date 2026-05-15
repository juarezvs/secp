"use client";

import { useEffect, useRef, useState } from "react";
import AppShell from "./_components/AppShell";
import { Button } from "./_components/ui/button";
import { Card } from "./_components/ui/card";
import {
  loadFaceModels,
  detectAllWithDescriptors,
  euclideanDistance,
  faceapi,
} from "@/app/_kernel/lib/face/face";
import { addLog, getPeople, Person, uid } from "@/app/_kernel/lib/face/storage";
import { Loader2, ScanFace, Camera, AlertCircle } from "lucide-react";

const MATCH_THRESHOLD = 0.5;

interface RecognizedPerson {
  name: string;
  distance: number;
}

interface FaceDetectionResult {
  detection: {
    box: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
  descriptor: Float32Array;
}

// Helper para ler variáveis HSL do CSS correntemente injetadas no escopo do documento
const getHslVariable = (variableName: string, fallback: string): string => {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
  return value ? `hsl(${value})` : fallback;
};

export default function Recognize() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastLogRef = useRef<Record<string, number>>({});

  const [status, setStatus] = useState<
    "idle" | "loading" | "running" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [recognized, setRecognized] = useState<RecognizedPerson | null>(null);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setPeople(getPeople());
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  async function startCamera(): Promise<void> {
    setStatus("loading");
    setErrorMsg("");
    try {
      await loadFaceModels();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setPeople(getPeople());
      setStatus("running");
      loop();
    } catch (e) {
      console.error(e);
      const errorMessage =
        e instanceof Error ? e.message : "Não foi possível acessar a câmera.";
      setErrorMsg(errorMessage);
      setStatus("error");
    }
  }

  function stopCamera(): void {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  async function loop(): Promise<void> {
    if (!videoRef.current || !overlayRef.current || !containerRef.current)
      return;
    const video = videoRef.current;
    const canvas = overlayRef.current;

    if (video.readyState >= 2) {
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      canvas.width = w;
      canvas.height = h;

      // Cast estrito para a interface estendida do faceapi mapeando o descriptor
      const detections = (await detectAllWithDescriptors(
        video,
      )) as unknown as FaceDetectionResult[];
      const resized = faceapi.resizeResults(detections, {
        width: w,
        height: h,
      }) as unknown as FaceDetectionResult[];

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const currentPeople = people.length ? people : getPeople();
      let topMatch: RecognizedPerson | null = null;

      // Resgate dinâmico de cores do CSS para consistência no Canvas API
      const successColor = getHslVariable("--successface", "#10b981");
      const destructiveColor = getHslVariable("--destructiveface", "#ef4444");

      for (const det of resized) {
        const box = det.detection.box;
        const x = w - box.x - box.width; // Espelhamento do eixo X

        let bestName = "Desconhecido";
        let bestDist = Infinity;
        const desc = det.descriptor;

        for (const p of currentPeople) {
          const d = euclideanDistance(desc, Float32Array.from(p.descriptor));
          if (d < bestDist) {
            bestDist = d;
            bestName = p.name;
          }
        }

        const matched = bestDist <= MATCH_THRESHOLD;
        const color = matched ? successColor : destructiveColor;
        const label = matched
          ? `${bestName} · ${(1 - bestDist).toFixed(2)}`
          : "Desconhecido";

        // Renderização do Box do Rosto
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, box.y, box.width, box.height, 12);
        ctx.stroke();

        // Renderização da Label (Background)
        ctx.font = "600 13px Inter, sans-serif";
        const textW = ctx.measureText(label).width + 14;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, box.y - 26, textW, 22, 6);
        ctx.fill();

        // Texto interno da Label
        ctx.fillStyle = getHslVariable("--primary-foregroundface", "#fff");
        ctx.fillText(label, x + 7, box.y - 10);

        if (matched) {
          if (!topMatch || bestDist < topMatch.distance) {
            topMatch = { name: bestName, distance: bestDist };
          }

          const personObj = currentPeople.find((p) => p.name === bestName);
          if (personObj) {
            const last = lastLogRef.current[personObj.id] || 0;
            if (Date.now() - last > 8000) {
              lastLogRef.current[personObj.id] = Date.now();
              addLog({
                id: uid(),
                personId: personObj.id,
                personName: personObj.name,
                photo: personObj.photo,
                distance: bestDist,
                at: Date.now(),
              });
            }
          }
        }
      }
      setRecognized(topMatch);
    }

    rafRef.current = requestAnimationFrame(loop);
  }

  return (
    <AppShell title="Reconhecer" subtitle="Aponte a câmera para um rosto">
      <div
        ref={containerRef}
        className="relative aspect-[3/4] w-full rounded-[var(--radiusface)] overflow-hidden bg-[hsl(var(--secondaryface))] border border-[hsl(var(--borderface))] shadow-[var(--shadow-mdface)]"
      >
        <video
          ref={videoRef}
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]"
        />
        <canvas
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none"
        />

        {status !== "running" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[hsl(var(--secondaryface))]/90 backdrop-blur-sm p-6 text-center">
            {status === "loading" ? (
              <>
                <Loader2 className="w-10 h-10 text-[hsl(var(--primaryface))] animate-spin" />
                <p className="text-sm text-[hsl(var(--muted-foregroundface))]">
                  Carregando modelos…
                </p>
              </>
            ) : status === "error" ? (
              <>
                <AlertCircle className="w-10 h-10 text-[hsl(var(--destructiveface))]" />
                <p className="text-sm text-[hsl(var(--destructiveface))] font-medium">
                  {errorMsg}
                </p>
                <Button
                  onClick={startCamera}
                  variant="outline"
                  className="border-[hsl(var(--borderface))] text-[hsl(var(--foregroundface))]"
                >
                  Tentar novamente
                </Button>
              </>
            ) : (
              <>
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-pulse border-2 border-[hsl(var(--primaryface))]" />
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-[var(--shadow-glowface)]"
                    style={{ background: "var(--gradient-primaryface)" }}
                  >
                    <ScanFace className="w-10 h-10 text-[hsl(var(--primary-foregroundface))]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[hsl(var(--foregroundface))]">
                    Pronto para escanear
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foregroundface))] mt-1 max-w-60">
                    {people.length > 0
                      ? `${people.length} ${people.length === 1 ? "pessoa cadastrada" : "pessoas cadastradas"}`
                      : "Cadastre alguém antes de começar."}
                  </p>
                </div>
                <Button
                  onClick={startCamera}
                  size="lg"
                  className="text-[hsl(var(--primary-foregroundface))] border-0 shadow-[var(--shadow-mdface)] hover:opacity-90 transition-opacity"
                  style={{ background: "var(--gradient-primaryface)" }}
                >
                  <Camera className="w-4 h-4 mr-2" /> Iniciar câmera
                </Button>
              </>
            )}
          </div>
        )}

        {status === "running" && (
          <div className="absolute top-3 inset-x-3 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--cardface))]/80 backdrop-blur-md border border-[hsl(var(--borderface))] text-[hsl(var(--foregroundface))]">
              <span className="w-2 h-2 rounded-full bg-[hsl(var(--successface))] animate-pulse" />
              <span className="text-xs font-medium">Ao vivo</span>
            </div>
            <Button
              onClick={() => {
                stopCamera();
                setStatus("idle");
                setRecognized(null);
              }}
              size="sm"
              variant="secondary"
              className="rounded-full bg-[hsl(var(--secondaryface))] text-[hsl(var(--secondary-foregroundface))] hover:bg-[hsl(var(--mutedface))]"
            >
              Parar
            </Button>
          </div>
        )}
      </div>

      {recognized && status === "running" && (
        <Card className="mt-4 p-4 flex items-center gap-3 animate-fade-in-up border-[hsl(var(--successface))]/30 bg-[hsl(var(--successface))]/5">
          <div className="w-12 h-12 rounded-full bg-[hsl(var(--successface))] flex items-center justify-center shrink-0">
            <ScanFace className="w-6 h-6 text-[hsl(var(--success-foregroundface))]" />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wide text-[hsl(var(--successface))] font-semibold">
              Reconhecido
            </p>
            <p className="text-lg font-bold leading-tight text-[hsl(var(--card-foregroundface))]">
              {recognized.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold tabular-nums text-[hsl(var(--foregroundface))]">
              {Math.round((1 - recognized.distance) * 100)}%
            </p>
            <p className="text-[10px] text-[hsl(var(--muted-foregroundface))] uppercase">
              confiança
            </p>
          </div>
        </Card>
      )}
    </AppShell>
  );
}
