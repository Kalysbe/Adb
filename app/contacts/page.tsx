import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { MapPin, Phone, Mail } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Контакты ADB SOLUTION | Свяжитесь с нами для консультации",
  description:
    "Свяжитесь с нами для получения консультации по аудиту, бухгалтерским услугам и бизнес-решениям. Мы всегда рады помочь вам.",
  keywords: ["ADB SOLUTION", "контакты", "аудит", "бухгалтерские услуги", "консультация", "Бишкек", "Разакова 32"],
}

export default function ContactsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-adb-gray">
          Контакты ADB SOLUTION: свяжитесь с нами для консультации
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-adb-gray">Свяжитесь с нами</h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-adb-gray">Наши контакты</h2>

            <div className="bg-adb-gold/20 p-8 rounded-lg mb-8">
              <div className="flex items-start mb-6">
                <MapPin className="text-[#cdb32f] mr-4 h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-adb-gray">Адрес</h3>
                  <p className="text-gray-700 mt-1">Разакова 32, Бишкек, Кыргызстан</p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <Phone className="text-[#cdb32f] mr-4 h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-adb-gray">Телефон</h3>
                  <p className="text-gray-700 mt-1">+996 555 751 592</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-[#cdb32f] mr-4 h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-adb-gray">Email</h3>
                  <p className="text-gray-700 mt-1">gulzada@adb-solution.com</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden h-64 bg-gray-200">
              {/* Здесь можно добавить карту, например, Google Maps или Яндекс.Карты */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Карта расположения офиса
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
