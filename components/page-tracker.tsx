"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackPageExit } from "@/lib/track-visit"

export function PageTracker({ ip }: { ip: string }) {
  const pathname = usePathname()

  useEffect(() => {
    const startTime = Date.now()
    let isActive = true

    console.log("[CLIENT TRACKER] Инициализация трекера для страницы:", pathname)
    console.log("[CLIENT TRACKER] IP адрес посетителя:", ip)

    // Функция для отправки данных при уходе со страницы
    const sendData = async () => {
      if (!isActive) return

      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      const userAgent = navigator.userAgent
      const deviceType = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent) ? "mobile" : "desktop"
      const url = pathname
      const referer = document.referrer || ""

      // Создаем объект с данными для отправки
      const trackingData = {
        ip,
        url,
        timeSpent,
        userAgent,
        deviceType,
        referer,
      }

      // Выводим данные в консоль
      console.log("[CLIENT TRACKER] Отправляемые данные:", JSON.stringify(trackingData, null, 2))

      // Отправляем данные на сервер
      try {
        const result = await trackPageExit(trackingData)
        if (result.success) {
          console.log("[CLIENT TRACKER] Данные успешно отправлены")
        } else {
          console.error("[CLIENT TRACKER] Ошибка при отправке данных:", result.error)
        }
      } catch (error) {
        console.error("[CLIENT TRACKER] Ошибка при отправке данных трекера:", error)
      }

      isActive = false
    }

    // Добавляем обработчики событий для отслеживания ухода со страницы
    window.addEventListener("beforeunload", sendData)
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        console.log("[CLIENT TRACKER] Страница скрыта, отправляем данные")
        sendData()
      }
    })

    // Функция очистки
    return () => {
      console.log("[CLIENT TRACKER] Размонтирование компонента, отправляем данные")
      window.removeEventListener("beforeunload", sendData)
      window.removeEventListener("visibilitychange", sendData)
      sendData() // Отправляем данные при размонтировании компонента
      isActive = false
    }
  }, [pathname, ip])

  // Компонент не рендерит никакой UI
  return null
}
