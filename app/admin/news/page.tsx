"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getPosts, deletePost } from "@/lib/admin-api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert } from "@/components/ui/alert"
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react"

export default function AdminNewsPage() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const data = await getPosts()
        setPosts(data)
        setFilteredPosts(data)
      } catch (err) {
        setError("Ошибка при загрузке новостей")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts)
    } else {
      const term = searchTerm.toLowerCase()
      const filtered = posts.filter((post: any) => {
        return (
          post.title?.toLowerCase().includes(term) ||
          post.content?.toLowerCase().includes(term) ||
          post.tags?.some((tag: string) => tag.toLowerCase().includes(term))
        )
      })
      setFilteredPosts(filtered)
    }
  }, [searchTerm, posts])

  const handleDelete = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить эту новость?")) {
      try {
        await deletePost(id)
        setPosts(posts.filter((post: any) => post.id !== id))
      } catch (err) {
        setError("Ошибка при удалении новости")
        console.error(err)
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление новостями</h1>
        <Button asChild>
          <Link href="/admin/news/create">
            <Plus className="mr-2 h-4 w-4" />
            Добавить новость
          </Link>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          {error}
        </Alert>
      )}

      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Поиск по заголовку, содержанию или тегам..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Новости не найдены</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заголовок</TableHead>
                <TableHead>Автор</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Просмотры</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post: any) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.user?.fullName || "Неизвестный автор"}</TableCell>
                  <TableCell>{formatDate(post.createdAt)}</TableCell>
                  <TableCell>{post.viewsCount || 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/news/${post.id}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/news/edit/${post.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
