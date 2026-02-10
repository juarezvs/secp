// src/app/(private)/dashboard/layout.tsx
import type { ReactNode } from "react";
import { PrivateShell } from "@/app/_ui/components/private/private-shell";
import { AsideNav } from "@/app/_ui/components/private/aside-nav";
import type { Role } from "@/app/_kernel/lib/rbac/types";
// import { auth } from "@/auth"; // exemplo

import { MASTER_ASIDE } from "@/app/_kernel/lib/nav/asides";
import { PageTitle } from "@/app/_ui/components/private/page-title";

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
      pagetitle={<PageTitle config={MASTER_ASIDE} role={role} />}
      aside={<AsideNav config={MASTER_ASIDE} role={role} />}
    >
      {children}
    </PrivateShell>
  );
}
