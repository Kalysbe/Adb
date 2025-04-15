"use client"

export function trackPageView() {
  if (typeof window !== "undefined") {
    const url = window.location.pathname + window.location.search

    // Отправляем данные на API для отслеживания
    fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        title: document.title,
      }),
    }).catch((error) => console.error("Ошибка при отправке данных аналитики:", error))
  }
}
