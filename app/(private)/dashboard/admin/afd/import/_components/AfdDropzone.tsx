"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { AfdFileList, type FileItem } from "./AfdFileList";
import { toast } from "sonner";

type Props = {
  uploadUrl: string;
  maxFiles?: number;
  maxTotalBytes?: number;
  acceptExtensions?: string[];
};

function bytesToHuman(n: number) {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function hasAllowedExt(name: string, exts: string[]) {
  const lower = name.toLowerCase();
  return exts.some((e) => lower.endsWith(e.toLowerCase()));
}

async function uploadWithProgress(
  url: string,
  formData: FormData,
  onProgress: (pct: number) => void,
  signal?: AbortSignal,
) {
  return await new Promise<{ ok: boolean; status: number; bodyText: string }>(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);

      xhr.upload.onprogress = (evt) => {
        if (!evt.lengthComputable) return;
        const pct = Math.round((evt.loaded / evt.total) * 100);
        onProgress(pct);
      };

      xhr.onload = () => {
        resolve({
          ok: xhr.status >= 200 && xhr.status < 300,
          status: xhr.status,
          bodyText: xhr.responseText,
        });
      };

      xhr.onerror = () => reject(new Error("Falha de rede durante upload."));
      xhr.onabort = () => reject(new Error("Upload abortado."));

      if (signal) {
        signal.addEventListener("abort", () => xhr.abort(), { once: true });
      }

      xhr.send(formData);
    },
  );
}

export function AfdDropzone({
  uploadUrl,
  maxFiles = 20,
  maxTotalBytes = 50 * 1024 * 1024,
  acceptExtensions = [".afd"],
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [items, setItems] = useState<FileItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const totalBytes = useMemo(
    () => items.reduce((acc, it) => acc + it.file.size, 0),
    [items],
  );

  const validateFiles = useCallback(
    (files: File[]) => {
      const issues: string[] = [];

      const nextCount = items.length + files.length;
      if (nextCount > maxFiles) {
        issues.push(`Quantidade máxima de arquivos: ${maxFiles}.`);
      }

      const nextBytes = totalBytes + files.reduce((acc, f) => acc + f.size, 0);
      if (nextBytes > maxTotalBytes) {
        issues.push(`Tamanho total excede ${bytesToHuman(maxTotalBytes)}.`);
      }

      const invalidExt = files.filter(
        (f) => !hasAllowedExt(f.name, acceptExtensions),
      );
      if (invalidExt.length) {
        issues.push(
          `Extensão inválida em: ${invalidExt.map((f) => f.name).join(", ")}. Permitidas: ${acceptExtensions.join(", ")}.`,
        );
      }

      return issues;
    },
    [acceptExtensions, items.length, maxFiles, maxTotalBytes, totalBytes],
  );

  const addFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const incoming = Array.from(fileList);

      const existingKeys = new Set(
        items.map(
          (it) => `${it.file.name}:${it.file.size}:${it.file.lastModified}`,
        ),
      );
      const deduped = incoming.filter(
        (f) => !existingKeys.has(`${f.name}:${f.size}:${f.lastModified}`),
      );

      const issues = validateFiles(deduped);
      if (issues.length) {
        setError(issues.join(" "));
        return;
      }

      const toAdd: FileItem[] = deduped.map((file) => ({
        id: crypto.randomUUID(),
        file,
      }));

      setError(null);
      setItems((prev) => [...prev, ...toAdd]);
    },
    [items, validateFiles],
  );

  const onDrop = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.preventDefault();
      evt.stopPropagation();
      setIsDragging(false);
      addFiles(evt.dataTransfer.files);
    },
    [addFiles],
  );

  const onPick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const onClear = useCallback(() => {
    setItems([]);
    setError(null);
    setProgress(0);
  }, []);

  const onUpload = useCallback(async () => {
    if (!items.length) return;

    setBusy(true);
    setError(null);
    setProgress(0);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const formData = new FormData();
      for (const it of items) formData.append("files", it.file, it.file.name);

      const res = await uploadWithProgress(
        uploadUrl,
        formData,
        setProgress,
        controller.signal,
      );

      if (!res.ok) {
        let message = `Falha ao enviar arquivos (HTTP ${res.status}).`;
        try {
          const parsed = JSON.parse(res.bodyText);
          if (parsed?.error) message = String(parsed.error);
        } catch {
          // ignore
        }
        throw new Error(message);
      }

      setProgress(100);
      onClear();
      toast.success("Arquivo(s) enviado(s) com sucesso.");
    } catch (e: any) {
      toast.error(e?.message ?? "Erro inesperado ao enviar arquivo(s).");
      setError(e?.message ?? "Erro inesperado ao enviar arquivo(s).");
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }, [items, onClear, uploadUrl]);

  const onCancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return (
    <section className="space-y-4">
      <div
        className={[
          "rounded-xl border-2 border-dashed p-8 transition",
          isDragging
            ? "border-gray-900 bg-gray-50"
            : "border-gray-300 bg-white",
        ].join(" ")}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onClick={onPick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onPick();
        }}
        aria-label="Área de upload AFD"
      >
        <div className="text-center">
          <p className="text-base font-medium">Arraste e solte aqui</p>
          <p className="mt-1 text-sm text-gray-600">
            ou <span className="underline">clique para selecionar</span>{" "}
            (múltiplos arquivos)
          </p>
          <p className="mt-3 text-xs text-gray-500">
            Permitidos: {acceptExtensions.join(", ")} • Máx.: {maxFiles}{" "}
            arquivos • Total: {bytesToHuman(maxTotalBytes)}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          accept={acceptExtensions.join(",")}
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        {/* <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
          onClick={onPick}
          disabled={busy}
        >
          Selecionar arquivos
        </button> */}

        <button
          type="button"
          className="rounded-lg bg-secp-button-active px-3 py-2 text-sm text-white disabled:opacity-50"
          onClick={onUpload}
          disabled={busy || items.length === 0}
        >
          Enviar arquivos AFD para processamento
        </button>

        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
          onClick={onClear}
          disabled={busy || items.length === 0}
        >
          Limpar
        </button>

        {busy ? (
          <button
            type="button"
            className="rounded-lg border px-3 py-2 text-sm"
            onClick={onCancel}
          >
            Cancelar
          </button>
        ) : null}

        <div className="ml-auto text-xs text-gray-600">
          {items.length} arquivo(s) • {bytesToHuman(totalBytes)}
        </div>
      </div>

      {busy ? (
        <div className="space-y-2">
          <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
            <div
              className="h-2 bg-gray-900 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600">Enviando... {progress}%</p>
        </div>
      ) : null}

      <AfdFileList items={items} onRemove={onRemove} />
    </section>
  );
}
