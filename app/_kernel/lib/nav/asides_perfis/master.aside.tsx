import {
  User2,
  LandmarkIcon,
  Clock,
  HouseIcon,
  SettingsIcon,
  SlidersHorizontalIcon,
  ScaleIcon,
  Scale,
  BuildingIcon,
  BadgeCheckIcon,
  ShieldCheckIcon,
  Building2Icon,
  GitBranchPlusIcon,
  UsersIcon,
  ShieldAlertIcon,
  BookCheck,
  UsersRoundIcon,
  Clock3Icon,
  TimerResetIcon,
  FileCheck2,
  UserCog,
  UserRoundCheckIcon,
  PlugZapIcon,
  BarChart3Icon,
  FileSearchIcon,
  BellRingIcon,
} from "lucide-react";
import { AsideConfig } from "../types";

// | "MASTER_EVENTOS_DO_SISTEMA";
export const MASTER_ASIDE: AsideConfig = {
  title: "Dashboard Master",
  icon: <HouseIcon className="w-6 h-6" />,
  items: [
    {
      label: "Organizações",

      requireAny: ["MASTER_ORGANIZACOES"],
      children: [
        {
          label: "Organizações",
          icon: <Building2Icon className="w-6 h-6" />,
          href: "/dashboard/employee/timecard",
          requireAny: ["MASTER_ORGANIZACOES"],
        },
        {
          label: "Unidades",
          icon: <BuildingIcon className="w-6 h-6" />,
          href: "/gestao/solicitacoes",
          requireAny: ["MASTER_UNIDADES"],
        },
        {
          label: "Usuários",
          icon: <UsersIcon className="w-6 h-6" />,
          href: "/gestao/relatorios",
          requireAny: ["MASTER_USUARIOS"],
        },

        {
          label: "Servidores",
          icon: <UsersRoundIcon className="w-6 h-6" />,
          href: "/gestao/relatorios",
          requireAny: ["MASTER_SERVIDORES"],
        },
        {
          label: "Gestores",
          icon: <UserRoundCheckIcon className="w-6 h-6" />,
          href: "/gestao/relatorios",
          requireAny: ["MASTER_SERVIDORES"],
        },
        {
          label: "Administradores",
          icon: <UserCog className="w-6 h-6" />,
          href: "/gestao/relatorios",
          requireAny: ["MASTER_SERVIDORES"],
        },
        {
          label: "Perfis e Permissões",
          icon: <ShieldCheckIcon className="w-6 h-6" />,
          href: "/gestao/relatorios",
          requireAny: ["MASTER_PERFIS_PERMISSOES"],
        },
      ],
    },
    {
      label: "CONFIGURAÇÕES",
      requireAny: ["DASHBOARD_MASTER"],
      children: [
        {
          label: "Parâmetros Globais",
          icon: <SlidersHorizontalIcon className="w-6 h-6" />,
          href: "/gestao/equipe",
          requireAny: ["MASTER_PARAMETROS_GLOBAIS"],
        },
        {
          label: "Regras e Políticas",
          icon: <BookCheck className="w-6 h-6" />,
          href: "/gestao/solicitacoes",
          requireAny: ["MASTER_PARAMETROS_E_POLITICAS"],
        },
        {
          label: "Jornadas Padrão",
          icon: <Clock3Icon className="w-6 h-6" />,
          href: "/gestao/relatorios",
          requireAny: ["MASTER_JORNADA_PADRAO"],
        },
        {
          label: "Banco de Horas",
          href: "/gestao/relatorios",
          icon: <TimerResetIcon className="w-6 h-6" />,
          requireAny: ["MASTER_BANCO_HORAS"],
        },
        {
          label: "Motivos e Justificativas",
          href: "/gestao/relatorios",
          icon: <FileCheck2 className="w-6 h-6" />,
          requireAny: ["MASTER_MOTIVO_DE_JUSTIFICATIVA"],
        },
        {
          label: "Integrações",
          icon: <PlugZapIcon className="w-6 h-6" />,
          href: "/gestao/relatorios",
          requireAny: ["MASTER_INTEGRACOES"],
        },
      ],
    },

    {
      label: "Relatórios",
      requireAny: ["DASHBOARD_MASTER"],
      children: [
        {
          label: "Relatórios Gerenciais",
          icon: <BarChart3Icon className="w-6 h-6" />,
          href: "/dashboard/admin/employee",
          description:
            "Permite gerenciar os dados do servidores. Sincronizar servidores do SARH.",
          requireAny: ["MASTER_RELATORIOS_GERENCIAIS"],
        },
        {
          label: "Logs de Auditoria",
          icon: <FileSearchIcon className="w-6 h-6" />,
          description:
            "Permite cadastrar/consultar Unidades Adminstrativas da Justiça Federal",
          href: "/dashboard/admin/tenant",
          requireAny: ["MASTER_LOGS_AUDITORIA"],
        },
        {
          label: "Eventos do Sistema",
          icon: <BellRingIcon className="w-6 h-6" />,
          href: "/dashboard/admin/clocks",
          description: "Gerencia todos os relógios de ponto da unidade.",
          requireAny: ["MASTER_EVENTOS_DO_SISTEMA"],
        },
      ],
    },
  ],
};
