import "server-only";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import Apple from "next-auth/providers/apple";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/_kernel/db/prisma/client";

async function validateCorporateLogin(email: string, password: string) {
  // 1) Validar domínio
  if (!email.toLowerCase().endsWith("@trf1.jus.br")) return null;

  // 2) Aqui você chama seu validador de AD/LDAP
  // Exemplo: POST http(s)://.../auth/ldap/validate { email, password }
  // Retorne pelo menos { name, email }.
  // IMPORTANTE: não persistir senha.
  //
  // Placeholder:
  if (!password || password.length < 6) return null;

  return { name: email.split("@")[0], email };
}

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "TRF1 (Email corporativo)",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        const email = String(credentials?.email || "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password || "");

        const user = await validateCorporateLogin(email, password);
        if (!user) return null;

        // Auth.js exige um objeto com "id" para o user.
        // Como usamos PrismaAdapter, se o user ainda não existir, o adapter cria ao autenticar,
        // mas no Credentials pode variar; estratégia segura: upsert aqui.
        const dbUser = await prisma.user.upsert({
          where: { email: user.email },
          update: { name: user.name },
          create: { email: user.email, name: user.name },
        });

        // garantir profile
        await prisma.userProfile.upsert({
          where: { userId: dbUser.id },
          update: {},
          create: { userId: dbUser.id },
        });

        return { id: dbUser.id, email: dbUser.email, name: dbUser.name };
      },
    }),

    // OAuth: ajuste envs e scopes conforme sua política
    Google,
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    }),
    Apple,
  ],

  callbacks: {
    async signIn({ user, account }) {
      // regra: se email existe e é corporativo, ok.
      // se for OAuth sem email, negue (raríssimo)
      if (user?.email) return true;
      return false;
    },

    async jwt({ token }) {
      // enriquecer token com profile
      if (token.sub) {
        const profile = await prisma.userProfile.findUnique({
          where: { userId: token.sub },
        });

        token.isOnboarded = profile?.isOnboarded ?? false;
        token.sarhUf = profile?.sarhUf ?? null;
        token.matricula = profile?.matricula ?? null;
        token.companyId = profile?.companyId ?? null;
        token.branchId = profile?.branchId ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      // disponibiliza na sessão
      (session as any).userId = token.sub;
      (session as any).isOnboarded = (token as any).isOnboarded;
      (session as any).sarhUf = (token as any).sarhUf;
      (session as any).matricula = (token as any).matricula;
      (session as any).companyId = (token as any).companyId;
      (session as any).branchId = (token as any).branchId;
      return session;
    },

    async redirect({ url, baseUrl }) {
      // regra simples: sempre voltar para baseUrl
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
  },
};
