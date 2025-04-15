"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Users, FileText, Briefcase, Settings, BarChart2 } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/admin",
      label: "Дашборд",
      icon: Home,
    },
    {
      href: "/admin/users",
      label: "Пользователи",
      icon: Users,
    },
    {
      href: "/admin/news",
      label: "Новости",
      icon: FileText,
    },
    {
      href: "/admin/services",
      label: "Услуги",
      icon: Briefcase,
    },
    {
      href: "/admin/statistics",
      label: "Статистика",
      icon: BarChart2,
    },
    {
      href: "/admin/settings",
      label: "Настройки",
      icon: Settings,
    },
  ]

  return (
    <aside className="w-64 border-r bg-gray-50 py-6 hidden md:block">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center space-x-3 py-2 px-4 rounded-md transition-colors hover:bg-gray-100",
              pathname === item.href ? "bg-gray-100 font-semibold" : "text-gray-600",
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
