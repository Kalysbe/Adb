"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/redux/hooks"
import { setCredentials } from "@/lib/redux/slices/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function AdminAuthPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Исправленный URL (без www)
      const response = await fetch("https://api.adb-solution.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Ошибка авторизации: ${response.status}`)
      }

      const data = await response.json()

      // Проверяем структуру ответа
      if (!data.token) {
        throw new Error("Неверный формат ответа от сервера")
      }

      // Сохраняем токен и данные пользователя
      localStorage.setItem("token", data.token)

      // Сохраняем данные пользователя, если они есть в ответе
      if (data.user) {
        localStorage.setItem("userData", JSON.stringify(data.user))
      } else {
        // Если данных пользователя нет, создаем минимальный объект
        const userData = {
          _id: data._id || "unknown",
          login: login,
          fullName: data.fullName || login,
          role: data.role || 1,
        }
        localStorage.setItem("userData", JSON.stringify(userData))
      }

      // Обновляем состояние Redux
      dispatch(
        setCredentials({
          user: data.user || { login, fullName: login, role: 1 },
          token: data.token,
        }),
      )

      // Перенаправляем на главную страницу админ-панели
      router.push("/admin")
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Произошла ошибка при авторизации")

      // Если ошибка связана с сетью, предлагаем тестовый вход
      if (err.message === "Failed to fetch" || err.message.includes("network")) {
        setError("Ошибка соединения с сервером. Попробуйте тестовый вход.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestLogin = () => {
    setIsLoading(true)

    // Демо-авторизация
    const mockUser = {
      _id: "65f33135f3796bf553c3063f",
      fullName: "Гульзада Базаркулова",
      login: "admin",
      role: 1,
    }
    const mockToken = "mock-token-for-testing-purposes"

    localStorage.setItem("token", mockToken)
    localStorage.setItem("userData", JSON.stringify(mockUser))

    dispatch(setCredentials({ user: mockUser, token: mockToken }))

    setTimeout(() => {
      router.push("/admin")
    }, 500)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Вход в админ-панель</CardTitle>
          <CardDescription>Введите свои учетные данные для доступа к админ-панели</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="login">Логин</Label>
              <Input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Введите ваш логин"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите ваш пароль"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Вход...
                </>
              ) : (
                "Войти"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-gray-500 mb-2">
            <p>Для тестирования используйте:</p>
            <p>Логин: admin</p>
            <p>Пароль: 12345</p>
          </div>
          <Button variant="outline" onClick={handleTestLogin} className="w-full">
            Тестовый вход (без API)
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
