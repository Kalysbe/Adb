"use client"

import { useState } from "react"
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
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

// Моковые данные для новостей
const mockNews = [
  {
    id: "1",
    title: "Налоговые изменения 2023 года: что нужно знать бизнесу",
    status: "published",
    date: "2023-12-15",
    views: 245,
    author: "Алексей Иванов",
  },
  {
    id: "2",
    title: "Финансовая отчетность по МСФО: основные принципы",
    status: "published",
    date: "2023-12-10",
    views: 187,
    author: "Елена Смирнова",
  },
  {
    id: "3",
    title: "Оптимизация налогообложения для малого бизнеса",
    status: "published",
    date: "2023-12-05",
    views: 210,
    author: "Дмитрий Петров",
  },
  {
    id: "4",
    title: "Новые требования к бухгалтерской отчетности в 2024 году",
    status: "draft",
    date: "2023-12-01",
    views: 0,
    author: "Гульзада Базаркулова",
  },
  {
    id: "5",
    title: "Как подготовиться к налоговой проверке: советы экспертов",
    status: "published",
    date: "2023-11-25",
    views: 320,
    author: "Алексей Иванов",
  },
]

export default function NewsManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  // Фильтрация новостей по поисковому запросу
  const filteredNews = mockNews.filter(
    (news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
            placeholder="Поиск по заголовку или автору..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Фильтры</Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Заголовок</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Просмотры</TableHead>
              <TableHead>Автор</TableHead>
              <TableHead className="w-[80px]">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNews.map((news) => (
              <TableRow key={news.id}>
                <TableCell className="font-medium">{news.title}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      news.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {news.status === "published" ? "Опубликовано" : "Черновик"}
                  </span>
                </TableCell>
                <TableCell>{new Date(news.date).toLocaleDateString("ru-RU")}</TableCell>
                <TableCell>{news.views}</TableCell>
                <TableCell>{news.author}</TableCell>
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
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Просмотр
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Редактировать
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Удалить
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
