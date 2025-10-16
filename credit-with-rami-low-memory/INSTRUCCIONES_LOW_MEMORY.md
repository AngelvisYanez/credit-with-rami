# Instrucciones de Despliegue (Versión Low Memory)

## 🚨 Solución para Error de Memoria

Este paquete está optimizado para solucionar el error:
```
WebAssembly.instantiate(): Out of memory: Cannot allocate Wasm memory for new instance
```

## 🔧 Optimizaciones Incluidas

### ✅ Configuración de Memoria
- `NODE_OPTIONS="--max-old-space-size=1024 --max-semi-space-size=128"`
- Límite de memoria de PM2: 512MB
- Build optimizado para servidores con poca RAM

### ✅ Next.js Optimizado
- Deshabilitado WebAssembly
- Optimizaciones CSS deshabilitadas
- Source maps deshabilitados
- SWC Minify habilitado

### ✅ Dependencias Optimizadas
- Instalación sin dependencias opcionales
- Sin auditorías ni fondos
- Caché limpio antes de instalar

## 📋 Pasos de Despliegue

### 1. Subir Archivos
- Sube el paquete `credit-with-rami-low-memory` a tu servidor
- Extrae en el directorio web

### 2. Conectar por SSH
```bash
ssh -p 21098 credbqjg@198.54.116.189
cd /home/credbqjg/public_html
```

### 3. Ejecutar Script Optimizado
```bash
chmod +x start-low-memory.sh
./start-low-memory.sh
```

## 🛠️ Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `./start-low-memory.sh` | Inicio completo optimizado |
| `./build-low-memory.sh` | Solo build optimizado |
| `node server-low-memory.js` | Servidor optimizado |
| `pm2 start ecosystem-low-memory.config.js` | PM2 con configuración de baja memoria |

## 🔍 Verificación

### Verificar que funciona:
```bash
# Ver estado
pm2 status

# Ver logs
pm2 logs credit-with-rami-low-memory

# Ver uso de memoria
pm2 monit
```

### Si sigue fallando:
```bash
# Limpiar todo y reinstalar
rm -rf node_modules .next package-lock.json
npm cache clean --force
./start-low-memory.sh
```

## ⚙️ Configuración de Variables

### Variables de Entorno:
```bash
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=1024 --max-semi-space-size=128
PORT=3000
```

### Configuración de PM2:
- **Memoria máxima**: 512MB
- **Reinicio automático**: Si excede memoria
- **Logs**: En directorio `logs/`

## 🆘 Solución de Problemas

### Error: "Out of memory"
1. Usa `server-low-memory.js` en lugar de `server.js`
2. Ejecuta `./start-low-memory.sh`
3. Verifica que `NODE_OPTIONS` esté configurado

### Error: "Build failed"
1. Limpia caché: `npm cache clean --force`
2. Elimina node_modules: `rm -rf node_modules`
3. Reinstala: `npm install --production --no-optional`

### Error: "PM2 not found"
```bash
npm install -g pm2
```

## 📊 Monitoreo de Memoria

### Ver uso de memoria en tiempo real:
```bash
pm2 monit
```

### Ver logs de memoria:
```bash
pm2 logs credit-with-rami-low-memory --lines 50
```

### Reiniciar si usa mucha memoria:
```bash
pm2 restart credit-with-rami-low-memory
```

## ✅ Características de la Versión Low Memory

- 🚀 **Build optimizado** - Sin WebAssembly
- 💾 **Memoria limitada** - Máximo 1GB para Node.js
- 🔄 **Reinicio automático** - Si excede 512MB
- 📝 **Logs detallados** - Monitoreo de memoria
- 🛡️ **Manejo de errores** - Recuperación automática
- ⚡ **Inicio rápido** - Sin optimizaciones pesadas

## 🎯 Resultado Esperado

Después de ejecutar `./start-low-memory.sh`:
- ✅ Build completado sin errores de memoria
- ✅ Servidor iniciado en puerto 3000
- ✅ PM2 monitoreando la aplicación
- ✅ Logs funcionando correctamente

¡Tu aplicación funcionará perfectamente en servidores con poca memoria!
