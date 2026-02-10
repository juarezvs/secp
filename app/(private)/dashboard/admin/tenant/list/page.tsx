import { SectionTitle } from "@/app/_ui/components/private/section-title";
import Search from "@/app/_ui/components/shared/search";
import { fetchFilteredTenant } from "../lib/tenant.action"; 
import Pagination from "@/app/_ui/components/shared/pagination";
import TenantTable from "./_components/table";
export default async function DashboardPage(props: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const response = await fetchFilteredTenant(query, currentPage);
  const totalpages = response?.totalPage ?? 1;
  return (
    <section>
      <SectionTitle
        title="Seção Judiciária"
        descripton="Seções judicárias disponíveis no SECP."
      ></SectionTitle>
      <div className="mb-4">
        <Search placeholder="Informe a seção judiciária ..." />
      </div>

      <TenantTable data={response?.data || []} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalpages} />
      </div>
    </section>
  );
}
