"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateNewsPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Здесь будет код для отправки данных на API
      // Пока это заглушка, которая имитирует успешное создание
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // После успешного создания перенаправляем на страницу новостей
      router.push("/admin/news")
      router.refresh()
    } catch (err) {
      console.error("Ошибка при создании новости:", err)
      setError("Не удалось создать новость. Пожалуйста, попробуйте позже.")
    } finally {
      setLoading(false)
    }
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
        <h1 className="text-3xl font-bold text-gray-900">Создание новости</h1>
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/admin/news")}>
              Отмена
            </Button>
            <Button type="submit" className="bg-[#cdb32f] hover:bg-[#cdb32f]/90" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Создание...
                </>
              ) : (
                "Создать новость"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
