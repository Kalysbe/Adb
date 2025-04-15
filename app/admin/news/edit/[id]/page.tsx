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

// Обновим интерфейс Post, чтобы user мог быть null или undefined
interface Post {
  _id: string
  title: string
  text: string
  tags: string[]
  viewsCount: number
  user?: {
    _id: string
    fullName: string
  } | null
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [post, setPost] = useState<Post | null>(null)
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [tags, setTags] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Получаем данные пользователя из localStorage
    const userData = localStorage.getItem("adminUser")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Загружаем данные новости
    const fetchPost = async () => {
      setIsLoading(true)
      try {
        const token = localStorage.getItem("adminToken")
        const response = await fetch(`https://api.adb-solution.com/posts/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Не удалось загрузить новость")
        }

        const data = await response.json()
        setPost(data)
        setTitle(data.title)
        setText(data.text)
        setTags(data.tags.join(", "))
        if (data.imageUrl) {
          setImagePreview(data.imageUrl)
        }
      } catch (err) {
        console.error("Ошибка при загрузке новости:", err)
        setError(err instanceof Error ? err.message : "Произошла ошибка при загрузке новости")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

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
    setIsSaving(true)
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

      const response = await fetch(`https://api.adb-solution.com/posts/${params.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Не удалось обновить новость")
      }

      // Перенаправляем на страницу со списком новостей
      router.push("/admin/news")
    } catch (err) {
      console.error("Ошибка при обновлении новости:", err)
      setError(err instanceof Error ? err.message : "Произошла ошибка при обновлении новости")
    } finally {
      setIsSaving(false)
    }
  }

  if (!user) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <AdminHeader user={user} />
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-6 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#cdb32f]" />
          </main>
        </div>
      </div>
    )
  }

  if (error && !post) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <AdminHeader user={user} />
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="bg-red-50 text-red-600 p-4 rounded-md">
              {error}
              <Button className="mt-4" variant="outline" onClick={() => router.push("/admin/news")}>
                Вернуться к списку новостей
              </Button>
            </div>
          </main>
        </div>
      </div>
    )
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
            <h1 className="text-2xl font-bold">Редактирование новости</h1>
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
                <Button type="submit" className="bg-[#cdb32f] hover:bg-[#cdb32f]/90" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    "Сохранить изменения"
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
