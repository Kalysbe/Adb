import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

// Функция для проверки авторизации
function isAuthorized(request: NextRequest): boolean {
  const headersList = headers()
  const authorization = headersList.get("authorization")

  // Проверяем наличие токена
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return false
  }

  const token = authorization.substring(7) // Убираем "Bearer " из начала

  // В реальном приложении здесь будет проверка токена
  // Для примера просто проверяем, что токен не пустой
  return token.length > 0
}

export async function GET(request: NextRequest) {
  // Проверяем авторизацию
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    // В реальном приложении здесь будет код для получения данных из базы данных или API
    // Для примера возвращаем моковые данные

    // Получаем параметры запроса
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "week" // По умолчанию - неделя

    // Генерируем данные в зависимости от периода
    const data = generateMockData(period)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 })
  }
}

// Функция для генерации моковых данных
function generateMockData(period: string) {
  // Базовые данные
  const baseData = {
    totalVisitors: 12458,
    uniqueVisitors: 5723,
    todayVisitors: 142,
    weeklyVisitors: 1024,
    monthlyVisitors: 3856,
    pageViews: 28945,
    averageTimeOnSite: "3m 24s",
    bounceRate: "42%",
    topPages: [
      { url: "/", views: 8456, title: "Главная страница" },
      { url: "/services", views: 4231, title: "Услуги" },
      { url: "/news", views: 3567, title: "Новости" },
      { url: "/contacts", views: 2890, title: "Контакты" },
      { url: "/about", views: 2345, title: "О компании" },
    ],
    visitorsByRegion: [
      { region: "Москва", count: 2345, percentage: 41 },
      { region: "Санкт-Петербург", count: 1234, percentage: 21.5 },
      { region: "Екатеринбург", count: 567, percentage: 9.9 },
      { region: "Новосибирск", count: 432, percentage: 7.5 },
      { region: "Казань", count: 345, percentage: 6 },
      { region: "Другие", count: 800, percentage: 14.1 },
    ],
    visitorsByDevice: [
      { device: "Desktop", count: 3148, percentage: 55 },
      { device: "Mobile", count: 2290, percentage: 40 },
      { device: "Tablet", count: 285, percentage: 5 },
    ],
    visitorsByBrowser: [
      { browser: "Chrome", count: 2861, percentage: 50 },
      { browser: "Safari", count: 1145, percentage: 20 },
      { browser: "Firefox", count: 572, percentage: 10 },
      { browser: "Edge", count: 458, percentage: 8 },
      { browser: "Opera", count: 286, percentage: 5 },
      { browser: "Другие", count: 401, percentage: 7 },
    ],
    recentVisitors: [
      {
        id: "1",
        ip: "192.168.1.1",
        country: "Россия",
        city: "Москва",
        device: "iPhone 13",
        browser: "Safari",
        os: "iOS 16",
        lastVisit: "2023-05-15T14:32:45",
        pagesViewed: 4,
      },
      {
        id: "2",
        ip: "192.168.1.2",
        country: "Россия",
        city: "Санкт-Петербург",
        device: "Samsung Galaxy S21",
        browser: "Chrome",
        os: "Android 12",
        lastVisit: "2023-05-15T14:30:12",
        pagesViewed: 2,
      },
      {
        id: "3",
        ip: "192.168.1.3",
        country: "Россия",
        city: "Екатеринбург",
        device: "MacBook Pro",
        browser: "Chrome",
        os: "macOS",
        lastVisit: "2023-05-15T14:28:56",
        pagesViewed: 7,
      },
      {
        id: "4",
        ip: "192.168.1.4",
        country: "Россия",
        city: "Новосибирск",
        device: "Windows PC",
        browser: "Firefox",
        os: "Windows 11",
        lastVisit: "2023-05-15T14:25:33",
        pagesViewed: 3,
      },
      {
        id: "5",
        ip: "192.168.1.5",
        country: "Россия",
        city: "Казань",
        device: "iPad",
        browser: "Safari",
        os: "iPadOS",
        lastVisit: "2023-05-15T14:22:18",
        pagesViewed: 5,
      },
    ],
  }

  // Генерируем данные о посещениях в зависимости от периода
  const visitsOverTime = []

  if (period === "day") {
    // Данные за день (по часам)
    for (let i = 0; i < 24; i++) {
      visitsOverTime.push({
        label: `${i}:00`,
        visitors: Math.floor(Math.random() * 30) + 10,
      })
    }
  } else if (period === "week") {
    // Данные за неделю (по дням)
    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    for (let i = 0; i < 7; i++) {
      visitsOverTime.push({
        label: days[i],
        visitors: Math.floor(Math.random() * 200) + 100,
      })
    }
  } else if (period === "month") {
    // Данные за месяц (по дням)
    for (let i = 1; i <= 30; i++) {
      visitsOverTime.push({
        label: `${i}`,
        visitors: Math.floor(Math.random() * 200) + 100,
      })
    }
  } else if (period === "year") {
    // Данные за год (по месяцам)
    const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
    for (let i = 0; i < 12; i++) {
      visitsOverTime.push({
        label: months[i],
        visitors: Math.floor(Math.random() * 5000) + 2000,
      })
    }
  }

  return {
    ...baseData,
    visitsOverTime,
  }
}
