import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/shadcn/card";
import { auth } from "@/auth";
import { ChevronRightIcon, ClockIcon, MenuIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { ChartBancoHorasServidor } from "./_components/chart-banco-horas-servidor";
import { ServidorMiniCard } from "./_components/servidor-mini-card";
import { ServidorInfoCard } from "./_components/servidor-info-card";

// src/app/(private)/dashboard/page.tsx
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols3 gap-2 ">
      <aside className="flex justify-between bg-white border border-slate-300 rounded-md gap-4 p-2">
        <div>
          <ServidorInfoCard
            name="Juarez de Vasconcelos da Silva"
            status="ativo"
            position="Técnico Judiciário - Apoio Especializado - Tecnologia da Informação"
            department="Diretor do Núcleo de Tecnologia da Informação"
            register="AM200401"
          />
        </div>

        <div className="gird-grid-cols-1 border border-slate-300 rounded-md p-4 flex flex-col gap-2">
          <div className="font-semibold">
            <p>Resumo do mês (Maio/2026)</p>
          </div>
          <div className="flex flex-row gap-2">
            <ServidorMiniCard
              title="Dias trabalhados"
              subTitle="de 22 dias úteis"
              value="19"
              icon={<ClockIcon />}
              iconBgColor="bg-sky-600"
            />
            <ServidorMiniCard
              title="Horas trabalhadas"
              value="153h 42m"
              subTitle="Total no mês"
              icon={<ClockIcon />}
              iconBgColor="bg-green-600"
            />
            <ServidorMiniCard
              title="Horas Trabalhadas"
              value="176h 00m"
              subTitle="Carga horária mensal"
              icon={<ClockIcon />}
              iconBgColor="bg-purple-600"
            />
            <ServidorMiniCard
              title="Saldo do Mês"
              value="-22h 18m"
              valueTextColor="text-red-500"
              subTitle="Abaixo do esperado"
              icon={<ClockIcon />}
              iconBgColor="bg-orange-500"
            />
          </div>
        </div>

        {/* Lista de pendências aqui */}
      </aside>
      <div className="xl:col-span-2">
        <ChartBancoHorasServidor />
      </div>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {/* <HistoryTable /> */}
      </section>
    </div>
  );
}
