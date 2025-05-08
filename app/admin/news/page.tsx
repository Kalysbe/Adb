"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import { getPosts, type Post } from "@/lib/api"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

export default function NewsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const fetchedPosts = await getPosts()
        setPosts(fetchedPosts)
        setError(null)
      } catch (err) {
        console.error("Ошибка при загрузке новостей:", err)
        setError("Не удалось загрузить новости. Пожалуйста, попробуйте позже.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Фильтрация новостей по поисковому запросу
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.user?.fullName && post.user.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy", { locale: ru })
    } catch (e) {
      return "Неизвестная дата"
    }
  }

  // Определение статуса поста (можно расширить логику)
  const getPostStatus = (post: Post) => {
    // Здесь можно добавить логику определения статуса
    // Например, на основе каких-то полей из API
    return post.viewsCount > 0 ? "published" : "draft"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Управление новостями</h1>
        <Button asChild className="bg-[#cdb32f] hover:bg-[#cdb32f]/90">
          <Link href="/admin/news/create">
            <Plus className="h-4 w-4 mr-2" />
            Добавить новость
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Поиск по заголовку, автору или тегам..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Фильтры</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-[#cdb32f]" />
          <span className="ml-2 text-lg">Загрузка новостей...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>{error}</p>
          <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
            Попробовать снова
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заголовок</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата публикации</TableHead>
                <TableHead>Просмотры</TableHead>
                <TableHead>Автор</TableHead>
                <TableHead>Теги</TableHead>
                <TableHead className="w-[80px]">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                    {searchQuery
                      ? "Новости не найдены. Попробуйте изменить поисковый запрос."
                      : "Новости не найдены. Добавьте первую новость!"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell className="font-medium max-w-xs truncate" title={post.title}>
                      {post.title}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getPostStatus(post) === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {getPostStatus(post) === "published" ? "Опубликовано" : "Черновик"}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(post.createdAt)}</TableCell>
                    <TableCell>{post.viewsCount}</TableCell>
                    <TableCell>{post.user?.fullName || "Неизвестный автор"}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Открыть меню</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Действия</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/news/${post._id}`} className="flex items-center cursor-pointer">
                              <Eye className="h-4 w-4 mr-2" />
                              Просмотр
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/news/edit/${post._id}`} className="flex items-center cursor-pointer">
                              <Edit className="h-4 w-4 mr-2" />
                              Редактировать
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 cursor-pointer">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
