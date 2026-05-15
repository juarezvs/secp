import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ClockIcon, FileTextIcon, FilterIcon } from "lucide-react";
import { ServidorMiniCard } from "./_components/servidor-mini-card";
import { ChartBancoHorasServidor } from "./_components/chart-banco-horas-servidor";
import { ExportPdfButton } from "./_components/export-pdf-button";

interface RegistroPonto {
  data: string;
  diaSemana: string;
  entrada1: string;
  saida1: string;
  entrada2: string;
  saida2: string;
  totalHoras: string;
  situacao: "VALIDADO" | "PENDENTE" | "OCORRENCIA";
  ocorrencia?: string;
}

const registrosExemplo: RegistroPonto[] = [
  {
    data: "31/05",
    diaSemana: "Domingo",
    entrada1: "-:-",
    saida1: "-:-",
    entrada2: "-:-",
    saida2: "-:-",
    totalHoras: "-:-",
    situacao: "OCORRENCIA",
    ocorrencia: "Saída não registrada, aguardar validação",
  },
  {
    data: "30/05",
    diaSemana: "Sábado",
    entrada1: "-:-",
    saida1: "-:-",
    entrada2: "-:-",
    saida2: "-:-",
    totalHoras: "-:-",
    situacao: "VALIDADO",
    ocorrencia: "Saída não registrada, aguardar validação",
  },
  {
    data: "29/05",
    diaSemana: "Sexta",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "28/05",
    diaSemana: "Quinta",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "27/05",
    diaSemana: "Quarta",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "26/05",
    diaSemana: "Terça",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "25/05",
    diaSemana: "Segunda",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "24/05",
    diaSemana: "Domingo",
    entrada1: "-:-",
    saida1: "-:-",
    entrada2: "-:-",
    saida2: "-:-",
    totalHoras: "-:-",
    situacao: "VALIDADO",
    ocorrencia: "Saída não registrada, aguardar validação",
  },
  {
    data: "23/05",
    diaSemana: "Sábado",
    entrada1: "-:-",
    saida1: "-:-",
    entrada2: "-:-",
    saida2: "-:-",
    totalHoras: "-:-",
    situacao: "VALIDADO",
    ocorrencia: "Saída não registrada, aguardar validação",
  },
  {
    data: "22/05",
    diaSemana: "Sexta",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "21/05",
    diaSemana: "Quinta",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "20/05",
    diaSemana: "Quarta",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "19/05",
    diaSemana: "Terça",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "18/05",
    diaSemana: "Segunda",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "17/05",
    diaSemana: "Domingo",
    entrada1: "-:-",
    saida1: "-:-",
    entrada2: "-:-",
    saida2: "-:-",
    totalHoras: "-:-",
    situacao: "VALIDADO",
    ocorrencia: "Saída não registrada, aguardar validação",
  },
  {
    data: "16/05",
    diaSemana: "Sábado",
    entrada1: "-:-",
    saida1: "-:-",
    entrada2: "-:-",
    saida2: "-:-",
    totalHoras: "-:-",
    situacao: "VALIDADO",
    ocorrencia: "Saída não registrada, aguardar validação",
  },
  {
    data: "15/05",
    diaSemana: "Sexta",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "14/05",
    diaSemana: "Quinta",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "13/05",
    diaSemana: "Quarta",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "12/05",
    diaSemana: "Terça",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "11/05",
    diaSemana: "Segunda",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "10/05",
    diaSemana: "Domingo",
    entrada1: "-:-",
    saida1: "-:-",
    entrada2: "-:-",
    saida2: "-:-",
    totalHoras: "-:-",
    situacao: "VALIDADO",
    ocorrencia: "Saída não registrada, aguardar validação",
  },
  {
    data: "09/05",
    diaSemana: "Sábado",
    entrada1: "-:-",
    saida1: "-:-",
    entrada2: "-:-",
    saida2: "-:-",
    totalHoras: "-:-",
    situacao: "VALIDADO",
    ocorrencia: "Saída não registrada, aguardar validação",
  },
  {
    data: "08/05",
    diaSemana: "Sexta",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "07/05",
    diaSemana: "Quinta",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "06/05",
    diaSemana: "Quarta",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "05/05",
    diaSemana: "Terça",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
  {
    data: "04/05",
    diaSemana: "Segunda",
    entrada1: "08:02",
    saida1: "12:05",
    entrada2: "13:10",
    saida2: "17:15",
    totalHoras: "08:08",
    situacao: "VALIDADO",
  },
];

export default async function ServerDashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="flex flex-col gap-3  bg-slate-50 min-h-screen">
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Coluna 1: Filtros e Tabela (Span 9) */}
        <div className="xl:col-span-9 flex flex-col gap-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          {/* Cabeçalho Operacional: Flexbox para alinhamento unidimensional */}
          <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="date"
                className="px-3 py-2 border rounded-md text-sm text-slate-600 focus:ring-2 focus:ring-sky-500 outline-none"
              />
              <span className="text-slate-400 font-medium">até</span>
              <input
                type="date"
                className="px-3 py-2 border rounded-md text-sm text-slate-600 focus:ring-2 focus:ring-sky-500 outline-none"
              />
              <select className="px-3 py-2 border rounded-md text-sm text-slate-600 focus:ring-2 focus:ring-sky-500 outline-none">
                <option value="todos">Todas Situações</option>
                <option value="pendente">Pendente</option>
              </select>
            </div>
            <ExportPdfButton
              dados={registrosExemplo}
              filename={`espelho-ponto-${new Date().getMonth() + 1}.pdf`}
            />
          </header>

          {/* Tabela de Espelho de Ponto (Responsive Container) */}
          <div id="espelho-ponto-impressao" className="overflow-x-auto">
            <table className="w-full border-collapse hidden sm:table">
              <thead>
                {/* Primeira Linha do Cabeçalho: Agrupamento */}
                <tr className="bg-slate-50 text-slate-600 text-xs border-b border-slate-200">
                  <th className="px-4 py-3 text-left font-semibold" rowSpan={2}>
                    Data / Dia
                  </th>
                  {/* Coluna Mesclada (colSpan 4) */}
                  <th
                    className="px-4 py-2 text-center font-bold border-x border-slate-200 bg-slate-100/50"
                    colSpan={4}
                  >
                    Marcações de Ponto
                  </th>
                  <th
                    className="px-4 py-3 text-center font-semibold"
                    rowSpan={2}
                  >
                    Horas Trabalhadas
                  </th>
                  <th
                    className="px-4 py-3 text-center font-semibold"
                    rowSpan={2}
                  >
                    Situação
                  </th>
                  <th className="px-4 py-3 text-left font-semibold" rowSpan={2}>
                    Ocorrências
                  </th>
                </tr>
                {/* Segunda Linha do Cabeçalho: Subcolunas */}
                <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase border-b border-slate-200">
                  <th className="px-2 py-2 text-center border-l border-slate-200 w-20">
                    Ent. 1
                  </th>
                  <th className="px-2 py-2 text-center w-20">Sai. 1</th>
                  <th className="px-2 py-2 text-center w-20">Ent. 2</th>
                  <th className="px-2 py-2 text-center border-r border-slate-200 w-20">
                    Sai. 2
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {/* Exemplo de Linha de Dados */}
                {registrosExemplo.map((registro, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-4 py-2 font-medium text-slate-700 whitespace-nowrap">
                      {registro.data}{" "}
                      <span className="text-slate-400 font-normal ml-1 sm:text-green-500 md:text-red-500 lg:text-sky-500 xl:text-yellow-500">
                        {registro.diaSemana}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-center text-slate-600 tabular-nums">
                      {registro.entrada1}
                    </td>
                    <td className="px-2 py-2 text-center text-slate-600 tabular-nums">
                      {registro.saida1}
                    </td>
                    <td className="px-2 py-2 text-center text-slate-600 tabular-nums">
                      {registro.entrada2}
                    </td>
                    <td className="px-2 py-2 text-center text-slate-600 tabular-nums">
                      {registro.saida2}
                    </td>
                    <td className="px-4 py-2 text-center font-semibold text-slate-900 tabular-nums">
                      {registro.totalHoras}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <StatusBadge type={registro.situacao} />
                    </td>
                    <td className="px-4 py-2 text-slate-400 italic text-xs">
                      {registro.ocorrencia || "___"}{" "}
                    </td>
                  </tr>
                ))}
                {/* Linhas adicionais podem ser renderizadas aqui */}
              </tbody>
            </table>
            <div className="grid grid-cols-1 gap-4 sm:hidden">
              {registrosExemplo.map((registro, index) => (
                <div
                  key={`card-${index}`}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col gap-3 shadow-sm"
                >
                  {/* Linha do Topo do Card */}
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <div className="text-sm font-bold text-slate-700">
                      {registro.data}{" "}
                      <span className="text-xs font-normal text-slate-500">
                        ({registro.diaSemana})
                      </span>
                    </div>
                    <StatusBadge type={registro.situacao} />
                  </div>

                  {/* Grid de Marcações internas */}
                  <div className="grid grid-cols-4 gap-1 text-center bg-white p-2 rounded border border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-semibold text-slate-400">
                        Ent. 1
                      </span>
                      <span className="text-xs font-medium text-slate-600 tabular-nums">
                        {registro.entrada1}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-semibold text-slate-400">
                        Sai. 1
                      </span>
                      <span className="text-xs font-medium text-slate-600 tabular-nums">
                        {registro.saida1}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-semibold text-slate-400">
                        Ent. 2
                      </span>
                      <span className="text-xs font-medium text-slate-600 tabular-nums">
                        {registro.entrada2}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-semibold text-slate-400">
                        Sai. 2
                      </span>
                      <span className="text-xs font-medium text-slate-600 tabular-nums">
                        {registro.saida2}
                      </span>
                    </div>
                  </div>

                  {/* Informações de Horas Totais e Ocorrências */}
                  <div className="flex flex-col gap-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">
                        Horas Trabalhadas:
                      </span>
                      <span className="font-bold text-slate-900 tabular-nums">
                        {registro.totalHoras}
                      </span>
                    </div>
                    {registro.ocorrencia && (
                      <div className="mt-1 bg-amber-50 text-amber-800 border border-amber-100 p-2 rounded text-[11px] italic">
                        <strong className="not-italic block font-semibold mb-0.5">
                          Ocorrência:
                        </strong>
                        {registro.ocorrencia}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna 2: Cards de Apoio (Span 3) */}
        <aside className="xl:col-span-3 flex flex-col gap-6">
          <div className="xl:col-span-8 flex flex-col gap-4 border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Resumo do Mês
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
              {/* Renderização de 4 MiniCards via map para manter o DRY */}
              <ServidorMiniCard
                title="Dias Trabalhados"
                value="19"
                icon={<ClockIcon />}
                iconBgColor="bg-sky-500"
                subTitle="de 22 dias úteis"
              />
              <ServidorMiniCard
                title="Horas Trabalhadas"
                value="153h 43m"
                icon={<ClockIcon />}
                iconBgColor="bg-green-500"
                subTitle="Total do mês"
              />
              {/* <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm"> */}
              <ServidorMiniCard
                title="Horas esperadas"
                value="176h 00m"
                icon={<ClockIcon />}
                iconBgColor="bg-purple-500"
                subTitle="Carga horária mensal"
              />

              <ServidorMiniCard
                title="Saldo do mês"
                value="-22h 18m"
                icon={<ClockIcon />}
                iconBgColor="bg-orange-500"
                subTitle="Abaixo do esperado"
              />

              {/* <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <ServidorMiniCard
                title="Horas esperadas"
                value="176h 00m"
                icon={<ClockIcon />}
                iconBgColor="bg-purple-500"
                subTitle="Carga horária mensal"
              />
            </div> */}
              {/* <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <ServidorMiniCard
                title="Saldo do mês"
                value="-22h 18m"
                icon={<ClockIcon />}
                iconBgColor="bg-orange-500"
                subTitle="Abaixo do esperado"
              />
            </div> */}
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm min-h-[180px]">
            <h3 className="font-bold text-slate-800 mb-2">Resumo Anual</h3>
            <p className="text-sm text-slate-500 italic">
              Visualização consolidada de saldos.
            </p>
            <ChartBancoHorasServidor />
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-xl min-h-[180px] text-white">
            <h3 className="font-bold mb-2">Alertas de Gestão</h3>
            <p className="text-sm text-slate-400">
              Notificações automáticas do sistema.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
function StatusBadge({
  type,
}: {
  type: "VALIDADO" | "PENDENTE" | "OCORRENCIA";
}) {
  const styles = {
    VALIDADO: "bg-emerald-100 text-emerald-700",
    PENDENTE: "bg-amber-100 text-amber-700",
    OCORRENCIA: "bg-red-100 text-red-700 ",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${styles[type]}`}
    >
      {type}
    </span>
  );
}
