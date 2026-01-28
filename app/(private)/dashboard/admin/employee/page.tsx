import Search from "@/app/ui/components/private/Search";

// src/app/(private)/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-gray-600">
        Cadastro de Servidores
      </div>
      <Search placeholder="Localizar servidor..." />
    </div>
  );
}
