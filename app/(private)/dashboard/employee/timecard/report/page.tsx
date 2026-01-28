import { PageTitle } from "@/app/ui/components/private/PageTitle";
import Search from "@/app/ui/components/private/Search";

// src/app/(private)/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <PageTitle title="Conteudo do espelho aqui" />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Localizar espelho de ponto.." />
      </div>
    </div>
  );
}
