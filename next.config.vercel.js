/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración específica para Vercel
  experimental: {
    webVitalsAttribution: [],
  },
  
  // Configuración de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
    ],
    formats: ['image/webp'],
    unoptimized: true,
  },
  
  // Headers para optimización
  async headers() {
    return [
      {
        source: '/rami-video.mp4',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
        ],
      },
      {
        source: '/video-poster.jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Configuración de compresión
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig
