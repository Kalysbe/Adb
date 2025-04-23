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
    // Получаем IP-адрес из всех возможных заголовков
    const realIp = request.headers.get("x-real-ip")
    const forwardedFor = request.headers.get("x-forwarded-for")
    const cfConnectingIp = request.headers.get("cf-connecting-ip")
    const trueClientIp = request.headers.get("true-client-ip")

    // Выбираем первый доступный IP-адрес
    const ip =
      realIp ||
      (forwardedFor ? forwardedFor.split(",")[0] : null) ||
      cfConnectingIp ||
      trueClientIp ||
      request.ip ||
      "unknown"

    // Логируем все возможные источники IP
    console.log("[MIDDLEWARE] IP sources:", {
      "x-real-ip": realIp,
      "x-forwarded-for": forwardedFor,
      "cf-connecting-ip": cfConnectingIp,
      "true-client-ip": trueClientIp,
      "request.ip": request.ip,
      selected: ip,
    })

    // Получаем User-Agent
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Определяем тип устройства
    const deviceType = /mobile|android|iphone|ipad|ipod/i.test(userAgent) ? "mobile" : "desktop"

    // Получаем URL
    const url = request.nextUrl.pathname

    // Получаем реферер
    const referer = request.headers.get("referer") || ""

    // Создаем объект с данными для отправки
    const trackingData = {
      ip,
      userAgent,
      url,
      referer,
      deviceType,
      timestamp: new Date().toISOString(),
      // timeSpent будет 0, так как это начальный запрос
      timeSpent: 0,
    }

    // Выводим данные в консоль
    console.log("[MIDDLEWARE TRACKER] Отправляемые данные:", JSON.stringify(trackingData, null, 2))

    // Отправляем данные на API
    await fetch("https://api.adb-solution.com/tracker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingData),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("[MIDDLEWARE TRACKER] Ошибка при отправке данных:", response.status, response.statusText)
        } else {
          console.log("[MIDDLEWARE TRACKER] Данные успешно отправлены")
        }
      })
      .catch((error) => {
        console.error("[MIDDLEWARE TRACKER] Ошибка при отправке данных:", error)
      })
  } catch (error) {
    console.error("[MIDDLEWARE TRACKER] Ошибка при отправке данных трекера:", error)
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
