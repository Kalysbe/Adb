import { headers } from "next/headers"
import { PageTracker } from "./page-tracker"
import { LanguageProvider } from "@/lib/i18n/context"

export function AnalyticsProvider() {
  // Получаем заголовки запроса
  const headersList = headers()

  // Получаем IP-адрес
  const forwardedFor = headersList.get("x-forwarded-for")
  const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown"

  return (
    <LanguageProvider>
      <PageTracker ip={ip} />
    </LanguageProvider>
  )
}
