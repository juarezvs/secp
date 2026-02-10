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
    <Link href={href ? href : ""} className="w-min-50">
      <article className="group h-35 w-min-50 rounded-2xl border border-zinc-200 cursor-pointer bg-white p-4 shadow-sm transition hover:border-zinc-400 hover:shadow-md hover:bg-[#DDE3EA] hover:scale-107 duration-150 ease-in-out">
        <div className="flex items-center w-min-50 gap-3 text-[#002F6C] w-fit">
          {icon && <span className="text-base w-min-50">{icon}</span>}
          <h3 className="text-lg font-semibold w-40  ">{title}</h3>
        </div>
        <p className="mt-2 w-min-50 text-sm text-zinc-600 line-clamp-4">{description}</p>
      </article>
    </Link>
  );
}
