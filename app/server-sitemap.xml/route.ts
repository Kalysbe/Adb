import { getServerSideSitemap } from "next-sitemap"
import { getPosts } from "@/lib/api"

export async function GET() {
  try {
    // Получаем все новости
    let newsUrls = []
    try {
      const posts = await getPosts()
      newsUrls = posts.map((post) => ({
        loc: `https://adb-solution.com/news/${post._id}`,
        lastmod: post.updatedAt || post.createdAt,
        changefreq: "weekly",
        priority: 0.8,
      }))
    } catch (error) {
      console.error("Error fetching posts for sitemap:", error)
      // Продолжаем без новостей, если произошла ошибка
    }

    return getServerSideSitemap(newsUrls)
  } catch (error) {
    console.error("Error generating sitemap:", error)
    // Возвращаем пустую карту сайта в случае ошибки
    return getServerSideSitemap([])
  }
}
