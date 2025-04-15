"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <main
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "1rem",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#cdb32f",
              marginBottom: "1rem",
            }}
          >
            Ошибка
          </h1>
          <p
            style={{
              color: "#666",
              maxWidth: "500px",
              margin: "0 auto 2rem auto",
            }}
          >
            Произошла ошибка при загрузке этой страницы. Пожалуйста, попробуйте еще раз.
          </p>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: "#cdb32f",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Попробовать снова
          </button>
        </div>
      </main>
    </div>
  )
}
