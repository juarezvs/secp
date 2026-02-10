import { TenantRepoPrisma } from "@/app/_core/infrastructure/prisma/tenant/tenant.repo.prisma";
import { ResultSearchTenantProps } from "./definition";

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredSahrTenant(
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
  const data = (await res.json()) as ResultSearchTenantProps;

  return data;
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
  const data = filteredTenant as ResultSearchTenantProps;

  return data;
}
