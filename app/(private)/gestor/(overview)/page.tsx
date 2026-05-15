import { ASIDE_BY_ROLE, isRole } from "@/app/_kernel/lib/rbac/guard";
import { Role } from "@/app/_kernel/lib/rbac/types";
import { CardPage } from "@/app/_ui/components/private/card-page";
import { SectionTitle } from "@/app/_ui/components/private/section-title";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// src/app/(private)/dashboard/page.tsx
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role: Role = isRole(session.user.role) ? session.user.role : "SERVIDOR";
  const asideConfig = ASIDE_BY_ROLE[role];
  // console.log("Papel do Usuário:", role, asideConfig);

  return (
    <section>
      <h1>teste</h1>
    </section>
  );
}
