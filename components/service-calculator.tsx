"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n/context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function ServiceCalculator() {
  const { language } = useLanguage()

  // Состояние для калькулятора
  const [companyType, setCompanyType] = useState("ip") // ip или osoo
  const [employees, setEmployees] = useState(1)
  const [transactions, setTransactions] = useState(50)
  const [taxSystem, setTaxSystem] = useState("simplified") // simplified, general, vat
  const [additionalServices, setAdditionalServices] = useState({
    reporting: false,
    consulting: false,
    optimization: false,
  })

  // Расчет стоимости
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    // Базовая стоимость в зависимости от типа компании
    let basePrice = companyType === "ip" ? 5000 : 8000

    // Добавляем стоимость за сотрудников
    basePrice += employees * 500

    // Добавляем стоимость за количество операций
    basePrice += Math.floor(transactions / 10) * 300

    // Коэффициент в зависимости от системы налогообложения
    const taxCoefficient = {
      simplified: 1,
      general: 1.3,
      vat: 1.5,
    }

    basePrice *= taxCoefficient[taxSystem]

    // Добавляем стоимость дополнительных услуг
    if (additionalServices.reporting) basePrice += 2000
    if (additionalServices.consulting) basePrice += 3000
    if (additionalServices.optimization) basePrice += 4000

    setTotalPrice(Math.round(basePrice))
  }, [companyType, employees, transactions, taxSystem, additionalServices])

  return (
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === "ru" ? "Калькулятор стоимости услуг" : "Service Cost Calculator"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === "ru"
              ? "Рассчитайте примерную стоимость наших услуг в зависимости от параметров вашего бизнеса"
              : "Calculate the approximate cost of our services depending on your business parameters"}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="calculator" className="text-base">
                {language === "ru" ? "Калькулятор" : "Calculator"}
              </TabsTrigger>
              <TabsTrigger value="packages" className="text-base">
                {language === "ru" ? "Готовые пакеты" : "Service Packages"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {language === "ru" ? "Тип компании" : "Company Type"}
                    </h3>
                    <RadioGroup value={companyType} onValueChange={setCompanyType} className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ip" id="ip" />
                        <Label htmlFor="ip" className="cursor-pointer">
                          {language === "ru" ? "ИП" : "Individual Entrepreneur"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="osoo" id="osoo" />
                        <Label htmlFor="osoo" className="cursor-pointer">
                          {language === "ru" ? "ОсОО" : "LLC"}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {language === "ru" ? "Количество сотрудников" : "Number of Employees"}
                    </h3>
                    <div className="space-y-4">
                      <Slider
                        value={[employees]}
                        min={1}
                        max={50}
                        step={1}
                        onValueChange={(value) => setEmployees(value[0])}
                      />
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">1</span>
                        <span className="font-medium">{employees}</span>
                        <span className="text-sm text-gray-500">50+</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {language === "ru" ? "Количество операций в месяц" : "Monthly Transactions"}
                    </h3>
                    <div className="space-y-4">
                      <Slider
                        value={[transactions]}
                        min={10}
                        max={500}
                        step={10}
                        onValueChange={(value) => setTransactions(value[0])}
                      />
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">10</span>
                        <span className="font-medium">{transactions}</span>
                        <span className="text-sm text-gray-500">500+</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {language === "ru" ? "Система налогообложения" : "Tax System"}
                    </h3>
                    <RadioGroup value={taxSystem} onValueChange={setTaxSystem} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="simplified" id="simplified" />
                        <Label htmlFor="simplified" className="cursor-pointer">
                          {language === "ru" ? "Упрощенная (УСН)" : "Simplified"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general" className="cursor-pointer">
                          {language === "ru" ? "Общая" : "General"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vat" id="vat" />
                        <Label htmlFor="vat" className="cursor-pointer">
                          {language === "ru" ? "С НДС" : "With VAT"}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {language === "ru" ? "Дополнительные услуги" : "Additional Services"}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="reporting" className="cursor-pointer">
                          {language === "ru" ? "Подготовка отчетности" : "Reporting"}
                        </Label>
                        <Switch
                          id="reporting"
                          checked={additionalServices.reporting}
                          onCheckedChange={(checked) =>
                            setAdditionalServices({ ...additionalServices, reporting: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="consulting" className="cursor-pointer">
                          {language === "ru" ? "Налоговое консультирование" : "Tax Consulting"}
                        </Label>
                        <Switch
                          id="consulting"
                          checked={additionalServices.consulting}
                          onCheckedChange={(checked) =>
                            setAdditionalServices({ ...additionalServices, consulting: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="optimization" className="cursor-pointer">
                          {language === "ru" ? "Оптимизация бизнес-процессов" : "Business Optimization"}
                        </Label>
                        <Switch
                          id="optimization"
                          checked={additionalServices.optimization}
                          onCheckedChange={(checked) =>
                            setAdditionalServices({ ...additionalServices, optimization: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">
                      {language === "ru" ? "Примерная стоимость услуг:" : "Estimated service cost:"}
                    </p>
                    <div className="text-3xl font-bold text-[#cdb32f]">
                      {totalPrice.toLocaleString()} {language === "ru" ? "сом/месяц" : "som/month"}
                    </div>
                  </div>

                  <Button className="mt-4 md:mt-0 bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white rounded-full px-8">
                    {language === "ru" ? "Оставить заявку" : "Submit Request"}
                  </Button>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  {language === "ru"
                    ? "* Окончательная стоимость услуг определяется после детального анализа вашего бизнеса"
                    : "* The final cost of services is determined after a detailed analysis of your business"}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="packages">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: language === "ru" ? "Базовый" : "Basic",
                    price: language === "ru" ? "5 000 сом/мес" : "5,000 som/month",
                    features: [
                      language === "ru" ? "Бухгалтерский учет" : "Accounting",
                      language === "ru" ? "До 3 сотрудников" : "Up to 3 employees",
                      language === "ru" ? "До 50 операций" : "Up to 50 transactions",
                      language === "ru" ? "Упрощенная система" : "Simplified tax system",
                    ],
                  },
                  {
                    name: language === "ru" ? "Стандарт" : "Standard",
                    price: language === "ru" ? "10 000 сом/мес" : "10,000 som/month",
                    features: [
                      language === "ru" ? "Бухгалтерский учет" : "Accounting",
                      language === "ru" ? "До 10 сотрудников" : "Up to 10 employees",
                      language === "ru" ? "До 200 операций" : "Up to 200 transactions",
                      language === "ru" ? "Общая система" : "General tax system",
                      language === "ru" ? "Подготовка отчетности" : "Reporting",
                    ],
                  },
                  {
                    name: language === "ru" ? "Премиум" : "Premium",
                    price: language === "ru" ? "20 000 сом/мес" : "20,000 som/month",
                    features: [
                      language === "ru" ? "Бухгалтерский учет" : "Accounting",
                      language === "ru" ? "До 30 сотрудников" : "Up to 30 employees",
                      language === "ru" ? "До 500 операций" : "Up to 500 transactions",
                      language === "ru" ? "Система с НДС" : "VAT tax system",
                      language === "ru" ? "Подготовка отчетности" : "Reporting",
                      language === "ru" ? "Налоговое консультирование" : "Tax consulting",
                      language === "ru" ? "Оптимизация бизнес-процессов" : "Business optimization",
                    ],
                  },
                ].map((pkg, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="text-2xl font-bold text-[#cdb32f] mb-6">{pkg.price}</div>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-[#cdb32f] mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full bg-[#cdb32f] hover:bg-[#cdb32f]/90 text-white">
                      {language === "ru" ? "Выбрать" : "Select"}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
