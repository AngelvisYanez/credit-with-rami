#!/usr/bin/env node

/**
 * Script para verificar la configuración de Vercel + Neon
 * Ejecutar con: node scripts/verify-vercel-setup.js
 */

const https = require('https');
const http = require('http');

// Configuración
const REQUIRED_ENV_VARS = [
  'DATABASE_URL',
  'ADMIN_USERNAME', 
  'ADMIN_PASSWORD',
  'NODE_ENV'
];

const OPTIONAL_ENV_VARS = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'PORT'
];

// Función para verificar variables de entorno
function checkEnvironmentVariables() {
  console.log('🔍 VERIFICANDO VARIABLES DE ENTORNO');
  console.log('='.repeat(50));
  
  const missing = [];
  const present = [];
  
  // Verificar variables requeridas
  REQUIRED_ENV_VARS.forEach(varName => {
    if (process.env[varName]) {
      present.push(varName);
      console.log(`✅ ${varName}: Configurada`);
    } else {
      missing.push(varName);
      console.log(`❌ ${varName}: FALTANTE`);
    }
  });
  
  // Verificar variables opcionales
  console.log('\n📋 VARIABLES OPCIONALES:');
  OPTIONAL_ENV_VARS.forEach(varName => {
    if (process.env[varName]) {
      console.log(`✅ ${varName}: Configurada`);
    } else {
      console.log(`⚠️  ${varName}: No configurada (opcional)`);
    }
  });
  
  return { missing, present };
}

// Función para verificar conexión a base de datos
async function checkDatabaseConnection() {
  console.log('\n🗄️  VERIFICANDO CONEXIÓN A BASE DE DATOS');
  console.log('='.repeat(50));
  
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    // Intentar conectar
    await prisma.$connect();
    console.log('✅ Conexión a base de datos: EXITOSA');
    
    // Verificar tablas
    const appointmentCount = await prisma.appointment.count();
    const adminCount = await prisma.adminUser.count();
    
    console.log(`📊 Citas en base de datos: ${appointmentCount}`);
    console.log(`👤 Usuarios admin: ${adminCount}`);
    
    await prisma.$disconnect();
    return true;
    
  } catch (error) {
    console.log('❌ Conexión a base de datos: FALLIDA');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

// Función para verificar APIs
async function checkAPIs() {
  console.log('\n🌐 VERIFICANDO APIs');
  console.log('='.repeat(50));
  
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const endpoints = [
    '/api/test-db/',
    '/api/appointments/',
    '/api/admin/auth/'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await makeRequest(`${baseUrl}${endpoint}`);
      const status = response.statusCode >= 200 && response.statusCode < 300 ? '✅' : '❌';
      console.log(`${status} ${endpoint}: ${response.statusCode}`);
    } catch (error) {
      console.log(`❌ ${endpoint}: ERROR - ${error.message}`);
    }
  }
}

// Función auxiliar para hacer requests HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'Vercel-Verifier/1.0'
      }
    };
    
    const req = (urlObj.protocol === 'https:' ? https : http).request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        data: data
      }));
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    
    req.end();
  });
}

// Función para generar reporte
function generateReport(envCheck, dbCheck) {
  console.log('\n📊 REPORTE FINAL');
  console.log('='.repeat(50));
  
  const totalRequired = REQUIRED_ENV_VARS.length;
  const configuredRequired = envCheck.present.length;
  const missingRequired = envCheck.missing.length;
  
  console.log(`🔧 Variables de entorno: ${configuredRequired}/${totalRequired} configuradas`);
  console.log(`🗄️  Base de datos: ${dbCheck ? 'CONECTADA' : 'DESCONECTADA'}`);
  
  if (missingRequired === 0 && dbCheck) {
    console.log('\n🎉 ¡CONFIGURACIÓN COMPLETA!');
    console.log('✅ Todas las variables requeridas están configuradas');
    console.log('✅ La base de datos está conectada');
    console.log('✅ El proyecto está listo para producción');
  } else {
    console.log('\n⚠️  CONFIGURACIÓN INCOMPLETA');
    if (missingRequired > 0) {
      console.log(`❌ Faltan ${missingRequired} variables de entorno:`);
      envCheck.missing.forEach(varName => {
        console.log(`   - ${varName}`);
      });
    }
    if (!dbCheck) {
      console.log('❌ La base de datos no está conectada');
    }
    console.log('\n📖 Consulta VERCEL_ENV_SETUP.md para instrucciones detalladas');
  }
}

// Función principal
async function main() {
  console.log('🚀 VERIFICADOR DE CONFIGURACIÓN VERCEL + NEON');
  console.log('='.repeat(60));
  console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  
  // Verificar variables de entorno
  const envCheck = checkEnvironmentVariables();
  
  // Verificar base de datos (solo si DATABASE_URL está configurada)
  let dbCheck = false;
  if (process.env.DATABASE_URL) {
    dbCheck = await checkDatabaseConnection();
  } else {
    console.log('\n🗄️  VERIFICANDO CONEXIÓN A BASE DE DATOS');
    console.log('='.repeat(50));
    console.log('⚠️  DATABASE_URL no configurada - saltando verificación de DB');
  }
  
  // Verificar APIs (solo en producción)
  if (process.env.NODE_ENV === 'production') {
    await checkAPIs();
  }
  
  // Generar reporte
  generateReport(envCheck, dbCheck);
  
  // Exit code basado en el resultado
  const success = envCheck.missing.length === 0 && dbCheck;
  process.exit(success ? 0 : 1);
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error durante la verificación:', error.message);
    process.exit(1);
  });
}

module.exports = { checkEnvironmentVariables, checkDatabaseConnection };
