import { NextResponse, type NextRequest } from "next/server";

import { ROLE_ACCESS, SESSION_COOKIE_NAME, type Role } from "@/lib/auth/config";
import { verifySessionToken } from "@/lib/auth/token";

const AUTH_PAGES = ["/login"];
const PROTECTED_PREFIXES = ["/dashboard", "/admin", "/pm", "/developer"];

function canAccess(pathname: string, role: Role) {
  const matchedPrefix = Object.keys(ROLE_ACCESS).find((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!matchedPrefix) {
    return true;
  }

  return ROLE_ACCESS[matchedPrefix].includes(role);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  const isAuthPage = AUTH_PAGES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtected && session && !canAccess(pathname, session.role)) {
    return NextResponse.redirect(new URL("/dashboard?error=forbidden", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/admin/:path*", "/pm/:path*", "/developer/:path*"],
};
