const { Client } = require('pg');

// URLs de conexión a probar
const connectionUrls = [
  'postgresql://postgres:oge3CkODpQ3E2Eq2@db.nxaljnjgieyfhlmlwyms.supabase.co:5432/postgres',
  'postgresql://postgres:oge3CkODpQ3E2Eq2@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
  'postgresql://postgres:oge3CkODpQ3E2Eq2@nxaljnjgieyfhlmlwyms.supabase.co:5432/postgres',
  'postgresql://postgres:oge3CkODpQ3E2Eq2@nxaljnjgieyfhlmlwyms.supabase.co:6543/postgres'
];

async function testConnection(url, name) {
  console.log(`\n🔍 Probando conexión: ${name}`);
  console.log(`URL: ${url.replace(/:[^:]*@/, ':***@')}`);
  
  const client = new Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Conexión exitosa!');
    
    // Probar una consulta simple
    const result = await client.query('SELECT version()');
    console.log('📊 Versión de PostgreSQL:', result.rows[0].version);
    
    // Probar crear una tabla de prueba
    await client.query(`
      CREATE TABLE IF NOT EXISTS test_connection (
        id SERIAL PRIMARY KEY,
        message TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla de prueba creada exitosamente');
    
    // Insertar un registro de prueba
    await client.query(`
      INSERT INTO test_connection (message) VALUES ('Conexión exitosa desde script de prueba')
    `);
    console.log('✅ Registro de prueba insertado');
    
    // Consultar el registro
    const testResult = await client.query('SELECT * FROM test_connection ORDER BY created_at DESC LIMIT 1');
    console.log('📋 Registro de prueba:', testResult.rows[0]);
    
    // Limpiar tabla de prueba
    await client.query('DROP TABLE test_connection');
    console.log('🧹 Tabla de prueba eliminada');
    
    await client.end();
    return { success: true, url, name };
    
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
    await client.end();
    return { success: false, url, name, error: error.message };
  }
}

async function main() {
  console.log('🚀 Iniciando pruebas de conexión a Supabase...\n');
  
  const results = [];
  
  for (const [index, url] of connectionUrls.entries()) {
    const result = await testConnection(url, `Opción ${index + 1}`);
    results.push(result);
    
    if (result.success) {
      console.log(`\n🎉 ¡Conexión exitosa encontrada!`);
      console.log(`URL funcional: ${result.url}`);
      console.log(`\n📝 Para configurar en Netlify, ejecuta:`);
      console.log(`netlify env:set DATABASE_URL "${result.url}"`);
      break;
    }
  }
  
  console.log('\n📊 Resumen de resultados:');
  results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.name}: ${result.success ? 'Éxito' : result.error}`);
  });
  
  const successfulConnection = results.find(r => r.success);
  if (!successfulConnection) {
    console.log('\n🚨 Ninguna conexión funcionó. Posibles causas:');
    console.log('1. El proyecto de Supabase está pausado');
    console.log('2. La contraseña es incorrecta');
    console.log('3. El proyecto no existe o fue eliminado');
    console.log('4. Problemas de red o firewall');
    console.log('\n💡 Soluciones:');
    console.log('1. Verifica el estado del proyecto en Supabase');
    console.log('2. Confirma la contraseña en Settings > Database');
    console.log('3. Obtén la URL de conexión desde el dashboard');
    console.log('4. Verifica que el proyecto esté activo');
  }
}

main().catch(console.error);
