"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { getPosts, updatePost } from "@/lib/admin-api"
import { ArrowLeft } from "lucide-react"

interface Post {
  _id: string
  title: string
  content: string
  excerpt: string
  slug: string
  tags: string[]
  published: boolean
}

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [post, setPost] = useState<Post | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    slug: "",
    tags: "",
    published: true,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const posts = await getPosts()
        const post = posts.find((p: any) => p._id === id)

        if (!post) {
          setError("Новость не найдена")
          return
        }

        setPost(post)
        setFormData({
          title: post.title || "",
          content: post.content || "",
          excerpt: post.excerpt || "",
          slug: post.slug || "",
          tags: post.tags ? post.tags.join(", ") : "",
          published: post.published || false,
        })
      } catch (err) {
        console.error("Error fetching post:", err)
        setError("Не удалось загрузить данные новости")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)

      const postData = {
        ...formData,
        tags: tagsArray,
      }

      await updatePost(id, postData)
      router.push("/admin/posts")
    } catch (err) {
      console.error("Error updating post:", err)
      setError("Не удалось обновить новость. Пожалуйста, попробуйте еще раз.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error && !post) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.push("/admin/posts")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">Ошибка</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="bg-red-50 text-red-500 p-4 rounded-md">{error}</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.push("/admin/posts")} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Редактирование новости</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Редактирование новости</CardTitle>
          <CardDescription>Измените данные новости и сохраните изменения</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Введите заголовок новости"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="url-novosti"
              />
              <p className="text-sm text-gray-500">Используется в URL. Только латинские буквы, цифры и дефисы.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Краткое описание</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                placeholder="Краткое описание новости для списков и превью"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Содержание</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Полное содержание новости"
                rows={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Теги</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="налоги, бизнес, законодательство"
              />
              <p className="text-sm text-gray-500">Разделяйте теги запятыми</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="published" checked={formData.published} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="published">Опубликовать</Label>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                    Сохранение...
                  </>
                ) : (
                  "Сохранить изменения"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
