// src/components/private/AsideNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AsideConfig, NavItem } from "@/app/_kernel/lib/nav/types";
import type { Role } from "@/app/_kernel/lib/rbac/types";
import { filterAside } from "@/app/_kernel/lib/nav/filter";

function isActive(pathname: string, item: NavItem) {
  if (!item.href) return false;
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(item.href + "/");
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-2">
      <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide ">
        {label}
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

export function AsideNav({
  config,
  role,
}: {
  config: AsideConfig;
  role: Role;
}) {
  const pathname = usePathname();
  const filtered = filterAside(config, role);

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="rounded-xl border bg-white p-3">
        {filtered.title && (
          <div className="px-2 pb-2 text-base font-semibold uppercase">
            {/* Titulo do Menu */}
            {filtered.title}
          </div>
        )}

        <nav className="flex flex-col gap-1">
          {filtered.items.map((item) => {
            if (item.children?.length) {
              return (
                <Group key={item.label} label={item.label}>
                  {item.children.map((c) => {
                    const active = isActive(pathname, c);
                    return (
                      <Link
                        key={c.href ?? c.label}
                        href={c.href ?? "#"}
                        className={[
                          "flex items-center gap-2 rounded-lg px-2 py-2 text-sm",
                          active ? "border shadow-md " : " hover:bg-gray-100",
                        ].join(" ")}
                      >
                        {c.icon ? (
                          <span className="text-base">{c.icon}</span>
                        ) : null}
                        <span>{c.label}</span>
                      </Link>
                    );
                  })}
                </Group>
              );
            }

            const active = isActive(pathname, item);
            return (
              <Link
                key={item.href ?? item.label}
                href={item.href ?? "#"}
                className={[
                  "flex items-center gap-2 rounded-lg px-2 py-2 text-sm ",
                  active ? "border shadow-md " : " hover:bg-gray-100",
                ].join(" ")}
              >
                {item.icon ? (
                  <span className="text-base">{item.icon}</span>
                ) : null}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
