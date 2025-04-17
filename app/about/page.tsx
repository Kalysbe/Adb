import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "О компании ADB SOLUTION | Профессиональный аудит и консалтинг",
  description:
    "Узнайте больше о компании ADB SOLUTION, нашей истории, миссии и ценностях. Мы предоставляем профессиональные услуги аудита и бизнес-консалтинга.",
  keywords: ["ADB SOLUTION", "аудит", "консалтинг", "бизнес-консультации", "история компании", "миссия", "ценности"],
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-adb-gray">
          О компании ADB SOLUTION: профессиональный аудит и консалтинг
        </h1>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-adb-gray">Наша история</h2>
            <p className="text-gray-700 mb-4">
              Компания ADB SOLUTION была основана в 2010 году группой профессионалов с целью предоставления
              инновационных решений для бизнеса. За годы работы мы выросли из небольшой команды энтузиастов в крупную
              компанию с офисами в нескольких городах.
            </p>
            <p className="text-gray-700">
              Наш опыт и знания позволяют нам успешно реализовывать проекты любой сложности, от небольших локальных
              решений до масштабных корпоративных систем.
            </p>

            <div className="mt-8 relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#cdb32f]/20 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#cdb32f]/10 rounded-full"></div>
              <div className="relative z-10 bg-white p-3 rounded-xl shadow-md">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog5-387x320.jpg-QOQQJH2oFLx8F4MNzjxlyMXcTNIXNV.jpeg"
                  alt="ADB SOLUTION команда"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="bg-adb-gold/20 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-adb-gray">Наша миссия</h2>
            <p className="text-gray-700 mb-4">
              Мы стремимся помогать компаниям достигать новых высот с помощью современных технологий и инновационных
              подходов. Наша цель — создавать решения, которые не только отвечают текущим потребностям бизнеса, но и
              закладывают основу для будущего роста.
            </p>
            <p className="text-gray-700">
              Мы верим, что технологии должны быть доступными и понятными для всех, поэтому уделяем особое внимание
              обучению и поддержке наших клиентов.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-adb-gray">Наши ценности</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-[#cdb32f]">Инновации</h3>
              <p className="text-gray-700">
                Мы постоянно ищем новые подходы и технологии, чтобы предлагать нашим клиентам самые современные решения.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-[#cdb32f]">Качество</h3>
              <p className="text-gray-700">
                Мы не идем на компромиссы, когда речь идет о качестве наших продуктов и услуг.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-[#cdb32f]">Партнерство</h3>
              <p className="text-gray-700">
                Мы строим долгосрочные отношения с нашими клиентами, основанные на доверии и взаимном уважении.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-adb-gray">Наша команда</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-adb-gray">Иван Петров</h3>
                <p className="text-adb-gold">Технический директор</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
