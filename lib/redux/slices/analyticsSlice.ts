import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import axios from "axios"

// Определение типов для данных аналитики
export interface AnalyticsData {
  totalVisitors: number
  todayVisitors: number
  uniqueVisitors: number
  pageViews: number
  averageTimeOnSite: string
  bounceRate: string
  visitsOverTime: Array<{ label: string; visitors: number }>
  visitorsByRegion: Array<{ region: string; count: number; percentage: number }>
  visitorsByDevice: Array<{ device: string; count: number; percentage: number }>
  visitorsByBrowser: Array<{ browser: string; count: number; percentage: number }>
  recentVisitors: Array<{
    id: number
    ip: string
    country: string
    city: string
    lastVisit: string
    pagesViewed: number
    device: string
    browser: string
    os: string
  }>
  topPages: Array<{
    title: string
    url: string
    views: number
  }>
}

// Определение типа состояния
interface AnalyticsState {
  data: AnalyticsData | null
  loading: boolean
  error: string | null
  period: string
}

// Начальное состояние
const initialState: AnalyticsState = {
  data: null,
  loading: false,
  error: null,
  period: "week",
}

// Моковые данные для отображения, когда API недоступен
const mockAnalyticsData: AnalyticsData = {
  totalVisitors: 12458,
  todayVisitors: 342,
  uniqueVisitors: 8976,
  pageViews: 35842,
  averageTimeOnSite: "3m 24s",
  bounceRate: "42%",
  visitsOverTime: [
    { label: "Пн", visitors: 1200 },
    { label: "Вт", visitors: 1800 },
    { label: "Ср", visitors: 1600 },
    { label: "Чт", visitors: 2100 },
    { label: "Пт", visitors: 1900 },
    { label: "Сб", visitors: 1400 },
    { label: "Вс", visitors: 1300 },
  ],
  visitorsByRegion: [
    { region: "Москва", count: 4500, percentage: 36 },
    { region: "Санкт-Петербург", count: 2300, percentage: 18 },
    { region: "Екатеринбург", count: 1200, percentage: 10 },
    { region: "Новосибирск", count: 980, percentage: 8 },
    { region: "Казань", count: 850, percentage: 7 },
    { region: "Другие", count: 2628, percentage: 21 },
  ],
  visitorsByDevice: [
    { device: "Десктоп", count: 6850, percentage: 55 },
    { device: "Мобильный", count: 4980, percentage: 40 },
    { device: "Планшет", count: 628, percentage: 5 },
  ],
  visitorsByBrowser: [
    { browser: "Chrome", count: 7230, percentage: 58 },
    { browser: "Safari", count: 2490, percentage: 20 },
    { browser: "Firefox", count: 1245, percentage: 10 },
    { browser: "Edge", count: 870, percentage: 7 },
    { browser: "Другие", count: 623, percentage: 5 },
  ],
  recentVisitors: [
    {
      id: 1,
      ip: "192.168.1.1",
      country: "Россия",
      city: "Москва",
      lastVisit: "2023-06-15T14:30:00",
      pagesViewed: 5,
      device: "iPhone 13",
      browser: "Safari",
      os: "iOS 16",
    },
    {
      id: 2,
      ip: "192.168.1.2",
      country: "Россия",
      city: "Санкт-Петербург",
      lastVisit: "2023-06-15T14:25:00",
      pagesViewed: 3,
      device: "Samsung Galaxy S21",
      browser: "Chrome",
      os: "Android 12",
    },
    {
      id: 3,
      ip: "192.168.1.3",
      country: "Россия",
      city: "Екатеринбург",
      lastVisit: "2023-06-15T14:20:00",
      pagesViewed: 7,
      device: "MacBook Pro",
      browser: "Chrome",
      os: "macOS",
    },
  ],
  topPages: [
    {
      title: "Главная страница",
      url: "/",
      views: 12500,
    },
    {
      title: "О компании",
      url: "/about",
      views: 8700,
    },
    {
      title: "Услуги",
      url: "/services",
      views: 7300,
    },
    {
      title: "Контакты",
      url: "/contacts",
      views: 5200,
    },
    {
      title: "Новости",
      url: "/news",
      views: 4100,
    },
  ],
}

// Асинхронный thunk для получения данных аналитики
export const fetchAnalytics = createAsyncThunk<AnalyticsData, string>(
  "analytics/fetchAnalytics",
  async (period, { rejectWithValue }) => {
    try {
      // Попытка получить данные с API
      const response = await axios.get(`https://api.adb-solution.com/analytics?period=${period}`, {
        timeout: 5000,
      })
      return response.data
    } catch (error) {
      console.error("Error fetching analytics:", error)
      // В случае ошибки возвращаем моковые данные
      return mockAnalyticsData
    }
  },
)

// Создание слайса
const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<string>) => {
      state.period = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAnalytics.fulfilled, (state, action: PayloadAction<AnalyticsData>) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        // В случае ошибки используем моковые данные
        state.data = mockAnalyticsData
      })
  },
})

// Экспорт действий
export const { setPeriod } = analyticsSlice.actions

// Экспорт селекторов
export const selectAnalyticsData = (state: RootState) => state.analytics.data
export const selectAnalyticsLoading = (state: RootState) => state.analytics.loading
export const selectAnalyticsError = (state: RootState) => state.analytics.error
export const selectAnalyticsPeriod = (state: RootState) => state.analytics.period

// Экспорт редьюсера
export default analyticsSlice.reducer
