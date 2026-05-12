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
} from "lucide-react";
import { AsideConfig } from "../types";

export const ADMINISTRADOR_ASIDE: AsideConfig = {
  title: "Dashboard",
  icon: <HouseIcon className="w-6 h-6" />,

  items: [
    {
      label: "Cadastro de Servidores",
      description: "Base funcional confiável para todo o controle de ponto.",
      icon: <UserRoundPlusIcon className="w-5" />,
      href: "/gestao/solicitacoes",
      requireAny: ["ADMINISTRADOR_SERVIDORES"],
    },
    {
      label: "Unidades Organizacionais",
      description: "Estrutura institucional refletida com precisão no sistema.",
      href: "/gestao/solicitacoes",
      icon: <Building2Icon className="w-5" />,
      requireAny: ["ADMINISTRADOR_ORGANIZACOES"],
    },
    {
      label: "Chefias e Gestores",
      description:
        "Responsabilidades formalizadas para validação da frequência.",
      href: "/gestao/solicitacoes",
      icon: <UserCogIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_PERFIS_PERMISSOES"],
    },
    {
      label: "Jornadas e Horários",
      description:
        "Regras de expediente aderentes à norma e à realidade local.",
      href: "/gestao/solicitacoes",
      icon: <CalendarClockIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_JORNADAS_ESCALAS"],
    },

    {
      label: "Regimes de Jornada",
      description: "Tratamento adequado para cada vínculo funcional.",
      href: "/gestao/solicitacoes",
      icon: <BriefcaseBusinessIcon className="w-5" />,
      requireAny: ["GESTOR_COMPENSACOES_EQUIPE"],
    },
    {
      label: "Cargos Isentos de Ponto",
      description: "Exceções configuradas com segurança normativa.",
      href: "/gestao/solicitacoes",
      icon: <BadgeCheckIcon className="w-5" />,
      requireAny: ["ADMINISTRADOR_CARGO_ISENTO_PONTO"],
    },
    {
      label: "Calendário Institucional",
      description: "Feriados, recessos e expedientes especiais sob controle.",
      href: "/gestao/solicitacoes",
      icon: <CalendarDaysIcon className="w-5" />,
      requireAny: ["GESTOR_RELATORIOS_EQUIPE"],
    },
    {
      label: "Recesso Forense",
      description: "Gestão completa dos ciclos anuais de recesso.",
      href: "/gestao/solicitacoes",
      icon: <CalendarCogIcon className="w-5" />,
      requireAny: ["GESTOR_RELATORIOS_EQUIPE"],
    },
    {
      label: "Portarias de Convocação",
      description: "Convocações registradas por servidor, data e modalidade.",
      href: "/gestao/solicitacoes",
      icon: <FileSignatureIcon className="w-5" />,
      requireAny: ["GESTOR_RELATORIOS_EQUIPE"],
    },
    {
      label: "Equipamentos de Ponto",
      description: "Relógios e totens gerenciados por unidade e organização.",
      href: "/gestao/solicitacoes",
      icon: <MonitorCogIcon className="w-5" />,
      requireAny: ["GESTOR_RELATORIOS_EQUIPE"],
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
