"use client";

import { filterAside } from "@/app/_kernel/lib/nav/filter";
import type { AsideConfig } from "@/app/_kernel/lib/nav/types";
import type { Role } from "@/app/_kernel/lib/rbac/types";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/ui/components/shadcn/sheet";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Group, isActive } from "./aside-nav";

export default function SheetMenu() {
  //     {
  //   config,
  //   role,
  // }: {
  //   config: AsideConfig;
  //   role: Role;
  // }
  //   const pathname = usePathname();
  //   const filtered = filterAside(config, role);
  return (
    <Sheet key="right">
      <SheetTrigger>
        <MenuIcon className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Painéis</SheetTitle>
          <SheetDescription>
            Estes são os paineis que você tem acesso.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
