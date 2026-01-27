// src/lib/breadcrumbs/registry.ts
import type { BreadcrumbRoute } from "./types";

export const BREADCRUMB_ROUTES: BreadcrumbRoute[] = [
  { pattern: "/dashboard", label: "Painel" },

  // Ponto
  { pattern: "/timecard", label: "Meu ponto" },
  { pattern: "/timecard/report", label: "Espelho de ponto" },
  { pattern: "/timecard/record", label: "Marcações" },

  // Gestão
  { pattern: "/gestao", label: "Gestão" },
  { pattern: "/gestao/equipe", label: "Equipe" },
  { pattern: "/gestao/solicitacoes", label: "Aprovar Solicitações" },
  { pattern: "/gestao/relatorios", label: "Relatórios" },
  { pattern: "/gestao/relatorios/horas", label: "Horas & Saldo" },
  { pattern: "/gestao/relatorios/inconsistencias", label: "Inconsistências" },
  { pattern: "/gestao/relatorios/exportar", label: "Exportar" },

  // Admin
  { pattern: "/admin", label: "Administração" },

  { pattern: "/admin/funcionarios", label: "Funcionários" },
  { pattern: "/admin/funcionarios/new", label: "Novo Funcionário" },
  {
    pattern: "/admin/funcionarios/[id]",
    label: ({ params }) => `Funcionário ${params.id}`, // ou "Detalhes do Funcionário"
  },
  { pattern: "/admin/funcionarios/importar", label: "Importar do SARH" },

  { pattern: "/admin/clocks", label: "Relógios" },
  { pattern: "/admin/clocks/new", label: "Novo Relógio" },
  { pattern: "/admin/clocks/maintenance", label: "Manutenção" },

  { pattern: "/admin/afd", label: "AFD / Importações" },
  { pattern: "/admin/afd/importar", label: "Importar AFD" },
  { pattern: "/admin/afd/processar", label: "Processar AFD" },
  { pattern: "/admin/afd/historico", label: "Histórico de Importações" },

  { pattern: "/admin/escalas", label: "Escalas & Jornadas" },
  { pattern: "/admin/escalas/jornadas", label: "Jornadas" },
  { pattern: "/admin/escalas/escalas", label: "Escalas" },
  { pattern: "/admin/escalas/regras", label: "Regras" },

  { pattern: "/admin/parametros", label: "Parâmetros" },
  { pattern: "/admin/parametros/feriados", label: "Feriados" },
  { pattern: "/admin/parametros/tolerancias", label: "Tolerâncias" },
  { pattern: "/admin/parametros/fechamento", label: "Fechamento" },

  { pattern: "/admin/auditoria", label: "Auditoria" },
  { pattern: "/admin/auditoria/ponto", label: "Auditoria de Ponto" },
  { pattern: "/admin/auditoria/admin", label: "Auditoria Administrativa" },

  // Master
  { pattern: "/admin/permissoes", label: "Permissões" },
  { pattern: "/admin/permissoes/perfis", label: "Perfis" },
  { pattern: "/admin/permissoes/usuarios", label: "Usuários" },
  { pattern: "/admin/permissoes/auditoria", label: "Auditoria de Acesso" },

  { pattern: "/admin/tenant", label: "Empresa / Unidade" },
  { pattern: "/admin/tenant/switch", label: "Trocar Unidade" },
  { pattern: "/admin/tenant/empresas", label: "Empresas" },
  { pattern: "/admin/tenant/unidades", label: "Unidades" },
];
