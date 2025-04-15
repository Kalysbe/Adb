"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const { t, language } = useLanguage()

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-4 md:mb-6">
              <Image src="/mainlogo.png" alt="ADB SOLUTION" width={180} height={60} className="h-10 md:h-12 w-auto" />
            </Link>
            <p className="text-gray-600 mb-4 md:mb-6 max-w-md text-sm md:text-base">{t("heroDescription")}</p>

            <div className="flex space-x-3 md:space-x-4 mb-6 md:mb-8">
              <a href="#" className="text-gray-400 hover:text-[#cdb32f] transition-colors">
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#cdb32f] transition-colors">
                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#cdb32f] transition-colors">
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#cdb32f] transition-colors">
                <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>

            <div className="space-y-2 md:space-y-4 text-sm md:text-base">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-[#cdb32f] mr-2 md:mr-3 mt-0.5" />
                <span className="text-gray-600">Разакова 32, Бишкек, Кыргызстан</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-4 w-4 md:h-5 md:w-5 text-[#cdb32f] mr-2 md:mr-3 mt-0.5" />
                <a href="tel:+996555751592" className="text-gray-600 hover:text-[#cdb32f]">
                  +996 555 751 592
                </a>
              </div>
              <div className="flex items-start">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-[#cdb32f] mr-2 md:mr-3 mt-0.5" />
                <a href="mailto:gulzada@adb-solution.com" className="text-gray-600 hover:text-[#cdb32f]">
                  gulzada@adb-solution.com
                </a>
              </div>
              <div className="flex items-start">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-[#cdb32f] mr-2 md:mr-3 mt-0.5" />
                <a
                  href="https://wa.me/996555751592"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#cdb32f]"
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex items-start">
                <Send className="h-4 w-4 md:h-5 md:w-5 text-[#cdb32f] mr-2 md:mr-3 mt-0.5" />
                <a
                  href="https://t.me/+996555751592"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#cdb32f]"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-6">{t("company")}</h3>
            <ul className="space-y-2 md:space-y-4 text-sm md:text-base">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#cdb32f] transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-600 hover:text-[#cdb32f] transition-colors">
                  {t("news")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#cdb32f] transition-colors">
                  {t("career")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#cdb32f] transition-colors">
                  {t("partners")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-6">{t("services")}</h3>
            <ul className="space-y-2 md:space-y-4 text-sm md:text-base">
              <li>
                <Link href="/services/audit" className="text-gray-600 hover:text-[#cdb32f] transition-colors">
                  {language === "ru" ? "Аудит" : "Audit"}
                </Link>
              </li>
              <li>
                <Link href="/services/accounting" className="text-gray-600 hover:text-[#cdb32f] transition-colors">
                  {language === "ru" ? "Бухгалтерия" : "Accounting"}
                </Link>
              </li>
              <li>
                <Link href="/services/tax-consulting" className="text-gray-600 hover:text-[#cdb32f] transition-colors">
                  {language === "ru" ? "Налоговый консалтинг" : "Tax Consulting"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/business-consulting"
                  className="text-gray-600 hover:text-[#cdb32f] transition-colors"
                >
                  {language === "ru" ? "Бизнес-консалтинг" : "Business Consulting"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-6">
              {language === "ru" ? "Подпишитесь на новости" : "Subscribe to news"}
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              {language === "ru" ? "Получайте последние новости и обновления" : "Get the latest news and updates"}
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                type="email"
                placeholder={language === "ru" ? "Ваш email" : "Your email"}
                className="rounded-full text-sm"
              />
              <Button className="bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white rounded-full px-4 md:px-5 text-sm">
                {language === "ru" ? "Подписаться" : "Subscribe"}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} ADB SOLUTION. {t("allRightsReserved")}
          </p>
          <div className="flex space-x-4 md:space-x-6 text-xs md:text-sm">
            <Link href="#" className="text-gray-500 hover:text-[#cdb32f]">
              {language === "ru" ? "Политика конфиденциальности" : "Privacy Policy"}
            </Link>
            <Link href="#" className="text-gray-500 hover:text-[#cdb32f]">
              {language === "ru" ? "Условия использования" : "Terms of Service"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
