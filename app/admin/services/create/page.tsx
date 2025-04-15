"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/header"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface AdminUser {
  id: string
  fullName: string
  role: number
}

// Доступные иконки для услуг
const availableIcons = [
  { value: "FileText", label: "Документ" },
  { value: "Calculator", label: "Калькулятор" },
  { value: "BarChart3", label: "График" },
  { value: "FileCheck", label: "Проверенный документ" },
  { value: "Users", label: "Пользователи" },
  { value: "TrendingUp", label: "Рост" },
  { value: "Briefcase", label: "Портфель" },
  { value: "DollarSign", label: "Доллар" },
  { value: "PieChart", label: "Диаграмма" },
]

export default function CreateServicePage() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "FileText",
    isActive: true,
  })
  const router = useRouter()

  useEffect(() => {
    // Получаем данные пользователя из localStorage
    const userData = localStorage.getItem("adminUser")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // В реальном приложении здесь был бы запрос к API для создания услуги
      console.log("Создание услуги:", formData)

      // Имитация задержки API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Перенаправление на страницу услуг
      router.push("/admin/services")
    } catch (error) {
      console.error("Ошибка при создании услуги:", error)
      alert("Произошла ошибка при создании услуги")
    } finally {
      setIsLoading(false)
    }
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
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/admin/services">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Добавление новой услуги</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Информация об услуге</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">��азвание услуги</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Введите название услуги"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Введите описание услуги"
                      rows={5}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="icon">Иконка</Label>
                    <Select value={formData.icon} onValueChange={(value) => handleSelectChange("icon", value)}>
                      <SelectTrigger id="icon">
                        <SelectValue placeholder="Выберите иконку" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableIcons.map((icon) => (
                          <SelectItem key={icon.value} value={icon.value}>
                            {icon.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                    />
                    <Label htmlFor="isActive">Активна</Label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-2"
                    onClick={() => router.push("/admin/services")}
                  >
                    Отмена
                  </Button>
                  <Button type="submit" className="bg-[#cdb32f] hover:bg-[#cdb32f]/90" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Сохранение...
                      </>
                    ) : (
                      "Сохранить"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
