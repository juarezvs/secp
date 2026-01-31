import { CardSecp } from "@/app/ui/components/CardSecp";
import { SectionTitle } from "@/app/ui/components/private/SectionTitle";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// src/app/(private)/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="space-y-3">
      <SectionTitle
        title="Servidores"
        descripton="Estas são as funcionalidades que você tem acesso. "
      />
      <div className="grid grid-cols-4 gap-4">
        <CardSecp
          icon={<MagnifyingGlassIcon className="w-6" />}
          title="Consultar"
          href="/dashboard/admin/employee/list"
          description="Permite consultar dados dos servidores."
        />
        <CardSecp
          icon={<MagnifyingGlassIcon className="w-6" />}
          title="Importar"
          href="/dashboard/admin/employee/list"
          description="Permite importar dados de servidor do SARH."
        />
        <CardSecp
          icon={<MagnifyingGlassIcon className="w-6" />}
          title="Sincronizar"
          href="/dashboard/admin/employee/list"
          description="Permite consultar dados dos servidores"
        />
      </div>
    </div>
  );
}
