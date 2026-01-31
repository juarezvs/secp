import { DASHBOARD_ASIDE } from "@/app/_kernel/lib/nav/asides";
import { Role } from "@/app/_kernel/lib/rbac/types";
import { CardPage } from "@/app/ui/components/private/CardPage";
import { SectionTitle } from "@/app/ui/components/private/SectionTitle";

export default function Page() {
  const role: Role = "ADMIN";
  return (
    <section>
      <SectionTitle title="Administração" />
      <CardPage config={DASHBOARD_ASIDE} role={role} />
    </section>
  );
}
