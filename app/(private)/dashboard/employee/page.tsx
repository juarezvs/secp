import { SERVIDOR_ASIDE } from "@/app/_kernel/lib/nav/asides";
import { Role } from "@/app/_kernel/lib/rbac/types";
import { CardPage } from "@/app/_ui/components/private/card-page";
import { SectionTitle } from "@/app/_ui/components/private/section-title";
import { auth } from "@/auth";
import { User2 } from "lucide-react";
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
      <SectionTitle
        title="Servidor"
        descripton="Estes são seus acessos como Servidor"
        icon={<User2 className="w-10 h-10" />}
      />
      <CardPage config={SERVIDOR_ASIDE} role={role} />
    </section>
  );
}
