import "server-only";
import { prisma } from "@/app/_kernel/db/prisma/client";
import { EmployeeRepository } from "@/app/_core/domain/people/ports";

export const EmployeeRepoPrisma: EmployeeRepository = {
  async create(data) {
    const row = await prisma.employee.create({ data });
    return row;
  },
  async listByCompany(companyId) {
    return prisma.employee.findMany({
      where: { companyId },
      orderBy: { name: "asc" },
    });
  },
};
