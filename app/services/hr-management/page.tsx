import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceLayout } from "@/components/service-layout"
import { Users } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Кадровый учет | ADB SOLUTION",
  description:
    "Профессиональные услуги по ведению кадрового учета. Оформление трудовых отношений, расчет заработной платы, кадровое делопроизводство.",
  keywords: [
    "кадровый учет",
    "кадровое делопроизводство",
    "расчет заработной платы",
    "трудовые отношения",
    "ADB SOLUTION",
  ],
}

export default function HrManagementPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ServiceLayout
        title="Кадровый учет"
        titleEn="HR Management"
        description="Ведение кадрового делопроизводства, расчет заработной платы и консультации. Мы обеспечиваем соответствие вашей компании трудовому законодательству и помогаем эффективно управлять персоналом."
        descriptionEn="HR record keeping, payroll calculation and consulting. We ensure your company's compliance with labor legislation and help effectively manage personnel."
        icon={<Users className="h-10 w-10 text-[#cdb32f]" />}
        image="/placeholder.svg?height=400&width=600"
        features={[
          "Кадровое делопроизводство",
          "Расчет заработной платы",
          "Оформление трудовых отношений",
          "Разработка кадровой документации",
          "Консультации по трудовому праву",
          "Аудит кадровой документации",
        ]}
        featuresEn={[
          "HR Record Keeping",
          "Payroll Calculation",
          "Employment Relations",
          "HR Documentation Development",
          "Labor Law Consultations",
          "HR Documentation Audit",
        ]}
      >
        {/* Дополнительный контент для страницы кадрового учета */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Обязательные кадровые документы</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Правильное оформление кадровой документации — это не только требование законодательства, но и защита
                интересов работодателя
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="bg-[#cdb32f]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Локальные нормативные акты</h3>
                <ul className="space-y-2">
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
                    <span className="text-gray-600">Правила внутреннего трудового распорядка</span>
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
                    <span className="text-gray-600">Положение об оплате труда</span>
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
                    <span className="text-gray-600">Положение о защите персональных данных</span>
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
                    <span className="text-gray-600">Штатное расписание</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="bg-[#cdb32f]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Документы по личному составу</h3>
                <ul className="space-y-2">
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
                    <span className="text-gray-600">Трудовые договоры</span>
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
                    <span className="text-gray-600">Приказы о приеме, переводе, увольнении</span>
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
                    <span className="text-gray-600">Личные карточки работников</span>
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
                    <span className="text-gray-600">Трудовые книжки</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="bg-[#cdb32f]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#cdb32f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Учет рабочего времени и оплаты труда</h3>
                <ul className="space-y-2">
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
                    <span className="text-gray-600">Табель учета рабочего времени</span>
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
                    <span className="text-gray-600">График отпусков</span>
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
                    <span className="text-gray-600">Расчетные листки</span>
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
                    <span className="text-gray-600">Ведомости на выплату заработной платы</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Наш подход к кадровому учету</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-[#cdb32f]" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Индивидуальный подход</h4>
                  <p className="text-gray-600">
                    Мы учитываем специфику вашего бизнеса и разрабатываем оптимальные решения для кадрового учета.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-[#cdb32f]" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Соответствие законодательству</h4>
                  <p className="text-gray-600">
                    Мы постоянно отслеживаем изменения в трудовом законодательстве и обеспечиваем полное соответствие
                    требованиям.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-[#cdb32f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-[#cdb32f]" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Автоматизация процессов</h4>
                  <p className="text-gray-600">
                    Мы используем современные технологии для автоматизации кадрового учета, что позволяет сократить
                    трудозатраты и минимизировать ошибки.
                  </p>
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
