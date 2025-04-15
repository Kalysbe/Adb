/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://adb-solution.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: ["https://adb-solution.com/sitemap.xml", "https://adb-solution.com/server-sitemap.xml"],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/private"],
      },
    ],
  },
  exclude: ["/admin/*", "/private/*"],
  generateIndexSitemap: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  outDir: "public",
}
