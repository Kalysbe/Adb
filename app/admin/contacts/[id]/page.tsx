"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { getContact, deleteContact, type Contact } from "@/lib/api"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

export default function ContactDetailPage({ params }: { params: { id: string } }) {
  const [contact, setContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    const loadContact = async () => {
      setLoading(true)
      try {
        const data = await getContact(id)
        setContact(data)
      } catch (error) {
        console.error("Failed to load contact:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContact()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm("Вы уверены, что хотите удалить этот контакт?")) {
      setIsDeleting(true)
      try {
        const success = await deleteContact(id)
        if (success) {
          router.push("/admin/contacts")
        }
      } catch (error) {
        console.error("Error deleting contact:", error)
        setIsDeleting(false)
      }
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP 'в' p", { locale: ru })
    } catch (error) {
      return "Неизвестная дата"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#cdb32f]"></div>
      </div>
    )
  }

  if (!contact) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700">Контакт не найден</h2>
        <button
          onClick={() => router.push("/admin/contacts")}
          className="mt-4 text-[#cdb32f] hover:underline flex items-center justify-center mx-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Вернуться к списку контактов
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => router.push("/admin/contacts")}
          className="text-gray-600 hover:text-[#cdb32f] flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Назад к списку
        </button>
        <div className="flex space-x-3">
          <button
            onClick={() => router.push(`/admin/contacts/edit/${id}`)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
            disabled={isDeleting}
          >
            <Edit className="mr-2 h-4 w-4" />
            Редактировать
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="mr-2 h-4 w-4 border-t-2 border-white rounded-full animate-spin"></div>
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            Удалить
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h1 className="text-xl font-bold text-gray-800">Информация о контакте</h1>
        </div>
        <div className="p-6">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div className="col-span-1">
              <dt className="text-sm font-medium text-gray-500">Имя</dt>
              <dd className="mt-1 text-lg text-gray-900">
                {contact.firstName || ""} {contact.lastName || ""}
              </dd>
            </div>
            <div className="col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-lg text-gray-900">
                <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div className="col-span-1">
              <dt className="text-sm font-medium text-gray-500">Телефон</dt>
              <dd className="mt-1 text-lg text-gray-900">
                {contact.phone ? (
                  <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                    {contact.phone}
                  </a>
                ) : (
                  <span className="text-gray-400">Не указан</span>
                )}
              </dd>
            </div>
            <div className="col-span-1">
              <dt className="text-sm font-medium text-gray-500">Дата обращения</dt>
              <dd className="mt-1 text-lg text-gray-900">{formatDate(contact.createdAt)}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-sm font-medium text-gray-500">Сообщение</dt>
              <dd className="mt-1 text-lg text-gray-900 whitespace-pre-wrap p-4 bg-gray-50 rounded-md">
                {contact.message}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
