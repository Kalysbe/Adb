import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServicesList } from "@/components/services-list"
import { ServiceCalculator } from "@/components/service-calculator"
import { Testimonials } from "@/components/testimonials"
import { CallToAction } from "@/components/call-to-action"
import { generateMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = generateMetadata({
  title: "Услуги ADB SOLUTION | Аудит, бухгалтерия, консалтинг",
  description:
    "Полный спектр услуг по аудиту, бухгалтерии и бизнес-консалтингу. Рассчитайте стоимость услуг с помощью нашего калькулятора.",
  keywords: ["ADB SOLUTION", "аудит", "бухгалтерские услуги", "консалтинг", "калькулятор стоимости", "Бишкек"],
  canonical: "/services",
  alternateLanguages: {
    ru: "/services",
    en: "/en/services",
  },
})

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <ServiceHero />
        <ServicesList />
        <ServiceCalculator />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
