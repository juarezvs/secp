import "server-only";
import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/_kernel/db/prisma/client";
import { ApiLoginDadaServerLogged, ApiLoginResponse } from "./types";
import { PapelSistema } from "../db/prisma/generated/prisma/enums";

async function validateCorporateLogin(matricula: string, password: string) {
  if (!matricula || matricula.length < 6) return null;
  if (!password || password.length < 6) return null;

  return { matricula, password };
}

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  providers: [
    Credentials({
      name: "TRF1 (Email corporativo)",
      credentials: {
        username: { label: "Matrícula", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("=== AUTHORIZE START ===");

        const matricula = String(credentials?.username || "")
          .trim()
          .toUpperCase();
        const password = String(credentials?.password || "");

        const user = await validateCorporateLogin(matricula, password);

        // console.log("Dados do usuário: ", user);
        if (!process.env.AUTH_LOGIN_AD) {
          throw new Error("AUTH_LOGIN_AD não definido");
        }

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
        // console.log("Dados da resposta de login: ", data);

        if (!process.env.API_SARH) {
          throw new Error("API_SARH não definido");
        }

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

        const papeis: PapelSistema[] = (data.groups ?? [])
          .map((role) => role.replace(/^GRP_PONTOJUS_/, ""))
          .filter(
            (role): role is keyof typeof PapelSistema => role in PapelSistema,
          )
          .map((role) => PapelSistema[role]);

        let role: PapelSistema = PapelSistema.SERVIDOR;

        if (papeis.includes("MASTER")) {
          role = PapelSistema.MASTER;
        } else if (papeis.includes("ADMIN")) {
          role = PapelSistema.ADMIN;
        } else if (papeis.includes("RH")) {
          role = PapelSistema.RH;
        } else if (papeis.includes("GESTOR")) {
          role = PapelSistema.GESTOR;
        }
        const dbUser = await prisma.usuario.upsert({
          where: { matricula: user.matricula },
          update: {
            nome: dataServer.nome,
            email: data.email,
            papel: role,
          },
          create: {
            organizacaoId: organizacao?.id,
            matricula: user.matricula,
            email: data.email,
            papel: role,
            nome: dataServer.nome,
            cpf: dataServer.cpf.toString(),
          },
        });

        if (!dbUser) return null;

        return {
          id: dbUser.id,
          name: dataServer.nome,
          email: data.email,
          matricula: dataServer.matricula,
          role: role,
        } as User;
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // console.log("CALLBACKS - SIGNIN: ", user);
      // regra: se email existe e é corporativo, ok.
      // se for OAuth sem email, negue (raríssimo)
      if (user?.email) return true;
      return false;
    },

    async jwt({ token, user }) {
      if (user) {
        // console.log("User data for JWT: ", user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.matricula = user.matricula;
        if (user.role) token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      // console.log("SESSAO: ", session);

      if (session.user) {
        // console.log("Session user data: ", session.user);
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.matricula = token.matricula;
        session.user.role = token.role;
      }

      return session;
    },
  },
};
