"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const UNIDADES = ["SJAM", "SJRR", "TRF1"];

export default function SelectUnitPage() {
  const sp = useSearchParams();
  const provider = (sp.get("provider") ?? "google") as
    | "google"
    | "github"
    | "azure-ad";

  const [empresaId, setEmpresaId] = useState("");
  const [unidade, setUnidade] = useState("SJAM");
  const [loading, setLoading] = useState(false);

  async function start() {
    setLoading(true);
    try {
      const r = await fetch("/api/auth/oauth/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, empresaId, unidade }),
        redirect: "follow",
      });

      // Como o endpoint retorna 302, o browser normalmente segue.
      // Se o fetch não navegar, forçamos navegação manual:
      if (r.redirected) window.location.href = r.url;
      else window.location.href = `/api/auth/signin/${provider}`;
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold">Selecionar unidade/empresa</h1>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm">Empresa (tenant)</label>
          <input
            className="border p-2 w-full"
            value={empresaId}
            onChange={(e) => setEmpresaId(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm">Unidade</label>
          <select
            className="border p-2 w-full"
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
          >
            {UNIDADES.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <button
          disabled={loading || !empresaId}
          className="border px-4 py-2 w-full"
          onClick={start}
        >
          {loading ? "Redirecionando..." : `Continuar com ${provider}`}
        </button>
      </div>
    </main>
  );
}
