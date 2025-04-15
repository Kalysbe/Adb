export default function Custom404Page() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>404 - Страница не найдена</h1>
      <p style={{ marginBottom: "1rem" }}>Извините, запрашиваемая страница не существует или была перемещена.</p>
      <a
        href="/"
        style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          backgroundColor: "#cdb32f",
          color: "white",
          textDecoration: "none",
          borderRadius: "0.25rem",
        }}
      >
        Вернуться на главную
      </a>
    </div>
  )
}
