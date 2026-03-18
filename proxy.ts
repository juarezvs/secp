import { auth } from "@/auth";

export default auth((req) => {
  const session = req.auth;
  const roles = ((req.auth?.user as any)?.roles ?? []) as string[];

  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname === "/dashboard") {
    if (roles.includes("ADMIN")) {
      return Response.redirect(new URL("/dashboard/admin", req.url));
    }

    if (roles.includes("GESTOR")) {
      return Response.redirect(new URL("/dashboard/gestor", req.url));
    }

    return Response.redirect(new URL("/dashboard/servidor", req.url));
  }
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
