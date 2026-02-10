import "server-only";
import { prisma } from "@/app/_kernel/db/prisma/client";
import { BranchRepository } from "@/app/_core/domain/org/ports";

export const BranchRepoPrisma: BranchRepository = {
  async create(data) {
    const row = await prisma.branch.create({ data });
    return {
      id: row.id,
      companyId: row.companyId,
      code: row.code,
      name: row.name,
      timezone: row.timezone,
    };
  },
};
