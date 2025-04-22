"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackPageExit } from "@/lib/track-visit"

export function PageTracker({ ip }: { ip: string }) {
  const pathname = usePathname()

  useEffect(() => {
    const startTime = Date.now()
    let isActive = true

    // Функция для отправки данных при уходе со страницы
    const sendData = async () => {
      if (!isActive) return

      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      const userAgent = navigator.userAgent
      const deviceType = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent) ? "mobile" : "desktop"
      const url = pathname
      const referer = document.referrer || ""

      // Отправляем данные на сервер
      try {
        await trackPageExit({
          ip,
          url,
          timeSpent,
          userAgent,
          deviceType,
          referer,
        })
      } catch (error) {
        console.error("Ошибка при отправке данных трекера:", error)
      }

      isActive = false
    }

    // Добавляем обработчики событий для отслеживания ухода со страницы
    window.addEventListener("beforeunload", sendData)
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        sendData()
      }
    })

    // Функция очистки
    return () => {
      window.removeEventListener("beforeunload", sendData)
      window.removeEventListener("visibilitychange", sendData)
      sendData() // Отправляем данные при размонтировании компонента
      isActive = false
    }
  }, [pathname, ip])

  // Компонент не рендерит никакой UI
  return null
}
