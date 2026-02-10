import "server-only";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import Apple from "next-auth/providers/apple";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/_kernel/db/prisma/client";
import { ApiLoginDadaServerLogged, ApiLoginResponse } from "./types";
import type { SessionEndReason } from "../db/prisma/generated/prisma/enums";

const getRequestIp = (headers: Headers) => {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") ?? undefined;
};

async function validateCorporateLogin(matricula: string, password: string) {
  // 1) Validar domínio
  // if (!email.toLowerCase().endsWith("@trf1.jus.br")) return null;

  // 2) Aqui você chama seu validador de AD/LDAP
  // Exemplo: POST http(s)://.../auth/ldap/validate { email, password }
  // Retorne pelo menos { name, email }.
  // IMPORTANTE: não persistir senha.
  //
  // Placeholder:

  if (!matricula || matricula.length < 6) return null;
  if (!password || password.length < 6) return null;

  return { matricula, password };
}

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "TRF1 (Email corporativo)",
      credentials: {
        username: { label: "Matrícula", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        const matricula = String(credentials?.username || "")
          .trim()
          .toUpperCase();
        const password = String(credentials?.password || "");

        const user = await validateCorporateLogin(matricula, password);

        if (!user) return null;

        const res = await fetch(
          "http://pontojus.api.am.trf1.gov.br/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ username: matricula, password }),
            // se sua API usa cookie/sessão: credentials: "include",
          },
        );

        if (!res.ok) {
          return null;
        }
        const data = (await res.json()) as ApiLoginResponse;
        console.log(data);

        // buscar dados do servidor logado no sarh
        const resServer = await fetch(
          `http://sarh.api.am.trf1.gov.br/servidores/${data.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );

        if (!resServer.ok) {
          return null;
        }
        //
        //
        const dataServer = (await resServer.json()) as ApiLoginDadaServerLogged;
        console.log("Dados do servidor: ", dataServer);
        // fim buscar dados do servidor logado no sarh

        if (!dataServer) return null;

        // Auth.js exige um objeto com "id" para o user.
        // Como usamos PrismaAdapter, se o user ainda não existir, o adapter cria ao autenticar,
        // mas no Credentials pode variar; estratégia segura: upsert aqui.

        const dbUser = await prisma.user.upsert({
          where: { matricula: user.matricula },
          update: {
            name: dataServer.nome,
            email: dataServer.lotacao.lotacao.email ?? "teste@gmail.com",
          },
          create: {
            tenantId: "1",
            matricula: dataServer.matricula,
            name: dataServer.nome,
            cpf: dataServer.cpfServidor.dados.cpf.toString(),
            email: dataServer.lotacao.lotacao.email ?? "teste@gmail.com",
          },
        });

        return {
          //  id: data.user.id,
          name: dataServer.nome,
          email: dataServer.lotacao.lotacao.email ?? undefined,

          // campos extras:
          matricula: dataServer.matricula,
          roles: data.groups
            ? data.groups.map((group) => group.replace("GRP_PONTOJUS ", ""))
            : [],

          // guarde o token da sua API aqui pra pegar no callback jwt:
          apiToken: data.token,
        } as any;
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
    async signIn({ user, token }) {
      // regra: se email existe e é corporativo, ok.
      // se for OAuth sem email, negue (raríssimo)
      if (user?.email) return true;
      return false;
    },

    async jwt({ token, user, account, trigger, session }) {
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
  events: {
    async signOut(message: any) {
      try {
        const auditSessionId =
          (message.token as any)?.auditSessionId ??
          (message.session as any)?.auditSessionId;

        if (!auditSessionId) return;
        await prisma.auditSession.update({
          where: { id: auditSessionId },
          data: {
            endedAt: new Date(),
            endReason: "LOGOUT" satisfies SessionEndReason,
            lastSeenAt: new Date(),
          },
        });
      } catch {}
    },
  },

  pages: {
    signIn: "/login",
  },
};
