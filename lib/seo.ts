import type { Metadata } from "next"

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article"
  twitterCard?: "summary" | "summary_large_image"
  noindex?: boolean
  alternateLanguages?: {
    [key: string]: string
  }
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = "https://adb-solution.com/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  noindex = false,
  alternateLanguages,
}: SEOProps): Metadata {
  // Базовый URL сайта
  const baseUrl = "https://adb-solution.com"

  // Формируем канонический URL
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),

    // Canonical URL
    ...(canonicalUrl && { canonical: canonicalUrl }),

    // Robots meta
    robots: {
      index: !noindex,
      follow: true,
      googleBot: {
        index: !noindex,
        follow: true,
      },
    },

    // Open Graph
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "ADB SOLUTION",
      locale: "ru_RU",
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Twitter
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [ogImage],
    },

    // Alternate languages
    ...(alternateLanguages && {
      alternates: {
        languages: alternateLanguages,
      },
    }),
  }
}
