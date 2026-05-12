import { Bell, Moon, Sun, ChevronRight, Menu } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import { PageTitleMain } from "./page-title-main";
import { AsideConfig } from "@/app/_kernel/lib/nav/types";
import { Role } from "@/app/_kernel/lib/rbac/types";

type HeaderMainProps = {
  isCollapsed: boolean;
  menuItems: AsideConfig;
  role: Role;
  toggleSidebar: () => void;
  user: {
    name: string;
    email: string;
    role?: string;
  };
};
export function HeaderMain({
  toggleSidebar,
  user,
  menuItems,
  role,
}: HeaderMainProps) {
  return (
    <header className="h-32 bg-white border-b px-8 flex items-center justify-between shrink-0">
      {/* Coluna da Esquerda */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <button
            onClick={toggleSidebar}
            className="mr-2 hover:bg-gray-100 p-1 rounded"
          >
            <Menu size={18} />
          </button>
          <Breadcrumbs />
        </div>
        <PageTitleMain menuItems={menuItems} role={role} />
        {/* <h1 className="text-2xl font-bold text-gray-800">Caixa de Entrada</h1>
        <p className="text-sm text-gray-500">
          Gerencie suas comunicações e notificações recentes.
        </p> */}
      </div>

      {/* Coluna da Direita */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-blue-600">
            <Bell size={20} />
          </button>
          <button className="text-gray-500 hover:text-blue-600">
            <Moon size={20} />
          </button>
          <div className="w-[1px] h-8 bg-gray-200 mx-2" />
        </div>

        <div className="flex items-center gap-3 text-right">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-800">{user.name}</span>
            <span className="text-xs text-gray-500">Arquiteto de Software</span>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            J
          </div>
        </div>
      </div>
    </header>
  );
}
