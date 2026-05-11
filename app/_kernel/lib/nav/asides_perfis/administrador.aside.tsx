import {
  HouseIcon,
  UsersIcon,
  CalendarClockIcon,
  FileClockIcon,
  NotepadTextIcon,
  NotebookPenIcon,
  FileTextIcon,
} from "lucide-react";
import { AsideConfig } from "../types";

export const ADMINISTRADOR_ASIDE: AsideConfig = {
  title: "Dashboard",
  icon: <HouseIcon className="w-6 h-6" />,

  items: [
    {
      label: "Minha equipe",
      icon: <UsersIcon className="w-5" />,
      href: "/gestao/solicitacoes",
      requireAny: ["GESTOR_MINHA_EQUIPE"],
    },
    {
      label: "Registro de ponto",
      href: "/gestao/solicitacoes",
      icon: <CalendarClockIcon className="w-5" />,
      requireAny: ["GESTOR_ESPELHO_PONTO_EQUIPE"],
    },
    {
      label: "Banco de horas",
      href: "/gestao/solicitacoes",
      icon: <FileClockIcon className="w-5" />,
      requireAny: ["GESTOR_BANCO_HORAS_EQUIPE"],
    },
    {
      label: "Justificativas",
      href: "/gestao/solicitacoes",
      icon: <NotepadTextIcon className="w-5" />,
      requireAny: ["GESTOR_JUSTIFICATIVA_EQUIPE"],
    },
    {
      label: "Solicitações",
      href: "/gestao/solicitacoes",
      icon: <NotebookPenIcon className="w-5" />,
      requireAny: ["GESTOR_SOLICITACOES_EQUIPE"],
    },
    {
      label: "Compensações",
      href: "/gestao/solicitacoes",
      icon: <NotebookPenIcon className="w-5" />,
      requireAny: ["GESTOR_COMPENSACOES_EQUIPE"],
    },
    {
      label: "Relatórios",
      href: "/gestao/solicitacoes",
      icon: <FileTextIcon className="w-5" />,
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
