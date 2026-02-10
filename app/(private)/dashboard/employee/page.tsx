import { EMPLOYEE_ASIDE } from "@/app/_kernel/lib/nav/asides";
import { Role } from "@/app/_kernel/lib/rbac/types";
import { CardPage } from "@/app/_ui/components/private/card-page";
import { SectionTitle } from "@/app/_ui/components/private/section-title";
import { User2 } from "lucide-react";

// src/app/(private)/dashboard/page.tsx
export default function DashboardPage() {
  const role: Role = "SERVIDOR"; // pegue da sessão
  return (
    <section>
      <SectionTitle
        title="Servidor"
        descripton="Estes são seus acessos como Servidor"
        icon={<User2 className="w-10 h-10" />}
      />
      <CardPage config={EMPLOYEE_ASIDE} role={role} />
    </section>
  );
}
