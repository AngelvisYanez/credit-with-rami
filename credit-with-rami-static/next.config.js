/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Comentado para Netlify con API routes
  trailingSlash: true, // Agregar slash final para compatibilidad
  
  // Optimizaciones para servidores con poca memoria
  experimental: {
    // Deshabilitar optimizaciones que consumen mucha memoria
    optimizeCss: false,
    // Usar SWC en lugar de Babel para menor uso de memoria
    swcMinify: true,
    // Deshabilitar WebAssembly completamente
    webVitalsAttribution: false,
  },
  
  // Configuración de compilación para reducir uso de memoria
  compiler: {
    // Deshabilitar optimizaciones que consumen memoria
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuración de webpack para reducir memoria
  webpack: (config, { isServer }) => {
    // Reducir el uso de memoria en el build
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
        },
      },
    };
    
    // Deshabilitar source maps para reducir memoria
    config.devtool = false;
    
    return config;
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
    ],
    formats: ['image/webp'], // Remover avif para reducir memoria
    unoptimized: true, // Deshabilitar optimización de imágenes para evitar problemas en deploy
  },
  // Video optimization
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
  // Compression
  compress: true,
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig