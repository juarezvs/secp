"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

type Options = {
  intervalMs?: number; // ex: 30s
};

export function useSessionHeartbeat(opts: Options = {}) {
  const { data: session, status } = useSession();
  const intervalMs = opts.intervalMs ?? 30_000;

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    async function beat() {
      try {
        // evite bater se a aba está oculta (opcional)
        if (document.visibilityState !== "visible") return;

        await fetch("/api/session/heartbeat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "{}",
          keepalive: true,
        });
      } catch {
        // silencioso
      }
    }

    // bate logo no início
    void beat();

    timerRef.current = window.setInterval(beat, intervalMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [status, intervalMs]);
}
