// src/components/private/Breadcrumbs.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { resolveBreadcrumbLabel } from "@/app/_kernel/lib/breadcrumbs/resolve";

function labelizeFallback(seg: string) {
  return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const crumbs = parts.map((_, idx) => {
    const href = "/" + parts.slice(0, idx + 1).join("/");
    const label = resolveBreadcrumbLabel(href) ?? labelizeFallback(parts[idx]);
    return { href, label };
  });

  return (
    <div className="text-sm text-gray-700">
      <nav className="flex flex-wrap items-center gap-2">
        <Link href="/dashboard" className=" hover:underline">
          Início
        </Link>

        {crumbs.map((c) => (
          <span key={c.href} className="flex items-center gap-2">
            <span className="text-gray-400">/</span>
            <Link
              href={c.href}
              className="hover:underline hover:text-secp-blue "
            >
              {c.label}
            </Link>
          </span>
        ))}
      </nav>
    </div>
  );
}
