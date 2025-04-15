"use client"

import { useLanguage } from "@/lib/i18n/context"
import Link from "next/link"
import { formatDate, truncateText } from "@/lib/utils"
import type { Post } from "@/lib/api"

interface RelatedNewsProps {
  posts: Post[]
}

export function RelatedNews({ posts }: RelatedNewsProps) {
  const { language } = useLanguage()

  if (posts.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        {language === "ru" ? "Похожие новости" : "Related News"}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/${language === "en" ? "en/" : ""}news/${post._id}`} className="group">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img
                  src={post.imageUrl || "/placeholder.svg?height=160&width=300"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-2">{formatDate(post.createdAt, language)}</div>
                <h3 className="font-medium text-gray-900 group-hover:text-[#cdb32f] line-clamp-2 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{truncateText(post.text, 100)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
