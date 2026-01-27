import { NextResponse } from "next/server";
import { requireOnboarded } from "@/app/_kernel/auth/guard";
import { RequestAdjustmentUseCase } from "@/app/application/time/RequestAdjustment.usecase";

export async function POST(req: Request) {
  const session = await requireOnboarded();
  const body = await req.json();

  const uc = new RequestAdjustmentUseCase();
  const created = await uc.execute({
    ...body,
    companyId: body.companyId ?? session.companyId,
    branchId: body.branchId ?? session.branchId,
    requestedByUserId: session.userId,
  });

  return NextResponse.json(created, { status: 201 });
}
