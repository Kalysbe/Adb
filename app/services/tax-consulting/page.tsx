import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceLayout } from "@/components/service-layout"
import { FileCheck } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Налоговый консалтинг | ADB SOLUTION",
  description:
    "Профессиональные услуги налогового консалтинга. Оптимизация налогообложения, консультации по налоговым вопросам и планирование.",
  keywords: [
    "налоговый консалтинг",
    "оптимизация налогов",
    "налоговое планирование",
    "налоговые консультации",
    "ADB SOLUTION",
  ],
}

export default function TaxConsultingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ServiceLayout
        title="Налоговый консалтинг"
        titleEn="Tax Consulting"
        description="Оптимизация налогообложения, консультации по налоговым вопросам и планирование. Мы помогаем минимизировать налоговые риски и выбрать оптимальную систему налогообложения для вашего бизнеса."
        descriptionEn="Tax optimization, tax advice and planning. We help minimize tax risks and choose the optimal taxation system for your business."
        icon={<FileCheck className="h-10 w-10 text-[#cdb32f]" />}
        image="/placeholder.svg?height=400&width=600"
        features={[
          "Налоговое планирование",
          "Оптимизация налогообложения",
          "Налоговые консультации",
          "Сопровождение налоговых проверок",
          "Разрешение налоговых споров",
          "Международное налогообложение",
        ]}
        featuresEn={[
          "Tax Planning",
          "Tax Optimization",
          "Tax Consultations",
          "Tax Audit Support",
          "Tax Dispute Resolution",
          "International Taxation",
        ]}
      >
        {/* Дополнительный контент для страницы налогового консалтинга */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Преимущества налогового консалтинга</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#cdb32f]/10 p-2 rounded-full mr-4 mt-1">
                      <FileCheck className="h-5 w-5 text-[#cdb32f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Снижение налоговой нагрузки</h3>
                      <p className="text-gray-600">
                        Законная оптимизация налогообложения позволяет существенно снизить налоговые платежи и увеличить
                        чистую прибыль компании.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#cdb32f]/10 p-2 rounded-full mr-4 mt-1">
                      <FileCheck className="h-5 w-5 text-[#cdb32f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Минимизация рисков</h3>
                      <p className="text-gray-600">
                        Профессиональный подход к налоговому планированию позволяет избежать штрафов, пеней и других
                        негативных последствий.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#cdb32f]/10 p-2 rounded-full mr-4 mt-1">
                      <FileCheck className="h-5 w-5 text-[#cdb32f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Экспертная поддержка</h3>
                      <p className="text-gray-600">
                        Наши специалисты постоянно отслеживают изменения в налоговом законодательстве и оперативно
                        адаптируют налоговую стратегию компании.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Часто задаваемые вопросы</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Чем отличается налоговая оптимизация от уклонения от уплаты налогов?
                    </h4>
                    <p className="text-gray-600">
                      Налоговая оптимизация — это законное использование предусмотренных налоговым законодательством
                      возможностей для снижения налоговой нагрузки. Уклонение от уплаты налогов — это нарушение закона,
                      которое может привести к серьезным последствиям.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Как часто нужно пересматривать налоговую стратегию?
                    </h4>
                    <p className="text-gray-600">
                      Рекомендуется пересматривать налоговую стратегию не реже одного раза в год, а также при
                      существенных изменениях в налоговом законодательстве или в структуре бизнеса.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Какие документы нужны для налогового консультирования?
                    </h4>
                    <p className="text-gray-600">
                      Для начала работы обычно требуются учредительные документы, финансовая отчетность, налоговые
                      декларации за предыдущие периоды, информация о структуре бизнеса и основных бизнес-процессах.
                    </p>
                  </div>
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
