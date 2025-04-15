import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceLayout } from "@/components/service-layout"
import { BarChart3 } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Финансовый анализ | ADB SOLUTION",
  description:
    "Комплексный финансовый анализ для вашего бизнеса. Оценка финансового состояния, выявление проблем и разработка рекомендаций.",
  keywords: [
    "финансовый анализ",
    "анализ бизнеса",
    "оценка финансового состояния",
    "финансовые показатели",
    "ADB SOLUTION",
  ],
}

export default function FinancialAnalysisPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ServiceLayout
        title="Финансовый анализ"
        titleEn="Financial Analysis"
        description="Комплексный анализ финансового состояния компании и разработка рекомендаций. Мы помогаем выявить сильные и слабые стороны вашего бизнеса, определить пути оптимизации и повышения эффективности."
        descriptionEn="Comprehensive analysis of the company's financial condition and development of recommendations. We help identify the strengths and weaknesses of your business, determine ways to optimize and improve efficiency."
        icon={<BarChart3 className="h-10 w-10 text-[#cdb32f]" />}
        image="/placeholder.svg?height=400&width=600"
        features={[
          "Анализ финансовой отчетности",
          "Оценка финансовой устойчивости",
          "Анализ рентабельности",
          "Анализ ликвидности",
          "Оценка инвестиционной привлекательности",
          "Разработка ре��омендаций",
        ]}
        featuresEn={[
          "Financial Statement Analysis",
          "Financial Stability Assessment",
          "Profitability Analysis",
          "Liquidity Analysis",
          "Investment Attractiveness Assessment",
          "Recommendations Development",
        ]}
      >
        {/* Дополнительный контент для страницы финансового анализа */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ключевые финансовые показатели</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Мы анализируем широкий спектр финансовых показателей для формирования полной картины состояния вашего
                бизнеса
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="bg-[#cdb32f]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-[#cdb32f]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Показатели ликвидности</h3>
                <p className="text-gray-600 text-sm">
                  Оценка способности компании погашать краткосрочные обязательства и преобразовывать активы в денежные
                  средства.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="bg-[#cdb32f]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-[#cdb32f]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Показатели рентабельности</h3>
                <p className="text-gray-600 text-sm">
                  Анализ эффективности использования ресурсов компании и способности генерировать прибыль.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="bg-[#cdb32f]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-[#cdb32f]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Показатели финансовой устойчивости</h3>
                <p className="text-gray-600 text-sm">
                  Оценка структуры капитала, зависимости от внешних источников финансирования и способности
                  противостоять кризисам.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="bg-[#cdb32f]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-[#cdb32f]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Показатели деловой активности</h3>
                <p className="text-gray-600 text-sm">
                  Анализ эффективности использования ресурсов компании, скорости оборота активов и обязательств.
                </p>
              </div>
            </div>

            <div className="mt-16 bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Процесс финансового анализа</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-[#cdb32f]">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Сбор данных</h4>
                  <p className="text-gray-600 text-sm">Получение финансовой отчетности и дополнительной информации</p>
                </div>

                <div className="text-center">
                  <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-[#cdb32f]">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Расчет показателей</h4>
                  <p className="text-gray-600 text-sm">Вычисление ключевых финансовых коэффициентов</p>
                </div>

                <div className="text-center">
                  <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-[#cdb32f]">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Интерпретация</h4>
                  <p className="text-gray-600 text-sm">Анализ полученных результатов и выявление проблемных областей</p>
                </div>

                <div className="text-center">
                  <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-[#cdb32f]">4</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Рекомендации</h4>
                  <p className="text-gray-600 text-sm">Разработка конкретных мер по улучшению финансового состояния</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ServiceLayout>
      <Footer />
    </div>
  )
}
