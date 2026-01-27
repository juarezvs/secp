import { prisma } from "@/app/_kernel/db/prisma/client";

export class RequestAdjustmentUseCase {
  async execute(input: {
    companyId: string;
    branchId: string;
    employeeId: string;
    workDateLocalISO: string; // 00:00 local do dia
    type: "ADD" | "UPDATE" | "REMOVE";
    reason: string;

    targetEventId?: string;
    newOccurredAtUtcISO?: string;
    newOccurredAtLocalISO?: string;
    newTimezone?: string;

    requestedByUserId: string;
  }) {
    if (!input.reason?.trim()) throw new Error("Motivo é obrigatório");

    // validações mínimas por tipo
    if (input.type !== "ADD" && !input.targetEventId) {
      throw new Error("targetEventId é obrigatório para UPDATE/REMOVE");
    }
    if (input.type !== "REMOVE" && !input.newOccurredAtUtcISO) {
      throw new Error("newOccurredAtUtcISO é obrigatório para ADD/UPDATE");
    }

    const adj = await prisma.manualAdjustment.create({
      data: {
        companyId: input.companyId,
        branchId: input.branchId,
        employeeId: input.employeeId,
        workDateLocal: new Date(input.workDateLocalISO),
        type: input.type,
        reason: input.reason.trim(),
        targetEventId: input.targetEventId ?? null,
        newOccurredAtUtc: input.newOccurredAtUtcISO
          ? new Date(input.newOccurredAtUtcISO)
          : null,
        newOccurredAtLocal: input.newOccurredAtLocalISO
          ? new Date(input.newOccurredAtLocalISO)
          : null,
        newTimezone: input.newTimezone ?? null,
        status: "PENDING",
        requestedByUserId: input.requestedByUserId,
      },
    });

    return adj;
  }
}
