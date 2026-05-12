import { filterAside } from "@/app/_kernel/lib/nav/filter";
import { AsideConfig, NavItem } from "@/app/_kernel/lib/nav/types";
import { ASIDE_BY_ROLE, isRole } from "@/app/_kernel/lib/rbac/guard";
import { Role } from "@/app/_kernel/lib/rbac/types";
import { auth } from "@/auth";
import {
  File,
  HomeIcon,
  ClockIcon,
  FileClockIcon,
  CalendarClock,
  NotepadTextIcon,
  NotebookPenIcon,
  CircleUserRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarMainProps = {
  isCollapsed: boolean;
  menuItems: AsideConfig;
  role: Role;
  user: {
    name: string;
    email: string;
    role?: string;
  };
};

export function isActive(pathname: string, item: NavItem) {
  if (!item.href) return false;
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(item.href + "/");
}

export function Group({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-2">
      <div className="px-2 pb-1 flex items-center gap-1 text-base text-secp-blue font-semibold uppercase tracking-wide ">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

export default function SidebarMain({
  isCollapsed,
  menuItems,
  role,
}: SidebarMainProps) {
  const pathname = usePathname();
  const filtered = filterAside(menuItems, role);
 
  return (
    <aside
      className={`${isCollapsed ? "w-20" : "w-64"} bg-white border-r h-screen flex flex-col transition-all duration-300 ease-in-out
     shrink-0`}
    >
      <div className="h-16 flex items-center px-6 border-b font-bold text-xl text-blue-600 truncate">
        {isCollapsed ? "CP" : "Controle de Ponto"}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
        {/* Titulo menu */}
        {filtered.title && (
          <span className="text-xs font-medium ">{filtered.title}</span>
        )}
        {/* Fim Titulo menu */}
        {filtered.items.map((item) => (
          <div
            key={item.label}
            // className="flex items-center gap-2 p-1 hover:bg-blue-50 rounded-lg cursor-pointer text-gray-600 hover:text-blue-600 transition-colors group"
            className={[
              "flex items-center gap-2 p-1 text-sm rounded-sm cursor-pointer  transition-colors group",
              isActive(pathname, item)
                ? " bg-green-100 text-green-950 font-semibold"
                : " hover:bg-blue-50 hover:text-blue-600 ",
            ].join(" ")}
            title={isCollapsed ? item.label : ""}
          >
            <div className="shrink-0 text-green-700">{item.icon}</div>
            <div
              className={`
                transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
                ${isCollapsed ? "w-0 opacity-0" : "w-full opacity-100"}
              `}
            >
              {
                <Link
                  key={item.label}
                  href={item.href ?? "#"}
                  className="truncate"
                >
                  {item.label}
                </Link>
              }
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
