import axios from "axios"

// Исправленный URL (без www)
const API_URL = "https://api.adb-solution.com"

// Создаем экземпляр axios с базовым URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 секунд таймаут
})

// Добавляем перехватчик для добавления токена к запросам
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Перехватчик ответов для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)
    return Promise.reject(error)
  },
)

// Сервисы для работы с API
export const authService = {
  login: async (login: string, password: string) => {
    try {
      const response = await apiClient.post("/auth/login", { login, password })
      return response.data
    } catch (error) {
      console.error("Auth service login error:", error)
      throw error
    }
  },
  register: async (userData: any) => {
    const response = await apiClient.post("/auth/register", userData)
    return response.data
  },
}

export const userService = {
  getAll: async () => {
    const response = await apiClient.get("/users")
    return response.data
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/users/${id}`)
    return response.data
  },
  update: async (id: string, userData: any) => {
    const response = await apiClient.put(`/users/${id}`, userData)
    return response.data
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/users/${id}`)
    return response.data
  },
}

export const declarationService = {
  getAll: async () => {
    const response = await apiClient.get("/declarations")
    return response.data
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/declarations/${id}`)
    return response.data
  },
  create: async (declarationData: any) => {
    const response = await apiClient.post("/declarations", declarationData)
    return response.data
  },
  update: async (id: string, declarationData: any) => {
    const response = await apiClient.put(`/declarations/${id}`, declarationData)
    return response.data
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/declarations/${id}`)
    return response.data
  },
}

export const postService = {
  getAll: async () => {
    const response = await apiClient.get("/posts")
    return response.data
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/posts/${id}`)
    return response.data
  },
  create: async (postData: any) => {
    const response = await apiClient.post("/posts", postData)
    return response.data
  },
  createWithGPT: async (prompt: string) => {
    const response = await apiClient.post("/posts/gpt", { prompt })
    return response.data
  },
  update: async (id: string, postData: any) => {
    const response = await apiClient.put(`/posts/${id}`, postData)
    return response.data
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/posts/${id}`)
    return response.data
  },
}

export const clientService = {
  getAll: async () => {
    const response = await apiClient.get("/clients")
    return response.data
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/clients/${id}`)
    return response.data
  },
  create: async (clientData: any) => {
    const response = await apiClient.post("/clients", clientData)
    return response.data
  },
  update: async (id: string, clientData: any) => {
    const response = await apiClient.put(`/clients/${id}`, clientData)
    return response.data
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/clients/${id}`)
    return response.data
  },
}

export const xmlService = {
  getAll: async () => {
    const response = await apiClient.get("/xml")
    return response.data
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/xml/${id}`)
    return response.data
  },
  create: async (xmlData: any) => {
    const response = await apiClient.post("/xml", xmlData)
    return response.data
  },
  update: async (id: string, xmlData: any) => {
    const response = await apiClient.put(`/xml/${id}`, xmlData)
    return response.data
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/xml/${id}`)
    return response.data
  },
}

export default apiClient
