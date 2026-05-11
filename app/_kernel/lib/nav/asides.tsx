// "use client";
import type { AsideConfig } from "./types";

import {
  Building,
  Building2,
  Clock,
  Database,
  DatabaseBackupIcon,
  HouseIcon,
  Landmark,
  LandmarkIcon,
  RefreshCcw,
  Search,
  User2,
  UserStarIcon,
} from "lucide-react";

//////////////////////////////////////////
//         PERFIS DO SISTEMA           //
/////////////////////////////////////////
/////////////////////////////////////////



// | "DASHBOARD_GESTOR"
// | ""
// | "GESTOR_SOLICITACOES_EQUIPE"
// | "GESTOR_CONVOCAO_RECESSO"
// | "GESTOR_CONFIGURACOES"


//////////////////////////////////////////
//         FUNCIONALIDADES DO SISTEMA           //
/////////////////////////////////////////
/////////////////////////////////////////
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
