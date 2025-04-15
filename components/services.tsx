"use client"

import { useLanguage } from "@/lib/i18n/context"
import { FileText, BarChart3, Calculator, FileCheck, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export function Services() {
  const { language } = useLanguage()

  const services = [
    {
      icon: <FileText className="h-6 w-6 md:h-8 md:w-8 text-[#cdb32f]" />,
      title: language === "ru" ? "Аудит" : "Audit",
      description:
        language === "ru"
          ? "Профессиональный аудит финансовой отчетности в соответствии с международными стандартами."
          : "Professional audit of financial statements in accordance with international standards.",
      link: "/services/audit",
    },
    {
      icon: <Calculator className="h-6 w-6 md:h-8 md:w-8 text-[#cdb32f]" />,
      title: language === "ru" ? "Бухгалтерские услуги" : "Accounting Services",
      description:
        language === "ru"
          ? "Полное бухгалтерское сопровождение бизнеса, включая подготовку и сдачу отчетности."
          : "Complete accounting support for business, including preparation and submission of reports.",
      link: "/services/accounting",
    },
    {
      icon: <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-[#cdb32f]" />,
      title: language === "ru" ? "Финансовый анализ" : "Financial Analysis",
      description:
        language === "ru"
          ? "Комплексный анализ финансового состояния компании и разработка рекомендаций."
          : "Comprehensive analysis of the company's financial condition and development of recommendations.",
      link: "/services/financial-analysis",
    },
    {
      icon: <FileCheck className="h-6 w-6 md:h-8 md:w-8 text-[#cdb32f]" />,
      title: language === "ru" ? "Налоговый консалтинг" : "Tax Consulting",
      description:
        language === "ru"
          ? "Оптимизация налогообложения, консультации по налоговым вопросам и планирование."
          : "Tax optimization, tax advice and planning.",
      link: "/services/tax-consulting",
    },
    {
      icon: <Users className="h-6 w-6 md:h-8 md:w-8 text-[#cdb32f]" />,
      title: language === "ru" ? "Кадровый учет" : "HR Management",
      description:
        language === "ru"
          ? "Ведение кадрового делопроизводства, расчет заработной платы и консультации."
          : "HR record keeping, payroll calculation and consulting.",
      link: "/services/hr-management",
    },
    {
      icon: <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-[#cdb32f]" />,
      title: language === "ru" ? "Бизнес-консалтинг" : "Business Consulting",
      description:
        language === "ru"
          ? "Разработка бизнес-планов, стратегий развития и оптимизация бизнес-процессов."
          : "Development of business plans, development strategies and optimization of business processes.",
      link: "/services/business-consulting",
    },
  ]

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            {language === "ru" ? "Наши услуги" : "Our Services"}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            {language === "ru"
              ? "Мы предлагаем полный спектр профессиональных услуг для эффективного управления вашим бизнесом"
              : "We offer a full range of professional services for effective management of your business"}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => (
            <Link
              href={service.link}
              key={index}
              className="bg-gray-50 rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:bg-[#cdb32f]/5 group"
            >
              <div className="bg-[#cdb32f]/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-[#cdb32f]/20">
                {service.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">{service.title}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{service.description}</p>
              <div className="text-[#cdb32f] font-medium text-sm md:text-base flex items-center">
                {language === "ru" ? "Подробнее" : "Learn more"}
                <svg className="ml-2 w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
