import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { signCtx } from "@/app/_kernel/lib/signed-cookie";

const BodySchema = z.object({
  provider: z.enum(["google", "github", "azure-ad"]),
  empresaId: z.string().min(1),
  unidade: z.string().min(2),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const { provider, empresaId, unidade } = parsed.data;

  const secret = process.env.AUTH_SECRET;
  if (!secret)
    return NextResponse.json({ error: "AUTH_SECRET ausente" }, { status: 500 });

  const now = Math.floor(Date.now() / 1000);
  const ctx = {
    empresaId,
    unidade,
    nonce: crypto.randomBytes(16).toString("hex"),
    exp: now + 5 * 60, // 5 minutos
  };

  const signed = signCtx(ctx, secret);

  // Redireciona para o endpoint de signin do Auth.js.
  const url = new URL(`/api/auth/signin/${provider}`, new URL(req.url).origin);

  const res = NextResponse.redirect(url, 302);

  res.cookies.set({
    name: "secp_oauth_ctx",
    value: signed,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 5 * 60,
  });

  return res;
}
