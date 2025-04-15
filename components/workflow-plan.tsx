"use client"

import { useLanguage } from "@/lib/i18n/context"
import { CheckCircle2, ArrowRight, FileText, Users, BarChart, Calculator } from "lucide-react"

export function WorkflowPlan() {
  const { language } = useLanguage()

  const steps = [
    {
      icon: <FileText className="h-12 w-12 text-[#cdb32f]" />,
      title: language === "ru" ? "Консультация" : "Consultation",
      description:
        language === "ru"
          ? "Бесплатная консультация для определения потребностей вашего бизнеса и подбора оптимальных решений."
          : "Free consultation to determine your business needs and select optimal solutions.",
    },
    {
      icon: <Users className="h-12 w-12 text-[#cdb32f]" />,
      title: language === "ru" ? "Анализ" : "Analysis",
      description:
        language === "ru"
          ? "Детальный анализ текущего состояния учета, документооборота и финансовых процессов вашей компании."
          : "Detailed analysis of the current state of accounting, document flow and financial processes of your company.",
    },
    {
      icon: <BarChart className="h-12 w-12 text-[#cdb32f]" />,
      title: language === "ru" ? "Разработка стратегии" : "Strategy Development",
      description:
        language === "ru"
          ? "Создание индивидуального плана оптимизации финансовых и бухгалтерских процессов."
          : "Creating an individual plan to optimize financial and accounting processes.",
    },
    {
      icon: <Calculator className="h-12 w-12 text-[#cdb32f]" />,
      title: language === "ru" ? "Внедрение" : "Implementation",
      description:
        language === "ru"
          ? "Поэтапное внедрение разработанных решений с минимальным влиянием на текущие бизнес-процессы."
          : "Phased implementation of developed solutions with minimal impact on current business processes.",
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {language === "ru" ? "Как мы работаем" : "How We Work"}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            {language === "ru"
              ? "Наш структурированный подход обеспечивает максимальную эффективность и прозрачность на всех этапах сотрудничества"
              : "Our structured approach ensures maximum efficiency and transparency at all stages of cooperation"}
          </p>
        </div>

        <div className="relative">
          {/* Соединительная линия */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-white rounded-full p-4 md:p-6 shadow-md mb-4 md:mb-6 relative">
                  <div className="bg-[#cdb32f]/10 rounded-full p-3 md:p-4">{step.icon}</div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-[#cdb32f]" />
                    </div>
                  )}
                  {/* Мобильные стрелки */}
                  {index < steps.length - 1 && (
                    <div className="flex md:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 rotate-90 z-20">
                      <ArrowRight className="h-5 w-5 text-[#cdb32f]" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-16 text-center">
            <div className="inline-flex items-center bg-[#cdb32f]/10 px-4 py-2 md:px-6 md:py-3 rounded-full">
              <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-[#cdb32f] mr-2" />
              <span className="text-sm md:text-base text-gray-800 font-medium">
                {language === "ru"
                  ? "Результат: оптимизированные процессы и повышение эффективности бизнеса"
                  : "Result: optimized processes and increased business efficiency"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
