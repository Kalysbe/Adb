import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceLayout } from "@/components/service-layout"
import { Calculator } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Бухгалтерские услуги | ADB SOLUTION",
  description:
    "Профессиональные бухгалтерские услуги для вашего бизнеса. Ведение учета, подготовка отчетности, оптимизация налогообложения.",
  keywords: ["бухгалтерские услуги", "бухгалтерский учет", "финансовая отчетность", "налоговый учет", "ADB SOLUTION"],
}

export default function AccountingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ServiceLayout
        title="Бухгалтерские услуги"
        titleEn="Accounting Services"
        description="Полное бухгалтерское сопровождение бизнеса, включая подготовку и сдачу отчетности. Мы берем на себя все задачи по ведению бухгалтерии, чтобы вы могли сосредоточиться на развитии вашего бизнеса."
        descriptionEn="Complete accounting support for business, including preparation and submission of reports. We take on all accounting tasks so that you can focus on developing your business."
        icon={<Calculator className="h-10 w-10 text-[#cdb32f]" />}
        image="/placeholder.svg?height=400&width=600"
        features={[
          "Ведение бухгалтерского учета",
          "Подготовка и сдача отчетности",
          "Расчет заработной платы",
          "Налоговый учет",
          "Восстановление учета",
          "Консультации по учету",
        ]}
        featuresEn={[
          "Bookkeeping",
          "Preparation and Submission of Reports",
          "Payroll Calculation",
          "Tax Accounting",
          "Accounting Restoration",
          "Accounting Consultations",
        ]}
      >
        {/* Дополнительный контент для страницы бухгалтерских услуг */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Варианты сотрудничества</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Мы предлагаем различные форматы сотрудничества, которые можно адаптировать под потребности вашего
                бизнеса
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Calculator className="h-8 w-8 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Абонентское обслуживание</h3>
                <p className="text-gray-600 mb-4">
                  Комплексное бухгалтерское сопровождение на постоянной основе с фиксированной ежемесячной оплатой.
                </p>
                <ul className="space-y-2 mb-6">
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
                    <span className="text-gray-600 text-sm">Предсказуемые затраты</span>
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
                    <span className="text-gray-600 text-sm">Регулярная отчетность</span>
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
                    <span className="text-gray-600 text-sm">Персональный бухгалтер</span>
                  </li>
                </ul>
                <div className="text-[#cdb32f] font-medium">от 15 000 сом/месяц</div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Calculator className="h-8 w-8 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Главный бухгалтер на аутсорсе</h3>
                <p className="text-gray-600 mb-4">
                  Услуги главного бухгалтера без затрат на содержание штатного сотрудника.
                </p>
                <ul className="space-y-2 mb-6">
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
                    <span className="text-gray-600 text-sm">Экономия на ФОТ</span>
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
                    <span className="text-gray-600 text-sm">Высокая квалификация</span>
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
                    <span className="text-gray-600 text-sm">Финансовая ответственность</span>
                  </li>
                </ul>
                <div className="text-[#cdb32f] font-medium">от 30 000 сом/месяц</div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Calculator className="h-8 w-8 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Разовые услуги</h3>
                <p className="text-gray-600 mb-4">Выполнение отдельных задач по бухгалтерскому учету и отчетности.</p>
                <ul className="space-y-2 mb-6">
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
                    <span className="text-gray-600 text-sm">Оплата за результат</span>
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
                    <span className="text-gray-600 text-sm">Гибкие сроки</span>
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
                    <span className="text-gray-600 text-sm">Индивидуальный подход</span>
                  </li>
                </ul>
                <div className="text-[#cdb32f] font-medium">от 5 000 сом</div>
              </div>
            </div>
          </div>
        </section>
      </ServiceLayout>
      <Footer />
    </div>
  )
}
