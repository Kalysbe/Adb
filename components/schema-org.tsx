import type { Organization, WebSite, WithContext, LocalBusiness, SiteNavigationElement, Service } from "schema-dts"

export function OrganizationSchema() {
  const schema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ADB SOLUTION",
    url: "https://adb-solution.com",
    logo: {
      "@type": "ImageObject",
      url: "https://adb-solution.com/logo.png",
      width: "512",
      height: "512",
    },
    image: "https://adb-solution.com/logo.png",
    description: "Профессиональные аудиторские и бухгалтерские услуги в Бишкеке и по всему Кыргызстану",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+996555751592",
      contactType: "Customer Support",
      email: "gulzada@adb-solution.com",
      areaServed: "Кыргызстан",
      availableLanguage: ["Russian", "Kyrgyz", "English"],
    },
    sameAs: [
      "https://facebook.com/adbsolution",
      "https://twitter.com/adbsolution",
      "https://instagram.com/adbsolution",
      "https://linkedin.com/company/adbsolution",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Разакова 32",
      addressLocality: "Бишкек",
      addressRegion: "Чуйская область",
      postalCode: "720040",
      addressCountry: "Кыргызстан",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function LocalBusinessSchema() {
  const schema: WithContext<LocalBusiness> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ADB SOLUTION",
    image: "https://adb-solution.com/logo.png",
    logo: {
      "@type": "ImageObject",
      url: "https://adb-solution.com/logo.png",
      width: "512",
      height: "512",
    },
    description:
      "Профессиональные аудиторские и бухгалтерские услуги в Бишкеке и по всему Кыргызстану. Аудит, бухгалтерское сопровождение, налоговый консалтинг и бизнес-решения.",
    url: "https://adb-solution.com",
    telephone: "+996555751592",
    email: "gulzada@adb-solution.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Разакова 32",
      addressLocality: "Бишкек",
      addressRegion: "Чуйская область",
      postalCode: "720040",
      addressCountry: "Кыргызстан",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.8746,
      longitude: 74.5698,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 41.2044,
        longitude: 74.7661,
      },
      geoRadius: "500 km",
      description: "Кыргызская Республика",
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 41.2044,
        longitude: 74.7661,
      },
      geoRadius: "500 km",
      description: "Кыргызская Республика",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function WebsiteSchema() {
  const schema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ADB SOLUTION - Аудиторские и бухгалтерские услуги в Бишкеке и Кыргызстане",
    url: "https://adb-solution.com",
    description:
      "Профессиональные аудиторские и бухгалтерские услуги в Бишкеке и по всему Кыргызстану. Аудит, бухгалтерское сопровождение, налоговый консалтинг и бизнес-решения.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://adb-solution.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["ru-RU", "en-US"],
    copyrightYear: "2023",
    datePublished: "2023-01-01",
    dateModified: "2023-12-01",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function SiteNavigationSchema() {
  const schema: WithContext<SiteNavigationElement> = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "Главная",
      "О нас",
      "Услуги",
      "Аудит в Бишкеке",
      "Бухгалтерские услуги в Кыргызстане",
      "Налоговый консалтинг",
      "Бизнес-консалтинг",
      "Новости",
      "Контакты",
    ],
    url: [
      "https://adb-solution.com/",
      "https://adb-solution.com/about",
      "https://adb-solution.com/services",
      "https://adb-solution.com/services/audit",
      "https://adb-solution.com/services/accounting",
      "https://adb-solution.com/services/tax-consulting",
      "https://adb-solution.com/services/business-consulting",
      "https://adb-solution.com/news",
      "https://adb-solution.com/contacts",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function AuditServiceSchema() {
  const schema: WithContext<Service> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Аудиторские услуги в Бишкеке и Кыргызстане",
    description:
      "Профессиональный аудит финансовой отчетности в соответствии с международными стандартами и законодательством Кыргызской Республики",
    provider: {
      "@type": "Organization",
      name: "ADB SOLUTION",
      url: "https://adb-solution.com",
    },
    serviceType: "Аудиторские услуги",
    areaServed: {
      "@type": "Country",
      name: "Кыргызстан",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги аудита",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Аудит финансовой отчетности",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Налоговый аудит",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Аудит бизнес-процессов",
          },
        },
      ],
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function AccountingServiceSchema() {
  const schema: WithContext<Service> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Бухгалтерские услуги в Бишкеке и Кыргызстане",
    description:
      "Полное бухгалтерское сопровождение бизнеса в Кыргызстане, включая подготовку и сдачу отчетности в соответствии с законодательством Кыргызской Республики",
    provider: {
      "@type": "Organization",
      name: "ADB SOLUTION",
      url: "https://adb-solution.com",
    },
    serviceType: "Бухгалтерские услуги",
    areaServed: {
      "@type": "Country",
      name: "Кыргызстан",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Бухгалтерские услуги",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ведение бухгалтерского учета",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Подготовка и сдача отчетности",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Расчет заработной платы",
          },
        },
      ],
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function SchemaOrg() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebsiteSchema />
      <SiteNavigationSchema />
      <AuditServiceSchema />
      <AccountingServiceSchema />
    </>
  )
}
