import { NextResponse } from "next/server";
import { EmployeeRepoPrisma } from "@/app/_core/infrastructure/prisma/people/employee.repo.prisma";
import { CreateEmployeeUseCase } from "@/app/_core/application/people/create-employee.usecase";
import { requireOnboarded } from "@/app/_kernel/auth/guard";
import { error } from "console";

export async function POST(req: Request) {
  const session = await requireOnboarded();

  const body = await req.json();

  // Se você quiser “travar” por empresa/filial da sessão:
  body.companyId = body.companyId ?? session.companyId;
  body.branchId = body.branchId ?? session.branchId;

  const uc = new CreateEmployeeUseCase(EmployeeRepoPrisma);
  const created = await uc.execute(body);
  return NextResponse.json(created, { status: 201 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const companyId = searchParams.get("companyId");

  if (!companyId)
    return NextResponse.json(
      { error: "companyId é obrigatório" },
      { status: 400 },
    );

  const list = await EmployeeRepoPrisma.listByCompany(companyId);
  return NextResponse.json(list);
}
