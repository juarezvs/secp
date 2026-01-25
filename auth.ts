import NextAuth from "next-auth";
import { authConfig } from "./app/_kernel/auth/config";

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
