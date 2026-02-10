import "server-only";
import { prisma } from "@/app/_kernel/db/prisma/client";
import { ClockRepository } from "@/app/_core/domain/clocks/ports";

export const ClockRepoPrisma: ClockRepository = {
  async create(data) {
    const row = await prisma.clock.create({ data });
    return row;
  },
};
