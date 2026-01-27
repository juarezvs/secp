import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/app/_kernel/db/prisma/client";
import { assertSupportedUf } from "@/app/_kernel/org/ufs";
import { getSarhDataSource } from "@/app/_kernel/db/typeorm/sarh-registry";
import { SarhServidor } from "@/app/_kernel/db/typeorm/sarh-entities";

export async function POST(req: Request) {
  const session = await auth();
  const userId = (session as any)?.userId;
  const email = session?.user?.email?.toLowerCase();

  if (!userId || !email)
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const { sarhUf, matricula, companyId, branchId } = await req.json();

  let uf: string;
  try {
    uf = assertSupportedUf(String(sarhUf));
  } catch {
    return NextResponse.json(
      { error: "UF inválida (suportadas: AM, RR, AP, AC, RO)" },
      { status: 400 },
    );
  }

  if (!matricula)
    return NextResponse.json(
      { error: "matricula é obrigatória" },
      { status: 400 },
    );
  if (!companyId || !branchId) {
    // você pode optar por inferir no futuro; por ora, exigir seleção inicial
    return NextResponse.json(
      { error: "companyId e branchId são obrigatórios no primeiro acesso" },
      { status: 400 },
    );
  }

  // 1) consultar SARH (Oracle da UF)
  const ds = await getSarhDataSource(uf);
  const repo = ds.getRepository(SarhServidor);

  const servidor = await repo.findOne({
    where: { matricula: String(matricula).trim() },
  });
  if (!servidor)
    return NextResponse.json(
      { error: "Matrícula não encontrada no SARH" },
      { status: 404 },
    );

  // 2) coerência: email (quando disponível no SARH)
  if (servidor.email && servidor.email.toLowerCase() !== email) {
    return NextResponse.json(
      { error: "Email não confere com o SARH" },
      { status: 409 },
    );
  }

  // 3) persistir vínculo no profile + garantir Employee interno (sincronização)
  await prisma.$transaction(async (tx) => {
    await tx.userProfile.upsert({
      where: { userId },
      update: {
        isOnboarded: true,
        sarhUf: uf,
        matricula: String(matricula).trim(),
        companyId,
        branchId,
      },
      create: {
        userId,
        isOnboarded: true,
        sarhUf: uf,
        matricula: String(matricula).trim(),
        companyId,
        branchId,
      },
    });

    // upsert Employee na base própria (SECP)
    await tx.employee.upsert({
      where: { email },
      update: {
        name: servidor.nome,
        matricula: String(matricula).trim(),
        sarhUf: uf,
        companyId,
        branchId,
      },
      create: {
        email,
        name: servidor.nome,
        matricula: String(matricula).trim(),
        sarhUf: uf,
        companyId,
        branchId,
      },
    });
  });

  return NextResponse.json({ ok: true });
}
