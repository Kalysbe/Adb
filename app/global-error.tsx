"use client"

import { useEffect } from "react"

export default function GlobalError({
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
    <html>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "white",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <header
            style={{
              borderBottom: "1px solid #eaeaea",
              padding: "1rem",
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 1rem",
              }}
            >
              <a
                href="/"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#cdb32f",
                  textDecoration: "none",
                }}
              >
                ADB SOLUTION
              </a>
            </div>
          </header>

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
                  fontSize: "4rem",
                  fontWeight: "bold",
                  color: "#cdb32f",
                  marginBottom: "1rem",
                }}
              >
                Ошибка
              </h1>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "1.5rem",
                }}
              >
                Что-то пошло не так
              </h2>
              <p
                style={{
                  color: "#666",
                  maxWidth: "500px",
                  margin: "0 auto 2rem auto",
                }}
              >
                Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз.
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

          <footer
            style={{
              borderTop: "1px solid #eaeaea",
              padding: "1.5rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 1rem",
                textAlign: "center",
                color: "#666",
              }}
            >
              <p>© {new Date().getFullYear()} ADB SOLUTION. Все права защищены.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
