#!/bin/bash

# Script de despliegue para Prisma
echo "🚀 Iniciando despliegue de Prisma..."

# Verificar que DATABASE_URL esté configurada
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL no está configurada"
    echo "📝 Por favor configura tu DATABASE_URL en las variables de entorno"
    exit 1
fi

echo "✅ DATABASE_URL configurada"

# 1. Generar cliente de Prisma
echo "📦 Generando cliente de Prisma..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Error generando cliente de Prisma"
    exit 1
fi

echo "✅ Cliente de Prisma generado"

# 2. Aplicar migraciones en producción
echo "📝 Aplicando migraciones en producción..."
npx prisma migrate deploy

if [ $? -ne 0 ]; then
    echo "❌ Error aplicando migraciones"
    echo "🔄 Intentando con db push..."
    npx prisma db push
    
    if [ $? -ne 0 ]; then
        echo "❌ Error en db push también"
        exit 1
    fi
fi

echo "✅ Migraciones aplicadas"

# 3. Verificar estado de la base de datos
echo "📊 Verificando estado de la base de datos..."
npx prisma migrate status

# 4. Opcional: Poblar con datos de prueba (solo en desarrollo)
if [ "$NODE_ENV" != "production" ]; then
    echo "🌱 Poblando base de datos con datos de prueba..."
    npx prisma db seed
fi

echo "🎉 ¡Despliegue de Prisma completado exitosamente!"

# 5. Mostrar información útil
echo ""
echo "📋 Comandos útiles:"
echo "  npx prisma studio          - Abrir interfaz visual"
echo "  npx prisma migrate status  - Ver estado de migraciones"
echo "  npx prisma db push         - Sincronizar esquema"
echo ""
