"use client"

import { useState, useEffect } from "react"
import { getTrackerStats, type TrackerStats } from "@/lib/analytics-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TopPagesChart() {
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
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats || !stats.topPages || stats.topPages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Популярные страницы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-500">Нет данных о посещаемых страницах</div>
        </CardContent>
      </Card>
    )
  }

  // Находим максимальное количество просмотров для масштабирования
  const maxViews = Math.max(...stats.topPages.map((page) => page.count))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Популярные страницы</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.topPages.map((page, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium truncate" title={page.url}>
                  {page.url.length > 30 ? page.url.substring(0, 30) + "..." : page.url}
                </span>
                <span className="text-gray-500">{page.count} просмотров</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#cdb32f] h-2 rounded-full"
                  style={{ width: `${(page.count / maxViews) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
