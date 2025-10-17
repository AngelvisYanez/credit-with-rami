# Configuración para creditwithrami.com

## ✅ Proyecto Configurado para el Dominio

He actualizado el proyecto para que funcione correctamente con el dominio **creditwithrami.com** en lugar de localhost:3000.

## 🌐 Configuración del Dominio

### URLs de Acceso:
- **Principal**: http://creditwithrami.com
- **Con www**: http://www.creditwithrami.com
- **Puerto directo**: http://creditwithrami.com:3000

### Configuración del Servidor:
- **IP del servidor**: 198.54.116.189
- **Puerto SSH**: 21098
- **Usuario**: credbqjg
- **Directorio**: /home/credbqjg/public_html

## 🔧 Archivos Actualizados

### 1. **server-simple.js**
- Configurado para mostrar el dominio en los logs
- Variables de entorno para el dominio
- Logs mejorados con información del dominio

### 2. **.htaccess**
- Redirección para `creditwithrami.com`
- Redirección para `www.creditwithrami.com`
- Configuración de caché para archivos estáticos
- Configuración de compresión

### 3. **ecosystem-simple.config.js**
- Variable `DOMAIN: 'creditwithrami.com'`
- Configuración de entorno para el dominio

### 4. **start-simple.sh**
- Información del dominio en el output
- Instrucciones para verificar la configuración del dominio

## 📦 Paquete Actualizado

**Archivo principal**: `credit-with-rami-simple-domain.zip`

### Contenido del paquete:
- `server-simple.js` - Servidor configurado para el dominio
- `.htaccess` - Redirección para creditwithrami.com
- `ecosystem-simple.config.js` - PM2 con configuración del dominio
- `start-simple.sh` - Script de inicio actualizado
- `domain-config.js` - Configuración del dominio
- `INSTRUCCIONES_DOMINIO.md` - Guía específica para el dominio

## 🚀 Pasos para Desplegar

### 1. **Subir Paquete**
```bash
# Sube este archivo a tu servidor:
credit-with-rami-simple-domain.zip
```

### 2. **Conectar por SSH**
```bash
ssh -p 21098 credbqjg@198.54.116.189
cd /home/credbqjg/public_html
```

### 3. **Ejecutar Script**
```bash
chmod +x start-simple.sh
./start-simple.sh
```

## 🔍 Verificación

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

### 1. **Configurar Dominio**
- Ve a **cPanel > Subdomains** o **cPanel > Addon Domains**
- Asegúrate de que `creditwithrami.com` esté configurado
- El directorio debe apuntar a `public_html`

### 2. **Configurar Node.js**
- Ve a **cPanel > Node.js Selector**
- Crea una nueva aplicación Node.js
- Establece el directorio en `public_html`
- Archivo de inicio: `server-simple.js`
- Puerto: `3000`

### 3. **Configurar DNS**
- Asegúrate de que el DNS del dominio apunte a la IP: `198.54.116.189`
- Configura tanto `creditwithrami.com` como `www.creditwithrami.com`

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
