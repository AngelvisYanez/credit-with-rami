#!/bin/bash

# Script de Restauración para Vercel
# Credit with Rami - Backup Netlify
# Fecha: 16 de Octubre, 2025

echo "🚀 Iniciando restauración para Vercel..."
echo "=========================================="

# 1. Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

echo "✅ Directorio correcto detectado"

# 2. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# 3. Configurar variable de entorno (manual)
echo "🔧 Configurando variables de entorno..."
echo "⚠️  IMPORTANTE: Configura manualmente en Vercel:"
echo "   DATABASE_URL=postgresql://neondb_owner:npg_r3AVs8EWcdbU@ep-tiny-bush-adzpt774-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

# 4. Generar cliente de Prisma
echo "🔧 Generando cliente de Prisma..."
npx prisma generate

# 5. Aplicar schema a la base de datos
echo "🗄️ Aplicando schema a la base de datos..."
npx prisma db push

# 6. Sembrar datos iniciales
echo "🌱 Sembrando datos iniciales..."
npm run db:seed

# 7. Verificar conexión
echo "🔍 Verificando conexión a la base de datos..."
npx prisma db pull

echo "✅ Restauración completada!"
echo ""
echo "🎯 Próximos pasos:"
echo "1. Configura DATABASE_URL en Vercel"
echo "2. Haz deploy del proyecto"
echo "3. Prueba la funcionalidad completa"
echo ""
echo "🌐 URLs del sistema:"
echo "- Landing: https://tu-dominio.vercel.app"
echo "- Aplicación: https://tu-dominio.vercel.app/application"
echo "- Admin: https://tu-dominio.vercel.app/admin"
echo "- Credenciales: rami / rami123"
