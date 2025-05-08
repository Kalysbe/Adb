"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getPost, type Post } from "@/lib/api"

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true)
        const fetchedPost = await getPost(params.id)
        if (fetchedPost) {
          setPost(fetchedPost)
          setTitle(fetchedPost.title)
          setContent(fetchedPost.text)
          setTags(fetchedPost.tags.join(", "))
          setImageUrl(fetchedPost.imageUrl || "")
        } else {
          setError("Новость не найдена")
        }
      } catch (err) {
        console.error("Ошибка при загрузке новости:", err)
        setError("Не удалось загрузить новость. Пожалуйста, попробуйте позже.")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      // Здесь будет код для отправки данных на API
      // Пока это заглушка, которая имитирует успешное обновление
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // После успешного обновления перенаправляем на страницу новостей
      router.push("/admin/news")
      router.refresh()
    } catch (err) {
      console.error("Ошибка при обновлении новости:", err)
      setError("Не удалось обновить новость. Пожалуйста, попробуйте позже.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-[#cdb32f]" />
        <span className="ml-3 text-xl font-medium text-gray-700">Загрузка новости...</span>
      </div>
    )
  }

  if (error && !post) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/admin/news">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к новостям
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Редактирование новости</h1>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>{error}</p>
          <Button variant="outline" className="mt-2" onClick={() => router.push("/admin/news")}>
            Вернуться к списку новостей
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/admin/news">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к новостям
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Редактирование новости</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Информация о новости</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите заголовок новости"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Содержание</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Введите содержание новости"
                rows={10}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Теги (через запятую)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Например: Налоги, Бухгалтерия, Законодательство"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL изображения</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {imageUrl && (
                <div className="mt-2 border rounded-md overflow-hidden w-full max-w-xs">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Предпросмотр"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/error-loading-image.png"
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Статистика</Label>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md">
                <div>
                  <span className="text-sm text-gray-500">Просмотры:</span>
                  <p className="font-medium">{post?.viewsCount || 0}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Дата создания:</span>
                  <p className="font-medium">
                    {post?.createdAt ? new Date(post.createdAt).toLocaleDateString("ru-RU") : "Неизвестно"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/admin/news")}>
              Отмена
            </Button>
            <Button type="submit" className="bg-[#cdb32f] hover:bg-[#cdb32f]/90" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Сохранение...
                </>
              ) : (
                "Сохранить изменения"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
