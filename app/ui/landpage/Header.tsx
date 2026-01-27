import Link from "next/link";
import { GradientBorder } from "../components/GradientBorder";
import { LogoSECP } from "./LogoSECP";

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[#002F6C] text-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <LogoSECP />
        <nav
          aria-label="Principal"
          className="hidden items-center gap-8 md:flex"
        >
          <a
            href="#recursos"
            className="text-sm text-white/90 hover:text-white"
          >
            Recursos
          </a>
          <a
            href="#como-funciona"
            className="text-sm text-white/90 hover:text-white"
          >
            Como funciona
          </a>
          <a
            href="#seguranca"
            className="text-sm text-white/90 hover:text-white"
          >
            Segurança
          </a>
          <a href="#contato" className="text-sm text-white/90 hover:text-white">
            Contato
          </a>
        </nav>
        <div className="flex items-center gap-3">
          {/* <a
              href="#demo"
              className="hidden rounded-xl border border-white/25 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10 md:inline-block"
            >
               Solicitar demonstração
            </a> */}

          <Link
            className="rounded-xl bg-[#007A33] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#026b2e]"
            href="/login"
          >
            Entrar
          </Link>
        </div>
      </div>
      <GradientBorder />
    </header>
  );
}
