"use client"

import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface NewsPromoBannerProps {
  topic?: string
}

export function NewsPromoBanner({ topic = "" }: NewsPromoBannerProps) {
  const { language } = useLanguage()

  const getPromoText = () => {
    if (topic) {
      return language === "ru"
        ? `У вас возникли вопросы по теме "${topic}"? Мы можем помочь!`
        : `Do you have questions about "${topic}"? We can help!`
    }

    return language === "ru"
      ? "У вас возникли вопросы по этой теме? Мы можем помочь!"
      : "Do you have questions about this topic? We can help!"
  }

  return (
    <div className="bg-[#cdb32f]/10 rounded-lg p-4 md:p-6 my-12 border-l-4 border-[#cdb32f]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">{getPromoText()}</h3>
          <p className="text-sm md:text-base text-gray-600">
            {language === "ru"
              ? "Наши эксперты предоставят профессиональную консультацию и помогут решить вашу задачу."
              : "Our experts will provide professional advice and help solve your problem."}
          </p>
        </div>
        <Button asChild className="bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white whitespace-nowrap mt-2 md:mt-0">
          <Link href="/contacts">
            {language === "ru" ? "Получить консультацию" : "Get a consultation"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
