import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { NewsListWithSearch } from "@/components/news-list-with-search"

export const metadata: Metadata = {
  title: "Новости ADB SOLUTION | Аудит, бухгалтерия, консалтинг",
  description:
    "Последние новости и события компании ADB SOLUTION. Будьте в курсе наших достижений, инноваций и актуальных тем в сфере аудита и бухгалтерии.",
  keywords: ["ADB SOLUTION", "новости", "аудит", "бухгалтерия", "консалтинг", "финансы", "бизнес"],
  alternates: {
    languages: {
      en: "/en/news",
      ru: "/news",
    },
  },
}

export default async function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-adb-gray">Новости и события в сфере аудита и бухгалтерии</h1>

        <NewsListWithSearch />
      </main>
      <Footer />
    </div>
  )
}
