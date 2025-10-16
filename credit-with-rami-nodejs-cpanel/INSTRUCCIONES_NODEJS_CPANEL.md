# Instrucciones de Despliegue en cPanel con Node.js

## Requisitos Previos
1. Acceso SSH a tu servidor cPanel
2. Node.js instalado (versión 18 o superior) - **Configurar desde cPanel > Node.js Selector**
3. npm instalado
4. PM2 instalado globalmente

## Configuración Inicial en cPanel

### 1. Configurar Node.js
1. Ve a **cPanel > Node.js Selector**
2. Selecciona la versión de Node.js (recomendado: 18.x o superior)
3. Crea una nueva aplicación Node.js
4. Establece el directorio de la aplicación en `public_html`

### 2. Subir archivos
- Sube todos los archivos del directorio `credit-with-rami-nodejs-cpanel` a tu directorio web en cPanel
- **IMPORTANTE**: Este paquete incluye `server.js` para ejecutar con Node.js

## Pasos de Despliegue

### 1. Conectar por SSH
```bash
ssh -p 21098 credbqjg@198.54.116.189
cd /home/credbqjg/public_html
```

### 2. Instalar dependencias
```bash
npm install --production
```

### 3. Crear build de producción
```bash
npm run build
```

### 4. Instalar PM2 (si no está instalado)
```bash
npm install -g pm2
```

### 5. Iniciar la aplicación
```bash
chmod +x start-cpanel-nodejs.sh
./start-cpanel-nodejs.sh
```

## Comandos Útiles

### Ver estado de la aplicación
```bash
pm2 status
```

### Ver logs
```bash
pm2 logs credit-with-rami
```

### Reiniciar aplicación
```bash
./restart-cpanel.sh
```

### Detener aplicación
```bash
./stop-cpanel.sh
```

### Iniciar aplicación
```bash
./start-cpanel-nodejs.sh
```

### Ejecutar directamente con Node.js
```bash
node server.js
```

## Solución de Problemas

### Si la aplicación no inicia
1. Verifica que Node.js esté instalado: `node --version`
2. Verifica que npm esté instalado: `npm --version`
3. Revisa los logs: `pm2 logs credit-with-rami`
4. Asegúrate de que las dependencias estén instaladas: `npm list`

### Si hay errores de permisos
```bash
chmod +x *.sh
```

### Si el puerto está ocupado
Cambia el puerto en `ecosystem.config.js` y en `env.production`

### Si hay errores de dependencias
```bash
rm -rf node_modules package-lock.json
npm install --production
npm run build
```

### Si Node.js no está configurado en cPanel
1. Ve a **cPanel > Node.js Selector**
2. Crea una nueva aplicación
3. Establece el directorio en `public_html`
4. Selecciona la versión de Node.js 18.x o superior

## Notas Importantes
- La aplicación se ejecutará en el puerto 3000 por defecto
- Los logs se guardan en el directorio `logs/`
- PM2 reiniciará automáticamente la aplicación si se cae
- Asegúrate de que el firewall permita conexiones al puerto 3000
- **El archivo `server.js` es el punto de entrada principal**

## Configuración de Variables de Entorno
1. Renombra `env.production` a `.env.production`
2. Ajusta las variables según tu configuración:
   - `PORT`: Puerto donde se ejecutará la aplicación
   - `NODE_ENV`: Debe ser `production`

## Estructura de Archivos
```
credit-with-rami-nodejs-cpanel/
├── src/                    # Código fuente de la aplicación
├── public/                 # Archivos estáticos
├── logs/                   # Directorio de logs (vacío inicialmente)
├── server.js              # Servidor Express principal
├── package.json           # Dependencias del proyecto
├── package-lock.json      # Lock file de dependencias
├── next.config.js         # Configuración de Next.js
├── ecosystem.config.js    # Configuración de PM2
├── cpanel-nodejs.json     # Configuración específica para cPanel
├── app.json              # Configuración de la aplicación
├── start-cpanel-nodejs.sh # Script de inicio para Node.js
├── stop-cpanel.sh         # Script de parada
├── restart-cpanel.sh      # Script de reinicio
├── .htaccess             # Configuración de Apache
├── env.production        # Variables de entorno
└── INSTRUCCIONES_NODEJS_CPANEL.md # Este archivo
```

## Ventajas de usar server.js
- ✅ **Control total**: Servidor Express personalizado
- ✅ **Mejor rendimiento**: Optimizado para producción
- ✅ **Más estable**: Manejo de errores mejorado
- ✅ **Compatible con cPanel**: Funciona perfectamente con Node.js Selector
- ✅ **Fácil debugging**: Logs detallados y manejo de errores

## Configuración en cPanel Node.js Selector
1. **Crear aplicación**: Crea una nueva aplicación Node.js
2. **Directorio**: Establece en `public_html`
3. **Archivo de inicio**: `server.js`
4. **Puerto**: 3000 (o el que configures)
5. **Variables de entorno**: 
   - `NODE_ENV=production`
   - `PORT=3000`
