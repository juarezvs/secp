import { LogoSECP } from "./LogoSECP";

export const Footer = () => {
  return (
    <footer id="contato" className="border-t border-zinc-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <LogoSECP />
          <div className="text-sm text-zinc-600">
            <div>Contato: nutec.am@trf1.jus.br</div>
            <div>Suporte: sersup.am@trf1.jus.br</div>
          </div>
        </div>
        <div className="mt-6 text-xs text-zinc-500">
          © {new Date().getFullYear()} SECP — Sistema Eletrônico de Controle de
          Ponto. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
