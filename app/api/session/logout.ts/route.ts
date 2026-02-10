import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/app/_kernel/db/prisma/client";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const auditSessionId = (session as any).auditSessionId as string | undefined;
  const now = new Date();

  if (auditSessionId) {
    await prisma.auditSession.update({
      where: { id: auditSessionId },
      data: {
        lastSeenAt: now,
        endedAt: now,
        endReason: "LOGOUT",
      },
    });
  }

  // Aqui você NÃO “desloga” o Auth.js (JWT cookie) pelo servidor;
  // no client você chamará signOut() após esse endpoint.
  return NextResponse.json({ ok: true });
}
