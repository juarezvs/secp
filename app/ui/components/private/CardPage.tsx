// src/components/private/AsideNav.tsx
"use client";

import type { AsideConfig, NavItem } from "@/app/_kernel/lib/nav/types";
import type { Role } from "@/app/_kernel/lib/rbac/types";
import { filterAside } from "@/app/_kernel/lib/nav/filter";
import { CardSecp } from "../CardSecp";
import { Group } from "./AsideNav";

export function CardPage({
  config,
  role,
}: {
  config: AsideConfig;
  role: Role;
}) {
  const filtered = filterAside(config, role);
  return (
    <div>
      {filtered.items.map((item) => {
        if (item.children?.length) {
          return (
            <div className="grid grid-cols-4 gap-4">
              <div className="mt-2">
                <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide ">
                  {item.label}
                </div>
                {/* <div className="flex flex-col gap-1">{children}</div> */}
              </div>
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
              {/* </Group> */}
            </div>
          );
        }

        return (
          <CardSecp
            key={item.label}
            title={item.label}
            description={item.description}
            href={item.href}
            icon={item.icon}
          />
        );
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
