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
  title: "ADB SOLUTION | Профессиональные аудит и бизнес-решения",
  description:
    "ADB SOLUTION предлагает инновационные решения для вашего бизнеса: аудит, консалтинг, бухгалтерские услуги. Узнайте больше о наших услугах и продуктах.",
  keywords: ["ADB SOLUTION", "аудит", "бизнес решения", "бухгалтерские услуги", "консалтинг", "Бишкек"],
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
