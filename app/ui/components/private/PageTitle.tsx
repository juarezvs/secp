// src/components/private/PageTitle.tsx
export function PageTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-linear-to-r from-[#002F6C] to-[#007A33] px-4 py-3 text-white">
      <div className="flex items-center gap-2">
        <span className="text-xl/none font-semibold">{title}</span>
      </div>
    </div>
  );
}
