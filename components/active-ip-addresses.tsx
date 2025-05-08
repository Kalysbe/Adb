"use client"

import { useState, useEffect } from "react"
import { getIPStats } from "@/lib/analytics-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Network } from "lucide-react"

export function ActiveIPAddresses() {
  const [ipStats, setIpStats] = useState<{ ip: string; visits: number; lastVisit: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIPStats = async () => {
      try {
        setLoading(true)
        const stats = await getIPStats()
        setIpStats(stats.slice(0, 10)) // Берем только топ-10 IP-адресов
      } catch (error) {
        console.error("Error fetching IP stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchIPStats()
  }, [])

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("ru")
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Самые активные IP-адреса</CardTitle>
        <Network className="h-5 w-5 text-[#cdb32f]" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : ipStats.length === 0 ? (
          <div className="text-center py-4 text-gray-500">Нет данных о посещениях</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>IP-адрес</TableHead>
                  <TableHead className="text-right">Посещений</TableHead>
                  <TableHead className="hidden md:table-cell">Последний визит</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ipStats.map((stat, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{stat.ip}</TableCell>
                    <TableCell className="text-right">{stat.visits}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(stat.lastVisit)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
