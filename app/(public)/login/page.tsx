// src/app/(public)/login/page.tsx
import Image from "next/image";
import LoginForm from "./_components/login-form";
import { fetchFilteredTenant } from "@/app/(private)/dashboard/admin/tenant/lib/tenant.action";

export default async function LoginPage() {
  // Server-side: pode await e pode chamar server action/repo
  const tenantsSecp = await fetchFilteredTenant("", 1); // page 1 (ou 0 conforme sua função)

  // Garanta que venha um array simples para o combobox
  // Ajuste conforme o retorno real do fetchFilteredTenant:
  // Ex: se retorna { data: TenantDTO[] }, use tenantsSecp.data
  const items = Array.isArray(tenantsSecp)
    ? tenantsSecp
    : (tenantsSecp?.data ?? tenantsSecp?.data ?? []);

  // Se seus tenants forem objetos, normalize aqui:
  // const items = (tenants as TenantDTO[]).map(t => ({ value: String(t.id), label: t.descricao }))

  return (
    <main className="relative min-h-dvh overflow-hidden bg-secp-blue">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-white to-slate-50 mt-15" />

      {/* Ondas */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-480 max-w-[140vw]">
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

      <section className="relative mx-auto flex min-h-dvh max-w-6xl items-center justify-center px-6">
        <div className="w-full max-w-md">
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

          <LoginForm tenants={items} />
        </div>
      </section>
    </main>
  );
}
