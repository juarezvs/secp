// src/components/private/PageTitle.tsx
export function PageTitle(props: { title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-linear-to-r from-[#002F6C] to-[#007A33] px-4 py-3 text-white">
      <div className="flex items-center gap-2">
        {props.icon ? <span className="text-base">{props.icon}</span> : null}
        <span className="text-xl/none font-semibold">{props.title}</span>
      </div>
    </div>
  );
}
