"use client"

import { useState, useEffect } from "react"
import { getTrackerStats, type TrackerStats } from "@/lib/analytics-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Laptop, Smartphone, Tablet } from "lucide-react"

export function DeviceDistribution() {
  const [stats, setStats] = useState<TrackerStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await getTrackerStats()
        setStats(data)
      } catch (error) {
        console.error("Error fetching analytics stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="h-64">
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-40 w-40 rounded-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Распределение устройств</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-500">Нет данных о устройствах</div>
        </CardContent>
      </Card>
    )
  }

  const { deviceDistribution } = stats
  const total =
    deviceDistribution.desktop + deviceDistribution.mobile + deviceDistribution.tablet + deviceDistribution.other

  // Если нет данных, показываем сообщение
  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Распределение устройств</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-500">Нет данных о устройствах</div>
        </CardContent>
      </Card>
    )
  }

  // Рассчитываем проценты для каждого типа устройства
  const desktopPercent = Math.round((deviceDistribution.desktop / total) * 100) || 0
  const mobilePercent = Math.round((deviceDistribution.mobile / total) * 100) || 0
  const tabletPercent = Math.round((deviceDistribution.tablet / total) * 100) || 0
  const otherPercent = Math.round((deviceDistribution.other / total) * 100) || 0

  const deviceData = [
    {
      name: "Компьютеры",
      value: deviceDistribution.desktop,
      percent: desktopPercent,
      color: "#cdb32f",
      icon: <Laptop className="h-5 w-5" />,
    },
    {
      name: "Мобильные",
      value: deviceDistribution.mobile,
      percent: mobilePercent,
      color: "#3b82f6",
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      name: "Планшеты",
      value: deviceDistribution.tablet,
      percent: tabletPercent,
      color: "#10b981",
      icon: <Tablet className="h-5 w-5" />,
    },
    {
      name: "Другие",
      value: deviceDistribution.other,
      percent: otherPercent,
      color: "#6b7280",
      icon: null,
    },
  ].filter((item) => item.value > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Распределение устройств</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Круговая диаграмма */}
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {deviceData.map((device, i) => {
                // Рассчитываем параметры для сегмента круговой диаграммы
                let cumulativePercent = 0
                for (let j = 0; j < i; j++) {
                  cumulativePercent += deviceData[j].percent
                }

                const startAngle = (cumulativePercent / 100) * 360
                const endAngle = ((cumulativePercent + device.percent) / 100) * 360

                // Конвертируем углы в радианы и рассчитываем координаты
                const startRad = (startAngle - 90) * (Math.PI / 180)
                const endRad = (endAngle - 90) * (Math.PI / 180)

                const x1 = 50 + 50 * Math.cos(startRad)
                const y1 = 50 + 50 * Math.sin(startRad)
                const x2 = 50 + 50 * Math.cos(endRad)
                const y2 = 50 + 50 * Math.sin(endRad)

                // Флаг для определения большой дуги (больше 180 градусов)
                const largeArcFlag = device.percent > 50 ? 1 : 0

                // Создаем путь для сегмента
                const pathData = [`M 50 50`, `L ${x1} ${y1}`, `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`, `Z`].join(" ")

                return <path key={i} d={pathData} fill={device.color} />
              })}
              <circle cx="50" cy="50" r="25" fill="white" />
            </svg>
          </div>

          {/* Легенда */}
          <div className="space-y-3">
            {deviceData.map((device, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                <div className="flex items-center gap-1">
                  {device.icon}
                  <span className="text-sm font-medium">{device.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {device.value} ({device.percent}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
