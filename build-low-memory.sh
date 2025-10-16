#!/bin/bash

# Script de build optimizado para servidores con poca memoria
# Este script evita el error de WebAssembly Out of memory

echo "=== Build optimizado para servidores con poca memoria ==="

# Configurar variables de entorno para reducir uso de memoria
export NODE_OPTIONS="--max-old-space-size=1024 --max-semi-space-size=128"
export NODE_ENV=production

# Limpiar caché de npm
echo "Limpiando caché de npm..."
npm cache clean --force

# Limpiar directorios de build anteriores
echo "Limpiando builds anteriores..."
rm -rf .next
rm -rf out
rm -rf dist

# Instalar dependencias con configuración de memoria limitada
echo "Instalando dependencias..."
npm install --production --no-optional --no-audit --no-fund

# Crear build con configuración de memoria limitada
echo "Creando build de producción..."
NODE_OPTIONS="--max-old-space-size=1024" npm run build

# Verificar que el build se completó
if [ -d ".next" ]; then
    echo "✅ Build completado exitosamente"
    echo "Tamaño del directorio .next: $(du -sh .next | cut -f1)"
else
    echo "❌ Error en el build"
    exit 1
fi

echo "=== Build completado ==="
