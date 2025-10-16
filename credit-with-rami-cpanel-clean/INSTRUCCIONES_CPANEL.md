# Instrucciones de Despliegue en cPanel (Sin Librerías)

## Requisitos Previos
1. Acceso SSH a tu servidor cPanel
2. Node.js instalado (versión 18 o superior)
3. npm instalado
4. PM2 instalado globalmente

## Pasos de Despliegue

### 1. Subir archivos
- Sube todos los archivos del directorio `credit-with-rami-cpanel-clean` a tu directorio web en cPanel
- **IMPORTANTE**: Este paquete NO incluye la carpeta `node_modules` - las dependencias se instalarán en el servidor

### 2. Conectar por SSH
```bash
ssh tu_usuario@tu_servidor.com
cd /home/tu_usuario/public_html
```

### 3. Instalar dependencias
```bash
npm install --production
```

### 4. Crear build de producción
```bash
npm run build
```

### 5. Instalar PM2 (si no está instalado)
```bash
npm install -g pm2
```

### 6. Iniciar la aplicación
```bash
chmod +x start-cpanel.sh
./start-cpanel.sh
```

### 7. Configurar dominio (opcional)
Si quieres usar un dominio específico, edita el archivo `.htaccess` y cambia la URL de redirección.

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
```Sioubr9m=ADH

### Detener aplicaciónSioubr9m=ADH
./stop-cpanel.sh
```

### Iniciar aplicación
```bash
./start-cpanel.sh
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

## Notas Importantes
- La aplicación se ejecutará en el puerto 3000 por defecto
- Los logs se guardan en el directorio `logs/`
- PM2 reiniciará automáticamente la aplicación si se cae
- Asegúrate de que el firewall permita conexiones al puerto 3000
- **Las dependencias se instalan automáticamente** cuando ejecutas `./start-cpanel.sh`

## Configuración de Variables de Entorno
1. Renombra `env.production` a `.env.production`
2. Ajusta las variables según tu configuración:
   - `PORT`: Puerto donde se ejecutará la aplicación
   - `NODE_ENV`: Debe ser `production`

## Estructura de Archivos
```
credit-with-rami-cpanel-clean/
├── src/                    # Código fuente de la aplicación
├── public/                 # Archivos estáticos
├── logs/                   # Directorio de logs (vacío inicialmente)
├── package.json           # Dependencias del proyecto
├── package-lock.json      # Lock file de dependencias
├── next.config.js         # Configuración de Next.js
├── ecosystem.config.js    # Configuración de PM2
├── start-cpanel.sh        # Script de inicio (instala dependencias)
├── stop-cpanel.sh         # Script de parada
├── restart-cpanel.sh      # Script de reinicio
├── .htaccess             # Configuración de Apache
├── env.production        # Variables de entorno
└── INSTRUCCIONES_CPANEL.md # Este archivo
```

## Ventajas de este Paquete
- ✅ **Más ligero**: Sin carpeta `node_modules` (se instala en servidor)
- ✅ **Más rápido**: Subida más rápida al servidor
- ✅ **Más compatible**: Dependencias instaladas según el servidor
- ✅ **Más seguro**: No hay conflictos de versiones
- ✅ **Automático**: Instalación automática de dependencias
