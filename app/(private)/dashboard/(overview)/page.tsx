import { DASHBOARD_ASIDE, MASTER_ASIDE } from "@/app/_kernel/lib/nav/asides";
import { Role } from "@/app/_kernel/lib/rbac/types";
import { CardPage } from "@/app/ui/components/private/CardPage";
import { SectionTitle } from "@/app/ui/components/private/SectionTitle";

// src/app/(private)/dashboard/page.tsx
export default function DashboardPage() {
  const role: Role = "MASTER";
  return (
    <section>
      <SectionTitle
        title="Paineis"
        descripton="Estes são os paineis que você tem acesso."
      />
      <CardPage config={MASTER_ASIDE} role={role} />
      {/* <CardPage config={DASHBOARD_ASIDE} role={role} /> */}
    </section>
  );
}
