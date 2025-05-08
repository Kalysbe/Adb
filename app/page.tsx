import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { WorkflowPlan } from "@/components/workflow-plan"
import { NewsSection } from "@/components/news-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { generateMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = generateMetadata({
  title: "ADB SOLUTION | Аудиторские и бухгалтерские услуги в Бишкеке, Кыргызстан",
  description:
    "Профессиональные аудиторские и бухгалтерские услуги в Бишкеке и по всему Кыргызстану. Аудит, бухгалтерское сопровождение, налоговый консалтинг и бизнес-решения от ADB SOLUTION.",
  keywords: [
    "аудит Бишкек",
    "бухгалтерские услуги Кыргызстан",
    "аудиторские услуги Бишкек",
    "бухгалтерия Кыргызстан",
    "налоговый консалтинг Бишкек",
    "аудиторская компания Кыргызстан",
    "бухгалтерское сопровождение Бишкек",
    "ADB SOLUTION Кыргызстан",
  ],
  canonical: "/",
  alternateLanguages: {
    ru: "https://adb-solution.com/",
    en: "https://adb-solution.com/en",
  },
})

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <WorkflowPlan />
        <NewsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
