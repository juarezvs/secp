"use server";

import { TenantRepoPrisma } from "@/app/_core/infrastructure/prisma/tenant/tenant.repo.prisma";

export async function createTenantAction(data: {
  name: string;
  nickname: string;
}) {
  return await TenantRepoPrisma.create({
    active: true,
    ...data,
  });
}
