// src/app/(private)/dashboard/layout.tsx
import type { ReactNode } from "react";
import { PrivateShell } from "@/app/_ui/components/private/private-shell";
import { AsideNav } from "@/app/_ui/components/private/aside-nav";
import type { Role } from "@/app/_kernel/lib/rbac/types";
// import { auth } from "@/auth"; // exemplo

import { PageTitle } from "@/app/_ui/components/private/page-title";
import { ASIDE_BY_ROLE, isRole } from "@/app/_kernel/lib/rbac/guard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  const role: Role = isRole(session.user.role) ? session.user.role : "SERVIDOR";
  const AsideConfig = ASIDE_BY_ROLE[role];

  return (
    <PrivateShell
      pagetitle={<PageTitle config={AsideConfig} role={role} />}
      aside={<AsideNav config={AsideConfig} role={role} />}
    >
      {children}
    </PrivateShell>
  );
}
