import crypto from "crypto";

function b64url(buf: Buffer) {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
function b64urlDecode(str: string) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = str.length % 4 ? "=".repeat(4 - (str.length % 4)) : "";
  return Buffer.from(str + pad, "base64");
}

export type OAuthCtx = {
  empresaId: string;
  unidade: string;
  nonce: string;
  exp: number; // epoch seconds
};

export function signCtx(ctx: OAuthCtx, secret: string) {
  const payload = b64url(Buffer.from(JSON.stringify(ctx), "utf8"));
  const sig = crypto.createHmac("sha256", secret).update(payload).digest();
  return `${payload}.${b64url(sig)}`;
}

export function verifyCtx(value: string, secret: string): OAuthCtx | null {
  const [payload, sig] = value.split(".");
  if (!payload || !sig) return null;

  const expected = crypto.createHmac("sha256", secret).update(payload).digest();
  const given = b64urlDecode(sig);

  if (given.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(given, expected)) return null;

  try {
    const ctx = JSON.parse(b64urlDecode(payload).toString("utf8")) as OAuthCtx;
    if (!ctx?.empresaId || !ctx?.unidade || !ctx?.nonce || !ctx?.exp)
      return null;

    const now = Math.floor(Date.now() / 1000);
    if (ctx.exp < now) return null;

    return ctx;
  } catch {
    return null;
  }
}
