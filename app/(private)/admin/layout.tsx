// src/app/(private)/layout.tsx
import type { ReactNode } from "react";

export default function PrivateGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  // aqui você colocaria proteção de rota, providers, etc.
  return <>{children}</>;
}
