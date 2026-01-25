import { NextResponse } from "next/server";
import { prisma } from "@/app/_kernel/db/prisma/client";
import { getSarhDataSource } from "@/app/_kernel/db/typeorm/sarh-registry";
import { SarhServidor } from "@/app/_kernel/db/typeorm/sarh-entities";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email || !(session as any)?.userId) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const { sarhUf, matricula } = await req.json();

  if (!sarhUf || !matricula) {
    return NextResponse.json(
      { error: "sarhUf e matricula são obrigatórios" },
      { status: 400 },
    );
  }

  // 1) consultar SARH da UF
  const ds = await getSarhDataSource(String(sarhUf).toUpperCase());
  const repo = ds.getRepository(SarhServidor);

  const servidor = await repo.findOne({
    where: { matricula: String(matricula).trim() },
  });
  if (!servidor) {
    return NextResponse.json(
      { error: "Matrícula não encontrada no SARH" },
      { status: 404 },
    );
  }

  // 2) validação de coerência (mínima)
  // Ex.: email corporativo deve bater com o do SARH quando existir
  const emailSessao = session.user.email.toLowerCase();
  if (servidor.email && servidor.email.toLowerCase() !== emailSessao) {
    return NextResponse.json(
      { error: "Email não confere com o SARH" },
      { status: 409 },
    );
  }

  // 3) atualizar profile (marcar onboarded)
  await prisma.userProfile.upsert({
    where: { userId: (session as any).userId },
    update: {
      isOnboarded: true,
      sarhUf: String(sarhUf).toUpperCase(),
      matricula: String(matricula).trim(),
    },
    create: {
      userId: (session as any).userId,
      isOnboarded: true,
      sarhUf: String(sarhUf).toUpperCase(),
      matricula: String(matricula).trim(),
    },
  });

  return NextResponse.json({ ok: true });
}
