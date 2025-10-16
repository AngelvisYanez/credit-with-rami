/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para build estático (sin WebAssembly)
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  // Deshabilitar todas las optimizaciones que usan WebAssembly
  experimental: {
    // Deshabilitar completamente WebAssembly
    webVitalsAttribution: false,
    optimizeCss: false,
    swcMinify: false, // Usar Terser en lugar de SWC
  },
  
  // Configuración de compilación mínima
  compiler: {
    removeConsole: false, // Mantener console para debugging
  },
  
  // Configuración de webpack para evitar WebAssembly
  webpack: (config, { isServer }) => {
    // Deshabilitar WebAssembly completamente
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Deshabilitar optimizaciones que usan WebAssembly
    config.optimization = {
      ...config.optimization,
      minimize: false, // Deshabilitar minificación
      splitChunks: false, // Deshabilitar code splitting
    };
    
    // Deshabilitar source maps
    config.devtool = false;
    
    return config;
  },
  
  // Configuración de imágenes estáticas
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './imageLoader.js',
  },
  
  // Deshabilitar telemetría
  telemetry: false,
}

module.exports = nextConfig
