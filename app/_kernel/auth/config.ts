import "server-only";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/_kernel/db/prisma/client";
import { ApiLoginDadaServerLogged, ApiLoginResponse } from "./types";
import {
  MotivoEncerramentoSessao,
  PapelSistema,
} from "../db/prisma/generated/prisma/enums";

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
          `${process.env.AUTH_LOGIN_AD}`,
          // "http://pontojus.api.am.trf1.gov.br/auth/login",
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
        // console.log(data);

        // buscar dados do servidor logado no sarh
        const resServer = await fetch(
          `${process.env.API_SARH}/servidores/${data.username}`,
          // `http://sarh.api.am.trf1.gov.br/servidores/${data.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );

        //  console.log(resServer.url);
        // console.log(await resServer.json());

        if (!resServer.ok) {
          return null;
        }
        //
        //
        const dataServer = (await resServer.json()) as ApiLoginDadaServerLogged;
        // console.log("Dados do servidor: ", dataServer);
        // fim buscar dados do servidor logado no sarh

        if (!dataServer) return null;

        // Auth.js exige um objeto com "id" para o user.
        // Como usamos PrismaAdapter, se o user ainda não existir, o adapter cria ao autenticar,
        // mas no Credentials pode variar; estratégia segura: upsert aqui.

        const organizacao = await prisma.organizacao.findFirst();
        if (!organizacao) return null;
        // console.log(organizacao);

        const papeis: PapelSistema[] = data.groups
          .map((role) => role.replace(/^GRP_PONTOJUS_/, ""))
          .filter(
            (role): role is keyof typeof PapelSistema => role in PapelSistema,
          )
          .map((role) => PapelSistema[role]);

        const dbUser = await prisma.usuario.upsert({
          where: { matricula: user.matricula },
          update: {
            nome: dataServer.nome,
            email: data.email,
            papeis: papeis,
          },
          create: {
            organizacaoId: organizacao?.id,
            matricula: user.matricula,
            email: data.email,
            papeis: papeis,
            nome: dataServer.nome,
            cpf: dataServer.cpf.toString(),
          },
        });

        return {
          id: dbUser.id,
          name: dataServer.nome,
          email: data.email,

          // campos extras:
          matricula: dataServer.matricula,
          roles: papeis,

          // guarde o token da sua API aqui pra pegar no callback jwt:
          apiToken: data.token,
        } as any;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, token }) {
      // console.log("CALLBACKS - SIGNIN: ", user);
      // regra: se email existe e é corporativo, ok.
      // se for OAuth sem email, negue (raríssimo)
      if (user?.email) return true;
      return false;
    },

    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;

        token.matricula = (user as any).matricula;
        token.roles = (user as any).roles;
        token.apiToken = (user as any).apiToken;
      }
      console.log("token: ", token);
      return token;
    },

    async session({ session, token }) {
      console.log("SESSAO: ", session);

      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).matricula = token.matricula;
        (session.user as any).roles = token.roles;
        (session.user as any).apiToken = token.apiToken;
      }

      return session;
    },

    // async redirect({ url, baseUrl }) {
    //   // regra simples: sempre voltar para baseUrl

    //   console.log("CALLBACKS - REDIRECT: ", url, baseUrl);
    //   if (url.startsWith(baseUrl)) return url;
    //   return baseUrl;
    // },
  },
  events: {
    async signOut(message: any) {
      try {
        const auditSessionId =
          (message.token as any)?.auditSessionId ??
          (message.session as any)?.auditSessionId;

        if (!auditSessionId) return;
        await prisma.sessaoAuditoria.update({
          where: { id: auditSessionId },
          data: {
            encerradaEm: new Date(),
            motivoEncerramento: "LOGOUT" satisfies MotivoEncerramentoSessao,
            ultimoAcessoEm: new Date(),
          },
        });
      } catch {}
    },
  },

  pages: {
    signIn: "/login",
  },
};
