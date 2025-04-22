import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Пропускаем запросы к API, статическим файлам и админке
  if (
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.includes(".") ||
    request.nextUrl.pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  try {
    // Получаем IP-адрес
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

    // Получаем User-Agent
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Определяем тип устройства
    const deviceType = /mobile|android|iphone|ipad|ipod/i.test(userAgent) ? "mobile" : "desktop"

    // Получаем URL
    const url = request.nextUrl.pathname

    // Получаем реферер
    const referer = request.headers.get("referer") || ""

    // Отправляем данные на API
    await fetch("https://api.adb-solution.com/tracker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip,
        userAgent,
        url,
        referer,
        deviceType,
        timestamp: new Date().toISOString(),
        // timeSpent будет 0, так как это начальный запрос
        timeSpent: 0,
      }),
    })
  } catch (error) {
    console.error("Ошибка при отправке данных трекера:", error)
  }

  return NextResponse.next()
}

// Указываем, для каких путей должен срабатывать middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
  ],
}
