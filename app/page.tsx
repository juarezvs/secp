// SECP – Landing Page with Hero
// Single-file React component suitable for Next.js App Router (app/page.tsx)
// Uses only Tailwind CSS utility classes; no third-party UI imports.

import React from "react";

import imgLogoSECP from '../public/brand/secp-logo.png'
import Image from "next/image";

function LogoSECP({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
       <div className="flex justify-center">
                              <Image
                                  src={imgLogoSECP}
                                  alt="SECP"
                                  width={120}
                                  height={120}
                                  priority
                                  className="h-auto w-16"
                              />
                          </div>
      <div className="leading-tight">
        <div className="font-extrabold tracking-tight text-white">SECP</div>
        <div className="text-[10px] uppercase text-white/80">Sistema Eletrônico de Controle de Ponto</div>
      </div>
    </div>
  );
}

function GradientBorder() {
  return (
    <div className="h-1 w-full bg-linear-to-r from-[#002F6C] via-[#005d4a] to-[#007A33]" />
  );
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 12.5l5 5 11-11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3l7 3v6c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 12.5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BuildingIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="3" width="9" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="15" y="7" width="5" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.5 21.5h19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 6h3M7 9h3M7 12h3M17 10h1.5M17 13h1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CloudArrowIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 18a4 4 0 010-8c.3-3 2.8-5 6-5 3.2 0 5.8 2.2 6 5a3.5 3.5 0 01-.5 7H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 22V12m0 0l-3 3m3-3l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SECPHome() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Top announcement bar */}
      <div className="w-full bg-zinc-50 text-xs text-zinc-700">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2">
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">Novo</span>
          <span>
            Lançamento SECP — controle de ponto moderno para órgãos da Justiça Federal.
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#002F6C] text-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <LogoSECP />
          <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
            <a href="#recursos" className="text-sm text-white/90 hover:text-white">Recursos</a>
            <a href="#como-funciona" className="text-sm text-white/90 hover:text-white">Como funciona</a>
            <a href="#seguranca" className="text-sm text-white/90 hover:text-white">Segurança</a>
            <a href="#contato" className="text-sm text-white/90 hover:text-white">Contato</a>
          </nav>
          <div className="flex items-center gap-3">
            {/* <a
              href="#demo"
              className="hidden rounded-xl border border-white/25 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10 md:inline-block"
            >
               Solicitar demonstração
            </a> */}
            <a
              href="#entrar"
              className="rounded-xl bg-[#007A33] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#026b2e]"
            >
              Entrar
            </a>
          </div>
        </div>
        <GradientBorder />
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_60rem_at_20%_-10%,#cfe7ff_0,transparent_40%),radial-gradient(40rem_40rem_at_90%_10%,#c8f3dd_0,transparent_40%)]" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-[#002F6C] sm:text-5xl">
              Controle de ponto inteligente, seguro e transparente.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-700">
              O <span className="font-semibold text-[#007A33]">SECP</span> centraliza o registro de jornada, integra relógios de ponto e web,
              aplica regras por empresa, filial e lotação, e entrega relatórios executivos em poucos cliques.
            </p>

            <ul className="mt-6 space-y-3 text-zinc-700">
              <li className="flex items-start gap-3"><CheckIcon className="mt-0.5 h-5 w-5 text-[#007A33]" /> Multiempresa, multi-filial e hierarquia por departamentos</li>
              <li className="flex items-start gap-3"><CheckIcon className="mt-0.5 h-5 w-5 text-[#007A33]" /> Importação automática de relógios, web </li>
              <li className="flex items-start gap-3"><CheckIcon className="mt-0.5 h-5 w-5 text-[#007A33]" /> Fluxos de aprovação e auditoria com trilhas de evidência</li>
              <li className="flex items-start gap-3"><CheckIcon className="mt-0.5 h-5 w-5 text-[#007A33]" /> Relatórios para RH e Painel executivo para gestores</li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-2xl bg-[#007A33] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-200/40 hover:bg-[#026b2e]"
              >
                Solicitar demonstração
              </a>
              <a
                href="#explorar"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-[#002F6C] hover:border-zinc-400"
              >
                Ver recursos
              </a>
            </div>

            <p className="mt-4 text-xs text-zinc-500">Compatível com integrações externas via API.</p>
          </div>

          {/* Right-side hero mockup */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 blur-2xl [background:radial-gradient(20rem_12rem_at_70%_30%,rgba(0,122,51,0.18),transparent_60%)]" />
            <div className="mx-auto w-full max-w-lg rounded-2xl border border-zinc-200 bg-white/90 p-4 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between rounded-xl bg-linear-to-r from-[#002F6C] to-[#007A33] px-4 py-3 text-white">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                  <span className="text-sm/none font-medium">Painel Executivo</span>
                </div>
                <span className="text-xs text-white/80">SECP</span>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4">
                <div className="col-span-3 rounded-xl border border-zinc-200 p-4">
                  <div className="text-sm text-zinc-500">Absenteísmo (30 dias)</div>
                  <div className="mt-2 h-24 rounded-md bg-linear-to-t from-emerald-100 to-blue-100" />
                </div>
                <div className="rounded-xl border border-zinc-200 p-4">
                  <div className="text-xs text-zinc-500">Servidores</div>
                  <div className="mt-2 text-2xl font-bold text-[#002F6C]">1.284</div>
                </div>
                <div className="rounded-xl border border-zinc-200 p-4">
                  <div className="text-xs text-zinc-500">Órgãos da Justiça/Subseções</div>
                  <div className="mt-2 text-2xl font-bold text-[#002F6C]">27</div>
                </div>
                <div className="rounded-xl border border-zinc-200 p-4">
                  <div className="text-xs text-zinc-500">Pontos hoje</div>
                  <div className="mt-2 text-2xl font-bold text-[#002F6C]">4.913</div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-sm">
                <span className="text-zinc-600">Eventos pendentes de aprovação</span>
                <span className="font-semibold text-[#007A33]">12</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="recursos" className="border-t border-zinc-200 bg-zinc-50/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#002F6C] md:text-3xl">
            Recursos essenciais para RH, gestores e auditoria
          </h2>
          <p className="mt-2 max-w-2xl text-zinc-700">
            Estruturado para ambientes complexos (órgãos da Justiça Federal), com governança e observabilidade.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 text-[#002F6C]">
                <ClockIcon />
                <h3 className="text-lg font-semibold">Regras de Jornada & Feriados</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                Expedientes por empresa/filial/servidor, feriados nacionais/locais/forense, escalas e exceções.
              </p>
            </article>

            <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 text-[#002F6C]">
                <BuildingIcon />
                <h3 className="text-lg font-semibold">Multiempresa e Hierarquia</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                Empresas, filiais, departamentos e permissões por papéis (gestor, servidor, RH, auditoria).
              </p>
            </article>

            <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 text-[#002F6C]">
                <ShieldIcon />
                <h3 className="text-lg font-semibold">Segurança e Conformidade</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                Autenticação corporativa (LDAP/AD, Microsoft Teams), trilhas de auditoria e políticas de retenção.
              </p>
            </article>

            <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 text-[#002F6C]">
                <CloudArrowIcon />
                <h3 className="text-lg font-semibold">Integrações & APIs</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                Conecte relógios, SARH, exporte dados via API REST/GraphQL, possibilidade de integração externa por API RESTful
              </p>
            </article>

            <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 text-[#002F6C]">
                <CheckIcon className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Workflows e Aprovações</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                Solicitações de ajuste com evidências, validação por chefias e notificações inteligentes.
              </p>
            </article>

            <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 text-[#002F6C]">
                <CheckIcon className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Relatórios e Painéis</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                Espelho de ponto, banco de horas, horas extras e dashboards para tomada de decisão.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#002F6C] md:text-3xl">Como funciona</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {["Conecte seus relógios", "Parametrize regras", "Acompanhe e aprove"].map((title, i) => (
              <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#002F6C] to-[#007A33] text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#002F6C]">{title}</h3>
                <p className="mt-2 text-sm text-zinc-600">
                  {i === 0 && "Importe automaticamente batidas dos relógios."}
                  {i === 1 && "Defina jornadas, feriados, escalas e exceções por unidade e servidor."}
                  {i === 2 && "Monitore indicadores e aprove solicitações com total rastreabilidade."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security callout */}
      <section id="seguranca" className="border-y border-zinc-200 bg-linear-to-b from-white to-zinc-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <div className="flex items-start gap-4">
              <ShieldIcon className="h-7 w-7 text-[#007A33]" />
              <div>
                <h3 className="text-lg font-semibold text-[#002F6C]">Segurança corporativa</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Autenticação por LDAP/AD, Microsoft Teams, perfis de acesso, criptografia em trânsito e em repouso, e trilhas de auditoria por ação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section id="demo" className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 rounded-2xl border border-zinc-200 bg-white p-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#002F6C] md:text-3xl">Pronto para modernizar seu controle de ponto?</h2>
              <p className="mt-2 text-zinc-600">Solicite uma demonstração personalizada e veja o SECP em ação no seu cenário.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <a href="#contato" className="rounded-2xl bg-[#007A33] px-6 py-3 text-center text-base font-semibold text-white shadow hover:bg-[#026b2e]">Quero uma demo</a>
              <a href="#entrar" className="rounded-2xl border border-zinc-300 px-6 py-3 text-center text-base font-semibold text-[#002F6C] hover:border-zinc-400">Entrar</a>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer id="contato" className="border-t border-zinc-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <LogoSECP />
            <div className="text-sm text-zinc-600">
              <div>Contato: nutec.am@trf1.jus.br</div>
              <div>Suporte: sersup.am@trf1.jus.br</div>
            </div>
          </div>
          <div className="mt-6 text-xs text-zinc-500">© {new Date().getFullYear()} SECP — Sistema Eletrônico de Controle de Ponto. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
