import "server-only";
import { prisma } from "@/app/_kernel/db/prisma/client";
import { TenantRepository } from "@/app/_core/domain/tenant/ports";
import { TenantProps } from "@/app/_core/domain/tenant/entities";
import { TenantDTO } from "@/app/(private)/dashboard/admin/tenant/lib/definition";

export const TenantRepoPrisma: TenantRepository = {
  async create(data: Omit<TenantProps, "id">) {
    const row = await prisma.tenant.create({
      data: {
        name: data.name,
        nickname: data.nickname,
        active: data.active,
        externalSarhId: data.externalSarhId,
      },
    });

    return {
      id: row.id,
      name: row.name,
      nickname: row.nickname,
      active: row.active,
      externalSarhId: row.externalSarhId,
    };
  },

  async find(id: string) {
    const row = await prisma.tenant.findUnique({
      where: {
        id: id,
      },
    });

    if (!row) {
      throw new Error("Seção Judiciária não encontrada");
    }

    return {
      id: row.id,
      name: row.name,
      nickname: row.nickname,
      active: row.active,
      externalSarhId: row.externalSarhId,
    };
  },

  async findByExternalSarhId(externalSarhId: string) {
    const row = await prisma.tenant.findUnique({
      where: {
        externalSarhId: externalSarhId,
      },
    });

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      name: row.name,
      nickname: row.nickname,
      active: row.active,
      externalSarhId: row.externalSarhId,
    };
  },

  async listAll(search: string = "", page: number = 1, limit: number = 10) {
    const currentPage = Math.max(1, page);
    const perPage = Math.max(1, limit);
    const skip = (currentPage - 1) * perPage;

    const [rows, total] = await prisma.$transaction([
      //Realiza consulta na base de dados e traz os dados filtrados de acordo com o termo Search
      prisma.tenant.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search ?? "",
                mode: "insensitive",
              },
            },
            {
              nickname: {
                contains: search ?? "",
                mode: "insensitive",
              },
            },
          ],
        },
        take: perPage,
        skip: skip,
        orderBy: { name: "asc" },
      }),
      // conta quantos foram filtrados.
      prisma.tenant.count({
        where: {
          name: {
            contains: search ?? "",
            mode: "insensitive",
          },
        },
      }),
    ]);

    const data: TenantDTO[] = rows.map((row) => ({
      id: row.id,
      idPai: null,
      descricao: row.name,
      sigla: row.nickname,
      active: row.active,
    }));

    return {
      data: data,
      count: total,
      currentPage: currentPage,
      totalPage: Math.ceil(total / perPage),
    };
  },
};
