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
    const response = await fetch("https://api.adb-solution.com/tracker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      console.error("Ошибка при отправке данных трекера:", response.status, response.statusText)
    }

    return { success: true }
  } catch (error) {
    console.error("Ошибка при отправке данных трекера:", error)
    return { success: false, error }
  }
}
