import { SectionTitle } from "@/app/_ui/components/private/section-title";
import Search from "@/app/_ui/components/shared/search";
import { fetchFilteredSahrTenant } from "../lib/tenant.action";
import Pagination from "@/app/_ui/components/shared/pagination";
import TenantSarhTable from "./_components/table";
export default async function DashboardPage(props: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  console.log("Execução Inicial", { query, currentPage });

  const response = await fetchFilteredSahrTenant(query, currentPage);
  const totalpages = response?.totalPage ?? 1;
  return (
    <section>
      <SectionTitle
        title="Importar do SARH"
        descripton="Consulte o órgãos direto do SARH e escolha quais serão importados."
      ></SectionTitle>
      <div className="mb-4">
        <Search placeholder="Informe a seção judiciária ..." />
      </div>

      <TenantSarhTable data={response?.data || []} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalpages} />
      </div>
    </section>
  );
}
