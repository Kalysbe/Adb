"use client"

import { useLanguage } from "@/lib/i18n/context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  const { t, language } = useLanguage()

  const faqs = {
    ru: [
      {
        question: "Какие услуги предлагает ADB SOLUTION?",
        answer:
          "ADB SOLUTION предлагает широкий спектр услуг, включая бухгалтерский учет, аудит, налоговое консультирование, бизнес-консалтинг, финансовый анализ и разработку бизнес-стратегий. Мы адаптируем наши услуги под конкретные потребности каждого клиента.",
      },
      {
        question: "Как начать сотрудничество с ADB SOLUTION?",
        answer:
          "Чтобы начать сотрудничество, свяжитесь с нами по телефону, электронной почте или через форму на нашем сайте. Мы организуем встречу для обсуждения ваших потребностей и предложим оптимальное решение для вашего бизнеса.",
      },
      {
        question: "Работаете ли вы с малым бизнесом?",
        answer:
          "Да, мы работаем с компаниями любого размера – от индивидуальных предпринимателей до крупных корпораций. Для малого бизнеса у нас есть специальные пакеты услуг, которые учитывают особенности и бюджет небольших компаний.",
      },
      {
        question: "Какие отрасли вы обслуживаете?",
        answer:
          "Мы имеем опыт работы в различных отраслях, включая розничную торговлю, производство, строительство, IT, здравоохранение, образование и многие другие. Наши специалисты обладают глубокими знаниями в специфике различных секторов экономики.",
      },
      {
        question: "Предоставляете ли вы услуги онлайн?",
        answer:
          "Да, мы предлагаем удаленное обслуживание для многих наших услуг. Это особенно удобно для клиентов, которые находятся в других городах или предпочитают дистанционное взаимодействие.",
      },
    ],
    en: [
      {
        question: "What services does ADB SOLUTION offer?",
        answer:
          "ADB SOLUTION offers a wide range of services including accounting, auditing, tax consulting, business consulting, financial analysis, and business strategy development. We tailor our services to the specific needs of each client.",
      },
      {
        question: "How do I start working with ADB SOLUTION?",
        answer:
          "To start collaboration, contact us by phone, email, or through the form on our website. We will arrange a meeting to discuss your needs and offer the optimal solution for your business.",
      },
      {
        question: "Do you work with small businesses?",
        answer:
          "Yes, we work with companies of any size – from individual entrepreneurs to large corporations. For small businesses, we have special service packages that take into account the characteristics and budget of small companies.",
      },
      {
        question: "What industries do you serve?",
        answer:
          "We have experience working in various industries, including retail, manufacturing, construction, IT, healthcare, education, and many others. Our specialists have deep knowledge in the specifics of various sectors of the economy.",
      },
      {
        question: "Do you provide online services?",
        answer:
          "Yes, we offer remote service for many of our services. This is especially convenient for clients who are in other cities or prefer remote interaction.",
      },
    ],
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            {language === "ru" ? "Часто задаваемые вопросы" : "Frequently Asked Questions"}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            {language === "ru"
              ? "Ответы на наиболее распространенные вопросы о наших услугах и процессах работы"
              : "Answers to the most common questions about our services and work processes"}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl p-4 md:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs[language].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-0">
                <AccordionTrigger className="text-left text-base md:text-lg font-medium text-gray-900 hover:text-[#cdb32f] py-3 md:py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-gray-600 pb-3 md:pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
