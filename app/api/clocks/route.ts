import { CreateClockUseCase } from "@/app/application/clocks/create-clock.usecase";
import { ClockRepoPrisma } from "@/app/infra/prisma/clocks/clock.repo.prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const uc = new CreateClockUseCase(ClockRepoPrisma);
  const created = await uc.execute(body);
  return NextResponse.json(created, { status: 201 });
}
