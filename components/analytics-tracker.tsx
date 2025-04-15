"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { trackPageView } from "@/lib/analytics"

export function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Отслеживаем просмотр страницы при первой загрузке
    trackPageView()
  }, [])

  useEffect(() => {
    // Отслеживаем просмотр страницы при изменении URL
    trackPageView()
  }, [pathname, searchParams])

  return null // Компонент не рендерит ничего в DOM
}
