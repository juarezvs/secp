import type { ReactNode } from "react";
import { Header } from "./Header";
import { Breadcrumbs } from "./Breadcrumbs";
import { PageTitle } from "./PageTitle";

export function PrivateShell(props: {
  title: string;
  icon?: ReactNode;
  aside: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6">
        <div className="space-y-3">
          <Breadcrumbs />
          <PageTitle title={props.title} icon={props.icon} />
          <div className="flex flex-col gap-4 md:flex-row">
            {props.aside}

            <section className="min-w-0 flex-1">
              <div className="rounded-xl border bg-white p-4">
                {props.children}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
