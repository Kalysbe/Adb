export const trackPageVisit = async (
  userAgent: string,
  deviceType: string,
  url: string,
  referer: string,
  timeSpent: number,
) => {
  try {
    const response = await fetch("/api/tracker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userAgent,
        deviceType,
        url,
        referer,
        timeSpent,
      }),
    })

    if (!response.ok) {
      console.error("Ошибка при отправке данных трекера:", response.status, response.statusText)
    }
  } catch (error) {
    console.error("Ошибка при отправке данных трекера:", error)
  }
}
