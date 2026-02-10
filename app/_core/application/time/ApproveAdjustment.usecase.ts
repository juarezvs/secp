import { prisma } from "@/app/_kernel/db/prisma/client";

export class ApproveAdjustmentUseCase {
  async execute(input: {
    adjustmentId: string;
    decision: "APPROVED" | "REJECTED";
    decisionReason?: string;
    decidedByUserId: string;
  }) {
    const adj = await prisma.manualAdjustment.findUnique({
      where: { id: input.adjustmentId },
    });
    if (!adj) throw new Error("Ajuste não encontrado");
    if (adj.status !== "PENDING") throw new Error("Ajuste não está pendente");

    return prisma.$transaction(async (tx) => {
      await tx.approval.create({
        data: {
          adjustmentId: adj.id,
          status: input.decision,
          decisionReason: input.decisionReason?.trim() || null,
          decidedByUserId: input.decidedByUserId,
        },
      });

      const updated = await tx.manualAdjustment.update({
        where: { id: adj.id },
        data: { status: input.decision },
      });

      // Gancho: recalcular e lançar banco de horas (ledger) se sua regra exigir persistência
      // await ... tx.overtimeBankEntry.create(...)

      return updated;
    });
  }
}
