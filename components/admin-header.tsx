"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LogOut, FileText, Settings, Home, BarChart } from "lucide-react"

export function AdminHeader() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navigation = [
    { name: "Панель управления", href: "/admin", icon: <BarChart className="h-4 w-4 mr-2" /> },
    { name: "Новости", href: "/admin/news", icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: "Настройки", href: "/admin/settings", icon: <Settings className="h-4 w-4 mr-2" /> },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-[#cdb32f] font-bold text-xl mr-8 flex items-center">
              <span className="bg-[#cdb32f] text-white p-1 rounded mr-2">ADB</span>
              ADMIN
            </Link>

            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium flex items-center",
                    pathname === item.href
                      ? "text-[#cdb32f] bg-[#cdb32f]/10"
                      : "text-gray-700 hover:text-[#cdb32f] hover:bg-[#cdb32f]/5",
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-[#cdb32f] flex items-center text-sm">
              <Home className="h-4 w-4 mr-1" />
              <span>На сайт</span>
            </Link>

            <div className="flex items-center space-x-2">
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-700">{user?.fullName}</div>
                <div className="text-xs text-gray-500">Администратор</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Выйти</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
