"use client"

import { CheckCircle, Shield, Zap, BarChart } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <Zap className="h-10 w-10 text-[#cdb32f]" />,
      title: t("innovativeTech"),
      description: t("innovativeTechDesc"),
    },
    {
      icon: <Shield className="h-10 w-10 text-[#cdb32f]" />,
      title: t("reliabilitySecurity"),
      description: t("reliabilitySecurityDesc"),
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-[#cdb32f]" />,
      title: t("qualitySupport"),
      description: t("qualitySupportDesc"),
    },
    {
      icon: <BarChart className="h-10 w-10 text-[#cdb32f]" />,
      title: t("analyticsOptimization"),
      description: t("analyticsOptimizationDesc"),
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-adb-gray mb-4">{t("advantages")}</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">{t("advantagesDescription")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-adb-gray mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
