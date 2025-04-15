"use client"

import { useLanguage } from "@/lib/i18n/context"
import { FileText, BarChart3, Calculator, FileCheck, Users, TrendingUp } from "lucide-react"

export function ServicesList() {
  const { language } = useLanguage()

  const services = [
    {
      icon: <FileText className="h-12 w-12 text-[#cdb32f]" />,
      title: language === "ru" ? "Аудит" : "Audit",
      description:
        language === "ru"
          ? "Профессиональный аудит финансовой отчетности в соответствии с международными стандартами. Мы проводим комплексную проверку финансовой документации, выявляем риски и предлагаем рекомендации по их устранению."
          : "Professional audit of financial statements in accordance with international standards. We conduct a comprehensive review of financial documentation, identify risks and offer recommendations for their elimination.",
    },
    {
      icon: <Calculator className="h-12 w-12 text-[#cdb32f]" />,
      title: language === "ru" ? "Бухгалтерские услуги" : "Accounting Services",
      description:
        language === "ru"
          ? "Полное бухгалтерское сопровождение бизнеса, включая подготовку и сдачу отчетности. Мы берем на себя все задачи по ведению бухгалтерии, чтобы вы могли сосредоточиться на развитии вашего бизнеса."
          : "Complete accounting support for business, including preparation and submission of reports. We take on all accounting tasks so that you can focus on developing your business.",
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-[#cdb32f]" />,
      title: language === "ru" ? "Финансовый анализ" : "Financial Analysis",
      description:
        language === "ru"
          ? "Комплексный анализ финансового состояния компании и разработка рекомендаций. Мы помогаем выявить сильные и слабые стороны вашего бизнеса, определить пути оптимизации и повышения эффективности."
          : "Comprehensive analysis of the company's financial condition and development of recommendations. We help identify the strengths and weaknesses of your business, determine ways to optimize and improve efficiency.",
    },
    {
      icon: <FileCheck className="h-12 w-12 text-[#cdb32f]" />,
      title: language === "ru" ? "Налоговый консалтинг" : "Tax Consulting",
      description:
        language === "ru"
          ? "Оптимизация налогообложения, консультации по налоговым вопросам и планирование. Мы помогаем минимизировать налоговые риски и выбрать оптимальную систему налогообложения для вашего бизнеса."
          : "Tax optimization, tax advice and planning. We help minimize tax risks and choose the optimal taxation system for your business.",
    },
    {
      icon: <Users className="h-12 w-12 text-[#cdb32f]" />,
      title: language === "ru" ? "Кадровый учет" : "HR Management",
      description:
        language === "ru"
          ? "Ведение кадрового делопроизводства, расчет заработной платы и консультации. Мы обеспечиваем соответствие вашей компании трудовому законодательству и помогаем эффективно управлять персоналом."
          : "HR record keeping, payroll calculation and consulting. We ensure your company's compliance with labor legislation and help effectively manage personnel.",
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-[#cdb32f]" />,
      title: language === "ru" ? "Бизнес-консалтинг" : "Business Consulting",
      description:
        language === "ru"
          ? "Разработка бизнес-планов, стратегий развития и оптимизация бизнес-процессов. Мы помогаем вашему бизнесу расти и развиваться, предлагая индивидуальные решения для достижения ваших целей."
          : "Development of business plans, development strategies and optimization of business processes. We help your business grow and develop by offering individual solutions to achieve your goals.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === "ru" ? "Наши услуги" : "Our Services"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === "ru"
              ? "Мы предлагаем полный спектр профессиональных услуг для эффективного управления вашим бизнесом"
              : "We offer a full range of professional services for effective management of your business"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:bg-[#cdb32f]/5"
            >
              <div className="bg-[#cdb32f]/10 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
