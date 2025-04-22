"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getTrackers, getUniqueIPs, type Tracker, type TrackerParams } from "@/lib/analytics-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search, Laptop, Smartphone, Tablet, Monitor } from "lucide-react"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { TopPagesChart } from "@/components/top-pages-chart"
import { DeviceDistribution } from "@/components/device-distribution"

export default function AnalyticsPage() {
  const [trackers, setTrackers] = useState<Tracker[]>([])
  const [uniqueIPs, setUniqueIPs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState<TrackerParams>({
    page: 1,
    limit: 10,
    ip: "",
    search: "",
  })
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  })

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { trackers, total, totalPages } = await getTrackers(params)
        setTrackers(trackers)
        setPagination({ total, totalPages })

        // Загружаем уникальные IP только при первой загрузке
        if (uniqueIPs.length === 0) {
          const ips = await getUniqueIPs()
          setUniqueIPs(ips)
        }
      } catch (error) {
        console.error("Error fetching trackers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params])

  // Обработчики фильтрации
  const handleIPChange = (value: string) => {
    setParams((prev) => ({ ...prev, ip: value, page: 1 }))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({ ...prev, search: e.target.value }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setParams((prev) => ({ ...prev, page: 1 }))
  }

  // Обработчики пагинации
  const handlePrevPage = () => {
    if (params.page && params.page > 1) {
      setParams((prev) => ({ ...prev, page: prev.page ? prev.page - 1 : 1 }))
    }
  }

  const handleNextPage = () => {
    if (params.page && params.page < pagination.totalPages) {
      setParams((prev) => ({ ...prev, page: prev.page ? prev.page + 1 : 1 }))
    }
  }

  // Получение иконки для типа устройства
  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case "desktop":
        return <Laptop className="h-4 w-4 text-gray-500" />
      case "mobile":
        return <Smartphone className="h-4 w-4 text-gray-500" />
      case "tablet":
        return <Tablet className="h-4 w-4 text-gray-500" />
      default:
        return <Monitor className="h-4 w-4 text-gray-500" />
    }
  }

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("ru")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Статистика посещений</h1>
        <p className="text-gray-600">Анализ посещаемости сайта и активности пользователей</p>
      </div>

      {/* Обзор статистики */}
      <AnalyticsOverview />

      {/* Графики и диаграммы */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPagesChart />
        <DeviceDistribution />
      </div>

      {/* Фильтры */}
      <Card>
        <CardHeader>
          <CardTitle>Журнал посещений</CardTitle>
          <CardDescription>Подробная информация о посещениях сайта</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/3">
              <Select value={params.ip || ""} onValueChange={handleIPChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Все IP-адреса" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все IP-адреса</SelectItem>
                  {uniqueIPs.map((ip) => (
                    <SelectItem key={ip} value={ip}>
                      {ip}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <form onSubmit={handleSearch} className="w-full md:w-2/3 flex gap-2">
              <Input
                placeholder="Поиск по URL или User Agent..."
                value={params.search || ""}
                onChange={handleSearchChange}
                className="flex-1"
              />
              <Button type="submit" variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Таблица с данными */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Дата и время</TableHead>
                  <TableHead>IP-адрес</TableHead>
                  <TableHead>Страница</TableHead>
                  <TableHead>Устройство</TableHead>
                  <TableHead className="hidden md:table-cell">Источник</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={5} className="h-12 text-center">
                        Загрузка...
                      </TableCell>
                    </TableRow>
                  ))
                ) : trackers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Нет данных для отображения
                    </TableCell>
                  </TableRow>
                ) : (
                  trackers.map((tracker) => (
                    <TableRow key={tracker._id}>
                      <TableCell className="font-medium">{formatDate(tracker.createdAt)}</TableCell>
                      <TableCell>{tracker.ip}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={tracker.url}>
                        {tracker.url}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getDeviceIcon(tracker.deviceType)}
                          <span className="capitalize">{tracker.deviceType}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {tracker.referer ? (
                          <span className="max-w-[200px] truncate inline-block" title={tracker.referer}>
                            {tracker.referer}
                          </span>
                        ) : (
                          <span className="text-gray-400">Прямой переход</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Пагинация */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Показано {trackers.length} из {pagination.total} записей
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={params.page === 1 || loading}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Назад
              </Button>
              <span className="text-sm">
                Страница {params.page} из {pagination.totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={params.page === pagination.totalPages || loading}
              >
                Далее
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
