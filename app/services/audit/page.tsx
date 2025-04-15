import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceLayout } from "@/components/service-layout"
import { FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Аудит | ADB SOLUTION",
  description:
    "Профессиональные услуги аудита для вашего бизнеса. Проверка финансовой отчетности, выявление рисков и рекомендации по оптимизации.",
  keywords: ["аудит", "финансовый аудит", "аудиторские услуги", "проверка отчетности", "ADB SOLUTION"],
}

export default function AuditPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ServiceLayout
        title="Аудит"
        titleEn="Audit"
        description="Профессиональный аудит финансовой отчетности в соответствии с международными стандартами. Мы проводим комплексную проверку финансовой документации, выявляем риски и предлагаем рекомендации по их устранению."
        descriptionEn="Professional audit of financial statements in accordance with international standards. We conduct a comprehensive review of financial documentation, identify risks and offer recommendations for their elimination."
        icon={<FileText className="h-10 w-10 text-[#cdb32f]" />}
        image="/placeholder.svg?height=400&width=600"
        features={[
          "Аудит финансовой отчетности",
          "Налоговый аудит",
          "Аудит бизнес-процессов",
          "Внутренний аудит",
          "Аудит соответствия стандартам",
          "Специальные аудиторские проверки",
        ]}
        featuresEn={[
          "Financial Statement Audit",
          "Tax Audit",
          "Business Process Audit",
          "Internal Audit",
          "Compliance Audit",
          "Special Audit Reviews",
        ]}
      >
        {/* Дополнительный контент для страницы аудита */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Почему выбирают наш аудит</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[#cdb32f]/10 p-2 rounded-full mr-4 mt-1">
                      <FileText className="h-5 w-5 text-[#cdb32f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Опыт и квалификация</h3>
                      <p className="text-gray-600">
                        Наши аудиторы имеют международные сертификаты и многолетний опыт работы с компаниями различных
                        отраслей.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#cdb32f]/10 p-2 rounded-full mr-4 mt-1">
                      <FileText className="h-5 w-5 text-[#cdb32f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Комплексный подход</h3>
                      <p className="text-gray-600">
                        Мы не только выявляем проблемы, но и предлагаем конкретные решения для оптимизации
                        бизнес-процессов.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#cdb32f]/10 p-2 rounded-full mr-4 mt-1">
                      <FileText className="h-5 w-5 text-[#cdb32f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Конфиденциальность</h3>
                      <p className="text-gray-600">
                        Мы гарантируем полную конфиденциальность всей информации, полученной в ходе аудита.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Этапы проведения аудита</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="bg-[#cdb32f] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      1
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Планирование</h4>
                      <p className="text-gray-600">Определение объема работ, сроков и методологии проведения аудита.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[#cdb32f] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      2
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Сбор и анализ информации</h4>
                      <p className="text-gray-600">
                        Изучение документации, проведение интервью, тестирование контрольных процедур.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[#cdb32f] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      3
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Выявление несоответствий</h4>
                      <p className="text-gray-600">
                        Определение отклонений от требований законодательства и стандартов.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[#cdb32f] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      4
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Формирование отчета</h4>
                      <p className="text-gray-600">
                        Подготовка аудиторского заключения с рекомендациями по устранению выявленных проблем.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </ServiceLayout>
      <Footer />
    </div>
  )
}
