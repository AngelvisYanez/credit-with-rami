#!/bin/bash

# Script de inicio para build estático (sin WebAssembly)
# Este script evita completamente el error de WebAssembly

echo "=== Iniciando Credit With Rami (Build Estático) ==="

# Crear directorio de logs si no existe
mkdir -p logs

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "Error: Node.js no está instalado"
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
export NODE_OPTIONS="--max-old-space-size=512 --max-semi-space-size=64"
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
echo "Instalando dependencias..."
npm install --production --no-optional --no-audit --no-fund

# Copiar configuración estática
echo "Configurando build estático..."
cp next.config.static.js next.config.js

# Crear build estático (sin WebAssembly)
echo "Creando build estático (sin WebAssembly)..."
NODE_OPTIONS="--max-old-space-size=512" npm run build

# Verificar que el build se completó
if [ -d "out" ]; then
    echo "✅ Build estático completado exitosamente"
    echo "Tamaño del directorio out: $(du -sh out | cut -f1)"
else
    echo "❌ Error en el build estático"
    exit 1
fi

# Verificar que PM2 esté instalado
if ! command -v pm2 &> /dev/null; then
    echo "Instalando PM2 globalmente..."
    npm install -g pm2
fi

# Detener aplicación si está corriendo
pm2 stop credit-with-rami-static 2>/dev/null || true
pm2 delete credit-with-rami-static 2>/dev/null || true

# Iniciar aplicación con PM2 usando servidor estático
echo "Iniciando aplicación con PM2 (servidor estático)..."
pm2 start server-static.js --name credit-with-rami-static

# Guardar configuración de PM2
pm2 save

# Configurar PM2 para iniciar automáticamente
pm2 startup

echo "=== Aplicación iniciada correctamente (Build Estático) ==="
echo "Para ver los logs: pm2 logs credit-with-rami-static"
echo "Para ver el estado: pm2 status"
echo "Para reiniciar: pm2 restart credit-with-rami-static"
echo "Para detener: pm2 stop credit-with-rami-static"
echo ""
echo "La aplicación está corriendo en: http://localhost:3000"
echo "Configuración: Build estático sin WebAssembly"
