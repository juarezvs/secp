import { SERVIDOR_ASIDE } from "@/app/_kernel/lib/nav/asides_perfis";
import { Role } from "@/app/_kernel/lib/rbac/types";
import { CardPage } from "@/app/_ui/components/private/card-page";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// src/app/(private)/dashboard/page.tsx
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role: Role = "SERVIDOR"; // pegue da sessão
  return (
    <section>
      <CardPage config={SERVIDOR_ASIDE} role={role} />
    </section>
  );
}
