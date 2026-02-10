// src/lib/breadcrumbs/registry.ts
import type { BreadcrumbRoute } from "./types";

export const BREADCRUMB_ROUTES: BreadcrumbRoute[] = [
  { pattern: "/dashboard", label: "Painel" },

  // servidor
  { pattern: "/dashboard/employee", label: "Servidor" },
  { pattern: "/dashboard/employee/timecard", label: "Frequência" },
  { pattern: "/dashboard/employee/timecard/report", label: "Espelho de ponto" },
  {
    pattern: "/dashboard/employee/timecard/record",
    label: "Meu ponto",
  },

  // Gestão
  { pattern: "/gestao", label: "Gestão" },
  { pattern: "/gestao/equipe", label: "Equipe" },
  { pattern: "/gestao/solicitacoes", label: "Aprovar Solicitações" },
  { pattern: "/gestao/relatorios", label: "Relatórios" },
  { pattern: "/gestao/relatorios/horas", label: "Horas & Saldo" },
  { pattern: "/gestao/relatorios/inconsistencias", label: "Inconsistências" },
  { pattern: "/gestao/relatorios/exportar", label: "Exportar" },

  // Admin
  { pattern: "/dashboard/admin", label: "Administração" },

  { pattern: "/dashboard/admin/employee", label: "Servidores" },
  { pattern: "/dashboard/admin/employee/new", label: "Novo Servidor" },
  {
    pattern: "/dashboard/admin/employee/import",
    label: "Importar servidor do SARH",
  },
  { pattern: "/dashboard/admin/employee/list", label: "Consultar" },
  {
    pattern: "/dashboard/admin/employee/sync",
    label: "Sincronizar dados do SARH",
  },
  {
    pattern: "/dashboard/admin/employee/[id]",
    label: ({ params }) => `Servidor ${params.id}`, // ou "Detalhes do Funcionário"
  },

  { pattern: "/dashboard/admin/clocks", label: "Relógios" },
  { pattern: "/dashboard/admin/clocks/new", label: "Novo Relógio" },
  { pattern: "/dashboard/admin/clocks/maintenance", label: "Manutenção" },

  { pattern: "/dashboard/admin/afd", label: "AFD / Importações" },
  { pattern: "/dashboard/admin/afd/importar", label: "Importar AFD" },
  { pattern: "/dashboard/admin/afd/processar", label: "Processar AFD" },
  {
    pattern: "/dashboard/admin/afd/historico",
    label: "Histórico de Importações",
  },

  { pattern: "/dashboard/admin/escalas", label: "Escalas & Jornadas" },
  { pattern: "/dashboard/admin/escalas/jornadas", label: "Jornadas" },
  { pattern: "/dashboard/admin/escalas/escalas", label: "Escalas" },
  { pattern: "/dashboard/admin/escalas/regras", label: "Regras" },

  { pattern: "/dashboard/admin/parametros", label: "Parâmetros" },
  { pattern: "/dashboard/admin/parametros/feriados", label: "Feriados" },
  { pattern: "/dashboard/admin/parametros/tolerancias", label: "Tolerâncias" },
  { pattern: "/dashboard/admin/parametros/fechamento", label: "Fechamento" },

  { pattern: "/dashboard/admin/auditoria", label: "Auditoria" },
  { pattern: "/dashboard/admin/auditoria/ponto", label: "Auditoria de Ponto" },
  {
    pattern: "/dashboard/admin/auditoria/admin",
    label: "Auditoria Administrativa",
  },

  // Master
  { pattern: "/dashboard/admin/permissoes", label: "Permissões" },
  { pattern: "/dashboard/admin/permissoes/perfis", label: "Perfis" },
  { pattern: "/dashboard/admin/permissoes/usuarios", label: "Usuários" },
  {
    pattern: "/dashboard/admin/permissoes/auditoria",
    label: "Auditoria de Acesso",
  },

  { pattern: "/dashboard/admin/tenant", label: "Órgãos da Justiça" },
  { pattern: "/dashboard/admin/tenant/unit", label: "Subseção Judicária" },
  { pattern: "/dashboard/admin/tenant/switch", label: "Trocar Unidade" },
  { pattern: "/dashboard/admin/tenant/new", label: "Nova Unidade" },
  { pattern: "/dashboard/admin/tenant/list", label: "Seção Judiciária" },
  {
    pattern: "/dashboard/admin/tenant/import",
    label: "Importar do SARH",
  },
  {
    pattern: "/dashboard/admin/tenant/[id]",
    label: ({ params }) => `Unidade ${params.id}`,
  },
  { pattern: "/dashboard/admin/tenant/unidades", label: "Unidades" },
];
