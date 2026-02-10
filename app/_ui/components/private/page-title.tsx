import type { Role } from "@/app/_kernel/lib/rbac/types";
import { filterAside } from "@/app/_kernel/lib/nav/filter";
import { AsideConfig } from "@/app/_kernel/lib/nav/types";
import { Clock } from "lucide-react";

// export function PageTitle({ title, icon: Icon }: PageTitleProps) {
export function PageTitle({
  config,
  role,
}: {
  config: AsideConfig;
  role: Role;
}) {
  const filtered = filterAside(config, role);
  return (
    <div className="flex items-center justify-between rounded-xl bg-linear-to-r from-[#002F6C] to-[#007A33] px-4 py-3 text-white">
      <div className="flex items-center gap-2">
        {filtered.title && (
          <div className="flex items-center px-2 gap-1 py-0 text-base text-white font-semibold uppercase">
            {/* Titulo do Menu */}

            {filtered.icon ? (
              <span className="text-base">{filtered.icon}</span>
            ) : null}
            <span className="text-xl/none font-semibold">{filtered.title}</span>
          </div>
        )}
      </div>
    </div>
  );
}
