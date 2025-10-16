const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Crear la aplicación Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Servir archivos estáticos desde la carpeta public
  server.use('/static', express.static(path.join(__dirname, 'public')));

  // Servir archivos de Next.js
  server.use('/_next', express.static(path.join(__dirname, '.next')));

  // Manejar todas las rutas con Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Iniciar el servidor
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Servidor iniciado en http://${hostname}:${port}`);
    console.log(`> Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`> Proceso PID: ${process.pid}`);
  });
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
