#!/bin/bash

# Script de inicio para servidor simple (sin Next.js)
# Este script evita completamente el error de WebAssembly

echo "=== Iniciando Credit With Rami (Servidor Simple) ==="

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
export NODE_OPTIONS="--max-old-space-size=256 --max-semi-space-size=32"
export NODE_ENV=production

# Limpiar caché de npm
echo "Limpiando caché de npm..."
npm cache clean --force

# Instalar solo Express (sin Next.js)
echo "Instalando dependencias mínimas..."
npm install express --production --no-optional --no-audit --no-fund

# Verificar que el archivo HTML existe
if [ ! -f "public/index.html" ]; then
    echo "Error: public/index.html no encontrado"
    exit 1
fi

echo "✅ Archivos estáticos verificados"

# Verificar que PM2 esté instalado
if ! command -v pm2 &> /dev/null; then
    echo "Instalando PM2 globalmente..."
    npm install -g pm2
fi

# Detener aplicación si está corriendo
pm2 stop credit-with-rami-simple 2>/dev/null || true
pm2 delete credit-with-rami-simple 2>/dev/null || true

# Iniciar aplicación con PM2 usando servidor simple
echo "Iniciando aplicación con PM2 (servidor simple)..."
pm2 start server-simple.js --name credit-with-rami-simple

# Guardar configuración de PM2
pm2 save

# Configurar PM2 para iniciar automáticamente
pm2 startup

echo "=== Aplicación iniciada correctamente (Servidor Simple) ==="
echo "Para ver los logs: pm2 logs credit-with-rami-simple"
echo "Para ver el estado: pm2 status"
echo "Para reiniciar: pm2 restart credit-with-rami-simple"
echo "Para detener: pm2 stop credit-with-rami-simple"
echo ""
echo "La aplicación está corriendo en:"
echo "  - Puerto: 3000"
echo "  - Dominio: creditwithrami.com"
echo "  - URL: http://creditwithrami.com"
echo "  - URL con www: http://www.creditwithrami.com"
echo ""
echo "Configuración: Servidor simple sin Next.js"
echo "Memoria configurada: NODE_OPTIONS=--max-old-space-size=256"
echo ""
echo "IMPORTANTE: Asegúrate de que el dominio creditwithrami.com"
echo "esté configurado correctamente en cPanel para apuntar a este servidor."
