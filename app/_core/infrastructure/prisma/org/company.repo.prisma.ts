import "server-only";
import { prisma } from "@/app/_kernel/db/prisma/client";
import { CompanyRepository } from "@/app/_core/domain/org/ports";

export const CompanyRepoPrisma: CompanyRepository = {
  async create(data) {
    const row = await prisma.company.create({ data });
    return { id: row.id, code: row.code, name: row.name };
  },
  async list() {
    const rows = await prisma.company.findMany({ orderBy: { name: "asc" } });
    return rows.map((r) => ({ id: r.id, code: r.code, name: r.name }));
  },
};
