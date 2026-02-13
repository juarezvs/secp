import { Role } from "@/app/_kernel/db/prisma/generated/prisma/enums";
import { AFD_ASIDE } from "@/app/_kernel/lib/nav/asides";
import { CardPage } from "@/app/_ui/components/private/card-page";
import { SectionTitle } from "@/app/_ui/components/private/section-title";

// src/app/(private)/dashboard/page.tsx
export default function DashboardPage() {
  const role: Role = "ADMIN"; // pegue da sessão
  return (
    <section>
      <SectionTitle
        title="Arquivo de Fonte de Dados"
        descripton="Estas são seus acessos"
      />
      <CardPage config={AFD_ASIDE} role={role} />
    </section>
  );
}
