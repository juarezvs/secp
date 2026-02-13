// src/app/(private)/layout.tsx
import type { ReactNode } from "react";
import { Toaster } from "../ui/components/shadcn/sonner";
import "../globals.css";

export default function PrivateGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  // aqui você colocaria proteção de rota, providers, etc.
  return (
    <>
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
    </>
  );
}
