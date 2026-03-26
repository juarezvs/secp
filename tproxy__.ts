import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;

  // console.log("session backend: ", session);

  const isLoggedIn = !!session;
  console.log(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isGestorRoute = nextUrl.pathname.startsWith("/admin");
  const isServidorRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = nextUrl.pathname.startsWith("/dashboard");
  console.log("isLoggedIn: ", isLoggedIn);
  console.log("isAdminRoute: ", isAdminRoute);
  console.log("isGestorRoute: ", isGestorRoute);
  console.log("isServidorRoute: ", isServidorRoute);
  console.log("isLoginRoute: ", isLoginRoute);

  if (!isLoggedIn && (isAdminRoute || isGestorRoute || isServidorRoute)) {
    console.log(
      "User is not logged in and trying to access a protected route.",
    );
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && isLoginRoute) {
    const role = session.user.role;

    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }

    if (role === "GESTOR") {
      return NextResponse.redirect(new URL("/dashboard/gestor", req.url));
    }

    return NextResponse.redirect(new URL("/dashboard/servidor", req.url));
  }

  if (isAdminRoute && session?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/acesso-negado", nextUrl));
  }

  if (
    isGestorRoute &&
    !["GESTOR", "ADMIN"].includes(session?.user.role ?? "")
  ) {
    return NextResponse.redirect(new URL("/acesso-negado", nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/gestor/:path*", "/servidor/:path*", "/login"],
};
