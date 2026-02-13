import { TenantRepoPrisma } from "@/app/_core/infrastructure/prisma/tenant/tenant.repo.prisma";
import { ResultSearchTenantProps, TenantDTO } from "./definition";

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredSarhTenant(
  query: string,
  currentPage: number,
): Promise<ResultSearchTenantProps | null> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const perPage = offset > 0 && offset ? offset : ITEMS_PER_PAGE;

  const url = `http://sarh.api.am.trf1.gov.br/empresas/paginate/?nome=${query}&page=${currentPage}&limit=${perPage}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    return null;
  }
  const response = (await res.json()) as ResultSearchTenantProps;

  const tenants = response.data?.map((item) => ({
    id: String(item.id),
    idPai: item.idPai,
    descricao: item.descricao,
    sigla: item.sigla,
  }));
  // console.log("teste", {
  //   totalPages: response.totalPages,
  //   count: response.count,
  //   currentPage: response.currentPage,
  //   data: tenants ?? null,
  // });

  return {
    totalPages: response.totalPages,
    count: response.count,
    currentPage: response.currentPage,
    data: tenants ?? null,
  };
}

export async function fetchFilteredTenant(
  query: string,
  currentPage: number,
): Promise<ResultSearchTenantProps | null> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const perPage = offset > 0 && offset ? offset : ITEMS_PER_PAGE;

  const filteredTenant = await TenantRepoPrisma.listAll(
    query,
    currentPage,
    perPage,
  );

  if (!filteredTenant.data) {
    return null;
  }

  const tenants = filteredTenant.data?.map((item) => ({
    id: item.id,
    idPai: null,
    descricao: item.descricao,
    sigla: item.sigla,
  }));

  return {
    totalPages: filteredTenant.totalPage,
    count: filteredTenant.count,
    currentPage: filteredTenant.currentPage,
    data: tenants ?? null,
  };
}
