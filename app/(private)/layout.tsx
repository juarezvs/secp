// src/app/(private)/layout.tsx
import type { ReactNode } from "react";
import { Toaster } from "../ui/components/shadcn/sonner";
import "../globals.css";
import LayoutWrapper from "../_ui/components/private/layout-main-wrapper";
import { Providers } from "../providers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Role } from "../_kernel/lib/rbac/types";
import { ASIDE_BY_ROLE, isRole } from "../_kernel/lib/rbac/guard";

type PrivateGroupLayoutProps = {
  children: ReactNode;
};

export default async function PrivateGroupLayout({
  children,
}: PrivateGroupLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role: Role = isRole(session.user.role) ? session.user.role : "SERVIDOR";
  const asideConfig = ASIDE_BY_ROLE[role];
  // console.log("Papel do Usuário:", role, asideConfig);

  return (
    <Providers>
      <LayoutWrapper menuItems={asideConfig} user={session.user} role={role}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              error:
                "!bg-[#FEE3E1] !text-black !border-b-4 !border-[#E94A3C] !w-[550px]",
              success:
                "!bg-[#B6EACD] !text-black !border-b-4 !border-[#03A655] !w-[550px]",
              warning:
                "!bg-[#FFE4C7] !text-black !border-b-4 !border-[#F1A517] !w-[550px] [&_svg]:!text-[#F1A517]",
              info: "!bg-[#C2EDFE] !text-black !border-b-4 !border-[#1B7DEA] !w-[550px] ",
            },
          }}
        />
      </LayoutWrapper>
    </Providers>
  );
}
