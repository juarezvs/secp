"use client";
import { GradientBorder } from "../shared/gradient-border";
import { LogoSECP } from "@/app/(landinpage)/_components/LogoSECP";
import { signOut } from "next-auth/react";

export function Header() {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/", // redireciona após logout
    });
  };
  return (
    <header className="sticky top-0 z-30 bg-[#002F6C] text-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <LogoSECP />
        <nav
          aria-label="Principal"
          className="hidden items-center gap-8 md:flex"
        ></nav>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="rounded-xl bg-[#007A33] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#026b2e]"
          >
            Sair
          </button>
        </div>
      </div>
      <GradientBorder />
    </header>
  );
}
