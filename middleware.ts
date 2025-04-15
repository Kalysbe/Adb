import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Обрабатываем 404 ошибки здесь вместо использования not-found.tsx
  const url = request.nextUrl.clone()

  // Если путь не существует, перенаправляем на кастомную страницу 404
  if (url.pathname === "/_not-found") {
    url.pathname = "/custom-404"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
