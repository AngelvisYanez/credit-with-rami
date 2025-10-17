# Resumen de Despliegue en cPanel (Paquete Limpio)

## ✅ Proyecto Preparado para cPanel (Sin Librerías)

Tu proyecto **Credit With Rami** ha sido preparado exitosamente para el despliegue en cPanel con Node.js, **SIN incluir la carpeta de librerías** (`node_modules`).

## 📦 Archivos Creados

### Paquete Limpio
- `credit-with-rami-cpanel-clean/` - Directorio con archivos esenciales
- `credit-with-rami-cpanel-clean.zip` - Archivo ZIP listo para subir

### Scripts Actualizados
- `start-cpanel.sh` - Script que instala dependencias automáticamente
- `stop-cpanel.sh` - Script para detener la aplicación  
- `restart-cpanel.sh` - Script para reiniciar la aplicación

### Configuración
- `ecosystem.config.js` - Configuración para PM2
- `.htaccess` - Configuración de Apache
- `env.production` - Variables de entorno

## 🚀 Pasos para Desplegar

### 1. Subir Archivos
1. Descarga el archivo `credit-with-rami-cpanel-clean.zip`
2. Súbelo a tu cPanel
3. Extrae el contenido en tu directorio web (public_html)

### 2. Configurar en el Servidor
1. Conecta por SSH a tu servidor
2. Navega al directorio donde extrajiste los archivos
3. Ejecuta:

```bash
# Hacer ejecutables los scripts
chmod +x *.sh

# Iniciar la aplicación (instala dependencias automáticamente)
./start-cpanel.sh
```

**¡Eso es todo!** El script `start-cpanel.sh` se encarga de:
- ✅ Instalar todas las dependencias
- ✅ Crear el build de producción
- ✅ Instalar PM2 si es necesario
- ✅ Iniciar la aplicación

## 🔧 Ventajas del Paquete Limpio

### ✅ Más Ligero
- Sin carpeta `node_modules` (se instala en el servidor)
- Archivo ZIP mucho más pequeño
- Subida más rápida

### ✅ Más Compatible
- Dependencias instaladas según el servidor
- No hay conflictos de versiones
- Compatible con diferentes versiones de Node.js

### ✅ Más Seguro
- Instalación limpia en el servidor
- Dependencias optimizadas para producción
- Sin archivos innecesarios

### ✅ Automático
- Instalación automática de dependencias
- Build automático
- Configuración automática

## 📋 Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `./start-cpanel.sh` | Iniciar aplicación (instala dependencias) |
| `./stop-cpanel.sh` | Detener aplicación |
| `./restart-cpanel.sh` | Reiniciar aplicación |
| `pm2 status` | Ver estado |
| `pm2 logs credit-with-rami` | Ver logs |
| `pm2 monit` | Monitor en tiempo real |

## ⚠️ Requisitos del Servidor

- Node.js versión 18 o superior
- npm instalado
- Acceso SSH
- Puerto 3000 disponible (o configurar otro puerto)
- PM2 para gestión de procesos

## 🆘 Solución de Problemas

### Error de Permisos
```bash
chmod +x *.sh
```

### Puerto Ocupado
Edita `ecosystem.config.js` y `env.production` para cambiar el puerto

### Aplicación No Inicia
1. Verifica que Node.js esté instalado: `node --version`
2. Revisa los logs: `pm2 logs credit-with-rami`
3. Reinstala dependencias:
   ```bash
   rm -rf node_modules package-lock.json
   npm install --production
   npm run build
   ```

### Error de Dependencias
```bash
npm install --production
npm run build
```

## 📁 Estructura del Paquete

```
credit-with-rami-cpanel-clean/
├── src/                    # Código fuente
├── public/                 # Archivos estáticos
├── logs/                   # Directorio de logs (vacío)
├── package.json           # Dependencias
├── package-lock.json      # Lock file
├── ecosystem.config.js    # Configuración PM2
├── start-cpanel.sh        # Script de inicio
├── stop-cpanel.sh         # Script de parada
├── restart-cpanel.sh      # Script de reinicio
├── .htaccess             # Configuración Apache
├── env.production        # Variables de entorno
└── INSTRUCCIONES_CPANEL.md # Instrucciones detalladas
```

## ✅ Listo para Desplegar

Tu proyecto está completamente preparado para ser desplegado en cPanel **sin librerías**. Solo necesitas:

1. **Subir** el archivo `credit-with-rami-cpanel-clean.zip` a tu servidor
2. **Extraer** los archivos en tu directorio web
3. **Ejecutar** `./start-cpanel.sh` para iniciar la aplicación

**¡El script se encarga de todo automáticamente!**

## 🎯 Beneficios del Paquete Limpio

- 📦 **Archivo más pequeño** - Subida más rápida
- 🔧 **Instalación automática** - Sin configuración manual
- 🚀 **Más compatible** - Funciona en cualquier servidor
- 🛡️ **Más seguro** - Dependencias limpias del servidor
- ⚡ **Más rápido** - Optimizado para producción

¡Tu aplicación estará funcionando perfectamente en tu servidor cPanel con Node.js!
