import type { ElementType, ReactNode } from "react";
import { Header } from "./Header";
import { Breadcrumbs } from "./Breadcrumbs";
import { PageTitle } from "./PageTitle";

type PrivateShellProps = {
  title: string;
  icon?: ElementType;
  description?: string;
  aside: ReactNode;
  children: ReactNode;
};

export function PrivateShell({
  title,
  icon,
  aside,
  children,
}: PrivateShellProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6">
        <div className="space-y-3">
          <Breadcrumbs />
          <PageTitle title={title} icon={icon} />
          <div className="flex flex-col gap-4 md:flex-row">
            {aside}

            <section className="min-w-0 flex-1">
              <div className="rounded-xl border bg-white p-4">{children}</div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
