import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcn/card";

export const CardSecp = () => {
  return (
    <Card className="mx-auto w-full max-w-lg rounded-2xl border border-zinc-200 bg-white/90 p-4 shadow-2xl backdrop-blur">
      <CardHeader className="px-1 -mb-8 ">
        {/* <div className="absolute -inset-4 -z-10 blur-2xl [background:radial-gradient(20rem_12rem_at_70%_30%,rgba(0,122,51,0.18),transparent_60%)]" /> */}
        <CardTitle className="flex items-center justify-between rounded-xl bg-linear-to-r from-[#002F6C] to-[#007A33] px-4 py-3 mb-0 text-white">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            <span className="text-sm/none font-medium">Painel Executivo</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-1 -mb-8">
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="col-span-3 rounded-xl border border-zinc-200 p-4">
            <div className="text-sm text-zinc-500">Absenteísmo (30 dias)</div>
            <div className="mt-2 h-24 rounded-md bg-linear-to-t from-emerald-100 to-blue-100" />
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="text-xs text-zinc-500">Servidores</div>
            <div className="mt-2 text-2xl font-bold text-[#002F6C]">1.284</div>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="text-xs text-zinc-500">
              Órgãos da Justiça/Subseções
            </div>
            <div className="mt-2 text-2xl font-bold text-[#002F6C]">27</div>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="text-xs text-zinc-500">Pontos hoje</div>
            <div className="mt-2 text-2xl font-bold text-[#002F6C]">4.913</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between  border-t border-zinc-200 px-4  text-sm">
        <span className="text-zinc-600">Eventos pendentes de aprovação</span>
        <span className="font-semibold text-[#007A33]">112</span>
      </CardFooter>
    </Card>
  );
};
