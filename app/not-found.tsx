import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Страница не найдена | ADB SOLUTION",
  description: "Запрашиваемая страница не найдена. Вернитесь на главную страницу ADB SOLUTION.",
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 py-16">
          <h1 className="text-6xl font-bold text-[#cdb32f] mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-adb-gray mb-6">Страница не найдена</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Извините, запрашиваемая страница не существует или была перемещена. Пожалуйста, вернитесь на главную
            страницу.
          </p>
          <Button asChild className="bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white">
            <Link href="/">Вернуться на главную</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
