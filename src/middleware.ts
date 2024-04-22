import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("@nextauth.token");

  if (request.nextUrl.pathname === "/login" && token?.value) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  if (!token?.value && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return;
}

export const config = {
  matcher: ["/app/:path*", "/login"],
};
