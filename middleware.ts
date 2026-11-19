import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "portfolio_admin_session";

/**
 * Next.js Middleware Guard untuk memproteksi seluruh rute /admin
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  // 1. Guard rute /admin (selain /admin/login): Wajib login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!sessionToken) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Jika sudah login dan mencoba membuka halaman login (/admin/login), langsung ke dashboard
  if (pathname === "/admin/login") {
    if (sessionToken) {
      const dashboardUrl = new URL("/admin", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
