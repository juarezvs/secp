import { auth } from "@/auth";
import "server-only";

export async function requireSession() {
  const session = await auth();
  if (!session) throw new Error("UNAUTHENTICATED");
  return session as any;
}

export async function requireOnboarded() {
  const session = await requireSession();
  if (!session.isOnboarded) throw new Error("ONBOARDING_REQUIRED");
  return session;
}
