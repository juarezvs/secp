// src/components/private/PageTitle.tsx
export function SectionTitle(props: {
  title: string;
  descripton?: string;
  icon?: React.ReactNode;
}) {
  return (
    // <div className="flex items-center justify-between rounded-xl bg-linear-to-r from-[#002F6C] to-[#007A33] px-4 py-3 text-white">
    <div className="flex flex-col justify-end border-b pb-0.5">
      <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-[#002F6C] md:text-3xl">
        {props.icon ? (
          <span className="flex items-center text-base">{props.icon}</span>
        ) : null}
        {props.title}
      </h2>
      {props.descripton && (
        <p className="mt-2 max-w-2xl text-zinc-700">{props.descripton}</p>
      )}
    </div>

    // </div>
  );
}
