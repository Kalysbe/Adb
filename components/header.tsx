"use client"

import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/mainlogo.png" alt="ADB SOLUTION" width={180} height={60} className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-[#cdb32f] transition-colors">
            Главная
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-[#cdb32f] transition-colors">
            О нас
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-[#cdb32f] transition-colors">
            Услуги
          </Link>
          <Link href="/news" className="text-gray-700 hover:text-[#cdb32f] transition-colors">
            Новости
          </Link>
          <Link href="/contacts" className="text-gray-700 hover:text-[#cdb32f] transition-colors">
            Контакты
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
