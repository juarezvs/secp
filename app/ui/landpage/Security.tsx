import { ShieldCheckIcon } from "@heroicons/react/24/solid";

export const Security = () => {
  return (
    <section
      id="seguranca"
      // className="border-y border-zinc-200 bg-linear-to-b from-white to-zinc-50 py-12"
      className="border-t border-zinc-200 bg-zinc-50/50 py-16"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8">
          <div className="flex items-start gap-4">
            <ShieldCheckIcon className="h-7 w-7 text-[#007A33]" />
            <div>
              <h3 className="text-lg font-semibold text-[#002F6C]">
                Segurança corporativa
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                Autenticação por LDAP/AD, Microsoft Teams, perfis de acesso,
                criptografia em trânsito e em repouso, e trilhas de auditoria
                por ação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
