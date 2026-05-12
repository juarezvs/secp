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
      description: "Gestão da frequência com visão imediata da unidade.",
      icon: <UsersIcon className="w-5" />,
      href: "/gestor/minha-equipe",
      requireAny: ["GESTOR_MINHA_EQUIPE"],
    },
    {
      label: "Homologação Mensal",
      description: "Validação formal, segura e rastreável da frequência.",

      href: "/gestor/registro-ponto",
      icon: <ClipboardCheckIcon className="w-5" />,
      requireAny: ["GESTOR_ESPELHO_PONTO_EQUIPE"],
    },
    {
      label: "Análise de Justificativas",
      description:
        "Decisões fundamentadas com histórico completo.",
      href: "/gestor/banco-horas",
      icon: <FileCheck2Icon className="w-5" />,
      requireAny: ["GESTOR_BANCO_HORAS_EQUIPE"],
    },
    {
      label: "Pendências da Equipe",
      description: "Priorize o que precisa de validação ou correção.",
      href: "/gestao/solicitacoes",
      icon: <ListTodoIcon className="w-5" />,
      requireAny: ["GESTOR_JUSTIFICATIVA_EQUIPE"],
    },
    {
      label: "Banco de Horas da Equipe",
      description: "SSaldos acompanhados com responsabilidade gerencial.",
      href: "/gestao/solicitacoes",
      icon: <GaugeIcon className="w-5" />,
      requireAny: ["GESTOR_SOLICITACOES_EQUIPE"],
    },
    {
      label: "Aprovação de Compensações",
      description: "Compensações autorizadas com controle e prazo.",
      href: "/gestao/solicitacoes",
      icon: <CalendarClockIcon className="w-5" />,
      requireAny: ["GESTOR_COMPENSACOES_EQUIPE"],
    },
    {
      label: "Frequência da Unidade",
      description: "Acompanhamento objetivo da jornada da equipe.",
      href: "/gestao/solicitacoes",
      icon: <BarChart3Icon className="w-5" />,
      requireAny: ["GESTOR_RELATORIOS_EQUIPE"],
    },
    {
      label: "Servidores Convocados no Recesso",
      description: "Controle especial do trabalho no período excepcional.",
      href: "/gestao/solicitacoes",
      icon: <CalendarPlusIcon className="w-5" />,
      requireAny: ["GESTOR_RELATORIOS_EQUIPE"],
    },
     {
      label: "Chefia Responsável no Recesso",
      description: "Homologação vinculada à autoridade correta.",
      href: "/gestao/solicitacoes",
      icon: <UserCheckIcon className="w-5" />,
      requireAny: ["GESTOR_RELATORIOS_EQUIPE"],
    },
     {
      label: "Delegação / Substituição",
      description: "Continuidade da gestão sem perda de controle.",
      href: "/gestao/solicitacoes",
      icon: <UserRoundCogIcon className="w-5" />,
      requireAny: ["GESTOR_RELATORIOS_EQUIPE"],
    },
     {
      label: "Relatórios da Equipe",
      description: "Indicadores para uma gestão funcional mais precisa.",
      href: "/gestao/solicitacoes",
      icon: <ChartNoAxesCombinedIcon className="w-5" />,
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
