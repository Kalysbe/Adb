"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const startTime = Date.now()
    let isActive = true

    // Функция для отправки данных при уходе со страницы
    const sendData = () => {
      if (!isActive) return

      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      const userAgent = navigator.userAgent
      const deviceType = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent) ? "mobile" : "desktop"
      const url = pathname
      const referer = document.referrer || ""

      // Создаем объект с данными для отправки
      const trackingData = {
        userAgent,
        deviceType,
        url,
        referer,
        timeSpent,
      }

      // Выводим данные в консоль
      console.log("Отправляемые данные трекера:", trackingData)

      // Отправляем данные на сервер
      try {
        // Используем fetch для отправки данных
        fetch("/api/tracker", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trackingData),
          keepalive: true,
        })
          .then((response) => {
            if (!response.ok) {
              console.error("Ошибка при отправке данных трекера:", response.status, response.statusText)
            } else {
              console.log("Данные трекера успешно отправлены")
            }
          })
          .catch((error) => {
            console.error("Ошибка при отправке данных трекера:", error)
          })

        // Дополнительно используем sendBeacon для надежности при закрытии страницы
        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(trackingData)], { type: "application/json" })
          navigator.sendBeacon("/api/tracker", blob)
        }
      } catch (error) {
        console.error("Ошибка при отправке данных трекера:", error)
      }

      isActive = false
    }

    // Отправляем данные при загрузке страницы
    // Создаем таймаут, чтобы дать странице время загрузиться
    const initialSendTimeout = setTimeout(() => {
      // Создаем копию данных для начальной отправки
      const initialData = {
        userAgent: navigator.userAgent,
        deviceType: /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? "mobile" : "desktop",
        url: pathname,
        referer: document.referrer || "",
        timeSpent: 0, // Начальное время 0, так как пользователь только зашел
      }

      console.log("Начальные данные трекера:", initialData)

      // Отправляем начальные данные
      fetch("/api/tracker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initialData),
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Ошибка при отправке начальных данных трекера:", response.status, response.statusText)
          } else {
            console.log("Начальные данные трекера успешно отправлены")
          }
        })
        .catch((error) => {
          console.error("Ошибка при отправке начальных данных трекера:", error)
        })
    }, 1000)

    // Добавляем обработчики событий для отслеживания ухода со страницы
    window.addEventListener("beforeunload", sendData)
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        sendData()
      }
    })

    // Функция очистки
    return () => {
      clearTimeout(initialSendTimeout)
      window.removeEventListener("beforeunload", sendData)
      window.removeEventListener("visibilitychange", sendData)
      sendData() // Отправляем данные при размонтировании компонента
      isActive = false
    }
  }, [pathname])

  // Компонент не рендерит никакой UI
  return null
}
