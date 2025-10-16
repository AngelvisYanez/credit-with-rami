const express = require('express');
const path = require('path');

// Configurar variables de entorno para reducir uso de memoria
process.env.NODE_OPTIONS = '--max-old-space-size=512 --max-semi-space-size=64';

const app = express();
const port = process.env.PORT || 3000;

// Configurar límites de memoria para Express
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Servir archivos estáticos desde la carpeta out (build estático)
app.use(express.static(path.join(__dirname, 'out')));

// Manejar todas las rutas para SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

// Iniciar el servidor
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Servidor estático iniciado en http://localhost:${port}`);
  console.log(`> Entorno: ${process.env.NODE_ENV || 'production'}`);
  console.log(`> Proceso PID: ${process.pid}`);
  console.log(`> Memoria configurada: ${process.env.NODE_OPTIONS}`);
  console.log(`> Sirviendo archivos desde: ${path.join(__dirname, 'out')}`);
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
}, 60000); // Cada 60 segundos
