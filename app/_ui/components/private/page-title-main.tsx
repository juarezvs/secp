// src/components/private/Breadcrumbs.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { resolveBreadcrumbLabel } from "@/app/_kernel/lib/breadcrumbs/resolve";
import { ChevronRight } from "lucide-react";
import { AsideConfig } from "@/app/_kernel/lib/nav/types";
import { Role } from "@/app/_kernel/lib/rbac/types";
import { filterAside } from "@/app/_kernel/lib/nav/filter";
import { is } from "zod/v4/locales";
import { isActive } from "./aside-nav";

function labelizeFallback(seg: string) {
  return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

type PageTitleMainProps = {
  menuItems: AsideConfig;
  role: Role;
};
export function PageTitleMain({ menuItems, role }: PageTitleMainProps) {
   const pathname = usePathname();
   const filtered = filterAside(menuItems, role);

  return (
    <div className="text-sm text-gray-700">
      <nav className="flex flex-wrap items-center gap-2">
        {filtered.items.map((item) => (
          isActive(pathname, item) && ( 
          <div key={item.label}>
            <h1 className="text-2xl font-bold text-gray-800">{item.label}</h1>
            <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            )
        ))}
      </nav>
    </div>
  );
}
