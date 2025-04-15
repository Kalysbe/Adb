"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getPosts, deletePost } from "@/lib/admin-api"
import { PlusCircle, Pencil, Trash2, Search } from "lucide-react"

interface Post {
  _id: string
  title: string
  slug: string
  published: boolean
  createdAt: string
  user?: {
    fullName: string
  } | null
}

export default function PostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await getPosts()
        setPosts(data)
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("Не удалось загрузить список постов")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      try {
        await deletePost(id)
        setPosts(posts.filter((post) => post._id !== id))
        setDeleteConfirm(null)
      } catch (err) {
        console.error("Error deleting post:", err)
        setError("Не удалось удалить пост")
      }
    } else {
      setDeleteConfirm(id)
    }
  }

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Управление новостями</h1>
        <Button onClick={() => router.push("/admin/posts/create")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Создать новость
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список новостей</CardTitle>
          <CardDescription>Управляйте новостями вашего сайта</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Поиск по заголовку..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "Новости не найдены" : "Нет доступных новостей"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Заголовок</TableHead>
                    <TableHead>Автор</TableHead>
                    <TableHead>Дата создания</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post._id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.user?.fullName || "Неизвестно"}</TableCell>
                      <TableCell>{formatDate(post.createdAt)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {post.published ? "Опубликовано" : "Черновик"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/posts/edit/${post._id}`)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={deleteConfirm === post._id ? "destructive" : "outline"}
                            size="sm"
                            onClick={() => handleDelete(post._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
