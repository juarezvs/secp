import {
  Mail,
  Star,
  Send,
  File,
  Menu,
  LayoutGrid,
  HomeIcon,
  ClockIcon,
  FileClockIcon,
  CalendarClock,
  NotepadTextIcon,
  NotebookPenIcon,
  CircleUserRoundIcon,
} from "lucide-react";

export function SidebarMain({ isCollapsed }: { isCollapsed: boolean }) {
  const menuItems = [
    { icon: HomeIcon, label: "Servidor" },
    { icon: ClockIcon, label: "Meu Ponto" },
    { icon: CalendarClock, label: "Registro de Ponto" },
    { icon: FileClockIcon, label: "Banco de Horas" },
    { icon: NotepadTextIcon, label: "Justificativas" },
    { icon: NotebookPenIcon, label: "Solicitações" },
    { icon: File, label: "Relatórios" },
    { icon: CircleUserRoundIcon, label: "Meus Dados" },
  ];

  return (
    <aside
      className={`${isCollapsed ? "w-20" : "w-64"} bg-white border-r h-screen flex flex-col transition-all duration-300 ease-in-out
     shrink-0`}
    >
      <div className="h-16 flex items-center px-6 border-b font-bold text-xl text-blue-600 truncate">
        {isCollapsed ? "CM" : "Código Mestre"}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer text-gray-600 hover:text-blue-600 transition-colors group"
            title={isCollapsed ? item.label : ""}
          >
            <div className="shrink-0">
              <item.icon size={22} />
            </div>
            <div
              className={`
                transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
                ${isCollapsed ? "w-0 opacity-0" : "w-full opacity-100"}
              `}
            >
              <span className="text-sm font-medium truncate">{item.label}</span>
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
