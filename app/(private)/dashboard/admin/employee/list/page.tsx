import Search from "@/app/_ui/components/shared/search";
import { SectionTitle } from "@/app/_ui/components/private/section-title";

// src/app/(private)/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="space-y-3">
      <SectionTitle
        title="Consultar"
        descripton="Permite consultar informações do servidor"
      />
      <Search placeholder="Localizar servidor..." />
    </div>
  );
}
