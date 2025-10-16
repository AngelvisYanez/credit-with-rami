const https = require('https');

function testSite() {
  console.log('🌐 Probando conectividad básica...\n');
  
  const options = {
    hostname: 'creditwithrami.com',
    port: 443,
    path: '/',
    method: 'GET',
    timeout: 5000
  };
  
  const req = https.request(options, (res) => {
    console.log(`✅ Sitio responde - Status: ${res.statusCode}`);
    console.log(`📊 Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`📄 Tamaño de respuesta: ${data.length} bytes`);
      if (data.includes('Credit with Rami')) {
        console.log('✅ Contenido correcto detectado');
      } else {
        console.log('⚠️ Contenido inesperado');
      }
    });
  });
  
  req.on('error', (error) => {
    console.log('❌ Error de conexión:', error.message);
  });
  
  req.on('timeout', () => {
    console.log('⏰ Timeout - El sitio no responde');
    req.destroy();
  });
  
  req.end();
}

testSite();
