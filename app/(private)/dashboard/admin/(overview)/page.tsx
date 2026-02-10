import { DASHBOARD_ASIDE } from "@/app/_kernel/lib/nav/asides";
import { Role } from "@/app/_kernel/lib/rbac/types";
import { CardPage } from "@/app/_ui/components/private/card-page";
import { SectionTitle } from "@/app/_ui/components/private/section-title";

export default function Page() {
  const role: Role = "ADMIN";
  return (
    <section>
      <SectionTitle
        title="Administração"
        descripton="Estes são seus acessos como Administrador"
      />
      <CardPage config={DASHBOARD_ASIDE} role={role} />
    </section>
  );
}
