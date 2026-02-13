// "use client";
import type { AsideConfig } from "./types";

import {
  Building,
  Building2,
  CalendarClock,
  Clock,
  Database,
  DatabaseBackupIcon,
  FileClock,
  Landmark,
  LandmarkIcon,
  RefreshCcw,
  Search,
  User2,
  UserCog,
  UserLock,
  UserPlus2,
  UserStarIcon,
} from "lucide-react";
export const DASHBOARD_ASIDE: AsideConfig = {
  title: "Administrador",
  icon: <UserStarIcon className="w-6 h-6" />,
  items: [
    {
      label: "Servidor",
      icon: <User2 className="w-6 h-6" />,

      requireAny: [
        "EQUIPE_VIEW",
        "PONTO_SOLICITACOES_APPROVE",
        "RELATORIOS_VIEW",
      ],
      children: [
        {
          label: "Meu ponto",
          href: "/dashboard/employee/timecard",

          requireAny: ["EQUIPE_VIEW"],
        },
        {
          label: "Espelho de ponto",
          href: "/gestao/solicitacoes",
          requireAny: ["PONTO_SOLICITACOES_APPROVE"],
        },
        {
          label: "Banco de horas",
          href: "/gestao/relatorios",
          requireAny: ["RELATORIOS_VIEW"],
        },
      ],
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
          description:
            "Permite gerenciar os dados do servidores. Sincronizar servidores do SARH.",
          requireAny: ["EMPLOYEE_VIEW"],
        },
        {
          label: "Órgãos da Justiça",
          description:
            "Permite cadastrar/consultar Unidades Adminstrativas da Justiça Federal",
          href: "/dashboard/admin/tenant",
          icon: <LandmarkIcon className="w-6" />,
          requireAny: ["TENANT_VIEW"],
        },
        {
          label: "Relógios",
          href: "/dashboard/admin/clocks",
          description: "Gerencia todos os relógios de ponto da unidade.",
          icon: <Clock className="w-6" />,
          requireAny: ["RELOGIO_VIEW"],
        },
        {
          label: "Escalas & Jornadas",
          href: "/dashboard/admin/escalas",
          requireAny: ["ESCALAS_VIEW"],
        },
        {
          label: "AFD / Importações",
          href: "/dashboard/admin/afd",
          requireAny: ["AFD_IMPORT", "AFD_PROCESS"],
        },
        {
          label: "Parâmetros",
          href: "/dashboard/admin/parametros",
          requireAny: ["PARAMETROS_EDIT"],
        },
        {
          label: "Auditoria",
          href: "/dashboard/admin/auditoria",
          requireAny: ["AUDITORIA_VIEW"],
        },
      ],
    },
  ],
};

export const MASTER_ASIDE: AsideConfig = {
  title: "Servidores",

  items: [
    {
      label: "Servidor",
      description: "Painel do servidor",
      href: "/dashboard/admin/employee",
      icon: <User2 className="w-6" />,

      requireAny: [
        "EQUIPE_VIEW",
        "PONTO_SOLICITACOES_APPROVE",
        "RELATORIOS_VIEW",
      ],
    },

    {
      label: "Gestor",
      description: "Painel do gestor",
      href: "/dashboard/admin/gestor",
      icon: <UserPlus2 className="w-6" />,
      require: ["EMPLOYEE_SYNC_SARH"],
    },
    {
      label: "Administrador",
      description: "Painel do administrador",
      href: "/dashboard/admin",
      icon: <UserLock className="w-6" />,
      requireAny: [
        "EQUIPE_VIEW",
        "PONTO_SOLICITACOES_APPROVE",
        "RELATORIOS_VIEW",
      ],
    },
    {
      label: "Master",
      description: "Painel do master",
      href: "/dashboard/admin/master",
      icon: <UserCog className="w-6" />,
      requireAny: [
        "EQUIPE_VIEW",
        "PONTO_SOLICITACOES_APPROVE",
        "RELATORIOS_VIEW",
      ],
    },
  ],
};

