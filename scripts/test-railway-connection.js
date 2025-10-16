const { Client } = require('pg');

async function testRailwayConnection(connectionUrl) {
  console.log('🚂 Probando conexión a Railway...');
  console.log(`URL: ${connectionUrl.replace(/:[^:]*@/, ':***@')}`);
  
  const client = new Client({
    connectionString: connectionUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Conexión a Railway exitosa!');
    
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
      INSERT INTO test_connection (message) VALUES ('Conexión exitosa desde Railway')
    `);
    console.log('✅ Registro de prueba insertado');
    
    // Consultar el registro
    const testResult = await client.query('SELECT * FROM test_connection ORDER BY created_at DESC LIMIT 1');
    console.log('📋 Registro de prueba:', testResult.rows[0]);
    
    // Limpiar tabla de prueba
    await client.query('DROP TABLE test_connection');
    console.log('🧹 Tabla de prueba eliminada');
    
    await client.end();
    return { success: true, url: connectionUrl };
    
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
    await client.end();
    return { success: false, url: connectionUrl, error: error.message };
  }
}

async function main() {
  const connectionUrl = process.argv[2];
  
  if (!connectionUrl) {
    console.log('🚨 Uso: node scripts/test-railway-connection.js "TU_URL_DE_RAILWAY"');
    console.log('📝 Ejemplo: node scripts/test-railway-connection.js "postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway"');
    process.exit(1);
  }
  
  const result = await testRailwayConnection(connectionUrl);
  
  if (result.success) {
    console.log('\n🎉 ¡Conexión a Railway exitosa!');
    console.log('📝 Para configurar en Netlify, ejecuta:');
    console.log(`netlify env:set DATABASE_URL "${result.url}"`);
    console.log('\n🚀 Próximos pasos:');
    console.log('1. npx prisma db push');
    console.log('2. npm run db:seed');
    console.log('3. Verificar sistema en https://creditwithrami.com/admin');
  } else {
    console.log('\n🚨 Error de conexión:', result.error);
    console.log('💡 Verifica que la URL de Railway sea correcta');
  }
}

main().catch(console.error);
