import { ElementType } from "react";

type PageTitleProps = {
  title: string;
  icon?: ElementType;
};

export function PageTitle({ title, icon: Icon }: PageTitleProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-linear-to-r from-[#002F6C] to-[#007A33] px-4 py-3 text-white">
      <div className="flex items-center gap-2">
        {Icon ? (
          <span className="text-base">
            <Icon className="w-6" />
          </span>
        ) : null}
        <span className="text-xl/none font-semibold">{title}</span>
      </div>
    </div>
  );
}
