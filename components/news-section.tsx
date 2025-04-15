"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getPosts, type Post } from "@/lib/api"
import { useLanguage } from "@/lib/i18n/context"
import { formatDate, truncateText } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t, language } = useLanguage()

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        const data = await getPosts()
        setPosts(data.slice(0, 3)) // Get only the first 3 posts
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

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("latestNews")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {language === "ru"
                ? "Будьте в курсе последних новостей и событий в сфере аудита и бухгалтерии"
                : "Stay up to date with the latest news and events in audit and accounting"}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse h-[400px]">
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
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("latestNews")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("latestNews")}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === "ru"
              ? "Будьте в курсе последних новостей и событий в сфере аудита и бухгалтерии"
              : "Stay up to date with the latest news and events in audit and accounting"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-[400px]"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.imageUrl || "/placeholder.svg?height=200&width=400"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-sm text-[#cdb32f] font-medium">{formatDate(post.createdAt, language)}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3 text-gray-900 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{truncateText(post.text, 150)}</p>
                <Link
                  href={`/${language === "en" ? "en/" : ""}news/${post._id}`}
                  className="inline-flex items-center text-[#cdb32f] hover:text-[#cdb32f]/80 font-medium mt-auto"
                >
                  {t("readMore")}
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

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="border-[#cdb32f] text-[#cdb32f] hover:bg-[#cdb32f]/10 rounded-full px-8"
          >
            <Link href={`/${language === "en" ? "en/" : ""}news`}>{t("allNews")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
