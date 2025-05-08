// Типы данных для трекера
export interface Tracker {
  _id: string
  ip: string
  userAgent: string
  deviceType: "desktop" | "mobile" | "tablet" | string
  url: string
  referer: string
  createdAt: string
  updatedAt: string
  __v: number
}

// Типы для статистики
export interface TrackerStats {
  totalVisits: number
  uniqueVisitors: number
  deviceDistribution: {
    desktop: number
    mobile: number
    tablet: number
    other: number
  }
  topPages: {
    url: string
    count: number
  }[]
  recentVisits: Tracker[]
}

// Параметры для фильтрации и пагинации
export interface TrackerParams {
  page?: number
  limit?: number
  ip?: string
  search?: string
  startDate?: string
  endDate?: string
}

// Получение списка трекеров с фильтрацией и пагинацией
export async function getTrackers(params: TrackerParams = {}): Promise<{
  trackers: Tracker[]
  total: number
  page: number
  limit: number
  totalPages: number
}> {
  try {
    // Формируем URL с параметрами
    const queryParams = new URLSearchParams()

    if (params.page) queryParams.append("page", params.page.toString())
    if (params.limit) queryParams.append("limit", params.limit.toString())
    if (params.ip) queryParams.append("ip", params.ip)
    if (params.search) queryParams.append("search", params.search)
    if (params.startDate) queryParams.append("startDate", params.startDate)
    if (params.endDate) queryParams.append("endDate", params.endDate)

    const queryString = queryParams.toString()
    const url = `https://api.adb-solution.com/trackers${queryString ? `?${queryString}` : ""}`

    const response = await fetch(url, { cache: "no-store" })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const trackers = await response.json()

    // Если API не возвращает метаданные о пагинации, создаем их сами
    const limit = params.limit || 10
    const page = params.page || 1
    const total = trackers.length
    const totalPages = Math.ceil(total / limit)

    return {
      trackers,
      total,
      page,
      limit,
      totalPages,
    }
  } catch (error) {
    console.error("Error fetching trackers:", error)
    return {
      trackers: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    }
  }
}

// Получение статистики на основе данных трекера
export async function getTrackerStats(): Promise<TrackerStats> {
  try {
    // Получаем все трекеры для анализа
    const { trackers } = await getTrackers({ limit: 1000 })

    // Подсчет уникальных посетителей по IP
    const uniqueIPs = new Set(trackers.map((tracker) => tracker.ip))

    // Распределение по устройствам
    const deviceCounts = {
      desktop: 0,
      mobile: 0,
      tablet: 0,
      other: 0,
    }

    trackers.forEach((tracker) => {
      if (tracker.deviceType === "desktop") deviceCounts.desktop++
      else if (tracker.deviceType === "mobile") deviceCounts.mobile++
      else if (tracker.deviceType === "tablet") deviceCounts.tablet++
      else deviceCounts.other++
    })

    // Подсчет популярных страниц
    const pageCountMap = new Map<string, number>()

    trackers.forEach((tracker) => {
      const count = pageCountMap.get(tracker.url) || 0
      pageCountMap.set(tracker.url, count + 1)
    })

    const topPages = Array.from(pageCountMap.entries())
      .map(([url, count]) => ({ url, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Получение последних посещений
    const recentVisits = [...trackers]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)

    return {
      totalVisits: trackers.length,
      uniqueVisitors: uniqueIPs.size,
      deviceDistribution: deviceCounts,
      topPages,
      recentVisits,
    }
  } catch (error) {
    console.error("Error calculating tracker stats:", error)
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      deviceDistribution: {
        desktop: 0,
        mobile: 0,
        tablet: 0,
        other: 0,
      },
      topPages: [],
      recentVisits: [],
    }
  }
}

// Получение уникальных IP-адресов для фильтрации
export async function getUniqueIPs(): Promise<string[]> {
  try {
    const { trackers } = await getTrackers({ limit: 1000 })
    const uniqueIPs = Array.from(new Set(trackers.map((tracker) => tracker.ip)))
    return uniqueIPs
  } catch (error) {
    console.error("Error fetching unique IPs:", error)
    return []
  }
}

// Добавим новую функцию для получения статистики по IP-адресам после функции getUniqueIPs()

// Получение статистики по IP-адресам
export async function getIPStats(): Promise<{ ip: string; visits: number; lastVisit: string }[]> {
  try {
    const { trackers } = await getTrackers({ limit: 1000 })

    // Группируем посещения по IP-адресам
    const ipMap = new Map<string, { visits: number; lastVisit: string }>()

    trackers.forEach((tracker) => {
      const current = ipMap.get(tracker.ip) || { visits: 0, lastVisit: tracker.createdAt }

      // Обновляем количество посещений
      current.visits += 1

      // Обновляем дату последнего посещения, если текущее посещение новее
      if (new Date(tracker.createdAt) > new Date(current.lastVisit)) {
        current.lastVisit = tracker.createdAt
      }

      ipMap.set(tracker.ip, current)
    })

    // Преобразуем Map в массив и сортируем по количеству посещений (по убыванию)
    const ipStats = Array.from(ipMap.entries()).map(([ip, stats]) => ({
      ip,
      visits: stats.visits,
      lastVisit: stats.lastVisit,
    }))

    return ipStats.sort((a, b) => b.visits - a.visits)
  } catch (error) {
    console.error("Error calculating IP stats:", error)
    return []
  }
}
