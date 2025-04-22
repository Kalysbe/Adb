"use client"

import { useState, useEffect } from "react"
import { getTrackerStats, type TrackerStats } from "@/lib/analytics-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Eye, Clock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function AnalyticsOverview() {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const statsItems = [
    {
      title: "Уникальных посетителей",
      value: stats?.uniqueVisitors || 0,
      icon: <Users className="h-5 w-5 text-[#cdb32f]" />,
      description: "По IP-адресам",
    },
    {
      title: "Всего просмотров",
      value: stats?.totalVisits || 0,
      icon: <Eye className="h-5 w-5 text-[#cdb32f]" />,
      description: "Страниц просмотрено",
    },
    {
      title: "Последнее посещение",
      value: stats?.recentVisits?.[0] ? new Date(stats.recentVisits[0].createdAt).toLocaleString("ru") : "Нет данных",
      icon: <Clock className="h-5 w-5 text-[#cdb32f]" />,
      description: "Время по МСК",
      isDate: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statsItems.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{item.title}</CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${item.isDate ? "text-base" : ""}`}>{item.value}</div>
            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
