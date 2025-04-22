"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, BarChart, Calendar } from "lucide-react"
import Link from "next/link"
import { getTrackerStats, type TrackerStats } from "@/lib/analytics-service"

export default function AdminDashboard() {
  const { user } = useAuth()
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

  const statsItems = [
    {
      title: "Всего новостей",
      value: "24",
      icon: <FileText className="h-8 w-8 text-[#cdb32f]" />,
      change: "+4 за месяц",
      link: "/admin/news",
    },
    {
      title: "Посетителей",
      value: loading ? "..." : stats?.uniqueVisitors.toString() || "0",
      icon: <Users className="h-8 w-8 text-[#cdb32f]" />,
      change: "Уникальных IP-адресов",
      link: "/admin/analytics",
    },
    {
      title: "Просмотров",
      value: loading ? "..." : stats?.totalVisits.toString() || "0",
      icon: <BarChart className="h-8 w-8 text-[#cdb32f]" />,
      change: "Всего страниц просмотрено",
      link: "/admin/analytics",
    },
    {
      title: "Последнее посещение",
      value: loading
        ? "..."
        : stats?.recentVisits?.[0]
          ? new Date(stats.recentVisits[0].createdAt).toLocaleString("ru", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Нет данных",
      icon: <Calendar className="h-8 w-8 text-[#cdb32f]" />,
      change: stats?.recentVisits?.[0]?.url || "",
      link: "/admin/analytics",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Панель управления</h1>
        <p className="text-gray-600">
          Добро пожаловать, <span className="font-medium">{user?.fullName}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsItems.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1 truncate" title={stat.change}>
                {stat.change}
              </p>
              <Link
                href={stat.link}
                className="text-[#cdb32f] hover:text-[#cdb32f]/80 text-sm font-medium mt-4 inline-block"
              >
                Подробнее →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Последние новости</CardTitle>
            <CardDescription>Недавно опубликованные новости</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 mr-4"></div>
                  <div>
                    <h3 className="font-medium text-gray-900">Заголовок новости {item}</h3>
                    <p className="text-sm text-gray-500">Опубликовано 2 дня назад</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/admin/news"
              className="text-[#cdb32f] hover:text-[#cdb32f]/80 text-sm font-medium mt-4 inline-block"
            >
              Все новости →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Популярные страницы</CardTitle>
            <CardDescription>Наиболее посещаемые страницы сайта</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="w-2 h-2 bg-gray-200 rounded-full mt-2 mr-3"></div>
                    <div className="w-full">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : !stats?.topPages || stats.topPages.length === 0 ? (
                <div className="text-center py-4 text-gray-500">Нет данных о посещаемых страницах</div>
              ) : (
                stats.topPages.slice(0, 3).map((page, index) => (
                  <div key={index} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="w-2 h-2 bg-[#cdb32f] rounded-full mt-2 mr-3"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 truncate" title={page.url}>
                        {page.url.length > 30 ? page.url.substring(0, 30) + "..." : page.url}
                      </h3>
                      <p className="text-sm text-gray-500">{page.count} просмотров</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Link
              href="/admin/analytics"
              className="text-[#cdb32f] hover:text-[#cdb32f]/80 text-sm font-medium mt-4 inline-block"
            >
              Вся статистика →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
