const https = require('https');

async function quickTest() {
  console.log('🚀 PRUEBA RÁPIDA DEL SISTEMA CREDIT WITH RAMI');
  console.log('='.repeat(50));
  
  const tests = [
    { name: 'Landing Page', path: '/' },
    { name: 'Application Page', path: '/application' },
    { name: 'Admin Panel', path: '/admin' },
    { name: 'Database Test', path: '/api/test-db' },
    { name: 'Appointments API', path: '/api/appointments' }
  ];
  
  for (const test of tests) {
    console.log(`\n🔍 Probando: ${test.name}`);
    
    const result = await new Promise((resolve) => {
      const req = https.get({
        hostname: 'creditwithrami.com',
        port: 443,
        path: test.path,
        method: 'GET',
        timeout: 10000
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          resolve({
            success: true,
            status: res.statusCode,
            size: data.length,
            isJson: data.startsWith('{') || data.startsWith('[')
          });
        });
      });
      
      req.on('error', (error) => {
        resolve({ success: false, error: error.message });
      });
      
      req.on('timeout', () => {
        resolve({ success: false, error: 'Timeout' });
        req.destroy();
      });
    });
    
    if (result.success) {
      console.log(`✅ ${test.name}: OK (Status: ${result.status}, Size: ${result.size} bytes)`);
      if (result.isJson) {
        console.log(`📊 Respuesta JSON detectada`);
      }
    } else {
      console.log(`❌ ${test.name}: ${result.error}`);
    }
    
    // Pausa entre requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n🎯 Prueba rápida completada!');
  console.log('\n🌐 URLs del sistema:');
  console.log('🏠 Landing: https://creditwithrami.com');
  console.log('📝 Aplicación: https://creditwithrami.com/application');
  console.log('👨‍💼 Admin: https://creditwithrami.com/admin');
  console.log('🔐 Credenciales: rami / rami123');
}

quickTest().catch(console.error);
