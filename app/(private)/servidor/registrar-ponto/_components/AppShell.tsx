import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface AppShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function AppShell({
  title,
  subtitle,
  children,
  action,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-backgroundface flex flex-col">
      <div className="absolute inset-x-0 top-0 h-64 gradient-glowface pointer-events-none" />
      <header className="relative px-5 pt-8 pb-4 max-w-md w-full mx-auto">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foregroundface mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {action}
        </div>
      </header>
      <main className="relative flex-1 pb-24 max-w-md w-full mx-auto px-5">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
