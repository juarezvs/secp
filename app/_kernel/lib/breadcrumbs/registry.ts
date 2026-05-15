// src/lib/breadcrumbs/registry.ts
import type { BreadcrumbRoute } from "./types";

export const BREADCRUMB_ROUTES: BreadcrumbRoute[] = [
  // servidor
  { pattern: "/servidor/dashboard", label: "Dashboard" },
  { pattern: "/servidor/registrar-ponto", label: "Registrar Ponto" },
  { pattern: "/servidor/espelho", label: "Espelho de Ponto" },
  { pattern: "/servidor/banco-horas", label: "Banco de Horas" },
  { pattern: "/servidor/justificativa", label: "Justificativa" },
  { pattern: "/servidor/compensacoes", label: "Compensações" },
  { pattern: "/servidor/recesso", label: "Recesso Forense" },
  { pattern: "/servidor/notificacoes", label: "Notificações" },
  { pattern: "/servidor/perfil", label: "Meu Perfil" },
  // gestor
  { pattern: "/gestor/dashboard", label: "Dashboard da Equipe" },
  { pattern: "/gestor/equipe", label: "Equipe" },
  { pattern: "/gestor/frequencia", label: "Frequência da Unidade" },
  { pattern: "/gestor/justificativas", label: "Justificativas da Equipe" },
  { pattern: "/gestor/compensacoes", label: "Compensações da Equipe" },
  { pattern: "/gestor/banco-horas", label: "Banco de Horas da Equipe" },
  { pattern: "/gestor/homologacoes", label: "Homologações" },
  { pattern: "/gestor/recesso", label: "Recesso Forense" },
  { pattern: "/gestor/relatorios", label: "Relatórios da Unidade" },
  { pattern: "/gestor/Pendências", label: "Pendências" },
  {
    pattern: "/dashboard/admin/employee/[id]",
    label: ({ params }) => `Servidor ${params.id}`, // ou "Detalhes do Funcionário"
  },

  {
    pattern: "/dashboard/admin/tenant/[id]",
    label: ({ params }) => `Unidade ${params.id}`,
  },
  { pattern: "/dashboard/admin/tenant/unidades", label: "Unidades" },
];
