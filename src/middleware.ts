import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  const isLandingPage = pathname === "/";

  // Optional: Add a launch toggle
  const isAppLive = "false";

  if (isLandingPage || isAppLive) {
    return NextResponse.next();
  }

  // Redirect all other routes to landing page
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: [
    // Ignore static/internal assets AND root-level public images
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.webp$|.*\\.svg$).*)",
  ],
};
