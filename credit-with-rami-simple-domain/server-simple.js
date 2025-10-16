const express = require('express');
const path = require('path');

// Configurar variables de entorno para reducir uso de memoria
process.env.NODE_OPTIONS = '--max-old-space-size=256 --max-semi-space-size=32';

const app = express();
const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || 'creditwithrami.com';

// Configurar límites de memoria para Express
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos estáticos desde la carpeta dist (si existe)
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta principal - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejar todas las rutas para SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Servidor simple iniciado en puerto ${port}`);
  console.log(`> Dominio: ${domain}`);
  console.log(`> URL: http://${domain}:${port}`);
  console.log(`> Entorno: ${process.env.NODE_ENV || 'production'}`);
  console.log(`> Proceso PID: ${process.pid}`);
  console.log(`> Memoria configurada: ${process.env.NODE_OPTIONS}`);
  console.log(`> Sirviendo archivos desde: ${path.join(__dirname, 'public')}`);
});

// Manejo de errores no capturados
process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesa rechazada no manejada:', reason);
  process.exit(1);
});

// Manejo de señales de terminación
process.on('SIGTERM', () => {
  console.log('Recibida señal SIGTERM, cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Recibida señal SIGINT, cerrando servidor...');
  process.exit(0);
});

// Monitoreo de memoria
setInterval(() => {
  const used = process.memoryUsage();
  console.log(`Memoria usada: ${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`);
}, 120000); // Cada 2 minutos
