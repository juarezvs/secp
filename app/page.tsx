"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Glow de fundo (somente cores oficiais em opacidade) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-130 w-245 -translate-x-1/2 rounded-full blur-3xl bg-secp-gray10" />
        <div className="absolute top-24 left-1/2 h-80 w-180 -translate-x-1/2 rounded-full blur-3xl bg-secp-blue/10" />
      </div>

      {/* Header fixo estilo Azure */}
      <LoginHeader />

      {/* Faixas no canto inferior direito */}
      <CornerBands />

      {/* Conteúdo */}
      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-275 flex-col items-center justify-center px-4 py-10">
        {/* Card */}
        <section className="w-full max-w-130 rounded-2xl border border-secp-gray/25 bg-green shadow-soft">
          <div className="px-7 pt-7 pb-6">
            <h1 className="text-lg font-semibold text-secp-blue">Acesso ao sistema</h1>
            <p className="mt-1 text-sm text-secp-gray">
              Informe suas credenciais para continuar.
            </p>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <Field
                label="CPF ou Usuário"
                placeholder="Digite seu CPF ou usuário"
                icon={<UserIcon />}
                autoComplete="username"
              />

              <Field
                label="Senha"
                placeholder="Digite sua senha"
                icon={<LockIcon />}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                right={
                  <button
                    type="button"
                    className="text-sm font-medium text-secp-blue hover:underline"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                }
              />

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-secp-green px-4 py-3 text-base font-semibold text-white shadow-sm
                           hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-secp-green/40 focus:ring-offset-2"
              >
                Entrar
              </button>

              <div className="mt-3 flex items-center justify-between text-sm">
                <a href="#" className="font-medium text-secp-blue hover:underline">
                  Esqueceu a senha?
                </a>
                <a href="#" className="font-medium text-secp-blue hover:underline">
                  Primeiro acesso?
                </a>
              </div>
            </form>
          </div>

          <div className="flex items-center justify-between rounded-b-2xl border-t border-secp-gray/20 bg-white px-7 py-4">
            <span className="text-xs text-secp-gray">
              Dica: utilize seu usuário institucional quando aplicável.
            </span>
            <a href="#" className="text-xs font-medium text-secp-blue hover:underline">
              Ajuda e suporte
            </a>
          </div>
        </section>

        <footer className="mt-8 text-center text-xs text-secp-gray">
          © {new Date().getFullYear()} SECP — Sistema Eletrônico de Controle de Ponto.
        </footer>
      </div>
    </main>
  );
}

/* ================= HEADER ================= */

function LoginHeader() {
  return (
    <header className="relative z-10 h-18 w-full bg-secp-blue">
      <div className="mx-auto flex h-full max-w-275 items-center justify-between px-4">
        {/* Marca */}
        <div className="flex items-center gap-3 mt-1">
          { <Image
            src="/brand/secp_logo_sistema.png"
            alt="SECP"
            width={220}
            height={50}
            priority
            
            className="h-30 w-100"
          />}
          {
         
          }

         
       

          
        </div>

        {/* Ações leves (sem poluir) */}
        <nav className="flex items-center gap-3">
          <a
            href="#"
            className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
          >
            Ajuda
          </a>
          <a
            href="#"
            className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
          >
            Suporte
          </a>
        </nav>
      </div>

      {/* Linha inferior sutil (cinza) */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-secp-gray" />
    </header>
  );
}

/* ================= FORM FIELD ================= */

function Field(props: {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  autoComplete?: string;
  right?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-secp-blue">{props.label}</span>

      <div className="mt-2 flex items-center gap-3 rounded-xl border border-secp-gray/30 bg-white px-4 py-3
                      focus-within:border-secp-blue/60 focus-within:ring-2 focus-within:ring-secp-blue/15">
        <div className="text-secp-gray">{props.icon}</div>

        <input
          type={props.type ?? "text"}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          className="w-full bg-transparent text-[15px] text-secp-blue placeholder:text-secp-gray/80 outline-none"
        />

        {props.right ? <div className="shrink-0">{props.right}</div> : null}
      </div>
    </label>
  );
}

/* ================= DECOR ================= */

function CornerBands() {
  return (
    <div className="pointer-events-none absolute bottom-0 right-0 h-65 w-130 overflow-hidden">
      <div className="absolute bottom-35 right-55 h-105 w-180 rotate-[-18deg] rounded-[80px] bg-secp-blue" />
      <div className="absolute bottom-35.7 right-62.5 h-105 w-180 rotate-[-18deg] rounded-[80px] bg-secp-gray/70" />
      <div className="absolute bottom-40 right-70 h-105 w-180 rotate-[-18deg] rounded-[80px] bg-secp-green/80" />
    </div>
  );
}

/* ================= ICONS ================= */

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 21a8 8 0 0 0-16 0" stroke="#97999F" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="#97999F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="#97999F" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 11h12v10H6V11Z" stroke="#97999F" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 15v3" stroke="#002F6C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
