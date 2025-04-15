"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/header"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowLeft, Upload, X } from "lucide-react"

interface AdminUser {
  id: string
  fullName: string
  role: number
}

export default function CreateNewsPage() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [tags, setTags] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Получаем данные пользователя из localStorage
    const userData = localStorage.getItem("adminUser")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem("adminToken")

      // Создаем FormData для отправки файла
      const formData = new FormData()
      formData.append("title", title)
      formData.append("text", text)
      formData.append("tags", tags)
      if (image) {
        formData.append("image", image)
      }

      const response = await fetch("https://api.adb-solution.com/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Не удалось создать новость")
      }

      // Перенаправляем на страницу со списком новостей
      router.push("/admin/news")
    } catch (err) {
      console.error("Ошибка при создании новости:", err)
      setError(err instanceof Error ? err.message : "Произошла ошибка при создании новости")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminHeader user={user} />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => router.back()} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <h1 className="text-2xl font-bold">Добавление новости</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Информация о новости</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

                <div className="space-y-2">
                  <Label htmlFor="title">Заголовок</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="text">Содержание</Label>
                  <Textarea id="text" value={text} onChange={(e) => setText(e.target.value)} rows={10} required />
                  <p className="text-sm text-gray-500">Поддерживается Markdown форматирование</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Теги</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Введите теги через запятую"
                  />
                  <p className="text-sm text-gray-500">Например: Налоги, Бухгалтерия, Аудит</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Изображение</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="max-h-64 rounded-md" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Перетащите изображение сюда или нажмите для выбора</p>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("image")?.click()}
                        >
                          Выбрать изображение
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Отмена
                </Button>
                <Button type="submit" className="bg-[#cdb32f] hover:bg-[#cdb32f]/90" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    "Опубликовать"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </main>
      </div>
    </div>
  )
}
