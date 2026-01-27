// // src/components/private/Header.tsx
// import Link from "next/link";

// export function Header() {
//   return (
//     <header className="border-b bg-white">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
//         <Link href="/dashboard" className="font-semibold text-gray-900">
//           SECP
//         </Link>

//         <div className="flex items-center gap-3">
//           <span className="text-sm text-gray-600">Ambiente privado</span>
//           <button className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50">
//             Sair
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }
import Link from "next/link";
import { GradientBorder } from "@/app/ui/components/GradientBorder";
import { LogoSECP } from "@/app/ui/landpage/LogoSECP";

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[#002F6C] text-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <LogoSECP />
        <nav
          aria-label="Principal"
          className="hidden items-center gap-8 md:flex"
        ></nav>
        <div className="flex items-center gap-3">
          <Link
            className="rounded-xl bg-[#007A33] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#026b2e]"
            href="/login"
          >
            Sair
          </Link>
        </div>
      </div>
      <GradientBorder />
    </header>
  );
}
