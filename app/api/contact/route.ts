import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Здесь можно добавить логику для отправки данных на email или сохранения в базу данных
    console.log("Received contact form submission:", formData)

    // Пример: отправка данных на внешний API или сервис отправки email
    // const response = await fetch('https://your-external-api.com/send-email', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })

    // if (!response.ok) {
    //   throw new Error('Failed to send email')
    // }

    // Успешный ответ
    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    })
  } catch (error) {
    console.error("Error processing contact form:", error)

    // Ответ с ошибкой
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process form submission",
      },
      { status: 500 },
    )
  }
}
