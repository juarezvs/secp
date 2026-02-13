"use server";

import { TenantRepoPrisma } from "@/app/_core/infrastructure/prisma/tenant/tenant.repo.prisma";

export interface resultTenant {
  success: boolean;
  error: string | null;
  data: any;
}

export async function createTenantAction(data: {
  name: string;
  nickname: string;
  externalSarhId: string;
}): Promise<resultTenant> {
  const existingTenant = await TenantRepoPrisma.findByExternalSarhId(
    data.externalSarhId,
  );

  if (existingTenant) {
    return {
      success: false,
      error: `Seção Judiciária ${existingTenant.name} já importada. pulando creação.`,
      data: null,
    } as resultTenant;
  }

  return {
    success: true,
    error: null,
    data: await TenantRepoPrisma.create({
      name: data.name,
      nickname: data.nickname,
      active: true,
      externalSarhId: data.externalSarhId,
    }),
  } as resultTenant;
}
