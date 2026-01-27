import { NextResponse } from "next/server";
import { requireOnboarded } from "@/app/_kernel/auth/guard";
import { GenerateTimesheetUseCase } from "@/app/application/time/GenerateTimesheet.usecase";

export async function GET(req: Request) {
  await requireOnboarded();
  const { searchParams } = new URL(req.url);

  const employeeId = searchParams.get("employeeId");
  const fromUtc = searchParams.get("fromUtc");
  const toUtc = searchParams.get("toUtc");

  if (!employeeId || !fromUtc || !toUtc) {
    return NextResponse.json(
      { error: "employeeId, fromUtc, toUtc são obrigatórios" },
      { status: 400 },
    );
  }

  const uc = new GenerateTimesheetUseCase();
  const sheet = await uc.execute({
    employeeId,
    fromUtcISO: fromUtc,
    toUtcISO: toUtc,
  });

  return NextResponse.json(sheet);
}
