import { NextResponse } from "next/server";
import { requireOnboarded } from "@/app/_kernel/auth/guard";
import { SyncClockEventsUseCase } from "@/app/application/time/SyncClockEvents.usecase";

export async function POST(req: Request) {
  const session = await requireOnboarded();
  const body = await req.json();

  // Você pode restringir ao escopo da sessão:
  body.companyId = body.companyId ?? session.companyId;
  body.branchId = body.branchId ?? session.branchId;

  const uc = new SyncClockEventsUseCase();
  const result = await uc.execute(body);
  return NextResponse.json(result);
}
