"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  fetchAnalytics,
  setPeriod,
  selectAnalyticsData,
  selectAnalyticsPeriod,
  selectAnalyticsLoading,
} from "@/lib/redux/slices/analyticsSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Users, Globe, Smartphone, Laptop, Clock, BarChart2 } from "lucide-react"

export default function StatisticsPage() {
  const dispatch = useAppDispatch()
  const analyticsData = useAppSelector(selectAnalyticsData)
  const period = useAppSelector(selectAnalyticsPeriod) || "week"
  const isLoading = useAppSelector(selectAnalyticsLoading)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    dispatch(fetchAnalytics(period))
  }, [dispatch, period])

  useEffect(() => {
    // Если данные пришли с API, используем их
    if (analyticsData) {
      setData(analyticsData)
    }
  }, [analyticsData])

  const handlePeriodChange = (value: string) => {
    dispatch(setPeriod(value))
    dispatch(fetchAnalytics(value))
  }

  // Цвета для графиков
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  if (isLoading || !data) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Статистика посещений</h1>
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">За день</SelectItem>
              <SelectItem value="week">За неделю</SelectItem>
              <SelectItem value="month">За месяц</SelectItem>
              <SelectItem value="year">За год</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Статистика посещений</h1>
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">За день</SelectItem>
            <SelectItem value="week">За неделю</SelectItem>
            <SelectItem value="month">За месяц</SelectItem>
            <SelectItem value="year">За год</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Всего посетителей</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{data.todayVisitors} сегодня</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Уникальных посетителей</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.uniqueVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((data.uniqueVisitors / data.totalVisitors) * 100).toFixed(1)}% от общего числа
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Просмотров страниц</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {(data.pageViews / data.totalVisitors).toFixed(1)} страниц на посетителя
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Среднее время на сайте</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.averageTimeOnSite}</div>
            <p className="text-xs text-muted-foreground">Отказы: {data.bounceRate}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="geography">География</TabsTrigger>
          <TabsTrigger value="devices">Устройства</TabsTrigger>
          <TabsTrigger value="pages">Страницы</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Посещения за период</CardTitle>
              <CardDescription>График посещений сайта за выбранный период</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.visitsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>География посетителей</CardTitle>
              <CardDescription>Распределение посетителей по регионам</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.visitorsByRegion}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="region"
                      label={({ region, percentage }) => `${region}: ${percentage}%`}
                    >
                      {data.visitorsByRegion.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-2">
                {data.visitorsByRegion.map((region: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <div className="flex-1">{region.region}</div>
                    <div className="font-medium">{region.count.toLocaleString()}</div>
                    <div className="w-16 text-right text-muted-foreground">{region.percentage}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Типы устройств</CardTitle>
                <CardDescription>Распределение посетителей по типам устройств</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.visitorsByDevice}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="device"
                      >
                        {data.visitorsByDevice.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 space-y-2">
                  {data.visitorsByDevice.map((device: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <div className="flex-1">{device.device}</div>
                      <div className="font-medium">{device.count.toLocaleString()}</div>
                      <div className="w-16 text-right text-muted-foreground">{device.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Браузеры</CardTitle>
                <CardDescription>Распределение посетителей по браузерам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.visitorsByBrowser}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="browser"
                      >
                        {data.visitorsByBrowser.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 space-y-2">
                  {data.visitorsByBrowser.map((browser: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <div className="flex-1">{browser.browser}</div>
                      <div className="font-medium">{browser.count.toLocaleString()}</div>
                      <div className="w-16 text-right text-muted-foreground">{browser.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Недавние посетители</CardTitle>
              <CardDescription>Последние посетители сайта</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentVisitors.map((visitor: any) => (
                  <div key={visitor.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{visitor.ip}</div>
                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                          <Globe className="h-3 w-3 mr-1" />
                          {visitor.country}, {visitor.city}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {new Date(visitor.lastVisit).toLocaleString()}
                        </div>
                        <div className="text-sm font-medium mt-1">{visitor.pagesViewed} страниц</div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <div className="flex items-center mr-4">
                        {visitor.device.includes("iPhone") || visitor.device.includes("Android") ? (
                          <Smartphone className="h-3 w-3 mr-1" />
                        ) : (
                          <Laptop className="h-3 w-3 mr-1" />
                        )}
                        {visitor.device}
                      </div>
                      <div>
                        {visitor.browser} / {visitor.os}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Популярные страницы</CardTitle>
              <CardDescription>Наиболее посещаемые страницы сайта</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topPages.map((page: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-muted-foreground">{page.url}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{page.views.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">просмотров</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
