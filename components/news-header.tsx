"use client"

import { formatDate } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"
import { Eye, Calendar, User } from "lucide-react"
import type { Post } from "@/lib/api"

interface NewsHeaderProps {
  post: Post
}

export function NewsHeader({ post }: NewsHeaderProps) {
  const { language } = useLanguage()

  // Format date for display
  const publishDate = formatDate(post.createdAt, language)

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
      <div className="flex items-center">
        <Eye className="h-4 w-4 mr-1" />
        <span>
          {post.viewsCount} {language === "ru" ? "просмотров" : "views"}
        </span>
      </div>

      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-1" />
        <span>{publishDate}</span>
      </div>

      {post.user && (
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          <span>{post.user.fullName}</span>
        </div>
      )}
    </div>
  )
}
