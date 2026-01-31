"use client";
import Link from "next/link";

type CardProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
};

export function CardSecp({ title, description, icon, href }: CardProps) {
  return (
    <Link href={href ? href : ""}>
      <article className="group h-30 rounded-2xl border border-zinc-200 cursor-pointer bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex items-center gap-3 text-[#002F6C]">
          {icon && <span className="text-base">{icon}</span>}
          <h3 className="text-lg font-semibold  ">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-zinc-600 line-clamp-2">{description}</p>
      </article>
    </Link>
  );
}
