// src/lib/breadcrumbs/types.ts
export type CrumbLabel =
  | string
  | ((ctx: { pathname: string; params: Record<string, string> }) => string);

export type BreadcrumbRoute = {
  pattern: string; // ex: "/admin/funcionarios", "/admin/funcionarios/[id]"
  label: CrumbLabel;
};
