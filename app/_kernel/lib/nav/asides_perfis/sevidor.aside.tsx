import {
  BellRingIcon,
  CalendarCheckIcon,
  CalendarDaysIcon,
  CalendarXIcon,
  FileTextIcon,
  FingerprintIcon,
  LayoutDashboardIcon,
  MapPinCheckIcon,
  MessageSquareWarningIcon,
  TimerResetIcon,
  UserRoundIcon,
} from "lucide-react";
import { AsideConfig } from "../types";

export const SERVIDOR_ASIDE: AsideConfig = {
  title: "Menu",

  items: [
    {
      label: "Dashboard",
      icon: <LayoutDashboardIcon className="w-6 h-6" />,
      description: "Visão rápida da sua frequência funcional.",
      href: "/servidor/dashboard",
      requireAny: ["SERVIDOR_MEU_PONTO"],
      // requireAny: ["PONTO_REGISTROS_VIEW"],
    },
    {
      label: "Registrar Ponto",
      icon: <FingerprintIcon className="w-6 h-6" />,
      description: "Registre sua jornada com segurança e agilidade.",
      href: "/servidor/registrar-ponto",
      requireAny: ["SERVIDOR_MEU_PONTO"],
      // requireAny: ["PONTO_REGISTROS_VIEW"],
    },
    {
      label: "Meu Espelho",
      icon: <FileTextIcon className="w-6 h-6" />,
      description: "Acompanhe suas marcações e ocorrências.",
      href: "/servidor/espelho",
      requireAny: ["SERVIDOR_REGISTRO_PONTO"],
    },
    {
      label: "Banco de Horas",
      icon: <TimerResetIcon className="w-6 h-6" />,
      description: "Consulte seus saldos e compensações.",
      href: "/servidor/banco-horas",
      requireAny: ["SERVIDOR_ESPELHO_PONTO"],
      // requireAny: ["PONTO_REGISTROS_VIEW"],
    },

    {
      label: "Justificativas",
      icon: <MessageSquareWarningIcon className="w-6 h-6" />,
      description: "Regularize ocorrências de frequência.",
      href: "/servidor/justificativa",
      requireAny: ["SERVIDOR_JUSTIFICATIVA"],
    },
    {
      label: "Compensações",
      icon: <CalendarCheckIcon className="w-6 h-6" />,
      description: "Organize a compensação de horas pendentes.",
      href: "/servidor/compensacoes",
      requireAny: ["SERVIDOR_SOLICITACOES"],
    },
    {
      label: "Recesso Forense",
      icon: <CalendarDaysIcon className="w-6 h-6" />,
      description: "Acompanhe sua atuação no recesso.",
      href: "/servidor/recesso",
      requireAny: ["SERVIDOR_RELATORIOS"],
    },
    {
      label: "Notificações",
      icon: <BellRingIcon className="w-6 h-6" />,
      description: "Fique atento aos prazos e pendências.",
      href: "/servidor/notificacoes",
      requireAny: ["SERVIDOR_BANCO_HORAS"],
    },
    {
      label: "Meu Perfil",
      icon: <UserRoundIcon className="w-6 h-6" />,
      description: "Consulte seus dados funcionais no SECP.",
      href: "/servidor/perfil",
      requireAny: ["SERVIDOR_BANCO_HORAS"],
    },
  ],
};
