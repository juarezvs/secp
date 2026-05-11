"use client";
import { useState } from "react";

import { SidebarMain } from "./sidebar-main";
import { HeaderMain } from "./header-main";

export default function LayoutMainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Coluna 1: Sidebar (Fixa) */}
      <SidebarMain isCollapsed={isCollapsed} />

      {/* Coluna 2: Main Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header (Fixo no topo da Main) */}
        <HeaderMain toggleSidebar={() => setIsCollapsed(!isCollapsed)} />

        {/* Área de Conteúdo (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
