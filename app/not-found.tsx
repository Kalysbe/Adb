import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Страница не найдена | ADB SOLUTION",
  description: "Запрашиваемая страница не найдена. Вернитесь на главную страницу ADB SOLUTION.",
}

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
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
            404
          </h1>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "1.5rem",
            }}
          >
            Страница не найдена
          </h2>
          <p
            style={{
              color: "#666",
              maxWidth: "500px",
              margin: "0 auto 2rem auto",
            }}
          >
            Извините, запрашиваемая страница не существует или была перемещена. Пожалуйста, вернитесь на главную
            страницу.
          </p>
          <a
            href="/"
            style={{
              backgroundColor: "#cdb32f",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              textDecoration: "none",
              fontWeight: "medium",
              display: "inline-block",
            }}
          >
            Вернуться на главную
          </a>
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
  )
}
