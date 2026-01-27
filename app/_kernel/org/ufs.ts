import "server-only";

export const SUPPORTED_UFS = ["AM", "RR", "AP", "AC", "RO"] as const;
export type SupportedUf = (typeof SUPPORTED_UFS)[number];

export function assertSupportedUf(uf: string): SupportedUf {
  const u = uf.toUpperCase();
  if (!(SUPPORTED_UFS as readonly string[]).includes(u))
    throw new Error("UF não suportada");
  return u as SupportedUf;
}