export const ADMIN_EMPLOYEE_ASIDE: AsideConfig = {
  title: "Servidores",

  items: [
    {
      label: "Consultar",
      href: "/dashboard/admin/employee/list",
      description: "Permite consultar informações servidor",
      icon: <Search className="w-5" />,
      require: ["EMPLOYEE_VIEW"],
    },
    {
      label: "Importar",
      href: "/dashboard/admin/employee/import",
      description: "Permite importar servidor do SARH.",
      icon: <Database className="w-5" />,
      require: ["EMPLOYEE_IMPORT_SARH"],
    },
    {
      label: "Sincronizar",
      description:
        "Permite sincronizar os dados dos servidores com os do SARH.",
      href: "/dashboard/admin/employee/sync",
      icon: <RefreshCcw className="w-5" />,
      require: ["EMPLOYEE_SYNC_SARH"],
    },
  ],
};

/*
    "DASHBOARD_VIEW",


    "PONTO_OCORRENCIAS_VIEW",
    "PONTO_SOLICITACOES_CREATE",
*/

export const EMPLOYEE_ASIDE: AsideConfig = {
  title: "Servidor",
  icon: <User2 className="w-6 h-6" />,
  items: [
    {
      label: "Meu ponto",
      icon: <CalendarClock className="w-6 h-6" />,
      description: "Veja suas marcações do dia",
      href: "/dashboard/employee/timecard/record",
      requireAny: ["PONTO_REGISTROS_VIEW"],
      // requireAny: ["PONTO_REGISTROS_VIEW"],
    },
    {
      label: "Espelho de ponto",
      icon: <FileClock className="w-6 h-6" />,
      description: "Veja suas marcações do dia",
      href: "/dashboard/employee/timecard/report",
      requireAny: ["PONTO_ESPELHO_VIEW"],
    },
    // {
    //   label: "Ocorrências",
    //   icon: <BellAlertIcon  className="w-6 h-6" />,
    //   description:"Veja suas marcações do dia",
    //   href: "/dashboard/employee/timecard/report",
    //   requireAny: ["PONTO_OCORRENCIAS_VIEW"],
    // },

    // {
    //   label: "Solicitações",
    //   description:"Veja suas marcações do dia",
    //   icon: <DocumentDuplicateIcon  className="w-6 h-6" />,
    //   href: "/dashboard/employee/timecard/report",
    //   requireAny: ["PONTO_SOLICITACOES_CREATE"],
    // },
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
      label: "Mostrar relógios",
      href: "/dashboard/admin/clocks",
      exact: true,
      requireAny: ["RELOGIO_VIEW"],
    },
    // {
    //   label: "Novo",
    //   href: "/dashboard/admin/clocks/new",
    //   requireAny: ["RELOGIO_CREATE"],
    // },
    // {
    //   label: "Manutenção",
    //   href: "/dashboard/admin/clocks/maintenance",
    //   requireAny: ["RELOGIO_EDIT"],
    // },
    {
      label: "AFD",
      requireAny: ["AFD_IMPORT", "AFD_PROCESS"],
      children: [
        {
          label: "Importar AFD",
          href: "/dashboard/admin/afd/import",
          requireAny: ["AFD_IMPORT"],
        },
      ],
    },
  ],
};

export const AFD_ASIDE: AsideConfig = {
  title: "Arquivo de Fonte de Dados",
  items: [
    {
      label: "Últimas importações",
      requireAny: ["AFD_IMPORT", "AFD_PROCESS"],
      href: "/dashboard/admin/afd/list",
    },
    {
      label: "Importação de AFD",
      requireAny: ["AFD_IMPORT", "AFD_PROCESS"],
      href: "/dashboard/admin/afd/import",
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
  title: "Órgãos da Justiça",
  icon: <Landmark className="w-6" />,
  items: [
    {
      label: "Seção Judiciária",
      description: "Permite gerenciar dados da Seção Judiciária",
      icon: <Building2 className="w-5" />,
      href: "/dashboard/admin/tenant/list",
      requireAny: ["TENANT_VIEW"],
    },
    {
      label: "Subseção Judiciária",
      description: "Permite gerenciar dados da Subseção Judiciária",
      icon: <Building className="w-5" />,
      href: "/dashboard/admin/tenant/unit",
      requireAny: ["TENANT_VIEW"],
    },
    {
      label: "Importar do SARH",
      description: "Permite importar Seção e Subseção do SARH",
      icon: <DatabaseBackupIcon className="w-5" />,
      href: "/dashboard/admin/tenant/import",
      requireAny: ["TENANT_VIEW"],
    },
  ],
};
