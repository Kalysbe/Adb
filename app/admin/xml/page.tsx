"use client"

import { useEffect, useState } from "react"
import { xmlService } from "@/lib/api-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Trash2, MoreHorizontal, Plus, Search, Loader2, Download, Eye } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function XmlPage() {
  const [xmlFiles, setXmlFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [xmlToDelete, setXmlToDelete] = useState<string | null>(null)

  useEffect(() => {
    const fetchXmlFiles = async () => {
      setLoading(true)
      try {
        const response = await xmlService.getAll()
        setXmlFiles(response)
        setError(null)
      } catch (err: any) {
        setError(err.message || "Ошибка при загрузке XML файлов")
      } finally {
        setLoading(false)
      }
    }

    fetchXmlFiles()
  }, [])

  const filteredXmlFiles = xmlFiles.filter((xml: any) => xml.name?.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDeleteClick = (xmlId: string) => {
    setXmlToDelete(xmlId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (xmlToDelete) {
      setLoading(true)
      try {
        await xmlService.delete(xmlToDelete)
        setXmlFiles(xmlFiles.filter((xml: any) => xml._id !== xmlToDelete))
        setIsDeleteDialogOpen(false)
        setXmlToDelete(null)
      } catch (err: any) {
        setError(err.message || "Ошибка при удалении XML файла")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">XML Файлы</h1>
        <Button onClick={() => console.log("Add XML")}>
          <Plus className="mr-2 h-4 w-4" />
          Добавить XML
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Поиск XML файлов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Размер</TableHead>
                <TableHead>Дата создания</TableHead>
                <TableHead className="w-[100px]">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredXmlFiles.length > 0 ? (
                filteredXmlFiles.map((xml: any) => (
                  <TableRow key={xml._id}>
                    <TableCell className="font-medium">{xml.name}</TableCell>
                    <TableCell>{xml.type || "XML"}</TableCell>
                    <TableCell>{xml.size ? `${Math.round(xml.size / 1024)} KB` : "Неизвестно"}</TableCell>
                    <TableCell>{new Date(xml.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Открыть меню</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => console.log("View XML", xml._id)} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            Просмотр
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => console.log("Download XML", xml._id)}
                            className="cursor-pointer"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Скачать
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(xml._id)}
                            className="cursor-pointer text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    XML файлы не найдены
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Диалог подтверждения удаления */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удаление XML файла</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить этот XML файл? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
