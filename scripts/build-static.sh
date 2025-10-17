#!/bin/bash

# Script de build estático (sin WebAssembly)
# Este script evita completamente el error de WebAssembly

echo "=== Build Estático (Sin WebAssembly) ==="

# Configurar variables de entorno para reducir uso de memoria
export NODE_OPTIONS="--max-old-space-size=512 --max-semi-space-size=64"
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

# Copiar configuración estática
echo "Configurando build estático..."
cp next.config.static.js next.config.js

# Crear build estático (sin WebAssembly)
echo "Creando build estático..."
NODE_OPTIONS="--max-old-space-size=512" npm run build

# Verificar que el build se completó
if [ -d "out" ]; then
    echo "✅ Build estático completado exitosamente"
    echo "Tamaño del directorio out: $(du -sh out | cut -f1)"
    echo "Archivos generados: $(find out -type f | wc -l)"
else
    echo "❌ Error en el build estático"
    exit 1
fi

echo "=== Build estático completado ==="
