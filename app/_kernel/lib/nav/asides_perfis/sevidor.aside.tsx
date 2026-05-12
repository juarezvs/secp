import { BellIcon, BellRingIcon, CalendarCheckIcon, CalendarDaysIcon, CalendarXIcon, ClockIcon, FileTextIcon, FingerprintIcon, GraduationCapIcon, MapPinCheckIcon, MessageSquareWarningIcon, PlaneIcon, ScanFaceIcon, TimerResetIcon } from "lucide-react";
import { AsideConfig } from "../types";

export const SERVIDOR_ASIDE: AsideConfig = {
  title: "Menu",

  items: [
    {
      label: "Meu Ponto",
      icon: <ClockIcon className="w-6 h-6" />,
      description: "Sua jornada, seus registros, seu controle.",
      href: "/servidor/meu-ponto",
      requireAny: ["SERVIDOR_MEU_PONTO"],
      // requireAny: ["PONTO_REGISTROS_VIEW"],
    },
    {
      label: "Registro de Ponto",
      icon: <FingerprintIcon className="w-6 h-6" />,
      description: "Marcação segura, rápida e integrada à sua rotina.",
      href: "/servidor/registro-ponto",
      requireAny: ["SERVIDOR_REGISTRO_PONTO"],
    },
    {
      label: "Registro Facial",
      icon: <ScanFaceIcon className="w-6 h-6" />,
      description:
        "Identificação ágil para uma frequência mais confiável.",
      href: "/servidor/espelho-ponto",
      requireAny: ["SERVIDOR_ESPELHO_PONTO"],
      // requireAny: ["PONTO_REGISTROS_VIEW"],
    },
    {
      label: "Espelho de Frequência",
      icon: <FileTextIcon className="w-6 h-6" />,
      description: "Transparência diária da sua vida funcional.",
      href: "/servidor/registro-ponto",
      requireAny: ["SERVIDOR_REGISTRO_PONTO"],
    },
    {
      label: "Banco de Horas",
      icon: <TimerResetIcon className="w-6 h-6" />,
      description: "Saldos claros para compensações seguras.",
      href: "/servidor/banco-horas",
      requireAny: ["SERVIDOR_BANCO_HORAS"],
    },
    {
      label: "Justificativas",
      icon: <MessageSquareWarningIcon className="w-6 h-6" />,
      description:
        "Regularize ocorrências com rastreabilidade.",
      href: "/servidor/justificativas",
      requireAny: ["SERVIDOR_JUSTIFICATIVA"],
    },
    {
      label: "Plano de Compensação",
      icon: <CalendarCheckIcon className="w-6 h-6" />,
      description: "Organize débitos dentro dos prazos normativos.",
      href: "/servidor/solicitacoes",
      requireAny: ["SERVIDOR_SOLICITACOES"],
    },
    {
      label: "Minhas Pendências",
      icon: <BellIcon className="w-6 h-6" />,
      description:
        "Tudo que exige sua atenção em um só lugar.",
      href: "/servidor/convocacoes",
      requireAny: ["SERVIDOR_RELATORIOS"],
    },
    {
      label: "Ausências e Afastamentos",
      icon: <CalendarXIcon className="w-6 h-6" />,
      description:
        "Registros funcionais tratados com clareza.",
      href: "/servidor/meus-dados",
      requireAny: ["SERVIDOR_BANCO_HORAS"],
    },
    {
      label: "Atividades Externas",
      icon: <MapPinCheckIcon className="w-6 h-6" />,
      description:
        "Trabalho externo documentado com segurança.",
      href: "/servidor/meus-dados",
      requireAny: ["SERVIDOR_BANCO_HORAS"],
    },
    {
      label: "Viagem a Serviço",
      icon: <PlaneIcon className="w-6 h-6" />,
      description:
        "Deslocamentos integrados à apuração da frequência.",
      href: "/servidor/meus-dados",
      requireAny: ["SERVIDOR_BANCO_HORAS"],
    },
     {
      label: "Capacitações",
      icon: <GraduationCapIcon className="w-6 h-6" />,
      description:
        "Formação registrada sem perda de controle funcional.",
      href: "/servidor/meus-dados",
      requireAny: ["SERVIDOR_BANCO_HORAS"],
    },
    {
      label: "Recesso Forense",
      icon: <CalendarDaysIcon className="w-6 h-6" />,
      description:
        "Convocações, folgas e pecúnia com transparência.",
      href: "/servidor/meus-dados",
      requireAny: ["SERVIDOR_BANCO_HORAS"],
    },
    {
      label: "Notificações",
      icon: <BellRingIcon className="w-6 h-6" />,
      description:
        "Alertas inteligentes para manter sua frequência regular.",
      href: "/servidor/meus-dados",
      requireAny: ["SERVIDOR_BANCO_HORAS"],
    },
  ],
};
