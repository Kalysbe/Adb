import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceLayout } from "@/components/service-layout"
import { FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Аудиторские услуги в Бишкеке и Кыргызстане | ADB SOLUTION",
  description:
    "Профессиональные аудиторские услуги в Бишкеке и по всему Кыргызстану. Финансовый аудит, налоговый аудит, аудит бизнес-процессов от сертифицированных специалистов ADB SOLUTION.",
  keywords: [
    "аудит Бишкек",
    "аудиторские услуги Кыргызстан",
    "финансовый аудит Бишкек",
    "налоговый аудит Кыргызстан",
    "аудиторская проверка Бишкек",
    "аудиторская компания Кыргызстан",
    "международные стандарты аудита Бишкек",
    "ADB SOLUTION аудит",
  ],
}

export default function AuditPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ServiceLayout
        title="Аудит в Бишкеке и Кыргызстане"
        titleEn="Audit in Bishkek and Kyrgyzstan"
        description="Профессиональный аудит финансовой отчетности в соответствии с международными стандартами. Мы проводим комплексную проверку финансовой документации, выявляем риски и предлагаем рекомендации по их устранению. Наши услуги доступны в Бишкеке и по всему Кыргызстану."
        descriptionEn="Professional audit of financial statements in accordance with international standards. We conduct a comprehensive review of financial documentation, identify risks and offer recommendations for their elimination. Our services are available in Bishkek and throughout Kyrgyzstan."
        icon={<FileText className="h-10 w-10 text-[#cdb32f]" />}
        image="/audit-services-kyrgyzstan.png"
        features={[
          "Аудит финансовой отчетности в Кыргызстане",
          "Налоговый аудит для компаний Бишкека",
          "Аудит бизнес-процессов",
          "Внутренний аудит для организаций Кыргызстана",
          "Аудит соответствия стандартам",
          "Специальные аудиторские проверки в Бишкеке",
        ]}
        featuresEn={[
          "Financial Statement Audit in Kyrgyzstan",
          "Tax Audit for Bishkek companies",
          "Business Process Audit",
          "Internal Audit for Kyrgyzstan organizations",
          "Compliance Audit",
          "Special Audit Reviews in Bishkek",
        ]}
      >
        {/* Дополнительный контент для страницы аудита */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Почему выбирают наш аудит в Кыргызстане</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[#cdb32f]/10 p-2 rounded-full mr-4 mt-1">
                      <FileText className="h-5 w-5 text-[#cdb32f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Опыт и квалификация</h3>
                      <p className="text-gray-600">
                        Наши аудиторы имеют международные сертификаты и многолетний опыт работы с компаниями различных
                        отраслей в Бишкеке и по всему Кыргызстану.
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
                        бизнес-процессов с учетом особенностей ведения бизнеса в Кыргызстане.
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
                        Мы гарантируем полную конфиденциальность всей информации, полученной в ходе аудита, что особенно
                        важно для компаний Бишкека и Кыргызстана.
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
                      <p className="text-gray-600">
                        Определение объема работ, сроков и методологии проведения аудита с учетом специфики бизнеса в
                        Кыргызстане.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[#cdb32f] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      2
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Сбор и анализ информации</h4>
                      <p className="text-gray-600">
                        Изучение документации, проведение интервью, тестирование контрольных процедур в соответствии с
                        законодательством Кыргызстана.
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
                        Определение отклонений от требований законодательства Кыргызской Республики и международных
                        стандартов.
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
                        Подготовка аудиторского заключения с рекомендациями по устранению выявленных проблем с учетом
                        особенностей бизнес-среды Бишкека и Кыргызстана.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Добавим новую секцию с информацией о законодательстве Кыргызстана */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Аудит в соответствии с законодательством Кыргызстана
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Особенности аудита в Кыргызстане</h3>
                <p className="text-gray-600 mb-4">
                  Аудиторская деятельность в Кыргызской Республике регулируется Законом "Об аудиторской деятельности" и
                  другими нормативными актами. Наши специалисты обладают глубокими знаниями местного законодательства и
                  практики его применения.
                </p>
                <p className="text-gray-600">
                  Мы проводим аудит в соответствии с Международными стандартами аудита (МСА), адаптированными к
                  особенностям ведения бизнеса в Кыргызстане, что обеспечивает высокое качество наших услуг и признание
                  результатов аудита как внутри страны, так и за рубежом.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Для кого обязателен аудит в Кыргызстане</h3>
                <p className="text-gray-600 mb-4">
                  В соответствии с законодательством Кыргызской Республики, обязательному аудиту подлежат:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#cdb32f] mr-2">•</span>
                    <span>Банки и финансово-кредитные учреждения</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#cdb32f] mr-2">•</span>
                    <span>Страховые компании</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#cdb32f] mr-2">•</span>
                    <span>Публичные компании, чьи ценные бумаги обращаются на фондовом рынке</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#cdb32f] mr-2">•</span>
                    <span>Инвестиционные фонды</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#cdb32f] mr-2">•</span>
                    <span>Компании с государственной долей участия</span>
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
