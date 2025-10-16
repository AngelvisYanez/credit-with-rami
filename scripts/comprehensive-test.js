const https = require('https');

class SystemTester {
  constructor() {
    this.baseUrl = 'https://creditwithrami.com';
    this.results = [];
  }

  async makeRequest(path, method = 'GET', data = null) {
    return new Promise((resolve) => {
      const options = {
        hostname: 'creditwithrami.com',
        port: 443,
        path: path,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'SystemTester/1.0'
        },
        timeout: 15000
      };

      if (data) {
        const jsonData = JSON.stringify(data);
        options.headers['Content-Length'] = Buffer.byteLength(jsonData);
      }

      const req = https.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(responseData);
            resolve({
              success: true,
              status: res.statusCode,
              data: jsonData,
              headers: res.headers
            });
          } catch (error) {
            resolve({
              success: true,
              status: res.statusCode,
              data: responseData,
              headers: res.headers,
              isHtml: true
            });
          }
        });
      });

      req.on('error', (error) => {
        resolve({
          success: false,
          error: error.message
        });
      });

      req.on('timeout', () => {
        resolve({
          success: false,
          error: 'Timeout'
        });
        req.destroy();
      });

      if (data) {
        req.write(JSON.stringify(data));
      }
      
      req.end();
    });
  }

  async testLandingPage() {
    console.log('\n🏠 PROBANDO LANDING PAGE...');
    const result = await this.makeRequest('/');
    
    if (result.success && result.isHtml) {
      const hasTitle = result.data.includes('Credit with Rami');
      const hasHero = result.data.includes('hero') || result.data.includes('Hero');
      const hasCTA = result.data.includes('application') || result.data.includes('Apply');
      
      console.log(`✅ Landing page accesible (Status: ${result.status})`);
      console.log(`📊 Tamaño: ${result.data.length} bytes`);
      console.log(`🎯 Título presente: ${hasTitle ? '✅' : '❌'}`);
      console.log(`🎨 Hero section: ${hasHero ? '✅' : '❌'}`);
      console.log(`🔗 CTA buttons: ${hasCTA ? '✅' : '❌'}`);
      
      this.results.push({
        test: 'Landing Page',
        success: result.success,
        details: {
          status: result.status,
          size: result.data.length,
          hasTitle,
          hasHero,
          hasCTA
        }
      });
    } else {
      console.log(`❌ Error en landing page: ${result.error}`);
      this.results.push({
        test: 'Landing Page',
        success: false,
        error: result.error
      });
    }
  }

  async testApplicationPage() {
    console.log('\n📝 PROBANDO PÁGINA DE APLICACIÓN...');
    const result = await this.makeRequest('/application');
    
    if (result.success && result.isHtml) {
      const hasForm = result.data.includes('form') || result.data.includes('Form');
      const hasVideo = result.data.includes('video') || result.data.includes('mp4');
      const hasSubmit = result.data.includes('submit') || result.data.includes('Submit');
      
      console.log(`✅ Página de aplicación accesible (Status: ${result.status})`);
      console.log(`📊 Tamaño: ${result.data.length} bytes`);
      console.log(`📋 Formulario presente: ${hasForm ? '✅' : '❌'}`);
      console.log(`🎥 Video presente: ${hasVideo ? '✅' : '❌'}`);
      console.log(`🚀 Botón submit: ${hasSubmit ? '✅' : '❌'}`);
      
      this.results.push({
        test: 'Application Page',
        success: result.success,
        details: {
          status: result.status,
          size: result.data.length,
          hasForm,
          hasVideo,
          hasSubmit
        }
      });
    } else {
      console.log(`❌ Error en página de aplicación: ${result.error}`);
      this.results.push({
        test: 'Application Page',
        success: false,
        error: result.error
      });
    }
  }

  async testAdminPage() {
    console.log('\n👨‍💼 PROBANDO PANEL DE ADMINISTRACIÓN...');
    const result = await this.makeRequest('/admin');
    
    if (result.success && result.isHtml) {
      const hasLogin = result.data.includes('login') || result.data.includes('password');
      const hasDashboard = result.data.includes('dashboard') || result.data.includes('admin');
      const hasAppointments = result.data.includes('appointment') || result.data.includes('cita');
      
      console.log(`✅ Panel de administración accesible (Status: ${result.status})`);
      console.log(`📊 Tamaño: ${result.data.length} bytes`);
      console.log(`🔐 Login presente: ${hasLogin ? '✅' : '❌'}`);
      console.log(`📊 Dashboard: ${hasDashboard ? '✅' : '❌'}`);
      console.log(`📋 Appointments: ${hasAppointments ? '✅' : '❌'}`);
      
      this.results.push({
        test: 'Admin Panel',
        success: result.success,
        details: {
          status: result.status,
          size: result.data.length,
          hasLogin,
          hasDashboard,
          hasAppointments
        }
      });
    } else {
      console.log(`❌ Error en panel de administración: ${result.error}`);
      this.results.push({
        test: 'Admin Panel',
        success: false,
        error: result.error
      });
    }
  }

  async testDatabaseConnection() {
    console.log('\n🗄️ PROBANDO CONEXIÓN A BASE DE DATOS...');
    const result = await this.makeRequest('/api/test-db');
    
    if (result.success && !result.isHtml) {
      console.log(`✅ API de base de datos responde (Status: ${result.status})`);
      console.log(`📊 Conexión exitosa: ${result.data.success ? '✅' : '❌'}`);
      console.log(`🔗 URL configurada: ${result.data.databaseUrl}`);
      
      if (result.data.result) {
        console.log(`📋 Resultado de prueba: ${JSON.stringify(result.data.result)}`);
      }
      
      this.results.push({
        test: 'Database Connection',
        success: result.success && result.data.success,
        details: {
          status: result.status,
          connectionSuccess: result.data.success,
          databaseUrl: result.data.databaseUrl
        }
      });
    } else {
      console.log(`❌ Error en conexión a base de datos: ${result.error || 'Respuesta inesperada'}`);
      this.results.push({
        test: 'Database Connection',
        success: false,
        error: result.error || 'Respuesta inesperada'
      });
    }
  }

  async testAppointmentsAPI() {
    console.log('\n📋 PROBANDO API DE APPOINTMENTS...');
    
    // Test GET appointments
    const getResult = await this.makeRequest('/api/appointments');
    
    if (getResult.success && !getResult.isHtml) {
      console.log(`✅ GET /api/appointments responde (Status: ${getResult.status})`);
      console.log(`📊 Appointments encontrados: ${Array.isArray(getResult.data) ? getResult.data.length : 'N/A'}`);
      
      if (Array.isArray(getResult.data) && getResult.data.length > 0) {
        const firstAppointment = getResult.data[0];
        console.log(`📝 Primer appointment: ${firstAppointment.name} (${firstAppointment.status})`);
      }
      
      this.results.push({
        test: 'Appointments API (GET)',
        success: getResult.success,
        details: {
          status: getResult.status,
          count: Array.isArray(getResult.data) ? getResult.data.length : 0,
          hasData: Array.isArray(getResult.data) && getResult.data.length > 0
        }
      });
    } else {
      console.log(`❌ Error en GET appointments: ${getResult.error || 'Respuesta inesperada'}`);
      this.results.push({
        test: 'Appointments API (GET)',
        success: false,
        error: getResult.error || 'Respuesta inesperada'
      });
    }

    // Test POST appointment
    const testAppointment = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      businessName: 'Test Business',
      businessType: 'Technology',
      creditCards: 'Yes',
      establishedBusiness: 'Yes',
      strongCreditScore: 'Yes',
      cleanHistory: 'Yes',
      preferredDate: '2024-12-15',
      preferredTime: '10:00 AM',
      timezone: 'America/New_York',
      message: 'Test appointment from automated test'
    };

    const postResult = await this.makeRequest('/api/appointments', 'POST', testAppointment);
    
    if (postResult.success && !postResult.isHtml) {
      console.log(`✅ POST /api/appointments responde (Status: ${postResult.status})`);
      console.log(`📝 Appointment creado: ${postResult.data.name} (ID: ${postResult.data.id})`);
      
      this.results.push({
        test: 'Appointments API (POST)',
        success: postResult.success,
        details: {
          status: postResult.status,
          appointmentId: postResult.data.id,
          appointmentName: postResult.data.name
        }
      });

      // Test PUT appointment (update status)
      if (postResult.data.id) {
        const updateResult = await this.makeRequest(`/api/appointments/${postResult.data.id}`, 'PUT', {
          status: 'CONFIRMED'
        });
        
        if (updateResult.success && !updateResult.isHtml) {
          console.log(`✅ PUT /api/appointments/${postResult.data.id} responde (Status: ${updateResult.status})`);
          console.log(`🔄 Status actualizado: ${updateResult.data.status}`);
          
          this.results.push({
            test: 'Appointments API (PUT)',
            success: updateResult.success,
            details: {
              status: updateResult.status,
              updatedStatus: updateResult.data.status
            }
          });
        } else {
          console.log(`❌ Error en PUT appointment: ${updateResult.error || 'Respuesta inesperada'}`);
          this.results.push({
            test: 'Appointments API (PUT)',
            success: false,
            error: updateResult.error || 'Respuesta inesperada'
          });
        }
      }
    } else {
      console.log(`❌ Error en POST appointment: ${postResult.error || 'Respuesta inesperada'}`);
      this.results.push({
        test: 'Appointments API (POST)',
        success: false,
        error: postResult.error || 'Respuesta inesperada'
      });
    }
  }

  async runAllTests() {
    console.log('🚀 INICIANDO PRUEBAS COMPLETAS DEL SISTEMA CREDIT WITH RAMI');
    console.log('='.repeat(60));
    
    await this.testLandingPage();
    await this.testApplicationPage();
    await this.testAdminPage();
    await this.testDatabaseConnection();
    await this.testAppointmentsAPI();
    
    this.printSummary();
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN DE PRUEBAS');
    console.log('='.repeat(60));
    
    const successful = this.results.filter(r => r.success).length;
    const total = this.results.length;
    
    console.log(`✅ Exitosos: ${successful}/${total}`);
    console.log(`❌ Fallidos: ${total - successful}/${total}`);
    console.log(`📈 Tasa de éxito: ${((successful / total) * 100).toFixed(1)}%`);
    
    console.log('\n📋 DETALLES POR PRUEBA:');
    this.results.forEach((result, index) => {
      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${result.test}: ${result.success ? 'Éxito' : result.error}`);
      
      if (result.details) {
        Object.entries(result.details).forEach(([key, value]) => {
          console.log(`   ${key}: ${value}`);
        });
      }
    });
    
    if (successful === total) {
      console.log('\n🎉 ¡TODAS LAS PRUEBAS EXITOSAS!');
      console.log('🎊 El sistema está completamente funcional');
    } else {
      console.log('\n⚠️ Algunas pruebas fallaron');
      console.log('🔧 Revisa los errores arriba para solucionarlos');
    }
    
    console.log('\n🌐 URLs del sistema:');
    console.log(`🏠 Landing: ${this.baseUrl}`);
    console.log(`📝 Aplicación: ${this.baseUrl}/application`);
    console.log(`👨‍💼 Admin: ${this.baseUrl}/admin`);
    console.log(`🔐 Credenciales admin: rami / rami123`);
  }
}

// Ejecutar pruebas
const tester = new SystemTester();
tester.runAllTests().catch(console.error);
