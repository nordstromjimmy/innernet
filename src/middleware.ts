import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const publicRoutes = ["/", "/terms", "/privacy"];
  const { pathname } = req.nextUrl;

  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isPublic) return NextResponse.next();

  // Block everything else
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: [
    // Ignore static/internal assets AND root-level public images
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.webp$|.*\\.svg$).*)",
  ],
};
