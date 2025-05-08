"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Edit, Plus, Search, RefreshCw, Eye } from "lucide-react"
import { getContacts, deleteContact, type Contact } from "@/lib/api"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const router = useRouter()

  // Загрузка контактов
  const loadContacts = async () => {
    setLoading(true)
    try {
      const data = await getContacts()
      setContacts(data)
    } catch (error) {
      console.error("Failed to load contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  // Фильтрация контактов по поисковому запросу
  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.firstName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (contact.lastName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (contact.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (contact.phone || "").includes(searchQuery) ||
      (contact.message?.toLowerCase() || "").includes(searchQuery.toLowerCase()),
  )

  // Удаление контакта
  const handleDelete = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот контакт?")) {
      setIsDeleting(id)
      try {
        const success = await deleteContact(id)
        if (success) {
          setContacts((prev) => prev.filter((contact) => contact._id !== id))
        }
      } catch (error) {
        console.error("Error deleting contact:", error)
      } finally {
        setIsDeleting(null)
      }
    }
  }

  // Форматирование даты
  const formatDate = (dateString: string) => {
    try {
      // Используем format вместо formatDistanceToNow для отображения полной даты
      return format(new Date(dateString), "dd.MM.yyyy HH:mm", { locale: ru })
    } catch (error) {
      return "Неизвестная дата"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Управление контактами</h1>
        <button
          onClick={() => router.push("/admin/contacts/create")}
          className="bg-[#cdb32f] hover:bg-[#b09a28] text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Добавить контакт
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Поиск контактов..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#cdb32f]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={loadContacts}
            className="text-gray-600 hover:text-[#cdb32f] p-2 rounded-full"
            disabled={loading}
          >
            <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#cdb32f]"></div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            {searchQuery ? "Контакты не найдены" : "Список контактов пуст"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Имя
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Телефон
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {contact.firstName || ""} {contact.lastName || ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{contact.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{contact.phone || "—"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{formatDate(contact.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => router.push(`/admin/contacts/${contact._id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Просмотреть"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/contacts/edit/${contact._id}`)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Редактировать"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={isDeleting === contact._id}
                          title="Удалить"
                        >
                          {isDeleting === contact._id ? (
                            <div className="h-5 w-5 border-t-2 border-red-600 rounded-full animate-spin"></div>
                          ) : (
                            <Trash2 className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
