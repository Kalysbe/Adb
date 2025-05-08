"use client"

import type React from "react"

import { useState, useEffect, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { getContact, updateContact, type Contact } from "@/lib/api"

export default function EditContactPage({ params }: { params: { id: string } }) {
  const [contact, setContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    const loadContact = async () => {
      setLoading(true)
      try {
        const data = await getContact(id)
        setContact(data)
        if (data) {
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email,
            phone: data.phone || "",
            message: data.message,
          })
        }
      } catch (error) {
        console.error("Failed to load contact:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContact()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const updated = await updateContact(id, formData)
      if (updated) {
        router.push(`/admin/contacts/${id}`)
      }
    } catch (error) {
      console.error("Error updating contact:", error)
    } finally {
      setSaving(false)
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
          onClick={() => router.push(`/admin/contacts/${id}`)}
          className="text-gray-600 hover:text-[#cdb32f] flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Назад к контакту
        </button>
        <h1 className="text-2xl font-bold">Редактирование контакта</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Имя
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cdb32f] focus:border-[#cdb32f]"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Фамилия
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cdb32f] focus:border-[#cdb32f]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cdb32f] focus:border-[#cdb32f]"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cdb32f] focus:border-[#cdb32f]"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Сообщение
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cdb32f] focus:border-[#cdb32f]"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#cdb32f] hover:bg-[#b09a28] text-white px-6 py-2 rounded-md flex items-center"
            >
              {saving ? (
                <div className="mr-2 h-5 w-5 border-t-2 border-white rounded-full animate-spin"></div>
              ) : (
                <Save className="mr-2 h-5 w-5" />
              )}
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
