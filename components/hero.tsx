"use client"

import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  const { t, language } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              {language === "ru"
                ? "Профессиональный аудит и бухгалтерские услуги для вашего бизнеса"
                : "Professional audit and accounting services for your business"}
            </h1>

            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              {language === "ru"
                ? "ADB SOLUTION предлагает полный спектр услуг по аудиту, бухгалтерии и бизнес-консалтингу. Мы помогаем компаниям оптимизировать финансовые процессы и достигать новых высот."
                : "ADB SOLUTION offers a full range of audit, accounting and business consulting services. We help companies optimize financial processes and reach new heights."}
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button
                asChild
                className="bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white rounded-full px-6 py-2 md:px-8 md:py-6 text-sm md:text-base"
              >
                <Link href="/contacts">{t("contactUs")}</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-[#cdb32f] text-[#cdb32f] hover:bg-[#cdb32f]/10 rounded-full px-6 py-2 md:px-8 md:py-6 text-sm md:text-base"
              >
                <Link href="/services">{t("ourServices")}</Link>
              </Button>
            </div>

            <div className="mt-8 md:mt-10 flex items-center space-x-4 md:space-x-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-white font-bold text-xs md:text-sm"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xs md:text-sm font-medium text-gray-900">
                  500+ {language === "ru" ? "клиентов" : "clients"}
                </div>
                <div className="text-xs md:text-sm text-gray-500">
                  {language === "ru" ? "доверяют нам" : "trust us"}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 md:mt-0">
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-16 h-16 md:w-24 md:h-24 bg-[#cdb32f]/20 rounded-full"></div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-24 h-24 md:w-40 md:h-40 bg-[#cdb32f]/10 rounded-full"></div>

            <div className="relative z-10 bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-xl">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog5-387x320.jpg-QOQQJH2oFLx8F4MNzjxlyMXcTNIXNV.jpeg"
                alt="ADB SOLUTION Professional Services"
                className="w-full h-auto rounded-lg"
              />

              <div className="mt-4 md:mt-6 grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                  <div className="text-xl md:text-3xl font-bold text-[#cdb32f]">14+</div>
                  <div className="text-xs md:text-sm text-gray-600">
                    {language === "ru" ? "лет опыта" : "years of experience"}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                  <div className="text-xl md:text-3xl font-bold text-[#cdb32f]">98%</div>
                  <div className="text-xs md:text-sm text-gray-600">
                    {language === "ru" ? "довольных клиентов" : "satisfied clients"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
