import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/app/_kernel/db/prisma/client";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const tokenAuditSessionId = (session as any).auditSessionId as string | undefined;
  if (!tokenAuditSessionId) {
    // não impede o app, mas te avisa que o token não está amarrado
    return NextResponse.json({ ok: false, reason: "NO_AUDIT_SESSION" }, { status: 200 });
  }

  const now = new Date();

  await prisma.auditSession.update({
    where: { id: tokenAuditSessionId },
    data: { lastSeenAt: now },
  });

  return NextResponse.json({ ok: true, at: now.toISOString() });
}
