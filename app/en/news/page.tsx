import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { NewsListWithSearch } from "@/components/news-list-with-search"

export const metadata: Metadata = {
  title: "News | ADB SOLUTION | Audit, Accounting, Consulting",
  description:
    "Latest news and events from ADB SOLUTION. Stay updated with our achievements, innovations, and current topics in audit and accounting.",
  keywords: ["ADB SOLUTION", "news", "audit", "accounting", "consulting", "finance", "business"],
  alternates: {
    languages: {
      en: "/en/news",
      ru: "/news",
    },
  },
}

export default async function NewsPageEn() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-adb-gray">News and Events in Audit and Accounting</h1>

        <NewsListWithSearch />
      </main>
      <Footer />
    </div>
  )
}
