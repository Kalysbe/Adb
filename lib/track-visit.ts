"use server"

export async function trackPageExit(data: {
  ip: string
  url: string
  timeSpent: number
  userAgent: string
  deviceType: string
  referer: string
}) {
  try {
    // Создаем объект с данными для отправки
    const trackingData = {
      ...data,
      timestamp: new Date().toISOString(),
    }

    // Выводим данные в консоль
    console.log("[SERVER TRACKER] Отправляемые данные:", JSON.stringify(trackingData, null, 2))

    const response = await fetch("https://api.adb-solution.com/tracker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingData),
    })

    if (!response.ok) {
      console.error("[SERVER TRACKER] Ошибка при отправке данных:", response.status, response.statusText)
      return { success: false, error: `${response.status}: ${response.statusText}` }
    }

    console.log("[SERVER TRACKER] Данные успешно отправлены")
    return { success: true }
  } catch (error) {
    console.error("[SERVER TRACKER] Ошибка при отправке данных трекера:", error)
    return { success: false, error }
  }
}
