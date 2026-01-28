// src/app/(private)/admin/relogios/layout.tsx
import type { ReactNode } from "react";
import { PrivateShell } from "@/app/ui/components/private/PrivateShell";
import { AsideNav } from "@/app/ui/components/private/AsideNav";
import { ADMIN_EMPLOYEE_ASIDE } from "@/app/_kernel/lib/nav/asides";
import type { Role } from "@/app/_kernel/lib/rbac/types";

export default async function RelogiosLayout({
  children,
}: {
  children: ReactNode;
}) {
  const role: Role = "ADMIN"; // pegue da sessão
  return (
    <PrivateShell
      title="Cadastro de servidores"
      aside={<AsideNav config={ADMIN_EMPLOYEE_ASIDE} role={role} />}
    >
      {children}
    </PrivateShell>
  );
}
