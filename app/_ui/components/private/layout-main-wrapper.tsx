"use client";
import { ReactNode, useState } from "react";
import { HeaderMain } from "./header-main";
import SidebarMain from "./sidebar-main";
import { AsideConfig } from "@/app/_kernel/lib/nav/types";
import { Role } from "@/app/_kernel/lib/rbac/types";

type LayoutMainWrapperProps = {
  children: ReactNode;
  menuItems: AsideConfig;
  role: Role;
  user: {
    name: string;
    email: string;
    role?: string;
  };
};

export default function LayoutMainWrapper({
  children,
  menuItems,
  role,
  user,
}: LayoutMainWrapperProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-blue-50">
      {/* Coluna 1: Sidebar (Fixa) */}
      <SidebarMain
        isCollapsed={isCollapsed}
        menuItems={menuItems}
        user={user}
        role={role}
      />

      {/* Coluna 2: Main Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header (Fixo no topo da Main) */}
        <HeaderMain
          isCollapsed={isCollapsed}
          menuItems={menuItems}
          toggleSidebar={() => setIsCollapsed((value) => !value)}
          user={user}
          role={role}
        />

        {/* Área de Conteúdo (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-2">
          <div className="mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
