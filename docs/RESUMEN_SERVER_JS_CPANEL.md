# Resumen de Despliegue con server.js para cPanel

## ✅ Proyecto Preparado con server.js para cPanel

Tu proyecto **Credit With Rami** ha sido preparado exitosamente para el despliegue en cPanel usando **Node.js con Express** a través del archivo `server.js`.

## 📦 Archivos Creados

### Servidor Principal
- `server.js` - Servidor Express que maneja tu aplicación Next.js
- `package.json` - Actualizado con dependencias de Express
- `ecosystem.config.js` - Configurado para usar `server.js`

### Configuración para cPanel
- `cpanel-nodejs.json` - Configuración específica para cPanel
- `app.json` - Configuración de la aplicación
- `start-cpanel-nodejs.sh` - Script de inicio optimizado

### Paquete de Despliegue
- `credit-with-rami-nodejs-cpanel/` - Directorio completo listo
- `credit-with-rami-nodejs-cpanel.zip` - Archivo ZIP para subir

## 🚀 Ventajas del server.js

### ✅ Control Total
- Servidor Express personalizado
- Manejo de errores mejorado
- Logs detallados

### ✅ Mejor Rendimiento
- Optimizado para producción
- Manejo eficiente de archivos estáticos
- Configuración personalizada

### ✅ Compatible con cPanel
- Funciona perfectamente con Node.js Selector
- Fácil configuración en cPanel
- Manejo automático de procesos

## 📋 Pasos para Desplegar

### 1. Configurar Node.js en cPanel
1. Ve a **cPanel > Node.js Selector**
2. Crea una nueva aplicación Node.js
3. Establece el directorio en `public_html`
4. Selecciona Node.js versión 18.x o superior

### 2. Subir Archivos
1. Descarga `credit-with-rami-nodejs-cpanel.zip`
2. Súbelo a tu cPanel
3. Extrae el contenido en `public_html`

### 3. Configurar en el Servidor
1. Conecta por SSH: `ssh -p 21098 credbqjg@198.54.116.189`
2. Navega al directorio: `cd /home/credbqjg/public_html`
3. Ejecuta:
   ```bash
   chmod +x start-cpanel-nodejs.sh
   ./start-cpanel-nodejs.sh
   ```

## 🔧 Configuración en cPanel Node.js Selector

### Configuración de la Aplicación
- **Directorio**: `public_html`
- **Archivo de inicio**: `server.js`
- **Puerto**: `3000`
- **Variables de entorno**:
  - `NODE_ENV=production`
  - `PORT=3000`

### Scripts Disponibles
| Comando | Descripción |
|---------|-------------|
| `node server.js` | Ejecutar directamente |
| `npm start` | Usar script de package.json |
| `./start-cpanel-nodejs.sh` | Script completo con PM2 |
| `pm2 start ecosystem.config.js` | Iniciar con PM2 |

## 📁 Estructura del Paquete

```
credit-with-rami-nodejs-cpanel/
├── server.js              # Servidor Express principal
├── src/                   # Código fuente Next.js
├── public/                # Archivos estáticos
├── package.json           # Dependencias (incluye Express)
├── ecosystem.config.js    # Configuración PM2
├── cpanel-nodejs.json     # Configuración cPanel
├── app.json              # Configuración aplicación
├── start-cpanel-nodejs.sh # Script de inicio
└── INSTRUCCIONES_NODEJS_CPANEL.md
```

## 🆘 Solución de Problemas

### Error: Node.js no configurado
1. Ve a **cPanel > Node.js Selector**
2. Crea nueva aplicación
3. Establece directorio en `public_html`

### Error: Puerto ocupado
```bash
# Cambiar puerto en env.production
PORT=3001

# O usar otro puerto
node server.js --port 3001
```

### Error: Dependencias
```bash
rm -rf node_modules package-lock.json
npm install --production
npm run build
```

### Error: Permisos
```bash
chmod +x *.sh
chmod +x server.js
```

## ✅ Listo para Desplegar

Tu proyecto está **100% preparado** para cPanel con Node.js:

1. **Sube** `credit-with-rami-nodejs-cpanel.zip` a cPanel
2. **Configura** Node.js Selector en cPanel
3. **Extrae** los archivos en `public_html`
4. **Ejecuta** `./start-cpanel-nodejs.sh`

## 🎯 Beneficios del server.js

- 🚀 **Mejor rendimiento** - Servidor Express optimizado
- 🛡️ **Más estable** - Manejo de errores robusto
- 🔧 **Fácil configuración** - Compatible con cPanel Node.js Selector
- 📊 **Logs detallados** - Mejor debugging y monitoreo
- ⚡ **Inicio rápido** - Optimizado para producción

¡Tu aplicación estará funcionando perfectamente en cPanel con Node.js usando Express!
