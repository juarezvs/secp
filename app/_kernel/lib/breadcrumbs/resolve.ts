// src/lib/breadcrumbs/resolve.ts
import { BREADCRUMB_ROUTES } from "./registry";
import type { CrumbLabel } from "./types";

function splitPath(p: string) {
  return p.split("/").filter(Boolean);
}

function isParam(seg: string) {
  return seg.startsWith("[") && seg.endsWith("]");
}

function paramName(seg: string) {
  return seg.slice(1, -1);
}

/**
 * Tenta casar um pathname (ex: /admin/funcionarios/123)
 * com um pattern (ex: /admin/funcionarios/[id]) e extrair params.
 */
export function matchPattern(
  pattern: string,
  pathname: string,
): null | { params: Record<string, string> } {
  const pSegs = splitPath(pattern);
  const sSegs = splitPath(pathname);

  if (pSegs.length !== sSegs.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < pSegs.length; i++) {
    const p = pSegs[i];
    const s = sSegs[i];

    if (isParam(p)) {
      params[paramName(p)] = decodeURIComponent(s);
      continue;
    }
    if (p !== s) return null;
  }
  return { params };
}

/**
 * Encontra o melhor label para um "crumbPath" (caminho acumulado).
 * Ex: /admin/funcionarios/123
 */
export function resolveBreadcrumbLabel(crumbPath: string): string | null {
  // prioriza match exato (incluindo padrões dinâmicos)
  for (const r of BREADCRUMB_ROUTES) {
    const m = matchPattern(r.pattern, crumbPath);
    if (!m) continue;

    const label: CrumbLabel = r.label;
    if (typeof label === "string") return label;

    return label({ pathname: crumbPath, params: m.params });
  }
  return null;
}
