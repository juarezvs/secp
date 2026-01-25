import { CreateCompanyUseCase } from "@/app/application/org/create-company.usecase";
import { CompanyRepoPrisma } from "@/app/infra/prisma/org/company.repo.prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const list = await CompanyRepoPrisma.list();
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const body = await req.json();
  const uc = new CreateCompanyUseCase(CompanyRepoPrisma);
  const created = await uc.execute({ code: body.code, name: body.name });
  return NextResponse.json(created, { status: 201 });
}
