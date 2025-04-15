import axios from "axios"

const instance = axios.create({
  baseURL: "https://api.adb-solution.com/",
})

// Проверка на клиентскую среду для безопасного доступа к localStorage
if (typeof window !== "undefined") {
  instance.interceptors.request.use((config) => {
    // Добавление токена авторизации к заголовкам запроса
    const token = window.localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Обработка ответов
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Если сервер вернул 401 (Unauthorized), перенаправляем на страницу авторизации
      if (error.response && error.response.status === 401) {
        // Очищаем токен
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("user")

        // Перенаправляем на страницу авторизации
        window.location.href = "/admin/auth"
      }
      return Promise.reject(error)
    },
  )
}

export default instance
