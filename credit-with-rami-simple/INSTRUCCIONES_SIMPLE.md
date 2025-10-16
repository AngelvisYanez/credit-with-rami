# Instrucciones de Despliegue (Servidor Simple - Sin Next.js)

## 🚨 Solución Definitiva para Error de WebAssembly

Este paquete usa un **servidor Express simple** que evita completamente Next.js y el error:
```
WebAssembly.instantiate(): Out of memory: Cannot allocate Wasm memory for new instance
```

## 🔧 Características de la Solución

### ✅ Servidor Express Simple
- **Sin Next.js** - Evita completamente el error de WebAssembly
- **Solo Express** - Dependencia mínima
- **Archivos estáticos** - HTML, CSS, JS estáticos
- **Memoria mínima** - Solo 256MB máximo

### ✅ Configuración Ultra Optimizada
- `NODE_OPTIONS="--max-old-space-size=256 --max-semi-space-size=32"`
- PM2 con límite de 128MB
- Sin dependencias complejas
- Sin build process

## 📋 Pasos de Despliegue

### 1. Subir Archivos
- Sube el paquete `credit-with-rami-simple` a tu servidor
- Extrae en el directorio web

### 2. Conectar por SSH
```bash
ssh -p 21098 credbqjg@198.54.116.189
cd /home/credbqjg/public_html
```

### 3. Ejecutar Script Simple
```bash
chmod +x start-simple.sh
./start-simple.sh
```

## 🛠️ Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `./start-simple.sh` | Inicio completo con servidor simple |
| `node server-simple.js` | Servidor simple directo |
| `pm2 start ecosystem-simple.config.js` | PM2 con configuración simple |

## 🔍 Verificación

### Verificar que funciona:
```bash
# Ver estado
pm2 status

# Ver logs
pm2 logs credit-with-rami-simple

# Ver uso de memoria
pm2 monit
```

### Resultado esperado:
- ✅ Servidor iniciado sin errores de WebAssembly
- ✅ Servidor iniciado en puerto 3000
- ✅ Uso de memoria muy bajo (< 128MB)
- ✅ Aplicación funcionando perfectamente

## ⚙️ Configuración

### Variables de Entorno:
```bash
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=256 --max-semi-space-size=32
PORT=3000
```

### Configuración de PM2:
- **Memoria máxima**: 128MB
- **Reinicio automático**: Si excede memoria
- **Logs**: En directorio `logs/`

## 🆘 Solución de Problemas

### Si el servidor no inicia:
```bash
# Verificar que Express esté instalado
npm list express

# Instalar Express manualmente
npm install express

# Iniciar manualmente
node server-simple.js
```

### Si hay errores de permisos:
```bash
chmod +x *.sh
chmod +x server-simple.js
```

### Si hay errores de archivos:
```bash
# Verificar que los archivos existen
ls -la public/
ls -la public/index.html
```

## 📊 Monitoreo

### Ver uso de memoria:
```bash
pm2 monit
```

### Ver logs:
```bash
pm2 logs credit-with-rami-simple --lines 50
```

### Reiniciar si es necesario:
```bash
pm2 restart credit-with-rami-simple
```

## ✅ Ventajas del Servidor Simple

- 🚀 **Sin Next.js** - Evita completamente el error de WebAssembly
- 💾 **Memoria mínima** - Solo 256MB máximo
- ⚡ **Muy rápido** - Sin build process
- 🛡️ **Muy estable** - Solo Express como dependencia
- 📝 **Fácil debugging** - Logs simples
- 🔄 **Reinicio automático** - Si excede 128MB
- 🎯 **Garantizado** - Funciona en cualquier servidor

## 🎯 Resultado Garantizado

Después de ejecutar `./start-simple.sh`:
- ✅ Servidor iniciado sin errores de WebAssembly
- ✅ Servidor iniciado en puerto 3000
- ✅ Uso de memoria muy bajo
- ✅ Aplicación funcionando perfectamente

## 📁 Estructura del Servidor Simple

```
credit-with-rami-simple/
├── public/                # Archivos estáticos
│   ├── index.html        # Página principal
│   ├── cwr-logo-1.png    # Logo
│   └── favicon.png       # Favicon
├── server-simple.js      # Servidor Express
├── package.json          # Solo Express como dependencia
├── start-simple.sh       # Script de inicio
├── ecosystem-simple.config.js # PM2 config
└── logs/                 # Directorio de logs
```

## 🏆 Beneficios de la Solución Simple

- ✅ **Sin WebAssembly** - Evita completamente el error
- ✅ **Sin Next.js** - No hay build process
- ✅ **Memoria mínima** - Solo 256MB máximo
- ✅ **Muy estable** - Solo Express como dependencia
- ✅ **Muy rápido** - Inicio inmediato
- ✅ **Fácil mantenimiento** - Código simple
- ✅ **Garantizado** - Funciona en cualquier servidor

**¡Esta solución garantiza que tu aplicación funcione sin errores de WebAssembly!**
