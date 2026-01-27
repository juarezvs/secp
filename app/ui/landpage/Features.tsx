import {
  BuildingOffice2Icon,
  CheckIcon,
  ClockIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

export const Features = () => {
  return (
    <section
      id="recursos"
      className="border-t border-zinc-200 bg-zinc-50/50 py-16"
    >
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold tracking-tight text-[#002F6C] md:text-3xl">
          Recursos essenciais para RH, gestores e auditoria
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-700">
          Estruturado para ambientes complexos (órgãos da Justiça Federal), com
          governança e observabilidade.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3 text-[#002F6C]">
              <ClockIcon className="h-6 w-6" />
              <h3 className="text-lg font-semibold">
                Regras de Jornada & Feriados
              </h3>
            </div>
            <p className="mt-2 text-sm text-zinc-600">
              Expedientes por empresa/filial/servidor, feriados
              nacionais/locais/forense, escalas e exceções.
            </p>
          </article>

          <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3 text-[#002F6C]">
              <BuildingOffice2Icon className="h-6 w-6" />
              <h3 className="text-lg font-semibold">
                Multiempresa e Hierarquia
              </h3>
            </div>
            <p className="mt-2 text-sm text-zinc-600">
              Empresas, filiais, departamentos e permissões por papéis (gestor,
              servidor, RH, auditoria).
            </p>
          </article>

          <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3 text-[#002F6C]">
              <ShieldCheckIcon className="h-6 w-6" />
              <h3 className="text-lg font-semibold">
                Segurança e Conformidade
              </h3>
            </div>
            <p className="mt-2 text-sm text-zinc-600">
              Autenticação corporativa (LDAP/AD, Microsoft Teams), trilhas de
              auditoria e políticas de retenção.
            </p>
          </article>

          <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3 text-[#002F6C]">
              <CloudArrowUpIcon className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Integrações & APIs</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-600">
              Conecte relógios, SARH, exporte dados via API REST/GraphQL,
              possibilidade de integração externa por API RESTful
            </p>
          </article>

          <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3 text-[#002F6C]">
              <CheckIcon className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Workflows e Aprovações</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-600">
              Solicitações de ajuste com evidências, validação por chefias e
              notificações inteligentes.
            </p>
          </article>

          <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3 text-[#002F6C]">
              <CheckIcon className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Relatórios e Painéis</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-600">
              Espelho de ponto, banco de horas, horas extras e dashboards para
              tomada de decisão.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};
