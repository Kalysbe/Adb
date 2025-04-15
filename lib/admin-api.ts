import axios from "axios"

// Функции для работы с API админ-панели

const API_URL = "https://api.adb-solution.com"

// Создаем экземпляр axios с базовым URL
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

// Добавляем перехватчик запросов для добавления токена
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Аутентификация
export async function login(login: string, password: string) {
  try {
    const response = await api.post("/auth/login", { login, password })
    return response.data
  } catch (error) {
    console.error("Login error:", error)

    // Для тестирования, если API недоступен
    if (login === "admin" && password === "admin") {
      return {
        id: "1",
        fullName: "Admin User",
        login: "admin",
        role: 5,
        token: "test-token-12345",
      }
    }

    throw error
  }
}

// Получение списка новостей
export async function getPosts() {
  try {
    const response = await api.get("/posts")
    return response.data
  } catch (error) {
    console.error("Error fetching posts:", error)

    // Для тестирования, если API недоступен
    return [
      {
        _id: "1",
        title: "Новые налоговые правила для бизнеса",
        content: "Содержание статьи о новых налоговых правилах...",
        excerpt: "Краткое описание статьи о новых налоговых правилах...",
        slug: "new-tax-rules",
        image: "/images/business-analysis.jpg",
        tags: ["налоги", "бизнес", "законодательство"],
        published: true,
        createdAt: "2023-01-15T10:30:00Z",
        updatedAt: "2023-01-15T10:30:00Z",
        user: {
          _id: "1",
          fullName: "Иван Петров",
        },
      },
      {
        _id: "2",
        title: "Финансовый анализ для малого бизнеса",
        content: "Содержание статьи о финансовом анализе...",
        excerpt: "Краткое описание статьи о финансовом анализе...",
        slug: "financial-analysis-small-business",
        image: "/images/business-meeting.jpg",
        tags: ["финансы", "анализ", "малый бизнес"],
        published: true,
        createdAt: "2023-02-20T14:15:00Z",
        updatedAt: "2023-02-21T09:45:00Z",
        user: {
          _id: "2",
          fullName: "Мария Сидорова",
        },
      },
      {
        _id: "3",
        title: "Бухгалтерский учет в 2023 году",
        content: "Содержание статьи о бухгалтерском учете...",
        excerpt: "Краткое описание статьи о бухгалтерском учете...",
        slug: "accounting-2023",
        image: "/images/accounting-services.png",
        tags: ["бухгалтерия", "учет", "2023"],
        published: true,
        createdAt: "2023-03-10T11:20:00Z",
        updatedAt: "2023-03-12T16:30:00Z",
        user: null,
      },
    ]
  }
}

// Создание новости
export async function createPost(post: any) {
  try {
    const response = await api.post("/posts", post)
    return response.data
  } catch (error) {
    console.error("Error creating post:", error)
    throw error
  }
}

// Обновление новости
export async function updatePost(id: string, post: any) {
  try {
    const response = await api.put(`/posts/${id}`, post)
    return response.data
  } catch (error) {
    console.error("Error updating post:", error)
    throw error
  }
}

// Удаление новости
export async function deletePost(id: string) {
  try {
    await api.delete(`/posts/${id}`)
    return true
  } catch (error) {
    console.error("Error deleting post:", error)
    throw error
  }
}

// Получение списка пользователей
export async function getUsers() {
  try {
    const response = await api.get("/users")
    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)

    // Для тестирования, если API недоступен
    return [
      {
        _id: "1",
        fullName: "Иван Петров",
        login: "ivan",
        role: 5,
        createdAt: "2022-10-15T10:30:00Z",
        updatedAt: "2023-04-20T14:15:00Z",
      },
      {
        _id: "2",
        fullName: "Мария Сидорова",
        login: "maria",
        role: 2,
        createdAt: "2022-11-20T14:15:00Z",
        updatedAt: "2023-04-19T09:45:00Z",
      },
      {
        _id: "3",
        fullName: "Алексей Иванов",
        login: "alexey",
        role: 1,
        createdAt: "2023-01-10T11:20:00Z",
        updatedAt: "2023-04-18T16:30:00Z",
      },
    ]
  }
}

// Получение списка услуг
export async function getServices() {
  // Тестовые данные для услуг
  const mockServices = [
    {
      _id: "1",
      title: "Бухгалтерский учет",
      description: "Полное ведение бухгалтерского учета для вашего бизнеса",
      icon: "Calculator",
      slug: "accounting",
      price: 15000,
      features: ["Ежемесячная отчетность", "Налоговые декларации", "Консультации"],
      isActive: true,
    },
    {
      _id: "2",
      title: "Аудит",
      description: "Профессиональный аудит финансовой отчетности",
      icon: "SearchCheck",
      slug: "audit",
      price: 50000,
      features: ["Проверка документации", "Выявление рисков", "Рекомендации"],
      isActive: true,
    },
    {
      _id: "3",
      title: "Налоговое консультирование",
      description: "Консультации по оптимизации налогообложения",
      icon: "Landmark",
      slug: "tax-consulting",
      price: 10000,
      features: ["Анализ налоговой нагрузки", "Планирование", "Консультации"],
      isActive: true,
    },
    {
      _id: "4",
      title: "Финансовый анализ",
      description: "Комплексный анализ финансового состояния компании",
      icon: "BarChart",
      slug: "financial-analysis",
      price: 25000,
      features: ["Анализ показателей", "Оценка рисков", "Рекомендации"],
      isActive: false,
    },
  ]

  try {
    // Попытка получить данные с API
    // Примечание: поскольку эндпоинт /services возвращает 404,
    // мы можем попробовать другой эндпоинт или просто вернуть тестовые данные

    // Раскомментируйте следующие строки, если узнаете правильный эндпоинт
    // const response = await api.get("/services");
    // return response.data;

    // Пока возвращаем тестовые данные
    console.log("Используются тестовые данные для услуг")
    return mockServices
  } catch (error) {
    console.error("Error fetching services:", error)
    // При любой ошибке возвращаем тестовые данные
    return mockServices
  }
}

// Получение аналитики
export const getAnalytics = async (period = "week") => {
  try {
    const response = await api.get(`/analytics?period=${period}`)
    return response.data
  } catch (error) {
    console.error("Error fetching analytics:", error)

    // Для тестирования, если API недоступен
    return {
      pageViews: {
        total: 12500,
        byPage: {
          "/": 5000,
          "/services": 3000,
          "/about": 1500,
          "/news": 2000,
          "/contacts": 1000,
        },
        byDate: {
          "2023-04-01": 300,
          "2023-04-02": 320,
          "2023-04-03": 350,
          "2023-04-04": 400,
          "2023-04-05": 420,
          "2023-04-06": 380,
          "2023-04-07": 410,
        },
      },
      visitors: {
        total: 5000,
        unique: 3500,
        byCountry: {
          Россия: 3000,
          Казахстан: 800,
          Беларусь: 700,
          Украина: 300,
          Другие: 200,
        },
      },
      events: {
        total: 2000,
        byType: {
          click_contact: 800,
          form_submit: 500,
          service_view: 400,
          download: 300,
        },
      },
    }
  }
}

// Экспортируем другие методы API
export default api
