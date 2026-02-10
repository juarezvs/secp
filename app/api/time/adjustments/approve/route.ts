import { NextResponse } from "next/server";
import { requireOnboarded } from "@/app/_kernel/auth/guard";
import { ApproveAdjustmentUseCase } from "@/app/_core/application/time/ApproveAdjustment.usecase";

export async function POST(req: Request) {
  const session = await requireOnboarded();
  const body = await req.json();

  // Aqui entra sua política: somente chefia/gestor/admin aprova
  // Ex.: if (!session.roles?.includes("gestor")) return 403;

  const uc = new ApproveAdjustmentUseCase();
  const updated = await uc.execute({
    adjustmentId: body.adjustmentId,
    decision: body.decision,
    decisionReason: body.decisionReason,
    decidedByUserId: session.userId,
  });

  return NextResponse.json(updated);
}
