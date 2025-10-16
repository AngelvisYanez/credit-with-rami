# Instrucciones de Despliegue para creditwithrami.com

## 🌐 Configuración del Dominio

Este paquete está configurado específicamente para funcionar con el dominio **creditwithrami.com** en cPanel.

## 🔧 Configuración del Servidor

### Variables de Entorno Configuradas:
```bash
NODE_ENV=production
PORT=3000
DOMAIN=creditwithrami.com
NODE_OPTIONS=--max-old-space-size=256 --max-semi-space-size=32
```

### URLs de Acceso:
- **Principal**: http://creditwithrami.com
- **Con www**: http://www.creditwithrami.com
- **Puerto directo**: http://creditwithrami.com:3000

## 📋 Pasos de Despliegue

### 1. Subir Archivos
- Sube el paquete `credit-with-rami-simple` a tu servidor
- Extrae en el directorio `/home/credbqjg/public_html`

### 2. Conectar por SSH
```bash
ssh -p 21098 credbqjg@198.54.116.189
cd /home/credbqjg/public_html
```

### 3. Ejecutar Script de Inicio
```bash
chmod +x start-simple.sh
./start-simple.sh
```

## 🔍 Verificación del Dominio

### Verificar que funciona:
```bash
# Ver estado de la aplicación
pm2 status

# Ver logs
pm2 logs credit-with-rami-simple

# Verificar que el servidor responde
curl http://localhost:3000
```

### Verificar desde el navegador:
- Abre http://creditwithrami.com
- Deberías ver la página de Credit With Rami

## ⚙️ Configuración de cPanel

### 1. Configurar Dominio
- Ve a **cPanel > Subdomains** o **cPanel > Addon Domains**
- Asegúrate de que `creditwithrami.com` esté configurado
- El directorio debe apuntar a `public_html`

### 2. Configurar Node.js
- Ve a **cPanel > Node.js Selector**
- Crea una nueva aplicación Node.js
- Establece el directorio en `public_html`
- Archivo de inicio: `server-simple.js`
- Puerto: `3000`

### 3. Configurar .htaccess
El archivo `.htaccess` ya está configurado para:
- Redirigir `creditwithrami.com` al puerto 3000
- Redirigir `www.creditwithrami.com` al puerto 3000
- Configurar caché para archivos estáticos
- Configurar compresión

## 🆘 Solución de Problemas

### Si el dominio no funciona:
1. Verifica que el dominio esté configurado en cPanel
2. Verifica que el DNS apunte al servidor correcto
3. Verifica que el servidor Node.js esté corriendo:
   ```bash
   pm2 status
   ```

### Si hay errores de DNS:
1. Verifica la configuración DNS del dominio
2. Asegúrate de que apunte a la IP: `198.54.116.189`
3. Espera la propagación DNS (puede tomar hasta 24 horas)

### Si el servidor no responde:
```bash
# Verificar que PM2 esté corriendo
pm2 status

# Reiniciar la aplicación
pm2 restart credit-with-rami-simple

# Ver logs de errores
pm2 logs credit-with-rami-simple --err
```

## 📊 Monitoreo

### Ver estado del servidor:
```bash
pm2 monit
```

### Ver logs en tiempo real:
```bash
pm2 logs credit-with-rami-simple --lines 50
```

### Verificar uso de memoria:
```bash
pm2 show credit-with-rami-simple
```

## 🔧 Configuración Avanzada

### Cambiar puerto:
Si necesitas cambiar el puerto, edita:
1. `ecosystem-simple.config.js` - Cambiar `PORT: 3000`
2. `.htaccess` - Cambiar `localhost:3000` por el nuevo puerto
3. Reiniciar la aplicación: `pm2 restart credit-with-rami-simple`

### Cambiar dominio:
Si necesitas cambiar el dominio, edita:
1. `domain-config.js` - Cambiar el dominio
2. `ecosystem-simple.config.js` - Cambiar `DOMAIN`
3. `.htaccess` - Actualizar las reglas de redirección

## ✅ Verificación Final

Después del despliegue, verifica:

1. **Servidor corriendo**: `pm2 status` muestra la aplicación activa
2. **Dominio funcionando**: http://creditwithrami.com carga la página
3. **www funcionando**: http://www.creditwithrami.com redirige correctamente
4. **Logs limpios**: `pm2 logs` no muestra errores
5. **Memoria estable**: `pm2 monit` muestra uso de memoria bajo

## 🎯 Resultado Esperado

- ✅ **Dominio funcionando**: creditwithrami.com carga la aplicación
- ✅ **Servidor estable**: PM2 mantiene la aplicación corriendo
- ✅ **Memoria controlada**: Uso de memoria bajo (< 128MB)
- ✅ **Logs limpios**: Sin errores en los logs
- ✅ **Acceso público**: La aplicación es accesible desde internet

**¡Tu aplicación estará funcionando perfectamente en creditwithrami.com!**
