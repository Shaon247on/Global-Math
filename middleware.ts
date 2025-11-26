// middleware.ts (place in the root of your project, same level as app/)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get access_token from cookies
  const accessToken = request.cookies.get("access_token")?.value;

  // Check if the route is protected (dashboard routes)
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // If trying to access dashboard without token, redirect to login
  if (isProtectedRoute && !accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // If user has token and tries to access root, redirect to dashboard
  if (pathname === "/" && accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};