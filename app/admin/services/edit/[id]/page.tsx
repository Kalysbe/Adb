"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
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
import { getServices } from "@/lib/admin-api"

interface AdminUser {
  id: string
  fullName: string
  role: number
}

interface Service {
  id: string
  title: string
  description: string
  icon: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
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

export default function EditServicePage() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [service, setService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "FileText",
    isActive: true,
  })
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string

  useEffect(() => {
    // Получаем данные пользователя из localStorage
    const userData = localStorage.getItem("adminUser")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Загружаем данные услуги
    const fetchService = async () => {
      setIsLoading(true)
      try {
        const services = await getServices()
        const foundService = services.find((s: Service) => s.id === serviceId)

        if (foundService) {
          setService(foundService)
          setFormData({
            title: foundService.title,
            description: foundService.description,
            icon: foundService.icon,
            isActive: foundService.isActive,
          })
        } else {
          alert("Услуга не найдена")
          router.push("/admin/services")
        }
      } catch (error) {
        console.error("Ошибка при загрузке услуги:", error)
        alert("Произошла ошибка при загрузке услуги")
      } finally {
        setIsLoading(false)
      }
    }

    fetchService()
  }, [serviceId, router])

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
    setIsSaving(true)

    try {
      // В реальном приложении здесь был бы запрос к API для обновления услуги
      console.log("Обновление услуги:", { id: serviceId, ...formData })

      // Имитация задержки API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Перенаправление на страницу услуг
      router.push("/admin/services")
    } catch (error) {
      console.error("Ошибка при обновлении услуги:", error)
      alert("Произошла ошибка при обновлении услуги")
    } finally {
      setIsSaving(false)
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
            <h1 className="text-2xl font-bold">Редактирование услуги</h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-[#cdb32f]" />
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Информация об услуге</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Название услуги</Label>
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
                    <Button type="submit" className="bg-[#cdb32f] hover:bg-[#cdb32f]/90" disabled={isSaving}>
                      {isSaving ? (
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
          )}
        </main>
      </div>
    </div>
  )
}
