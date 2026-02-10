import { Secp } from "@/app/_ui/components/shared/secp";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-10 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-4">
        {/* Sistema */}
        <div>
          <Secp />
          <p className="text-sm leading-relaxed">
            Sistema Eletrônico de Controle de Ponto desenvolvido para gestão
            moderna e transparente da jornada de trabalho.
          </p>
        </div>

        {/* Contatos */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contato</h3>

          <ul className="space-y-2 text-sm">
            <li>📧 nutec.am@trf1.jus.br</li>
            <li>📞 (92) 3612-3200</li>
            <li>🕘 Atendimento: 8h às 15h</li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Links Úteis</h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
              Manual do Usuário
            </li>
            <li className="hover:text-white cursor-pointer">Política de Uso</li>
            <li className="hover:text-white cursor-pointer">Suporte Técnico</li>
          </ul>
        </div>

        {/* Institucional */}
        <div>
          <h3 className="text-white font-semibold mb-3">Institucional</h3>

          <p className="text-sm">
            Justiça Federal do Amazonas — Sistema corporativo de controle de
            jornada e frequência de servidores.
          </p>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-sm text-slate-400">
          <span>
            © {new Date().getFullYear()} SECP — Todos os direitos reservados
          </span>

          <span>Versão 1.0.0 • Ambiente Produção</span>
        </div>
      </div>
    </footer>
  );
};

// export const Footer = () => {
//   return (
//     <footer
//       id="contato"
//       // className="border-t border-zinc-200 bg-zinc-50/50 py-16"
//       // className="border-t border-zinc-200 bg-white py-10"
//     >
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
//           <LogoSECP />
//           <div className="text-sm text-zinc-600">
//             <div>Contato: nutec.am@trf1.jus.br</div>
//             <div>Suporte: sersup.am@trf1.jus.br</div>
//           </div>
//         </div>
//         <div className="mt-6 text-xs text-zinc-500">
//           © {new Date().getFullYear()} SECP — Sistema Eletrônico de Controle de
//           Ponto. Todos os direitos reservados.
//         </div>
//       </div>
//     </footer>
//   );
// };
