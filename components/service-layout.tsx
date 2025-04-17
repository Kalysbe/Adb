"use client"

import type { ReactNode } from "react"
import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

interface ServiceLayoutProps {
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  icon: ReactNode
  features: string[]
  featuresEn: string[]
  image: string
  children?: ReactNode
}

export function ServiceLayout({
  title,
  titleEn,
  description,
  descriptionEn,
  icon,
  features,
  featuresEn,
  image,
  children,
}: ServiceLayoutProps) {
  const { language } = useLanguage()

  const currentTitle = language === "ru" ? title : titleEn
  const currentDescription = language === "ru" ? description : descriptionEn
  const currentFeatures = language === "ru" ? features : featuresEn

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center bg-[#cdb32f]/10 p-3 rounded-xl mb-6">
                  {icon}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{currentTitle}</h1>
                <p className="text-lg text-gray-600 mb-8">{currentDescription}</p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white rounded-full px-6">
                    <Link href="/contacts">{language === "ru" ? "Связаться с нами" : "Contact Us"}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#cdb32f] text-[#cdb32f] hover:bg-[#cdb32f]/10 rounded-full px-6"
                  >
                    <a href="#calculator">{language === "ru" ? "Рассчитать стоимость" : "Calculate Cost"}</a>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#cdb32f]/20 rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#cdb32f]/20 rounded-full"></div>
                <div className="relative z-10 bg-white p-4 rounded-xl shadow-lg">
                  <img src={image || "/placeholder.svg"} alt={currentTitle} className="w-full h-auto rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === "ru" ? "Что включает услуга" : "What the Service Includes"}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === "ru"
                  ? "Мы предлагаем комплексный подход к решению ваших задач"
                  : "We offer a comprehensive approach to solving your tasks"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="bg-[#cdb32f]/10 p-2 rounded-full mr-4">
                      <CheckCircle className="h-6 w-6 text-[#cdb32f]" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature}</h3>
                  </div>
                  <p className="text-gray-600 pl-12">
                    {language === "ru"
                      ? "Наши специалисты обеспечат высокое качество и профессиональный подход к решению данной задачи."
                      : "Our specialists will ensure high quality and a professional approach to solving this task."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Content */}
        {children}

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-[#cdb32f]/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {language === "ru" ? "Готовы начать сотрудничество?" : "Ready to Start Cooperation?"}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              {language === "ru"
                ? "Свяжитесь с нами сегодня, чтобы получить консультацию и узнать, как мы можем помочь вашему бизнесу."
                : "Contact us today to get a consultation and find out how we can help your business."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white rounded-full px-8 py-3 text-lg">
                <Link href="/contacts">{language === "ru" ? "Связаться с нами" : "Contact Us"}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#cdb32f] text-[#cdb32f] hover:bg-[#cdb32f]/10 rounded-full px-8 py-3 text-lg"
              >
                <Link href="/services">{language === "ru" ? "Все услуги" : "All Services"}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
