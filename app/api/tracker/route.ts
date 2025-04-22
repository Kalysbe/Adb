import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Получаем данные из запроса
    const data = await request.json()

    // Выводим полученные данные в консоль сервера
    console.log("Данные трекера получены на сервере:", data)

    try {
      // Отправляем данные на внешний API
      const response = await fetch("https://api.adb-solution.com/tracker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      // Проверяем статус ответа
      if (!response.ok) {
        console.error("Ошибка при отправке данных на внешний API:", response.status, response.statusText)

        // Возвращаем ошибку, но продолжаем выполнение
        return NextResponse.json(
          {
            error: "Ошибка при отправке данных на внешний API",
            status: response.status,
            statusText: response.statusText,
            data: data, // Возвращаем данные, которые пытались отправить
          },
          { status: 200 }, // Возвращаем 200, чтобы клиент знал, что запрос обработан
        )
      }

      // Пытаемся получить JSON из ответа
      let responseData
      try {
        responseData = await response.json()
      } catch (e) {
        // Если не удалось получить JSON, используем текст ответа
        responseData = { text: await response.text() }
      }

      console.log("Ответ от внешнего API:", responseData)

      // Возвращаем успешный ответ
      return NextResponse.json({
        success: true,
        data: responseData,
      })
    } catch (error) {
      console.error("Ошибка при отправке на внешний API:", error)

      // Возвращаем ошибку, но с кодом 200, чтобы клиент знал, что запрос обработан
      return NextResponse.json(
        {
          error: "Ошибка при отправке на внешний API",
          message: error instanceof Error ? error.message : String(error),
          data: data, // Возвращаем данные, которые пытались отправить
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("Ошибка при обработке запроса трекера:", error)

    return NextResponse.json(
      {
        error: "Ошибка при обработке запроса",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
