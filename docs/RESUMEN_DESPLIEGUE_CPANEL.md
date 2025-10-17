# Resumen de Despliegue en cPanel

## ✅ Proyecto Preparado para cPanel

Tu proyecto **Credit With Rami** ha sido preparado exitosamente para el despliegue en cPanel con Node.js.

## 📦 Archivos Creados

### Scripts de Gestión
- `start-cpanel.sh` - Script para iniciar la aplicación
- `stop-cpanel.sh` - Script para detener la aplicación  
- `restart-cpanel.sh` - Script para reiniciar la aplicación
- `cpanel-deploy.sh` - Script para preparar el paquete de despliegue

### Configuración
- `ecosystem.config.js` - Configuración actualizada para PM2
- `.htaccess` - Configuración de Apache para redirección
- `env.production` - Variables de entorno para producción

### Paquete de Despliegue
- `credit-with-rami-cpanel/` - Directorio con todos los archivos listos
- `credit-with-rami-cpanel-deploy.zip` - Archivo ZIP listo para subir

## 🚀 Pasos para Desplegar

### 1. Subir Archivos
1. Descarga el archivo `credit-with-rami-cpanel-deploy.zip`
2. Súbelo a tu cPanel
3. Extrae el contenido en tu directorio web (public_html)

### 2. Configurar en el Servidor
1. Conecta por SSH a tu servidor
2. Navega al directorio donde extrajiste los archivos
3. Ejecuta los siguientes comandos:

```bash
# Instalar dependencias
npm install --production

# Crear build de producción
npm run build

# Instalar PM2 (si no está instalado)
npm install -g pm2

# Hacer ejecutables los scripts
chmod +x *.sh

# Iniciar la aplicación
./start-cpanel.sh
```

### 3. Verificar Funcionamiento
```bash
# Ver estado de la aplicación
pm2 status

# Ver logs
pm2 logs credit-with-rami
```

## 🔧 Configuración Adicional

### Variables de Entorno
- Renombra `env.production` a `.env.production`
- Ajusta el puerto si es necesario

### Dominio Personalizado
- Edita el archivo `.htaccess` para cambiar la URL de redirección
- Asegúrate de que el puerto coincida con el configurado

## 📋 Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `./start-cpanel.sh` | Iniciar aplicación |
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
3. Verifica que todas las dependencias estén instaladas

## 📁 Estructura Final

```
credit-with-rami-cpanel/
├── src/                    # Código fuente
├── public/                 # Archivos estáticos
├── logs/                   # Directorio de logs
├── package.json           # Dependencias
├── ecosystem.config.js    # Configuración PM2
├── start-cpanel.sh        # Script de inicio
├── stop-cpanel.sh         # Script de parada
├── restart-cpanel.sh      # Script de reinicio
├── .htaccess             # Configuración Apache
├── env.production        # Variables de entorno
└── INSTRUCCIONES_CPANEL.md # Instrucciones detalladas
```

## ✅ Listo para Desplegar

Tu proyecto está completamente preparado para ser desplegado en cPanel. Solo necesitas:

1. **Subir** el archivo `credit-with-rami-cpanel-deploy.zip` a tu servidor
2. **Extraer** los archivos en tu directorio web
3. **Seguir** las instrucciones en `INSTRUCCIONES_CPANEL.md`
4. **Ejecutar** `./start-cpanel.sh` para iniciar la aplicación

¡Tu aplicación estará funcionando en tu servidor cPanel con Node.js!
