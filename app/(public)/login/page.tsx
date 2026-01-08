// src/app/(public)/login/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <main className="relative min-h-dvh overflow-hidden bg-secp-blue">
            
            {/* Fundo suave (opcional) */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-white to-slate-50 mt-15" />
            {/* Ondas (canto inferior esquerdo) */}
            <div className="pointer-events-none absolute bottom-0 right-0 w-480 max-w-[140vw]">
                {/* Camada 1 (azul) */}
                <svg
                    className="absolute bottom-0 left-0 h-85 w-full opacity-95"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        fill="#0B5FA5"
                        d="M0,300L48,266.7C96,245,192,203,288,197.3C384,192,480,224,576,240C672,256,768,256,864,245.3C960,235,1056,213,1152,202.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>

                {/* Camada 2 (cinza) */}
                <svg
                    className="absolute bottom-0 left-0 h-70 w-full opacity-70"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        fill="#9E9E9E"
                        d="M0,320L48,304C96,288,192,256,288,240C384,224,480,224,576,229.3C672,235,768,245,864,234.7C960,224,1056,192,1152,186.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>

                {/* Camada 3 (verde) */}
                <svg
                    className="relative h-65 w-full opacity-90"
                    viewBox="0 0 1440 300"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        fill="#2E7D32"
                        d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,170.7C672,192,768,256,864,272C960,288,1056,256,1152,240C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>
            </div>

            {/* Conteúdo */}
            <section className="relative mx-auto flex min-h-dvh max-w-6xl items-center justify-center px-6  ">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="mb-8 flex justify-center">
                        <Image
                            src="/brand/secp-logo.png"
                            alt="SECP"
                            width={220}
                            height={220}
                            priority
                            className="h-auto w-55"
                        />
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur">
                        <h1 className="text-center text-xl font-semibold tracking-tight text-slate-900">
                            Acesso ao sistema
                        </h1>
                        <p className="mt-1 text-center text-sm text-slate-500">
                            Entre com suas credenciais institucionais.
                        </p>

                        <form className="mt-6 space-y-4">
                            <Field
                                label="Matrícula"
                                placeholder="Digite sua matrícula"
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

                            <div className="flex items-center justify-between px-3 -mt-2 py-1">
                                <span className="text-xs text-secp-gray">
                                    Dica: utilize a mesma senha usada para acessar o SEI.
                                </span>
                                
                            </div>

                            <button
                                type="submit"
                                className="h-11 w-full rounded-xl bg-[#0B5FA5] font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-[#0B5FA5]/25"
                            >
                                Entrar
                            </button>

                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span className="inline-flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
                                    Ambiente institucional
                                </span>
                                <a href="#" className="text-xs font-medium text-secp-blue hover:underline">
                                    Esqueci minha senha
                                </a>
                            </div>
                        </form>
                    </div>

                    {/* Rodapé discreto */}
                    <p className="mt-4 text-center text-xs text-slate-400 ">
                        © {new Date().getFullYear()} SECP — Sistema Eletrônico de Controle de Ponto 
                    </p>
                </div>
            </section>
        </main>
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