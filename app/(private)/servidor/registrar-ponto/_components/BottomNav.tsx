"use client"; // Garante que é um Client Component

import { usePathname } from "next/navigation"; // Hook correto do Next.js
import Link from "next/link";

export default function BottomNav() {
  const pathname = usePathname(); // Substitui o useLocation().pathname

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-borderface bg-card/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-md grid grid-cols-4">
        {/* Exemplo de uso do pathname para verificar rota ativa */}
        <Link 
          href="/servidor/registrar-ponto"
          className={`p-2 ${pathname === '/servidor/registrar-ponto' ? 'text-sky-500' : 'text-slate-500'}`}
        >
          Ponto
        </Link>
        {/* ... outros links */}
      </div>
    </nav>
  );
}