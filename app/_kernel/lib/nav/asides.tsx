// src/lib/nav/asides.ts
import type { AsideConfig } from "./types";
import { ClockIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export const DASHBOARD_ASIDE: AsideConfig = {
  title: "Dashboard",
  items: [
    {
      label: "Visão geral",
      href: "/dashboard",
      exact: true,
      requireAny: ["DASHBOARD_VIEW"],
    },

    {
      label: "Gestão",
      requireAny: [
        "EQUIPE_VIEW",
        "PONTO_SOLICITACOES_APPROVE",
        "RELATORIOS_VIEW",
      ],
      children: [
        {
          label: "Equipe",
          href: "/gestao/equipe",
          requireAny: ["EQUIPE_VIEW"],
        },
        {
          label: "Aprovar solicitações",
          href: "/gestao/solicitacoes",
          requireAny: ["PONTO_SOLICITACOES_APPROVE"],
        },
        {
          label: "Relatórios",
          href: "/gestao/relatorios",
          requireAny: ["RELATORIOS_VIEW"],
        },
      ],
    },

    {
      label: "Administração",
      requireAny: [
        "EMPLOYEE_VIEW",
        "RELOGIO_VIEW",
        "PARAMETROS_EDIT",
        "AUDITORIA_VIEW",
      ],
      children: [
        {
          label: "Servidores",
          href: "/dashboard/admin/employee",
          requireAny: ["EMPLOYEE_VIEW"],
        },
        {
          label: "Unidade",
          href: "/admin/tenant",
          requireAny: ["TENANT_VIEW"],
        },
        {
          label: "Relógios",
          href: "/admin/relogios",
          requireAny: ["RELOGIO_VIEW"],
        },
        {
          label: "Escalas & Jornadas",
          href: "/admin/escalas",
          requireAny: ["ESCALAS_VIEW"],
        },
        {
          label: "AFD / Importações",
          href: "/admin/afd",
          requireAny: ["AFD_IMPORT", "AFD_PROCESS"],
        },
        {
          label: "Parâmetros",
          href: "/admin/parametros",
          requireAny: ["PARAMETROS_EDIT"],
        },
        {
          label: "Auditoria",
          href: "/admin/auditoria",
          requireAny: ["AUDITORIA_VIEW"],
        },
      ],
    },
  ],
};

export const ADMIN_EMPLOYEE_ASIDE: AsideConfig = {
  title: "Servidores",

  items: [
    {
      label: "Listar",
      href: "/dashboard/admin/employee",
      require: ["EMPLOYEE_VIEW"],
    },
    {
      label: "Importar do SARH",
      href: "/dashboard/admin/employee/import",
      require: ["EMPLOYEE_IMPORT_SARH"],
    },
  ],
};
export const EMPLOYEE_ASIDE: AsideConfig = {
  title: "Frequência",
  items: [
    {
      label: "Meu ponto",
      icon: <ClockIcon className="h-5 w-5" />,
      href: "/dashboard/employee/timecard/record",
      requireAny: ["PONTO_REGISTROS_VIEW"],
    },
    {
      label: "Espelho de ponto",
      icon: <DocumentTextIcon className="h-5 w-5" />,
      href: "/dashboard/employee/timecard/report",
      requireAny: ["PONTO_ESPELHO_VIEW"],
    },

    // {
    //   label: "Ocorrências",
    //   href: "/timecard/ocorrencias",
    //   requireAny: ["PONTO_OCORRENCIAS_VIEW"],
    // },
    // {
    //   label: "Solicitações",
    //   href: "/timecard/solicitacoes",
    //   requireAny: ["PONTO_SOLICITACOES_CREATE", "PONTO_SOLICITACOES_APPROVE"],
    // },

    // {
    //   label: "Ações",
    //   children: [
    //     {
    //       label: "Nova solicitação",
    //       href: "/timecard/solicitacoes/new",
    //       requireAny: ["PONTO_SOLICITACOES_CREATE"],
    //     },
    //     {
    //       label: "Aprovações (Gestor)",
    //       href: "/gestao/solicitacoes",
    //       requireAny: ["PONTO_SOLICITACOES_APPROVE"],
    //     },
    //   ],
    // },
  ],
};

export const GESTAO_ASIDE: AsideConfig = {
  title: "Gestão",
  items: [
    { label: "Equipe", href: "/gestao/equipe", requireAny: ["EQUIPE_VIEW"] },
    {
      label: "Solicitações",
      href: "/gestao/solicitacoes",
      requireAny: ["PONTO_SOLICITACOES_APPROVE"],
    },
    {
      label: "Relatórios",
      requireAny: ["RELATORIOS_VIEW"],
      children: [
        {
          label: "Horas & Saldo",
          href: "/gestao/relatorios/horas",
          requireAny: ["RELATORIOS_VIEW"],
        },
        {
          label: "Inconsistências",
          href: "/gestao/relatorios/inconsistencias",
          requireAny: ["RELATORIOS_VIEW"],
        },
        {
          label: "Exportações",
          href: "/gestao/relatorios/exportar",
          requireAny: ["RELATORIOS_EXPORT"],
        },
      ],
    },
    {
      label: "Equipe (Admin)",
      requireAny: ["EQUIPE_MANAGE"],
      children: [
        {
          label: "Vínculos & Chefias",
          href: "/gestao/equipe/vinculos",
          requireAny: ["EQUIPE_MANAGE"],
        },
      ],
    },
  ],
};

export const EMPRESA_ASIDE: AsideConfig = {
  title: "Unidades",
  items: [
    {
      label: "Listar",
      href: "/admin/tenant",
      exact: true,
      requireAny: ["TENANT_VIEW"],
    },
    {
      label: "Novo",
      href: "/admin/tenant/new",
      requireAny: ["TENANT_CREATE"],
    },
    // rota dinâmica (não clicar normalmente)
  ],
};

export const RELOGIOS_ASIDE: AsideConfig = {
  title: "Relógios",
  items: [
    {
      label: "Listar",
      href: "/admin/clocks",
      exact: true,
      requireAny: ["RELOGIO_VIEW"],
    },
    {
      label: "Novo",
      href: "/admin/clocks/new",
      requireAny: ["RELOGIO_CREATE"],
    },
    {
      label: "Manutenção",
      href: "/admin/clocks/maintenance",
      requireAny: ["RELOGIO_EDIT"],
    },
    {
      label: "AFD",
      requireAny: ["AFD_IMPORT", "AFD_PROCESS"],
      children: [
        {
          label: "Importar AFD",
          href: "/admin/afd/importar",
          requireAny: ["AFD_IMPORT"],
        },
        {
          label: "Processar AFD",
          href: "/admin/afd/processar",
          requireAny: ["AFD_PROCESS"],
        },
        {
          label: "Histórico",
          href: "/admin/afd/historico",
          requireAny: ["AFD_IMPORT", "AFD_PROCESS"],
        },
      ],
    },
  ],
};

export const ESCALAS_ASIDE: AsideConfig = {
  title: "Escalas & Jornadas",
  items: [
    {
      label: "Visão geral",
      href: "/admin/escalas",
      exact: true,
      requireAny: ["ESCALAS_VIEW"],
    },
    {
      label: "Jornadas",
      href: "/admin/escalas/jornadas",
      requireAny: ["ESCALAS_VIEW"],
    },
    {
      label: "Escalas",
      href: "/admin/escalas/escalas",
      requireAny: ["ESCALAS_VIEW"],
    },
    {
      label: "Regras",
      href: "/admin/escalas/regras",
      requireAny: ["ESCALAS_EDIT"],
    },
  ],
};

export const PARAMETROS_ASIDE: AsideConfig = {
  title: "Parâmetros",
  items: [
    {
      label: "Geral",
      href: "/admin/parametros",
      exact: true,
      requireAny: ["PARAMETROS_EDIT"],
    },
    {
      label: "Feriados",
      href: "/admin/parametros/feriados",
      requireAny: ["PARAMETROS_EDIT"],
    },
    {
      label: "Tolerâncias",
      href: "/admin/parametros/tolerancias",
      requireAny: ["PARAMETROS_EDIT"],
    },
    {
      label: "Fechamento",
      href: "/admin/parametros/fechamento",
      requireAny: ["PARAMETROS_EDIT"],
    },
  ],
};

export const AUDITORIA_ASIDE: AsideConfig = {
  title: "Auditoria",
  items: [
    {
      label: "Logs",
      href: "/admin/auditoria",
      exact: true,
      requireAny: ["AUDITORIA_VIEW"],
    },
    {
      label: "Eventos de ponto",
      href: "/admin/auditoria/ponto",
      requireAny: ["AUDITORIA_VIEW"],
    },
    {
      label: "Administração",
      href: "/admin/auditoria/admin",
      requireAny: ["AUDITORIA_VIEW"],
    },
  ],
};

export const PERMISSOES_ASIDE: AsideConfig = {
  title: "Permissões",
  items: [
    {
      label: "Perfis",
      href: "/admin/permissoes/perfis",
      requireAny: ["PERMISSOES_MANAGE"],
    },
    {
      label: "Permissões",
      href: "/admin/permissoes/permissoes",
      requireAny: ["PERMISSOES_MANAGE"],
    },
    {
      label: "Usuários",
      href: "/admin/permissoes/usuarios",
      requireAny: ["PERMISSOES_MANAGE"],
    },
    {
      label: "Auditoria de Acesso",
      href: "/admin/permissoes/auditoria",
      requireAny: ["PERMISSOES_MANAGE"],
    },
  ],
};

export const TENANT_ASIDE: AsideConfig = {
  title: "Empresa / Unidade",
  items: [
    {
      label: "Trocar unidade",
      href: "/admin/tenant/switch",
      requireAny: ["TENANT_VIEW"],
    },
    {
      label: "Empresas",
      href: "/admin/tenant/empresas",
      requireAny: ["TENANT_VIEW"],
    },
    {
      label: "Unidades",
      href: "/admin/tenant",
      requireAny: ["TENANT_VIEW"],
    },
  ],
};
