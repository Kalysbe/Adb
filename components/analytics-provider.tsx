import { headers } from "next/headers"
import { PageTracker } from "./page-tracker"

export function AnalyticsProvider() {
  // Получаем заголовки запроса на сервере
  const headersList = headers()

  // Получаем IP-адрес из всех возможных заголовков
  const realIp = headersList.get("x-real-ip")
  const forwardedFor = headersList.get("x-forwarded-for")
  const cfConnectingIp = headersList.get("cf-connecting-ip")
  const trueClientIp = headersList.get("true-client-ip")

  // Выбираем первый доступный IP-адрес
  const ip = realIp || (forwardedFor ? forwardedFor.split(",")[0] : null) || cfConnectingIp || trueClientIp || "unknown"

  // Логируем все возможные источники IP
  console.log("[ANALYTICS PROVIDER] IP sources:", {
    "x-real-ip": realIp,
    "x-forwarded-for": forwardedFor,
    "cf-connecting-ip": cfConnectingIp,
    "true-client-ip": trueClientIp,
    selected: ip,
  })

  // Передаем IP-адрес в клиентский компонент
  return <PageTracker ip={ip} />
}
