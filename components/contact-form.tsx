"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function ContactForm() {
  const { language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData.entries())

    try {
      // Отправка данных на сервер
      const response = await fetch("https://api.adb-solution.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })

      if (response.ok) {
        setFormStatus({
          success: true,
          message:
            language === "ru"
              ? "Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время."
              : "Thank you! Your message has been sent successfully. We will contact you shortly.",
        })
        // Очистка формы
        e.currentTarget.reset()
      } else {
        setFormStatus({
          success: false,
          message:
            language === "ru"
              ? "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз."
              : "An error occurred while sending the message. Please try again.",
        })
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message:
          language === "ru"
            ? "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз."
            : "An error occurred while sending the message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
            {language === "ru" ? "Имя" : "First Name"}
          </label>
          <Input
            id="firstName"
            name="firstName"
            placeholder={language === "ru" ? "Введите ваше имя" : "Enter your first name"}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
            {language === "ru" ? "Фамилия" : "Last Name"}
          </label>
          <Input
            id="lastName"
            name="lastName"
            placeholder={language === "ru" ? "Введите вашу фамилию" : "Enter your last name"}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <Input id="email" name="email" type="email" placeholder="example@mail.com" required />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
          {language === "ru" ? "Телефон" : "Phone"}
        </label>
        <Input id="phone" name="phone" placeholder="+996 (___) ___-__-__" required />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">
          {language === "ru" ? "Сообщение" : "Message"}
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder={language === "ru" ? "Введите ваше сообщение" : "Enter your message"}
          rows={5}
          required
        />
      </div>

      <Button type="submit" className="w-full bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {language === "ru" ? "Отправка..." : "Sending..."}
          </>
        ) : language === "ru" ? (
          "Отправить сообщение"
        ) : (
          "Send Message"
        )}
      </Button>

      {formStatus && (
        <div
          className={`p-4 rounded-md ${formStatus.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {formStatus.message}
        </div>
      )}
    </form>
  )
}
