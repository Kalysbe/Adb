"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/context"

export function CallToAction() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24 bg-[#cdb32f]/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t("readyToStart")}</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">{t("readyToStartDesc")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white px-8 py-6 text-lg rounded-full">
            <Link href="/contacts">{t("contactUs")}</Link>
          </Button>
          <Button
            variant="outline"
            className="border-[#cdb32f] text-[#cdb32f] hover:bg-[#cdb32f]/10 px-8 py-6 text-lg rounded-full"
          >
            <Link href="/about">{t("learnMore")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
