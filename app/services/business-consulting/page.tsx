import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceLayout } from "@/components/service-layout"
import { TrendingUp } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Бизнес-консалтинг | ADB SOLUTION",
  description:
    "Профессиональные услуги бизнес-консалтинга. Разработка бизнес-планов, стратегий развития и оптимизация бизнес-процессов.",
  keywords: [
    "бизнес-консалтинг",
    "бизнес-планирование",
    "стратегия развития",
    "оптимизация бизнес-процессов",
    "ADB SOLUTION",
  ],
}

export default function BusinessConsultingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ServiceLayout
        title="Бизнес-консалтинг"
        titleEn="Business Consulting"
        description="Разработка бизнес-планов, стратегий развития и оптимизация бизнес-процессов. Мы помогаем вашему бизнесу расти и развиваться, предлагая индивидуальные решения для достижения ваших целей."
        descriptionEn="Development of business plans, development strategies and optimization of business processes. We help your business grow and develop by offering individual solutions to achieve your goals."
        icon={<TrendingUp className="h-10 w-10 text-[#cdb32f]" />}
        image="/placeholder.svg?height=400&width=600"
        features={[
          "Разработка бизнес-планов",
          "Стратегическое планирование",
          "Оптимизация бизнес-процессов",
          "Финансовое моделирование",
          "Управленческий консалтинг",
          "Маркетинговые стратегии",
        ]}
        featuresEn={[
          "Business Plan Development",
          "Strategic Planning",
          "Business Process Optimization",
          "Financial Modeling",
          "Management Consulting",
          "Marketing Strategies",
        ]}
      >
        {/* Дополнительный контент для страницы бизнес-консалтинга */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши консалтинговые услуги</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Мы предлагаем комплексные решения для развития и оптимизации вашего бизнеса
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Бизнес-планирование</h3>
                <p className="text-gray-600 mb-4">
                  Разработка детальных бизнес-планов для запуска новых проектов, привлечения инвестиций или развития
                  существующего бизнеса.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Анализ рынка и конкурентов</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Финансовые прогнозы</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Стратегия выхода на рынок</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Оптимизация бизнес-процессов</h3>
                <p className="text-gray-600 mb-4">
                  Анализ и совершенствование бизнес-процессов для повышения эффективности и снижения затрат.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Аудит бизнес-процессов</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Реинжиниринг процессов</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Автоматизация процессов</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Стратегическое развитие</h3>
                <p className="text-gray-600 mb-4">
                  Разработка долгосрочных стратегий развития бизнеса с учетом рыночных тенденций и конкурентной среды.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Анализ рыночных тенденций</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Разработка стратегии</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Планирование роста</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Финансовое моделирование</h3>
                <p className="text-gray-600 mb-4">
                  Создание финансовых моделей для прогнозирования результатов деятельности и оценки инвестиционных
                  проектов.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Прогнозирование денежных потоков</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Оценка инвестиционных проектов</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Сценарный анализ</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Управленческий консалтинг</h3>
                <p className="text-gray-600 mb-4">
                  Консультации по вопросам управления компанией, организационной структуры и повышения эффективности
                  руководства.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Оптимизация организационной структуры</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Повышение эффективности управления</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Развитие управленческих компетенций</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Маркетинговые стратегии</h3>
                <p className="text-gray-600 mb-4">
                  Разработка эффективных маркетинговых стратегий для продвижения продуктов и услуг, увеличения продаж и
                  укрепления позиций на рынке.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Анализ целевой аудитории</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Разработка маркетинговых планов</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-[#cdb32f]/20 rounded-full p-1 mr-2">
                      <svg className="h-3 w-3 text-[#cdb32f]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">Стратегии продвижения</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ServiceLayout>
      <Footer />
    </div>
  )
}
