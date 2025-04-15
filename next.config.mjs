/** @type {import('next').NextConfig} */
const nextConfig = {
  // Отключаем генерацию статических страниц для страницы 404
  output: 'standalone',
  
  // Другие настройки
  images: {
    domains: ['api.adb-solution.com', 'localhost', 'via.placeholder.com'],
    unoptimized: true,
  },
  
  // Отключаем строгий режим для решения проблемы с useSearchParams
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
