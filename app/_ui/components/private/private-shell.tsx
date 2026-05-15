import type { ElementType, ReactNode } from "react";
import { Header } from "./header";
import { Breadcrumbs } from "./breadcrumbs";
import { PageTitle } from "./page-title";
import { Container } from "lucide-react";

type PrivateShellProps = {
  pagetitle: ReactNode;
  icon?: ElementType;
  description?: string;
  aside: ReactNode;
  children: ReactNode;
};

export function PrivateShell({ children }: PrivateShellProps) {
  return <div>{children}</div>;
}
