import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/context"
import Script from "next/script"
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema, SiteNavigationSchema } from "@/components/schema-org"
import { PageTracker } from "@/components/page-tracker"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://adb-solution.com"),
  title: {
    default: "ADB SOLUTION | Профессиональные решения",
    template: "%s | ADB SOLUTION",
  },
  description:
    "ADB SOLUTION предлагает инновационные решения для вашего бизнеса. Узнайте больше о наших услугах и продуктах.",
  keywords: ["ADB SOLUTION", "бизнес решения", "инновации", "профессиональные услуги"],
  authors: [{ name: "ADB SOLUTION" }],
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
    other: [
      {
        rel: "apple-touch-icon",
        url: "/logo.png",
      },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://adb-solution.com",
    siteName: "ADB SOLUTION",
    title: "ADB SOLUTION | Профессиональные решения",
    description:
      "ADB SOLUTION предлагает инновационные решения для вашего бизнеса. Узнайте больше о наших услугах и продуктах.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ADB SOLUTION",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADB SOLUTION | Профессиональные решения",
    description:
      "ADB SOLUTION предлагает инновационные решения для вашего бизнеса. Узнайте больше о наших услугах и продуктах.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
    yandex: "verification_token",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="alternate" hrefLang="ru" href="https://adb-solution.com" />
        <link rel="alternate" hrefLang="en" href="https://adb-solution.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://adb-solution.com" />

        {/* Дополнительные мета-теги для иконок */}
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="msapplication-TileImage" content="/logo.png" />
        <meta name="msapplication-TileColor" content="#cdb32f" />
        <meta name="theme-color" content="#cdb32f" />
      </head>
      <body className={inter.className}>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-VVN26ZBW3S" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VVN26ZBW3S');
            `,
          }}
        />

        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(100834751, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
      });
    `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/100834751" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>

        <OrganizationSchema />
        <WebsiteSchema />
        <LocalBusinessSchema />
        <SiteNavigationSchema />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <PageTracker />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
