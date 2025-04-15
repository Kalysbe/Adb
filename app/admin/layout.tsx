"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ReduxProvider } from "@/lib/redux/provider"
import { AdminHeader } from "@/components/admin/header"
import { AdminSidebar } from "@/components/admin/sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Проверяем авторизацию
    const checkAuth = () => {
      try {
        // Если мы на странице авторизации, не проверяем
        if (pathname === "/admin/auth") {
          setLoading(false)
          return
        }

        const token = localStorage.getItem("token")
        const userDataStr = localStorage.getItem("userData")

        if (!token || !userDataStr) {
          router.push("/admin/auth")
          return
        }

        try {
          const parsedUserData = JSON.parse(userDataStr)
          setUserData(parsedUserData)
        } catch (error) {
          console.error("Error parsing user data:", error)
          localStorage.removeItem("token")
          localStorage.removeItem("userData")
          router.push("/admin/auth")
          return
        }

        setLoading(false)
      } catch (error) {
        console.error("Auth check error:", error)
        setLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  // Если мы на странице авторизации, показываем только содержимое без шапки и сайдбара
  if (pathname === "/admin/auth") {
    return (
      <ReduxProvider>
        <div className="min-h-screen bg-gray-100">{children}</div>
      </ReduxProvider>
    )
  }

  // Если загрузка или нет данных пользователя, показываем загрузку
  if (loading) {
    return (
      <ReduxProvider>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Загрузка...</p>
          </div>
        </div>
      </ReduxProvider>
    )
  }

  return (
    <ReduxProvider>
      <div className="min-h-screen bg-gray-100 flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader user={userData} />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </ReduxProvider>
  )
}
