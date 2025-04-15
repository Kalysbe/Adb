import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Получаем параметры из URL
    const title = searchParams.get("title") || "ADB SOLUTION"
    const description = searchParams.get("description") || "Профессиональные решения для вашего бизнеса"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#cdb32f",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
            }}
          >
            <span style={{ color: "white", fontSize: "40px", fontWeight: "bold" }}>A</span>
          </div>
          <span style={{ fontSize: "48px", fontWeight: "bold" }}>ADB SOLUTION</span>
        </div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#666",
            textAlign: "center",
            maxWidth: "70%",
          }}
        >
          {description}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.log(`${e}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
