"use client";

import { LockIcon, UserIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { UnitLoginType } from "../definitions";
import { ComboboxUnit } from "./combobox-unit";

export default function LoginForm({ tenants }: { tenants: UnitLoginType[] }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tenant, setTenant] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  console.log(tenants);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const tenantItems: UnitLoginType[] = tenants
    .sort((a, b) => a.sigla.localeCompare(b.sigla, "pt-BR"))
    .map((t) => ({
      value: t.id,
      label: `${t.sigla} - ${t.descricao}`,
    }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!tenant) {
      setError("Selecione a unidade (tenant).");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      username,
      password,
      tenant,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (!res) {
      setError("Falha ao autenticar.");
      return;
    }

    if (res.error) {
      setError("Matrícula, senha ou unidade inválidas.");
      return;
    }

    router.push(res.url ?? callbackUrl);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur">
      <h1 className="text-center text-xl font-semibold tracking-tight text-slate-900">
        Acesso ao sistema
      </h1>
      <p className="mt-1 text-center text-sm text-slate-500">
        Entre com suas credenciais institucionais.
      </p>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <Field
          name="username"
          label="Matrícula"
          placeholder="Digite sua matrícula"
          icon={<UserIcon />}
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Field
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          icon={<LockIcon />}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        {/* TENANT */}
        <label className="block">
          <span className="block text-sm font-medium text-secp-blue">
            Unidade
          </span>
          <ComboboxUnit items={tenantItems} />
        </label>

        <div className="flex items-center justify-between px-3 -mt-2 py-1">
          <span className="text-xs text-secp-gray">
            Dica: utilize a mesma senha usada para acessar o SEI.
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-11 w-full rounded-xl bg-[#0B5FA5] font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-[#0B5FA5]/25"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
            Ambiente institucional
          </span>
        </div>
      </form>

      <div className="w-full my-4 h-0.5 bg-secp-blue" />

      <div className="flex items-center justify-between">
        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="text-xs font-medium text-secp-blue hover:underline cursor-pointer"
        >
          Entrar com Google
        </button>

        <button
          className="text-xs font-medium text-secp-blue hover:underline cursor-pointer"
          onClick={() => signIn("azure-ad", { callbackUrl })}
        >
          Entrar com Microsoft
        </button>

        <button
          className="text-xs font-medium text-secp-blue hover:underline cursor-pointer"
          onClick={() => signIn("apple", { callbackUrl })}
        >
          Entrar com Apple
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} SECP — Sistema Eletrônico de Controle de
        Ponto
      </p>
    </div>
  );
}

function Field(props: {
  label: string;
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  autoComplete?: string;
  right?: React.ReactNode;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-secp-blue">
        {props.label}
      </span>

      <div className="mt-2 flex items-center gap-3 rounded-xl border border-secp-gray/30 bg-white px-4 py-3 focus-within:border-secp-blue/60 focus-within:ring-2 focus-within:ring-secp-blue/15">
        <div className="text-secp-gray">{props.icon}</div>

        <input
          name={props.name}
          type={props.type ?? "text"}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          value={props.value}
          onChange={props.onChange}
          className="w-full bg-transparent text-[15px] text-secp-blue placeholder:text-secp-gray/80 outline-none"
        />

        {props.right ? <div className="shrink-0">{props.right}</div> : null}
      </div>
    </label>
  );
}
