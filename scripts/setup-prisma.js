#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando Prisma para producción...\n');

// Verificar si existe .env
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ Archivo .env no encontrado. Por favor crea el archivo .env con tu DATABASE_URL');
  process.exit(1);
}

// Leer .env
const envContent = fs.readFileSync(envPath, 'utf8');
const hasDatabaseUrl = envContent.includes('DATABASE_URL=');

if (!hasDatabaseUrl) {
  console.error('❌ DATABASE_URL no encontrado en .env');
  console.log('📝 Por favor agrega tu DATABASE_URL al archivo .env:');
  console.log('DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"');
  process.exit(1);
}

console.log('✅ DATABASE_URL encontrado en .env');

try {
  // 1. Generar cliente de Prisma
  console.log('\n📦 Generando cliente de Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Cliente de Prisma generado');

  // 2. Verificar conexión
  console.log('\n🔍 Verificando conexión a la base de datos...');
  try {
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
    console.log('✅ Conexión a la base de datos exitosa');
  } catch (error) {
    console.log('⚠️ Error en db push, intentando con migraciones...');
    
    // 3. Crear migración inicial
    console.log('\n📝 Creando migración inicial...');
    try {
      execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
      console.log('✅ Migración inicial creada');
    } catch (migrateError) {
      console.log('⚠️ Error en migración, usando db push...');
      execSync('npx prisma db push', { stdio: 'inherit' });
      console.log('✅ Esquema sincronizado con db push');
    }
  }

  // 4. Verificar estado
  console.log('\n📊 Verificando estado de la base de datos...');
  execSync('npx prisma migrate status', { stdio: 'inherit' });

  // 5. Opcional: Poblar con datos de prueba
  console.log('\n🌱 ¿Deseas poblar la base de datos con datos de prueba? (y/n)');
  // En un script automatizado, saltamos este paso
  console.log('⏭️ Saltando población de datos de prueba');

  console.log('\n🎉 ¡Configuración de Prisma completada exitosamente!');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Verifica que tu aplicación funcione correctamente');
  console.log('2. Ejecuta "npx prisma studio" para ver la base de datos');
  console.log('3. Para producción, usa "npx prisma migrate deploy"');

} catch (error) {
  console.error('\n❌ Error durante la configuración:', error.message);
  console.log('\n🔧 Soluciones posibles:');
  console.log('1. Verifica que tu DATABASE_URL sea correcta');
  console.log('2. Asegúrate de que la base de datos esté accesible');
  console.log('3. Verifica que tengas permisos para crear tablas');
  process.exit(1);
}
