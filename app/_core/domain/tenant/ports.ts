import { TenantDTO } from "@/app/(private)/dashboard/admin/tenant/lib/definition";
import { TenantProps } from "./entities";

export interface TenantRepository {
  create(data: Omit<TenantProps, "id">): Promise<TenantProps>;
  find(id: string): Promise<TenantProps>;
  findByExternalSarhId(externalSarhId: string): Promise<TenantProps | null>;
  listAll(
    search: string,
    page: number,
    limit: number,
  ): Promise<{
    data: TenantDTO[] | null;
    count: number;
    currentPage: number;
    totalPage: number;
  }>;
}
