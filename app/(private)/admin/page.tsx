export default function Page() {
  return (
    <div className="flex items-center justify-between rounded-xl bg-linear-to-r from-[#002F6C] to-[#007A33] px-4 py-3 text-white">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
        <span className="text-sm/none font-medium">Painel Executivo</span>
      </div>
      <span className="text-xs text-white/80">SECP</span>
    </div>
  );
}
