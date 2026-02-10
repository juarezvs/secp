import { Role } from "@/app/_kernel/db/prisma/generated/prisma/enums";
import { TENANT_ASIDE } from "@/app/_kernel/lib/nav/asides";
import { CardPage } from "@/app/_ui/components/private/card-page";
import { SectionTitle } from "@/app/_ui/components/private/section-title";

// src/app/(private)/dashboard/page.tsx
export default function DashboardPage() {
  const role: Role = "ADMIN"; // pegue da sessão
  return (
    <section>
      <SectionTitle
        title="Órgãos da Justiça"
        descripton="Estas são seus acessos"
      />
      <CardPage config={TENANT_ASIDE} role={role} />
    </section>
  );
}
