#!/bin/bash

# Script de inicio optimizado para servidores con poca memoria
# Este script evita el error de WebAssembly Out of memory

echo "=== Iniciando Credit With Rami (Versión Low Memory) ==="

# Crear directorio de logs si no existe
mkdir -p logs

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "Error: Node.js no está instalado"
    echo "Por favor, instala Node.js desde cPanel > Node.js Selector"
    exit 1
fi

# Verificar que npm esté instalado
if ! command -v npm &> /dev/null; then
    echo "Error: npm no está instalado"
    exit 1
fi

# Mostrar versiones
echo "Node.js versión: $(node --version)"
echo "npm versión: $(npm --version)"

# Configurar variables de entorno para reducir uso de memoria
export NODE_OPTIONS="--max-old-space-size=1024 --max-semi-space-size=128"
export NODE_ENV=production

# Limpiar caché de npm
echo "Limpiando caché de npm..."
npm cache clean --force

# Limpiar builds anteriores
echo "Limpiando builds anteriores..."
rm -rf .next
rm -rf out
rm -rf dist

# Instalar dependencias con configuración de memoria limitada
echo "Instalando dependencias (optimizado para poca memoria)..."
npm install --production --no-optional --no-audit --no-fund

# Crear build de producción con configuración de memoria limitada
echo "Creando build de producción (optimizado para poca memoria)..."
NODE_OPTIONS="--max-old-space-size=1024" npm run build

# Verificar que el build se completó
if [ -d ".next" ]; then
    echo "✅ Build completado exitosamente"
    echo "Tamaño del directorio .next: $(du -sh .next | cut -f1)"
else
    echo "❌ Error en el build"
    exit 1
fi

# Verificar que PM2 esté instalado
if ! command -v pm2 &> /dev/null; then
    echo "Instalando PM2 globalmente..."
    npm install -g pm2
fi

# Detener aplicación si está corriendo
pm2 stop credit-with-rami-low-memory 2>/dev/null || true
pm2 delete credit-with-rami-low-memory 2>/dev/null || true

# Iniciar aplicación con PM2 usando configuración de baja memoria
echo "Iniciando aplicación con PM2 (configuración de baja memoria)..."
pm2 start ecosystem-low-memory.config.js

# Guardar configuración de PM2
pm2 save

# Configurar PM2 para iniciar automáticamente
pm2 startup

echo "=== Aplicación iniciada correctamente (Versión Low Memory) ==="
echo "Para ver los logs: pm2 logs credit-with-rami-low-memory"
echo "Para ver el estado: pm2 status"
echo "Para reiniciar: pm2 restart credit-with-rami-low-memory"
echo "Para detener: pm2 stop credit-with-rami-low-memory"
echo ""
echo "La aplicación está corriendo en: http://localhost:3000"
echo "Configuración de memoria: NODE_OPTIONS=--max-old-space-size=1024"
