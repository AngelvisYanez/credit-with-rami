// Configuración del dominio para creditwithrami.com
module.exports = {
  domain: 'creditwithrami.com',
  port: 3000,
  protocol: 'http',
  fullUrl: 'http://creditwithrami.com',
  wwwUrl: 'http://www.creditwithrami.com',
  
  // Configuración de cPanel
  cpanel: {
    server: '198.54.116.189',
    sshPort: 21098,
    username: 'credbqjg',
    publicHtml: '/home/credbqjg/public_html'
  },
  
  // Configuración de Node.js
  nodejs: {
    version: 'v24.6.0',
    memoryLimit: '256MB',
    restartLimit: '128MB'
  },
  
  // Configuración de PM2
  pm2: {
    appName: 'credit-with-rami-simple',
    instances: 1,
    autorestart: true,
    watch: false
  }
};
