import { CheckIcon } from "@heroicons/react/24/solid";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* EFEITO RADIAL NO HERO */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_60rem_at_20%_-10%,#cfe7ff_0,transparent_40%),radial-gradient(40rem_40rem_at_90%_10%,#c8f3dd_0,transparent_40%)]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-[#002F6C] sm:text-5xl">
            Controle de ponto inteligente, seguro e transparente.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-700">
            O <span className="font-semibold text-[#007A33]">SECP</span>{" "}
            centraliza o registro de jornada, integra relógios de ponto e web,
            aplica regras por empresa, filial e lotação, e entrega relatórios
            executivos em poucos cliques.
          </p>

          <ul className="mt-6 space-y-3 text-zinc-700">
            <li className="flex items-start gap-3">
              <CheckIcon className="mt-0.5 h-5 w-5 text-[#007A33]" />{" "}
              Multiempresa, multi-filial e hierarquia por departamentos
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="mt-0.5 h-5 w-5 text-[#007A33]" /> Importação
              automática de relógios, web{" "}
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="mt-0.5 h-5 w-5 text-[#007A33]" /> Fluxos de
              aprovação e auditoria com trilhas de evidência
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="mt-0.5 h-5 w-5 text-[#007A33]" /> Relatórios
              para RH e Painel executivo para gestores
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#explorar"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-[#002F6C] hover:border-zinc-400"
            >
              Ver recursos
            </a>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Compatível com integrações externas via API.
          </p>
        </div>

        {/* Right-side hero mockup */}
        <div className="relative">
          <div className="absolute -inset-4 -z-10 blur-2xl [background:radial-gradient(20rem_12rem_at_70%_30%,rgba(0,122,51,0.18),transparent_60%)]" />
          <div className="mx-auto w-full max-w-lg rounded-2xl border border-zinc-200 bg-white/90 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between rounded-xl bg-linear-to-r from-[#002F6C] to-[#007A33] px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                <span className="text-sm/none font-medium">
                  Painel Executivo
                </span>
              </div>
              <span className="text-xs text-white/80">SECP</span>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="col-span-3 rounded-xl border border-zinc-200 p-4">
                <div className="text-sm text-zinc-500">
                  Absenteísmo (30 dias)
                </div>
                <div className="mt-2 h-24 rounded-md bg-linear-to-t from-emerald-100 to-blue-100" />
              </div>
              <div className="rounded-xl border border-zinc-200 p-4">
                <div className="text-xs text-zinc-500">Servidores</div>
                <div className="mt-2 text-2xl font-bold text-[#002F6C]">
                  1.284
                </div>
              </div>
              <div className="rounded-xl border border-zinc-200 p-4">
                <div className="text-xs text-zinc-500">
                  Órgãos da Justiça/Subseções
                </div>
                <div className="mt-2 text-2xl font-bold text-[#002F6C]">27</div>
              </div>
              <div className="rounded-xl border border-zinc-200 p-4">
                <div className="text-xs text-zinc-500">Pontos hoje</div>
                <div className="mt-2 text-2xl font-bold text-[#002F6C]">
                  4.913
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-sm">
              <span className="text-zinc-600">
                Eventos pendentes de aprovação
              </span>
              <span className="font-semibold text-[#007A33]">12</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 blur-2xl [background:radial-gradient(20rem_12rem_at_70%_30%,rgba(0,122,51,0.18),transparent_60%)]" />
          <div className="mx-auto w-full max-w-lg rounded-2xl border border-zinc-200 bg-white/90 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between rounded-xl bg-linear-to-r from-[#002F6C] to-[#007A33] px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                <span className="text-sm/none font-medium">
                  Painel Executivo
                </span>
              </div>
              <span className="text-xs text-white/80">SECP</span>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="col-span-3 rounded-xl border border-zinc-200 p-4">
                <div className="text-sm text-zinc-500">
                  Absenteísmo (30 dias)
                </div>
                <div className="mt-2 h-24 rounded-md bg-linear-to-t from-emerald-100 to-blue-100" />
              </div>
              <div className="rounded-xl border border-zinc-200 p-4">
                <div className="text-xs text-zinc-500">Servidores</div>
                <div className="mt-2 text-2xl font-bold text-[#002F6C]">
                  1.284
                </div>
              </div>
              <div className="rounded-xl border border-zinc-200 p-4">
                <div className="text-xs text-zinc-500">
                  Órgãos da Justiça/Subseções
                </div>
                <div className="mt-2 text-2xl font-bold text-[#002F6C]">27</div>
              </div>
              <div className="rounded-xl border border-zinc-200 p-4">
                <div className="text-xs text-zinc-500">Pontos hoje</div>
                <div className="mt-2 text-2xl font-bold text-[#002F6C]">
                  4.913
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-sm">
              <span className="text-zinc-600">
                Eventos pendentes de aprovação
              </span>
              <span className="font-semibold text-[#007A33]">12</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
