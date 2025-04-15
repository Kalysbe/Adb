import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { WorkflowPlan } from "@/components/workflow-plan"
import { NewsSection } from "@/components/news-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ADB SOLUTION | Professional Audit and Business Solutions",
  description:
    "ADB SOLUTION offers innovative solutions for your business: audit, consulting, accounting services. Learn more about our services and products.",
  keywords: ["ADB SOLUTION", "audit", "business solutions", "accounting services", "consulting", "Bishkek"],
  alternates: {
    languages: {
      en: "/en",
      ru: "/",
    },
  },
}

export default function HomeEn() {
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
