"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  fetchDeclarations,
  deleteDeclaration,
  selectDeclarations,
  selectDeclarationsLoading,
  selectDeclarationsError,
} from "@/lib/redux/slices/declarationsSlice"
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
import { Pencil, Trash2, MoreHorizontal, Plus, Search, Loader2, Eye } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DeclarationsPage() {
  const dispatch = useAppDispatch()
  const declarations = useAppSelector(selectDeclarations)
  const loading = useAppSelector(selectDeclarationsLoading)
  const error = useAppSelector(selectDeclarationsError)

  const [searchQuery, setSearchQuery] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [declarationToDelete, setDeclarationToDelete] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchDeclarations())
  }, [dispatch])

  const filteredDeclarations = declarations.filter((declaration) =>
    declaration.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteClick = (declarationId: string) => {
    setDeclarationToDelete(declarationId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (declarationToDelete) {
      await dispatch(deleteDeclaration(declarationToDelete))
      setIsDeleteDialogOpen(false)
      setDeclarationToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Декларации</h1>
        <Button onClick={() => console.log("Add declaration")}>
          <Plus className="mr-2 h-4 w-4" />
          Д��бавить декларацию
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
            placeholder="Поиск деклараций..."
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
                <TableHead>Имя</TableHead>
                <TableHead>Район</TableHead>
                <TableHead>Дата создания</TableHead>
                <TableHead className="w-[100px]">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeclarations.length > 0 ? (
                filteredDeclarations.map((declaration) => (
                  <TableRow key={declaration._id}>
                    <TableCell className="font-medium">{declaration.title}</TableCell>
                    <TableCell>{declaration.content?.Name || "Не указано"}</TableCell>
                    <TableCell>{declaration.content?.RayonName || "Не указано"}</TableCell>
                    <TableCell>{new Date(declaration.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Открыть меню</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => console.log("View declaration", declaration._id)}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Просмотр
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => console.log("Edit declaration", declaration._id)}
                            className="cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Редактировать
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(declaration._id)}
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
                    Декларации не найдены
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
            <DialogTitle>Удаление декларации</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить эту декларацию? Это действие нельзя отменить.
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
