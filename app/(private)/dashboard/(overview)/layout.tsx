// src/app/(private)/dashboard/layout.tsx
import type { ReactNode } from "react";
import { PrivateShell } from "@/app/ui/components/private/PrivateShell";
import { AsideNav } from "@/app/ui/components/private/AsideNav";
import type { Role } from "@/app/_kernel/lib/rbac/types";
// import { auth } from "@/auth"; // exemplo

import { MASTER_ASIDE } from "@/app/_kernel/lib/nav/asides";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // const session = await auth();
  // const role = (session?.user?.role as Role) ?? "SERVIDOR";
  const role: Role = "MASTER"; // placeholder

  return (
    <PrivateShell
      title="Painel"
      aside={<AsideNav config={MASTER_ASIDE} role={role} />}
    >
      {children}
    </PrivateShell>
  );
}
