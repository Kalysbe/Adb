"use client"

import { useLanguage } from "@/lib/i18n/context"
import Image from "next/image"

export function ServiceHero() {
  const { language } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 pt-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {language === "ru"
                ? "Профессиональные услуги для вашего бизнеса"
                : "Professional services for your business"}
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              {language === "ru"
                ? "ADB SOLUTION предлагает полный спектр услуг по аудиту, бухгалтерии и бизнес-консалтингу. Мы помогаем компаниям оптимизировать финансовые процессы и достигать новых высот."
                : "ADB SOLUTION offers a full range of audit, accounting and business consulting services. We help companies optimize financial processes and reach new heights."}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#cdb32f] text-white rounded-full hover:bg-[#cdb32f]/90 transition-colors"
              >
                {language === "ru" ? "Рассчитать стоимость" : "Calculate cost"}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#cdb32f]/20 rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#cdb32f]/10 rounded-full"></div>

            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl">
              <Image
                src="/images/business-analysis.jpg"
                alt="ADB SOLUTION Professional Services"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
              />

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-[#cdb32f]">10+</div>
                  <div className="text-sm text-gray-600">{language === "ru" ? "услуг" : "services"}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-[#cdb32f]">500+</div>
                  <div className="text-sm text-gray-600">{language === "ru" ? "клиентов" : "clients"}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-[#cdb32f]">24/7</div>
                  <div className="text-sm text-gray-600">{language === "ru" ? "поддержка" : "support"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
