"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/header"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface AdminUser {
  id: string
  fullName: string
  role: number
}

export default function AdminSettingsPage() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Настройки сайта
  const [siteName, setSiteName] = useState("ADB SOLUTION")
  const [siteDescription, setSiteDescription] = useState(
    "Профессиональные аудит и бухгалтерские услуги для вашего бизнеса",
  )
  const [contactEmail, setContactEmail] = useState("gulzada@adb-solution.com")
  const [contactPhone, setContactPhone] = useState("+996 555 751 592")

  // Настройки пользователя
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    // Получаем данные пользователя из localStorage
    const userData = localStorage.getItem("adminUser")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFullName(parsedUser.fullName || "")
      setEmail("admin@adb-solution.com") // Пример
    }
  }, [])

  const handleSaveSiteSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Имитация сохранения настроек
    setTimeout(() => {
      setIsSaving(false)
      alert("Настройки сайта успешно сохранены")
    }, 1000)
  }

  const handleSaveUserSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Проверка паролей
    if (newPassword && newPassword !== confirmPassword) {
      alert("Пароли не совпадают")
      setIsSaving(false)
      return
    }

    // Имитация сохранения настроек пользователя
    setTimeout(() => {
      setIsSaving(false)

      // Обновляем данные пользователя в localStorage
      if (user) {
        const updatedUser = { ...user, fullName }
        localStorage.setItem("adminUser", JSON.stringify(updatedUser))
        setUser(updatedUser)
      }

      alert("Настройки пользователя успешно сохранены")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }, 1000)
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminHeader user={user} />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Настройки</h1>

          <Tabs defaultValue="site" className="space-y-6">
            <TabsList>
              <TabsTrigger value="site">Настройки сайта</TabsTrigger>
              <TabsTrigger value="user">Настройки пользователя</TabsTrigger>
            </TabsList>

            <TabsContent value="site">
              <Card>
                <form onSubmit={handleSaveSiteSettings}>
                  <CardHeader>
                    <CardTitle>Настройки сайта</CardTitle>
                    <CardDescription>Настройте основные параметры вашего сайта</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Название сайта</Label>
                      <Input id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="siteDescription">Описание сайта</Label>
                      <Input
                        id="siteDescription"
                        value={siteDescription}
                        onChange={(e) => setSiteDescription(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Контактный email</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Контактный телефон</Label>
                        <Input
                          id="contactPhone"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="bg-[#cdb32f] hover:bg-[#cdb32f]/90" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Сохранение...
                        </>
                      ) : (
                        "Сохранить настройки"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="user">
              <Card>
                <form onSubmit={handleSaveUserSettings}>
                  <CardHeader>
                    <CardTitle>Настройки пользователя</CardTitle>
                    <CardDescription>Обновите свои личные данные и пароль</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Полное имя</Label>
                      <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-4">Изменение пароля</h3>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Текущий пароль</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword">Новый пароль</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="bg-[#cdb32f] hover:bg-[#cdb32f]/90" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Сохранение...
                        </>
                      ) : (
                        "Сохранить настройки"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
