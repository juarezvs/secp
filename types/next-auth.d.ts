// import { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      matricula: string;
      email: string;
      role: string;
    };
    //  & DefaultSession["user"];
  }
  interface User {
    id: string;
    name: string | null;
    matricula: string;
    email: string;
    image?: string | null;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    matricula: string;
    role: string;
    apiToken: string;
  }
}
