import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getPost, getPosts } from "@/lib/api"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ReactMarkdown from "react-markdown"
import { truncateText } from "@/lib/utils"
import { NewsPromoBanner } from "@/components/news-promo-banner"
import { RelatedNews } from "@/components/related-news"
import { TelegramPromo } from "@/components/telegram-promo"
import { NewsHeader } from "@/components/news-header"
import { SocialShare } from "@/components/social-share"

interface NewsPostPageProps {
  params: {
    id: string
  }
}

// Обновим интерфейс Post, чтобы user мог быть null или undefined
interface Post {
  _id: string
  title: string
  text: string
  tags: string[]
  viewsCount: number
  user?: {
    _id: string
    fullName: string
  } | null
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

// Обновим метаданные, чтобы избежать ошибки с null
export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const post = await getPost(params.id)

  if (!post) {
    return {
      title: "Новость не найдена | ADB SOLUTION",
      description: "Запрашиваемая новость не найдена.",
    }
  }

  const description = truncateText(post.text, 160)

  return {
    title: `${post.title} | ADB SOLUTION`,
    description: description,
    keywords: post.tags || [],
    authors: post.user ? [{ name: post.user.fullName }] : [{ name: "ADB SOLUTION" }],
    alternates: {
      languages: {
        en: `/en/news/${params.id}`,
        ru: `/news/${params.id}`,
      },
    },
    openGraph: {
      title: post.title,
      description: description,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: post.user ? [post.user.fullName] : ["ADB SOLUTION"],
      tags: post.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    id: post._id,
  }))
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  // Получаем похожие новости по тегам
  const allPosts = await getPosts()
  const relatedPosts = allPosts
    .filter((p) => p._id !== post._id && p.tags && post.tags && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                {post.imageUrl && (
                  <div className="w-full h-auto aspect-video relative overflow-hidden">
                    <img
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-4 md:p-6 lg:p-8">
                  <NewsHeader post={post} />

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900">{post.title}</h1>

                  <TelegramPromo />

                  <SocialShare url={`/news/${post._id}`} title={post.title} />

                  <div className="prose prose-lg max-w-none mt-8">
                    <ReactMarkdown>{post.text}</ReactMarkdown>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-12 pt-6 border-t border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900 mb-3">Теги:</h2>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <NewsPromoBanner topic={post.title} />
                </div>
              </article>

              {relatedPosts.length > 0 && (
                <div className="mt-8">
                  <RelatedNews posts={relatedPosts} />
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Популярные новости</h2>
                <div className="space-y-4">
                  {allPosts
                    .sort((a, b) => b.viewsCount - a.viewsCount)
                    .slice(0, 5)
                    .map((popularPost) => (
                      <a key={popularPost._id} href={`/news/${popularPost._id}`} className="block group">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded overflow-hidden">
                            <img
                              src={popularPost.imageUrl || "/placeholder.svg?height=80&width=80"}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#cdb32f] line-clamp-3">
                              {popularPost.title}
                            </h3>
                            <div className="text-xs text-gray-500 mt-1">{popularPost.viewsCount} просмотров</div>
                          </div>
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: post.title,
            datePublished: post.createdAt,
            dateModified: post.updatedAt,
            author: {
              "@type": "Person",
              name: post.user ? post.user.fullName : "ADB SOLUTION",
            },
            publisher: {
              "@type": "Organization",
              name: "ADB SOLUTION",
              logo: {
                "@type": "ImageObject",
                url: "https://adb-solution.com/mainlogo.png",
              },
            },
            description: truncateText(post.text, 160),
            keywords: (post.tags || []).join(", "),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://adb-solution.com/news/${post._id}`,
            },
            image: post.imageUrl || "https://adb-solution.com/og-image.jpg",
          }),
        }}
      />
    </div>
  )
}
