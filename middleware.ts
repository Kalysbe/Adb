import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Get the preferred language from localStorage or cookie if available
  const language = request.cookies.get("language")?.value || "ru"

  // Check if the request is for a page that should be localized
  const pathname = request.nextUrl.pathname

  // Skip for API routes, static files, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next()
  }

  // Handle language-specific routes
  if (language === "en" && !pathname.startsWith("/en")) {
    // Redirect to English version
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url))
  } else if (language === "ru" && pathname.startsWith("/en")) {
    // Redirect to Russian version
    return NextResponse.redirect(new URL(pathname.replace(/^\/en/, ""), request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
