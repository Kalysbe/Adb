import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongo"

export async function POST(req: NextRequest) {
  try {
    console.log("Получен запрос на сохранение аналитики")
    const body = await req.json()

    const forwardedFor = req.headers.get("x-forwarded-for")
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : req.ip || "unknown"

    console.log(`IP адрес посетителя: ${ip}`)

    // Проверяем, доступно ли подключение к MongoDB
    const client = await clientPromise

    if (!client) {
      console.log("MongoDB недоступна, сохраняем данные только в логи")
      console.log(
        "Данные аналитики:",
        JSON.stringify(
          {
            ...body,
            ip,
            receivedAt: new Date(),
          },
          null,
          2,
        ),
      )

      // Возвращаем успешный ответ, даже если MongoDB недоступна
      return NextResponse.json({
        success: true,
        message: "Данные аналитики записаны в логи (MongoDB недоступна)",
      })
    }

    console.log("Подключение к MongoDB успешно установлено")
    const db = client.db("blog")
    const collection = db.collection("visits")

    const dataToStore = {
      ...body,
      ip,
      receivedAt: new Date(),
    }

    const result = await collection.insertOne(dataToStore)
    console.log(`Данные успешно сохранены в MongoDB. ID документа: ${result.insertedId}`)

    return NextResponse.json({ success: true, message: "Данные аналитики сохранены в MongoDB" })
  } catch (error) {
    console.error("Ошибка при сохранении аналитики:", error)

    // Возвращаем успешный ответ с информацией об ошибке, чтобы не блокировать работу приложения
    return NextResponse.json({
      success: false,
      message: "Данные аналитики не сохранены",
      error: error instanceof Error ? error.message : "Неизвестная ошибка",
    })
  }
}
