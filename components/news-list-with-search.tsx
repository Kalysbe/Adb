"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { getPosts, searchPosts, type Post } from "@/lib/api"
import { useLanguage } from "@/lib/i18n/context"
import { formatDate, truncateText } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function NewsListWithSearch() {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  const { language } = useLanguage()

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        const data = await getPosts()
        setPosts(data)
        setFilteredPosts(data)
        setError(null)
      } catch (error) {
        console.error("Error loading posts:", error)
        setError(
          language === "ru"
            ? "Не удалось загрузить новости. Пожалуйста, попробуйте позже."
            : "Failed to load news. Please try again later.",
        )
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [language])

  // Функция для выполнения поиска
  const handleSearch = async () => {
    const query = searchInputRef.current?.value?.toLowerCase() || ""

    if (query.trim() === "") {
      setFilteredPosts(posts)
      return
    }

    try {
      setSearching(true)
      // Используем API для поиска, если запрос не пустой
      const results = await searchPosts(query)
      setFilteredPosts(results)
    } catch (error) {
      console.error("Search error:", error)
      // Если API поиска не работает, выполняем поиск на клиенте
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.text.toLowerCase().includes(query) ||
          (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(query))),
      )
      setFilteredPosts(filtered)
    } finally {
      setSearching(false)
      setCurrentPage(1) // Сбрасываем на первую страницу при поиске
    }
  }

  // Вычисляем текущие посты для отображения
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  // Функция для изменения страницы
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (loading) {
    return (
      <div className="w-full">
        <div className="mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder={language === "ru" ? "Поиск по новостям..." : "Search news..."}
              className="pl-10"
              disabled
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse h-[400px]">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">{error}</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="relative">
          <Input
            ref={searchInputRef}
            type="text"
            placeholder={language === "ru" ? "Поиск по новостям..." : "Search news..."}
            className="pl-10"
            defaultValue=""
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            disabled={searching}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Button
            onClick={handleSearch}
            className="absolute right-1 top-1 bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white h-8"
            disabled={searching}
          >
            {searching ? (language === "ru" ? "Поиск..." : "Searching...") : language === "ru" ? "Найти" : "Search"}
          </Button>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">{language === "ru" ? "Новости не найдены" : "No news found"}</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-[400px]"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.imageUrl || "/placeholder.svg?height=200&width=400"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-sm text-[#cdb32f]">{formatDate(post.createdAt, language)}</span>
                  <h2 className="text-xl font-semibold mt-2 mb-3 text-adb-gray line-clamp-2">{post.title}</h2>
                  <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">{truncateText(post.text, 150)}</p>
                  <Link
                    href={`/${language === "en" ? "en/" : ""}news/${post._id}`}
                    className="inline-flex items-center text-[#cdb32f] hover:text-[#cdb32f]/80 mt-auto"
                  >
                    {language === "ru" ? "Читать далее" : "Read more"}
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-gray-300 text-gray-700"
                >
                  {language === "ru" ? "Назад" : "Previous"}
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    onClick={() => paginate(number)}
                    className={
                      currentPage === number
                        ? "bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white"
                        : "border-gray-300 text-gray-700"
                    }
                  >
                    {number}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-gray-300 text-gray-700"
                >
                  {language === "ru" ? "Вперед" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
