// src/components/private/AsideNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AsideConfig, NavItem } from "@/app/_kernel/lib/nav/types";
import type { Role } from "@/app/_kernel/lib/rbac/types";
import { filterAside } from "@/app/_kernel/lib/nav/filter";

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
          <div className="flex px-2 gap-1 pb-2 text-base text-secp-blue font-semibold uppercase">
            {/* Titulo do Menu */}

            {filtered.icon ? (
                          <span className="text-base">{filtered.icon}</span>
                        ) : null}
                        <span>{filtered.title}</span>

          </div>
        )}

        <nav className="flex flex-col gap-1">
          {filtered.items.map((item) => {
            if (item.children?.length) {
              return (
                <Group key={item.label} label={item.label} icon={item.icon}>
                  {item.children.map((c) => {
                    const active = isActive(pathname, c);
                    return (
                      <Link
                        key={c.href ?? c.label}
                        href={c.href ?? "#"}
                        className={[
                          "flex items-center gap-2 rounded-lg px-2 py-2 text-sm",
                          active
                            ? "border border-amber-300 shadow-md bg-[#C2E7FF] "
                            : " hover:bg-[#DDE3EA]",
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
                  active
                    ? "border text-secp-blue font-semibold border-zinc-400 shadow-md bg-[#DDE3EA] "
                    : "border-0  hover:bg-[#DDE3EA]",
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
