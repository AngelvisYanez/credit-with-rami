const https = require('https');

async function testEndpoint(url, description) {
  return new Promise((resolve) => {
    console.log(`\n🔍 Probando: ${description}`);
    console.log(`URL: ${url}`);
    
    const req = https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log('✅ Respuesta exitosa:');
          console.log(JSON.stringify(jsonData, null, 2));
          resolve({ success: true, data: jsonData });
        } catch (error) {
          console.log('📄 Respuesta HTML (probablemente página):');
          console.log(data.substring(0, 200) + '...');
          resolve({ success: true, data: data, isHtml: true });
        }
      });
    });
    
    req.on('error', (error) => {
      console.log('❌ Error:', error.message);
      resolve({ success: false, error: error.message });
    });
    
    req.setTimeout(10000, () => {
      console.log('⏰ Timeout - La solicitud tardó demasiado');
      req.destroy();
      resolve({ success: false, error: 'Timeout' });
    });
  });
}

async function testSystem() {
  console.log('🚀 Iniciando pruebas del sistema Credit with Rami...\n');
  
  const tests = [
    {
      url: 'https://creditwithrami.com/api/test-db',
      description: 'Conexión a base de datos'
    },
    {
      url: 'https://creditwithrami.com/api/appointments',
      description: 'API de appointments (GET)'
    },
    {
      url: 'https://creditwithrami.com/',
      description: 'Landing page'
    },
    {
      url: 'https://creditwithrami.com/application',
      description: 'Página de aplicación'
    },
    {
      url: 'https://creditwithrami.com/admin',
      description: 'Panel de administración'
    }
  ];
  
  const results = [];
  
  for (const test of tests) {
    const result = await testEndpoint(test.url, test.description);
    results.push({ ...test, ...result });
    
    // Pausa entre requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 Resumen de resultados:');
  console.log('='.repeat(50));
  
  results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    const type = result.isHtml ? ' (HTML)' : ' (JSON)';
    console.log(`${status} ${result.description}: ${result.success ? 'Éxito' + type : result.error}`);
  });
  
  const successfulTests = results.filter(r => r.success);
  const failedTests = results.filter(r => !r.success);
  
  console.log('\n🎯 Estadísticas:');
  console.log(`✅ Exitosos: ${successfulTests.length}/${results.length}`);
  console.log(`❌ Fallidos: ${failedTests.length}/${results.length}`);
  
  if (failedTests.length > 0) {
    console.log('\n🚨 Tests fallidos:');
    failedTests.forEach(test => {
      console.log(`- ${test.description}: ${test.error}`);
    });
  }
  
  // Verificar funcionalidad específica
  const dbTest = results.find(r => r.description === 'Conexión a base de datos');
  const appointmentsTest = results.find(r => r.description === 'API de appointments (GET)');
  
  if (dbTest && dbTest.success && !dbTest.isHtml) {
    console.log('\n🗄️ Estado de la base de datos:');
    if (dbTest.data.success) {
      console.log('✅ Base de datos conectada correctamente');
      console.log(`📊 URL configurada: ${dbTest.data.databaseUrl}`);
    } else {
      console.log('❌ Error en base de datos:', dbTest.data.message);
    }
  }
  
  if (appointmentsTest && appointmentsTest.success && !appointmentsTest.isHtml) {
    console.log('\n📋 Estado de appointments:');
    if (Array.isArray(appointmentsTest.data)) {
      console.log(`✅ API funcionando - ${appointmentsTest.data.length} appointments encontrados`);
      if (appointmentsTest.data.length > 0) {
        console.log('📝 Ejemplo de appointment:', {
          id: appointmentsTest.data[0].id,
          name: appointmentsTest.data[0].name,
          status: appointmentsTest.data[0].status
        });
      }
    } else {
      console.log('⚠️ Respuesta inesperada de API:', appointmentsTest.data);
    }
  }
  
  console.log('\n🎉 Pruebas completadas!');
  
  if (successfulTests.length === results.length) {
    console.log('🎊 ¡Sistema completamente funcional!');
  } else {
    console.log('⚠️ Algunos tests fallaron, revisa los errores arriba');
  }
}

testSystem().catch(console.error);
