import Search from "@/app/ui/components/private/Search";
import { SectionTitle } from "@/app/ui/components/private/SectionTitle";

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
