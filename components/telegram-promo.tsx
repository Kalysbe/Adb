"use client"

import { useLanguage } from "@/lib/i18n/context"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TelegramPromo() {
  const { language } = useLanguage()

  return (
    <div className="bg-blue-50 rounded-lg p-4 my-8 border border-blue-100">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
          <Send className="h-6 w-6 text-white" />
        </div>
        <div className="flex-grow text-center sm:text-left">
          <h3 className="font-medium text-gray-900">
            {language === "ru" ? "Все самое интересное в Telegram" : "All the most interesting in Telegram"}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {language === "ru"
              ? "Подписывайтесь на наш канал, чтобы быть в курсе последних новостей"
              : "Subscribe to our channel to keep up with the latest news"}
          </p>
        </div>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto"
          onClick={() => window.open("https://t.me/adb_solution_news", "_blank")}
        >
          {language === "ru" ? "Подписаться" : "Subscribe"}
        </Button>
      </div>
    </div>
  )
}
