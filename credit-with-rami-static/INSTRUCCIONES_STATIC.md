# Instrucciones de Despliegue (Build Estático - Sin WebAssembly)

## 🚨 Solución Definitiva para Error de WebAssembly

Este paquete usa un **build estático** que evita completamente el error:
```
WebAssembly.instantiate(): Out of memory: Cannot allocate Wasm memory for new instance
```

## 🔧 Características de la Solución

### ✅ Build Estático
- **Sin WebAssembly** - Evita completamente el error de memoria
- **Archivos estáticos** - Genera HTML, CSS, JS estáticos
- **Servidor Express simple** - Sirve archivos estáticos
- **Memoria mínima** - Solo 512MB máximo

### ✅ Configuración Optimizada
- `NODE_OPTIONS="--max-old-space-size=512 --max-semi-space-size=64"`
- PM2 con límite de 256MB
- Sin optimizaciones pesadas
- Sin minificación compleja

## 📋 Pasos de Despliegue

### 1. Subir Archivos
- Sube el paquete `credit-with-rami-static` a tu servidor
- Extrae en el directorio web

### 2. Conectar por SSH
```bash
ssh -p 21098 credbqjg@198.54.116.189
cd /home/credbqjg/public_html
```

### 3. Ejecutar Script Estático
```bash
chmod +x start-static.sh
./start-static.sh
```

## 🛠️ Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `./start-static.sh` | Inicio completo con build estático |
| `./build-static.sh` | Solo build estático |
| `node server-static.js` | Servidor estático |
| `pm2 start ecosystem-static.config.js` | PM2 con configuración estática |

## 🔍 Verificación

### Verificar que funciona:
```bash
# Ver estado
pm2 status

# Ver logs
pm2 logs credit-with-rami-static

# Ver uso de memoria
pm2 monit
```

### Resultado esperado:
- ✅ Build estático completado sin errores
- ✅ Servidor iniciado en puerto 3000
- ✅ Uso de memoria muy bajo (< 256MB)
- ✅ Archivos estáticos funcionando

## ⚙️ Configuración

### Variables de Entorno:
```bash
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=512 --max-semi-space-size=64
PORT=3000
```

### Configuración de PM2:
- **Memoria máxima**: 256MB
- **Reinicio automático**: Si excede memoria
- **Logs**: En directorio `logs/`

## 🆘 Solución de Problemas

### Si el build falla:
```bash
# Limpiar completamente
rm -rf node_modules .next out package-lock.json
npm cache clean --force
./start-static.sh
```

### Si el servidor no inicia:
```bash
# Verificar que el build estático existe
ls -la out/

# Iniciar manualmente
node server-static.js
```

### Si hay errores de permisos:
```bash
chmod +x *.sh
chmod +x server-static.js
```

## 📊 Monitoreo

### Ver uso de memoria:
```bash
pm2 monit
```

### Ver logs:
```bash
pm2 logs credit-with-rami-static --lines 50
```

### Reiniciar si es necesario:
```bash
pm2 restart credit-with-rami-static
```

## ✅ Ventajas del Build Estático

- 🚀 **Sin WebAssembly** - Evita completamente el error
- 💾 **Memoria mínima** - Solo 512MB máximo
- ⚡ **Muy rápido** - Archivos estáticos
- 🛡️ **Muy estable** - Sin dependencias complejas
- 📝 **Fácil debugging** - Logs simples
- 🔄 **Reinicio automático** - Si excede 256MB

## 🎯 Resultado Garantizado

Después de ejecutar `./start-static.sh`:
- ✅ Build estático completado sin errores de WebAssembly
- ✅ Servidor iniciado en puerto 3000
- ✅ Uso de memoria muy bajo
- ✅ Aplicación funcionando perfectamente

## 📁 Estructura del Build Estático

```
out/                    # Archivos estáticos generados
├── index.html         # Página principal
├── _next/             # Archivos de Next.js
├── static/            # Archivos estáticos
└── ...                # Otros archivos
```

**¡Esta solución garantiza que tu aplicación funcione sin errores de WebAssembly!**
