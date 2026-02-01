// src/components/private/AsideNav.tsx
"use client";

import type { AsideConfig, NavItem } from "@/app/_kernel/lib/nav/types";
import type { Role } from "@/app/_kernel/lib/rbac/types";
import { filterAside } from "@/app/_kernel/lib/nav/filter";
import { CardSecp } from "../CardSecp";
import { Group } from "./AsideNav";
import clsx from "clsx";
import { Span } from "next/dist/trace";

export function CardPage({
  config,
  role,
}: {
  config: AsideConfig;
  role: Role;
}) {
  const filtered = filterAside(config, role);
  const hasChild = filtered.items.filter((c) => c.children);

  return (
    <div className="pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {filtered.items.map(
          (tt) =>
            !tt.children && (
              <CardSecp
                key={tt.label}
                title={tt.label}
                description={tt.description}
                href={tt.href}
                icon={tt.icon}
              />
            ),
        )}
      </div>

      {filtered.items.map((item) => {
        if (item.children?.length) {
          return (
            <div key={item.label}>
              <div className="px-2 pt-4 pb-2 text-xs font-semibold uppercase tracking-wide ">
                {item.label}
              </div>

              <div
                className={clsx("", {
                  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ":
                    hasChild,
                })}
              >
                {item.children.map((c) => {
                  return (
                    <CardSecp
                      key={c.label}
                      title={c.label}
                      description={c.description}
                      href={c.href}
                      icon={c.icon}
                    />
                  );
                })}
              </div>
            </div>
          );
        }
        <div
          className={clsx("", {
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ":
              hasChild,
          })}
        >
          return (
          <CardSecp
            key={item.label}
            title={item.label}
            description={item.description}
            href={item.href}
            icon={item.icon}
          />
          );
        </div>;
      })}
    </div>
  );

  // return (
  //     <div>
  //       {filtered.title && (
  //         <div className="px-2 pb-2 text-base font-semibold uppercase">
  //           {/* Titulo do Menu */}
  //           {filtered.title}
  //         </div>
  //       )}

  //       <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
  //         {filtered.items.map((item) => {
  //           return (
  //             <CardSecp
  //               key={item.label}
  //               title={item.label}
  //               description={item.description}
  //               href={item.href}
  //               icon={item.icon}
  //             />
  //           );
  //         })}
  //       </nav>
  //     </div>
  //   );
}
