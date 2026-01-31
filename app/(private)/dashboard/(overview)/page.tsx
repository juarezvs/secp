import { MASTER_ASIDE } from "@/app/_kernel/lib/nav/asides";
import { Role } from "@/app/_kernel/lib/rbac/types";
import { CardPage } from "@/app/ui/components/private/CardPage";
import { SectionTitle } from "@/app/ui/components/private/SectionTitle";

// src/app/(private)/dashboard/page.tsx
export default function DashboardPage() {
  const role: Role = "ADMIN";
  return (
    <div className="space-y-3">
      <SectionTitle
        title="Paineis"
        descripton="Estes são os paineis que você tem acesso. "
      />
      <CardPage config={MASTER_ASIDE} role={role} />
      {/* <div className="grid grid-cols-4 gap-4">
        <CardSecp
          title="Servidor"
          icon={<UserIcon className="w-5" />}
          href="dashboard/admin/employee/"
          description="Dashboard do Servidor"
        />
        <CardSecp
          title="Gestor"
          icon={<UserCircleIcon className="w-5" />}
          href="dashboard/admin/gestor"
          description="Dashboard do Gestor"
        />
        <CardSecp
          title="Administrador"
          icon={<UserPlusIcon className="w-5" />}
          description="Dashboard do Administrador"
          href="dashboard/admin/"
        />

        <CardSecp
          title="Master"
          icon={<SparklesIcon className="w-5" />}
          href="dashboard/admin/master"
          description="Dashboard do Master"
        />
      </div> */}
    </div>
  );
}
