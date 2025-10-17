#!/bin/bash

# Script de inicio para cPanel
# Este script debe ejecutarse en el servidor cPanel

echo "=== Iniciando Credit With Rami en cPanel ==="

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

# Instalar dependencias (siempre instalar para asegurar compatibilidad)
echo "Instalando dependencias..."
npm install --production

# Crear build de producción
echo "Creando build de producción..."
npm run build

# Verificar que PM2 esté instalado
if ! command -v pm2 &> /dev/null; then
    echo "Instalando PM2 globalmente..."
    npm install -g pm2
fi

# Detener aplicación si está corriendo
pm2 stop credit-with-rami 2>/dev/null || true
pm2 delete credit-with-rami 2>/dev/null || true

# Iniciar aplicación con PM2
echo "Iniciando aplicación con PM2..."
pm2 start ecosystem.config.js

# Guardar configuración de PM2
pm2 save

# Configurar PM2 para iniciar automáticamente
pm2 startup

echo "=== Aplicación iniciada correctamente ==="
echo "Para ver los logs: pm2 logs credit-with-rami"
echo "Para ver el estado: pm2 status"
echo "Para reiniciar: pm2 restart credit-with-rami"
echo "Para detener: pm2 stop credit-with-rami"
