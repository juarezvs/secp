// src/app/(private)/admin/relogios/layout.tsx
import type { ReactNode } from "react";
import { PrivateShell } from "@/app/_ui/components/private/private-shell";
import { AsideNav } from "@/app/_ui/components/private/aside-nav";
import { ADMIN_EMPLOYEE_ASIDE } from "@/app/_kernel/lib/nav/asides";
import type { Role } from "@/app/_kernel/lib/rbac/types";
import { User2 } from "lucide-react";

export default async function RelogiosLayout({
  children,
}: {
  children: ReactNode;
}) {
  const role: Role = "ADMIN"; // pegue da sessão
  return (
    <PrivateShell
      pagetitle={<AsideNav config={ADMIN_EMPLOYEE_ASIDE} role={role} />}
      aside={<AsideNav config={ADMIN_EMPLOYEE_ASIDE} role={role} />}
    >
      {children}
    </PrivateShell>
  );
}
