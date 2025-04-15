"use client"

import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Check } from "lucide-react"

export function AppPromo() {
  const { language } = useLanguage()

  const features = [
    language === "ru" ? "Доступ к финансовой отчетности 24/7" : "Access to financial reporting 24/7",
    language === "ru" ? "Онлайн-консультации с экспертами" : "Online consultations with experts",
    language === "ru" ? "Уведомления о важных сроках" : "Notifications about important deadlines",
    language === "ru" ? "Безопасное хранение документов" : "Secure document storage",
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              {language === "ru"
                ? "Управляйте финансами вашего бизнеса с нашим мобильным приложением"
                : "Manage your business finances with our mobile app"}
            </h2>

            <p className="text-gray-300 mb-8">
              {language === "ru"
                ? "Наше мобильное приложение позволяет вам всегда быть в курсе финансового состояния вашего бизнеса. Получайте доступ к отчетам, консультируйтесь с экспертами и управляйте документами в любое время и в любом месте."
                : "Our mobile app allows you to always be aware of the financial condition of your business. Get access to reports, consult with experts and manage documents anytime, anywhere."}
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-[#cdb32f] rounded-full p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white rounded-full px-6">
                {language === "ru" ? "Скачать для iOS" : "Download for iOS"}
              </Button>

              <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6">
                {language === "ru" ? "Скачать для Android" : "Download for Android"}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#cdb32f]/20 rounded-full blur-2xl opacity-60"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#cdb32f]/20 rounded-full blur-2xl opacity-60"></div>

            <div className="relative z-10 bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-3xl shadow-2xl border border-gray-700">
              <div className="bg-gray-800 rounded-2xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=300"
                  alt="ADB SOLUTION Mobile App"
                  width={300}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
