"use client"

import { Star } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function Testimonials() {
  const { t } = useLanguage()

  const testimonials = [
    {
      name: "Алексей Иванов",
      position: 'Генеральный директор, ООО "ТехноПром"',
      content:
        "Сотрудничество с ADB SOLUTION позволило нам значительно оптимизировать бизнес-процессы и увеличить эффективность работы компании. Профессиональный подход и качественные решения.",
      rating: 5,
    },
    {
      name: "Елена Смирнова",
      position: 'Финансовый директор, ЗАО "ИнвестГрупп"',
      content:
        "Благодаря внедрению решений от ADB SOLUTION мы смогли автоматизировать финансовый учет и сократить время на подготовку отчетности. Рекомендую эту компанию как надежного партнера.",
      rating: 5,
    },
    {
      name: "Дмитрий Петров",
      position: 'IT-директор, "МедиаХолдинг"',
      content:
        "Команда ADB SOLUTION помогла нам модернизировать IT-инфраструктуру и внедрить современные технологии. Высокий профессионализм и отличное качество работы.",
      rating: 4,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("testimonials")}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("testimonialsDescription")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? "text-[#cdb32f] fill-[#cdb32f]" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
