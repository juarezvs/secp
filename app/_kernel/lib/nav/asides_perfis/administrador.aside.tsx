import {
  HouseIcon,
  CalendarClockIcon,
  UserRoundPlusIcon,
  Building2Icon,
  UserCogIcon,
  CalendarRangeIcon,
  BriefcaseBusinessIcon,
  BadgeCheckIcon,
  CalendarDaysIcon,
  CalendarCogIcon,
  FileSignatureIcon,
  MonitorCogIcon,
  LayoutDashboardIcon,
  PlugZapIcon,
  SettingsIcon,
  ArchiveIcon,
  FileBarChartIcon,
} from "lucide-react";
import { AsideConfig } from "../types";

export const ADMINISTRADOR_ASIDE: AsideConfig = {
  title: "Dashboard",
  icon: <HouseIcon className="w-6 h-6" />,

  items: [
    {
      label: "Dashboard Administrativo",
      description: "Visão administrativa do controle eletrônico.",
      icon: <LayoutDashboardIcon className="w-5" />,
      href: "/administrador/dashboard",
      requireAny: ["ADMINISTRADOR_SERVIDORES"],
    },
    {
      label: "Servidores",
      description: "Mantenha a base funcional atualizada.",
      href: "/administrador/servidores",
      icon: <UserRoundPlusIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_ORGANIZACOES"],
    },
    {
      label: "Unidades Organizacionais",
      description: "Reflita a estrutura institucional no sistema.",
      href: "/administrador/unidades",
      icon: <Building2Icon className="w-5" />,
      requireAny: ["ADMINISTRADOR_PERFIS_PERMISSOES"],
    },
    {
      label: "Chefias e Gestores",
      description: "Defina responsabilidades de validação.",
      href: "/administrador/chefias",
      icon: <UserCogIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_JORNADAS_ESCALAS"],
    },

    {
      label: "Jornadas e Escalas",
      description: "Configure horários conforme a regra aplicável.",
      href: "/administrador/jornadas",
      icon: <CalendarClockIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_JORNADAS_ESCALAS"],
    },
    {
      label: "Calendário Institucional",
      description: "Controle os dias úteis e exceções do calendário.",
      href: "/administrador/calendario",
      icon: <CalendarDaysIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_CARGO_ISENTO_PONTO"],
    },
    {
      label: "Recesso Forense",
      description: "Administre os períodos excepcionais de recesso.",
      href: "/administrador/recesso",
      icon: <CalendarCogIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_JORNADAS_ESCALAS"],
    },
    {
      label: "Equipamentos de Ponto",
      description: "Gerencie dispositivos de marcação.",
      href: "/administrador/equipamentos",
      icon: <MonitorCogIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_JORNADAS_ESCALAS"],
    },
    {
      label: "Integrações",
      description: "Conecte o SECP aos sistemas institucionais.",
      href: "/administrador/integracoes",
      icon: <PlugZapIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_JORNADAS_ESCALAS"],
    },
    {
      label: "Parâmetros",
      description: "Configure as regras gerais do sistema.",
      href: "/administrador/parametros",
      icon: <SettingsIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_JORNADAS_ESCALAS"],
    },
    {
      label: "Fechamentos",
      description: "Consolide a frequência das unidades.",
      href: "/administrador/fechamentos",
      icon: <ArchiveIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_JORNADAS_ESCALAS"],
    },
    {
      label: "Relatórios Administrativos",
      description: "Gere relatórios para gestão administrativa.",
      href: "/administrador/relatorios",
      icon: <FileBarChartIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_JORNADAS_ESCALAS"],
    },
    // {
    //   label: "Relatórios",
    //   requireAny: ["GESTOR_RELATORIOS_EQUIPE"],
    //   children: [
    //     {
    //       label: "Horas & Saldo",
    //       href: "/gestao/relatorios/horas",
    //       requireAny: ["RELATORIOS_VIEW"],
    //     },
    //     {
    //       label: "Inconsistências",
    //       href: "/gestao/relatorios/inconsistencias",
    //       requireAny: ["RELATORIOS_VIEW"],
    //     },
    //     {
    //       label: "Exportações",
    //       href: "/gestao/relatorios/exportar",
    //       requireAny: ["RELATORIOS_EXPORT"],
    //     },
    //   ],
    // },
  ],
};
