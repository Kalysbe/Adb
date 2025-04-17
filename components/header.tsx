"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, MessageCircle, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"
import { LanguageSwitcher } from "./language-switcher"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("services"), href: "/services" },
    { name: t("news"), href: "/news" },
    { name: t("contacts"), href: "/contacts" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Закрывать мобильное меню при изменении пути
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn("sticky top-0 z-50 w-full transition-all duration-300 bg-white", isScrolled ? "shadow-md" : "")}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/mainlogo.png" alt="ADB SOLUTION" width={180} height={60} className="h-8 md:h-10 w-auto" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-[#cdb32f] bg-[#cdb32f]/10"
                      : "text-gray-700 hover:text-[#cdb32f] hover:bg-[#cdb32f]/5",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <a href="tel:+996555751592" className="flex items-center text-gray-700 hover:text-[#cdb32f]">
                <Phone className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="text-xs lg:text-sm font-medium">+996 555 751 592</span>
              </a>

              <div className="flex items-center space-x-2">
                <a
                  href="https://wa.me/996555751592"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-[#cdb32f] hover:bg-gray-100 rounded-full"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="sr-only">WhatsApp</span>
                </a>

                <a
                  href="https://t.me/+996555751592"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-[#cdb32f] hover:bg-gray-100 rounded-full"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Telegram</span>
                </a>
              </div>
            </div>

            <LanguageSwitcher />

            <Button className="hidden sm:flex bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white rounded-full px-3 md:px-5 py-1 md:py-2 text-xs md:text-sm">
              {t("login")}
            </Button>

            <div className="flex md:hidden">
              <button type="button" className="text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className="sr-only">Открыть меню</span>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="space-y-1 px-4 py-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block py-2 px-3 rounded-md text-base font-medium",
                  pathname === item.href
                    ? "text-[#cdb32f] bg-[#cdb32f]/10"
                    : "text-gray-700 hover:text-[#cdb32f] hover:bg-[#cdb32f]/5",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a href="tel:+996555751592" className="flex items-center py-2 px-3 text-gray-700 hover:text-[#cdb32f]">
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-base font-medium">+996 555 751 592</span>
            </a>
            <div className="flex items-center py-2 px-3 space-x-4">
              <a
                href="https://wa.me/996555751592"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-[#cdb32f]"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://t.me/+996555751592"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-[#cdb32f]"
              >
                <Send className="h-5 w-5 mr-2" />
                <span>Telegram</span>
              </a>
            </div>
            <div className="py-2 px-3">
              <Button className="w-full bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white rounded-full">
                {t("login")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
