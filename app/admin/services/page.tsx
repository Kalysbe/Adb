"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchServices, selectServices, selectServicesLoading } from "@/lib/redux/slices/servicesSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"

export default function ServicesPage() {
  const dispatch = useAppDispatch()
  const services = useAppSelector(selectServices)
  const isLoading = useAppSelector(selectServicesLoading)

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch])

  // Функция для получения иконки по имени
  const getIconByName = (iconName: string): LucideIcon => {
    return (LucideIcons as Record<string, LucideIcon>)[iconName] || LucideIcons.HelpCircle
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Управление услугами</h1>
        <Link href="/admin/services/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Добавить услугу
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Услуги</CardTitle>
          <CardDescription>Список всех услуг компании</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Иконка</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services && services.length > 0 ? (
                  services.map((service) => {
                    const Icon = getIconByName(service.icon)
                    return (
                      <TableRow key={service._id}>
                        <TableCell>
                          <Icon className="h-5 w-5" />
                        </TableCell>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell className="max-w-md truncate">{service.description}</TableCell>
                        <TableCell>
                          <Badge
                            className={service.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                          >
                            {service.isActive ? "Активна" : "Неактивна"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/admin/services/edit/${service._id}`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Услуги не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
