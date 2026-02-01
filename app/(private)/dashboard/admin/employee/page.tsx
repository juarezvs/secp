import { ADMIN_EMPLOYEE_ASIDE } from "@/app/_kernel/lib/nav/asides";
import { Role } from "@/app/_kernel/lib/rbac/types";
import { CardSecp } from "@/app/ui/components/CardSecp";
import { CardPage } from "@/app/ui/components/private/CardPage";
import { SectionTitle } from "@/app/ui/components/private/SectionTitle";
// src/app/(private)/dashboard/page.tsx
export default function DashboardPage() {
  const role: Role = "ADMIN"; // pegue da sessão
  return (
    <section>
      <SectionTitle
        title="Administração"
        descripton="Estes são seus acessos como Administrador"
      />
      <CardPage config={ADMIN_EMPLOYEE_ASIDE} role={role} />
    </section>
  );
}
