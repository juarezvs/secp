import { CreateBranchUseCase } from "@/app/application/org/create-branch.usecase";
import { BranchRepoPrisma } from "@/app/infra/prisma/org/branch.repo.prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const uc = new CreateBranchUseCase(BranchRepoPrisma);
  const created = await uc.execute({
    companyId: body.companyId,
    code: body.code,
    name: body.name,
    timezone: body.timezone,
  });
  return NextResponse.json(created, { status: 201 });
}
