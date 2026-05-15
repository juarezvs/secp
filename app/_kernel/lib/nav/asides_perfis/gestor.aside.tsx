import {
  HouseIcon,
  UsersIcon,
  CalendarClockIcon,
  FileClockIcon,
  NotepadTextIcon,
  NotebookPenIcon,
  FileTextIcon,
  ClipboardCheckIcon,
  FileCheck2Icon,
  ListTodoIcon,
  GaugeIcon,
  BarChart3Icon,
  CalendarPlusIcon,
  UserCheckIcon,
  UserRoundCogIcon,
  ChartNoAxesCombinedIcon,
} from "lucide-react";
import { AsideConfig } from "../types";

export const GESTOR_ASIDE: AsideConfig = {
  title: "Dashboard",
  icon: <HouseIcon className="w-6 h-6" />,

  items: [
    {
      label: "Dashboard da Equipe",
      description: "Gestão imediata da frequência da equipe.",
      icon: <UsersIcon className="w-5" />,
      href: "/gestor/dashboard",
      requireAny: ["GESTOR_MINHA_EQUIPE"],
    },
    {
      label: "Equipe",
      description: "Acompanhe os servidores sob sua responsabilidade.",

      href: "/gestor/equipe",
      icon: <UserCheckIcon className="w-5" />,
      requireAny: ["GESTOR_ESPELHO_PONTO_EQUIPE"],
    },
    {
      label: "Frequência da Unidade",
      description:
        "Controle a frequência da unidade em tempo real.",
      href: "/gestor/frequencia",
      icon: <BarChart3Icon className="w-5" />,
      requireAny: ["GESTOR_BANCO_HORAS_EQUIPE"],
    },
    {
      label: "Justificativas da Equipe",
      description: "Decida justificativas com segurança e histórico.",
      href: "/gestor/justificativas",
      icon: <FileCheck2Icon className="w-5" />,
      requireAny: ["GESTOR_JUSTIFICATIVA_EQUIPE"],
    },
    {
      label: "Compensações da Equipe",
      description: "Autorize compensações com controle normativo.",
      href: "/gestor/compensacoes",
      icon: <CalendarClockIcon className="w-5" />,
      requireAny: ["GESTOR_SOLICITACOES_EQUIPE"],
    },
    {
      label: "Banco de Horas da Equipe",
      description: "Monitore os saldos da unidade.",
      href: "/gestor/banco-horas",
      icon: <GaugeIcon className="w-5" />,
      requireAny: ["GESTOR_COMPENSACOES_EQUIPE"],
    },
    {
      label: "Homologações",
      description: "Homologue a frequência mensal da equipe.",
      href: "/gestor/homologacoes",
      icon: <ClipboardCheckIcon className="w-5" />,
      requireAny: ["GESTOR_RELATORIOS_EQUIPE"],
    },
    {
      label: "Recesso Forense",
      description: "Gerencie a frequência no período excepcional.",
      href: "/gestor/recesso",
      icon: <CalendarPlusIcon className="w-5" />,
      requireAny: ["GESTOR_RELATORIOS_EQUIPE"],
    },
     {
      label: "Relatórios da Unidade",
      description: "Gere indicadores operacionais da equipe.",
      href: "/gestor/relatorios",
      icon: <ChartNoAxesCombinedIcon className="w-5" />,
      requireAny: ["GESTOR_RELATORIOS_EQUIPE"],
    },
     {
      label: "Pendências",
      description: "Continuidade da gestão sem perda de controle.",
      href: "/gestor/pendencias",
      icon: <ListTodoIcon className="w-5" />,
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
