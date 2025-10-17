# Script de despliegue para Prisma en PowerShell
Write-Host "🚀 Iniciando despliegue de Prisma..." -ForegroundColor Green

# Verificar que DATABASE_URL esté configurada
if (-not $env:DATABASE_URL) {
    Write-Host "❌ Error: DATABASE_URL no está configurada" -ForegroundColor Red
    Write-Host "📝 Por favor configura tu DATABASE_URL en las variables de entorno" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ DATABASE_URL configurada" -ForegroundColor Green

# 1. Generar cliente de Prisma
Write-Host "📦 Generando cliente de Prisma..." -ForegroundColor Blue
try {
    npx prisma generate
    Write-Host "✅ Cliente de Prisma generado" -ForegroundColor Green
} catch {
    Write-Host "❌ Error generando cliente de Prisma" -ForegroundColor Red
    exit 1
}

# 2. Aplicar migraciones en producción
Write-Host "📝 Aplicando migraciones en producción..." -ForegroundColor Blue
try {
    npx prisma migrate deploy
    Write-Host "✅ Migraciones aplicadas" -ForegroundColor Green
} catch {
    Write-Host "❌ Error aplicando migraciones" -ForegroundColor Red
    Write-Host "🔄 Intentando con db push..." -ForegroundColor Yellow
    
    try {
        npx prisma db push
        Write-Host "✅ Esquema sincronizado con db push" -ForegroundColor Green
    } catch {
        Write-Host "❌ Error en db push también" -ForegroundColor Red
        exit 1
    }
}

# 3. Verificar estado de la base de datos
Write-Host "📊 Verificando estado de la base de datos..." -ForegroundColor Blue
npx prisma migrate status

# 4. Opcional: Poblar con datos de prueba (solo en desarrollo)
if ($env:NODE_ENV -ne "production") {
    Write-Host "🌱 Poblando base de datos con datos de prueba..." -ForegroundColor Blue
    npx prisma db seed
}

Write-Host "🎉 ¡Despliegue de Prisma completado exitosamente!" -ForegroundColor Green

# 5. Mostrar información útil
Write-Host ""
Write-Host "📋 Comandos útiles:" -ForegroundColor Cyan
Write-Host "  npx prisma studio          - Abrir interfaz visual" -ForegroundColor White
Write-Host "  npx prisma migrate status  - Ver estado de migraciones" -ForegroundColor White
Write-Host "  npx prisma db push         - Sincronizar esquema" -ForegroundColor White
Write-Host ""
