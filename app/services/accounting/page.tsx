import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceLayout } from "@/components/service-layout"
import { Calculator } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Бухгалтерские услуги в Бишкеке и Кыргызстане | ADB SOLUTION",
  description:
    "Профессиональные бухгалтерские услуги для бизнеса в Бишкеке и Кыргызстане. Ведение учета, подготовка отчетности, оптимизация налогообложения от опытных специалистов ADB SOLUTION.",
  keywords: [
    "бухгалтерские услуги Бишкек",
    "бухгалтерия Кыргызстан",
    "бухгалтерское сопровождение Бишкек",
    "ведение бухгалтерии Кыргызстан",
    "бухгалтерский учет Бишкек",
    "налоговая отчетность Кыргызстан",
    "главный бухгалтер аутсорс Бишкек",
    "ADB SOLUTION бухгалтерия",
  ],
}

export default function AccountingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ServiceLayout
        title="Бухгалтерские услуги в Бишкеке"
        titleEn="Accounting Services in Bishkek"
        description="Полное бухгалтерское сопровождение бизнеса в Бишкеке и Кыргызстане, включая подготовку и сдачу отчетности. Мы берем на себя все задачи по ведению бухгалтерии, чтобы вы могли сосредоточиться на развитии вашего бизнеса."
        descriptionEn="Complete accounting support for business in Bishkek and Kyrgyzstan, including preparation and submission of reports. We take on all accounting tasks so that you can focus on developing your business."
        icon={<Calculator className="h-10 w-10 text-[#cdb32f]" />}
        image="/placeholder.svg?key=uxreb"
        features={[
          "Ведение бухгалтерского учета по стандартам Кыргызстана",
          "Подготовка и сдача отчетности в органы Кыргызской Республики",
          "Расчет заработной платы по ТК Кыргызстана",
          "Налоговый учет в соответствии с НК Кыргызской Республики",
          "Восстановление учета для компаний Бишкека",
          "Консультации по бухгалтерскому учету в Кыргызстане",
        ]}
        featuresEn={[
          "Bookkeeping according to Kyrgyzstan standards",
          "Preparation and Submission of Reports to Kyrgyz Republic authorities",
          "Payroll Calculation according to Kyrgyzstan Labor Code",
          "Tax Accounting in accordance with the Tax Code of the Kyrgyz Republic",
          "Accounting Restoration for Bishkek companies",
          "Accounting Consultations in Kyrgyzstan",
        ]}
      >
        {/* Дополнительный контент для страницы бухгалтерских услуг */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Варианты сотрудничества в Бишкеке</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Мы предлагаем различные форматы сотрудничества, которые можно адаптировать под потребности вашего
                бизнеса в Кыргызстане
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Calculator className="h-8 w-8 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Абонентское обслуживание в Бишкеке</h3>
                <p className="text-gray-600 mb-4">
                  Комплексное бухгалтерское сопровождение на постоянной основе с фиксированной ежемесячной оплатой для
                  компаний Кыргызстана.
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
                    <span className="text-gray-600 text-sm">Регулярная отчетность по стандартам Кыргызстана</span>
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
                    <span className="text-gray-600 text-sm">Персональный бухгалтер со знанием законов Кыргызстана</span>
                  </li>
                </ul>
                <div className="text-[#cdb32f] font-medium">от 15 000 сом/месяц</div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Calculator className="h-8 w-8 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Главный бухгалтер на аутсорсе в Бишкеке</h3>
                <p className="text-gray-600 mb-4">
                  Услуги главного бухгалтера без затрат на содержание штатного сотрудника для компаний Кыргызстана.
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
                    <span className="text-gray-600 text-sm">Экономия на ФОТ по законам Кыргызстана</span>
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
                    <span className="text-gray-600 text-sm">Высокая квалификация в бухгалтерии Кыргызстана</span>
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
                    <span className="text-gray-600 text-sm">
                      Финансовая ответственность по законам Кыргызской Республики
                    </span>
                  </li>
                </ul>
                <div className="text-[#cdb32f] font-medium">от 30 000 сом/месяц</div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Calculator className="h-8 w-8 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Разовые услуги в Бишкеке</h3>
                <p className="text-gray-600 mb-4">
                  Выполнение отдельных задач по бухгалтерскому учету и отчетности для компаний Кыргызстана.
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
                    <span className="text-gray-600 text-sm">Гибкие сроки для компаний Бишкека</span>
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
                    <span className="text-gray-600 text-sm">Индивидуальный подход к бизнесу в Кыргызстане</span>
                  </li>
                </ul>
                <div className="text-[#cdb32f] font-medium">от 5 000 сом</div>
              </div>
            </div>
          </div>
        </section>

        {/* Добавим новую секцию о бухгалтерии в Кыргызстане */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Особенности бухгалтерского учета в Кыргызстане
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Законодательство Кыргызской Республики</h3>
                <p className="text-gray-600 mb-4">
                  Бухгалтерский учет в Кыргызстане регулируется Законом "О бухгалтерском учете", Налоговым кодексом
                  Кыргызской Республики и другими нормативными актами. Наши специалисты постоянно следят за изменениями
                  в законодательстве и обеспечивают соответствие вашей отчетности всем требованиям.
                </p>
                <p className="text-gray-600">
                  Мы помогаем компаниям Бишкека и всего Кыргызстана вести учет в соответствии с Международными
                  стандартами финансовой отчетности (МСФО) и национальными стандартами бухгалтерского учета Кыргызской
                  Республики.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Налоговая система Кыргызстана</h3>
                <p className="text-gray-600 mb-4">
                  Налоговая система Кыргызской Республики имеет свои особенности, которые необходимо учитывать при
                  ведении бизнеса:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#cdb32f] mr-2">•</span>
                    <span>НДС (ставка 12%)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#cdb32f] mr-2">•</span>
                    <span>Налог на прибыль (ставка 10%)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#cdb32f] mr-2">•</span>
                    <span>Подоходный налог (ставка 10%)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#cdb32f] mr-2">•</span>
                    <span>Социальные отчисления</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#cdb32f] mr-2">•</span>
                    <span>Налог с продаж (ставки от 0% до 5%)</span>
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Наши специалисты помогут вам оптимизировать налоговую нагрузку в рамках законодательства Кыргызстана и
                  избежать штрафов и пеней.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ServiceLayout>
      <Footer />
    </div>
  )
}
