# 🔧 Variables de Entorno para Vercel - Credit with Rami

## 📋 Configuración Completa para Vercel

Copia y pega estas variables de entorno en tu dashboard de Vercel:

### 🗄️ Base de Datos (Neon)
```env
DATABASE_URL=postgresql://neondb_owner:npg_r3AVs8EWcdbU@ep-tiny-bush-adzpt774-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 🔐 Autenticación de Admin
```env
ADMIN_USERNAME=rami
ADMIN_PASSWORD=rami123
```

### 🌐 Configuración del Entorno
```env
NODE_ENV=production
NEXTAUTH_URL=https://creditwithrami.com
NEXTAUTH_SECRET=sXwDv1953Gy+wwQlaVxrXCrwGC0uF9XGOZzMQR/QMzk=
```

### 📊 Configuración del Servidor (Opcional)
```env
PORT=3000
```

## 🚀 Instrucciones para Vercel

### 1. Acceder al Dashboard
- Ve a [vercel.com](https://vercel.com)
- Inicia sesión con tu cuenta
- Selecciona el proyecto "credit-with-rami"

### 2. Configurar Variables
- Ve a **Settings** > **Environment Variables**
- Haz clic en **Add New**
- Agrega cada variable una por una:

| Variable | Valor | Entorno |
|----------|-------|---------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_r3AVs8EWcdbU@ep-tiny-bush-adzpt774-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` | Production, Preview, Development |
| `ADMIN_USERNAME` | `rami` | Production, Preview, Development |
| `ADMIN_PASSWORD` | `rami123` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `NEXTAUTH_URL` | `https://creditwithrami.com` | Production, Preview, Development |
| `NEXTAUTH_SECRET` | `sXwDv1953Gy+wwQlaVxrXCrwGC0uF9XGOZzMQR/QMzk=` | Production, Preview, Development |
| `PORT` | `3000` | Production, Preview, Development |

### 3. Redeploy
- Una vez configuradas todas las variables
- Ve a **Deployments**
- Haz clic en **Redeploy** en el último deployment

## 🔍 Verificación Post-Despliegue

Una vez desplegado, verifica estas URLs:

### ✅ URLs de Verificación
- **Página principal**: https://creditwithrami.com
- **Formulario de aplicación**: https://creditwithrami.com/application
- **Panel de admin**: https://creditwithrami.com/admin
- **Test de base de datos**: https://creditwithrami.com/api/test-db/
- **Lista de citas**: https://creditwithrami.com/api/appointments/

### 🧪 Comandos de Prueba
```bash
# Verificar conexión a base de datos
curl https://creditwithrami.com/api/test-db/

# Verificar citas
curl https://creditwithrami.com/api/appointments/

# Verificar autenticación
curl -X POST https://creditwithrami.com/api/admin/auth/ \
  -H "Content-Type: application/json" \
  -d '{"username":"rami","password":"rami123"}'
```

## 🎯 Resultados Esperados

### ✅ Test de Base de Datos
```json
{
  "success": true,
  "message": "Database connection successful",
  "data": {
    "appointmentCount": 2,
    "adminCount": 1,
    "adminExists": true,
    "adminUsername": "rami",
    "timestamp": "2025-10-17T..."
  }
}
```

### ✅ Lista de Citas
```json
[
  {
    "id": "...",
    "name": "Sample User",
    "email": "sample@example.com",
    "status": "pending",
    ...
  }
]
```

### ✅ Autenticación de Admin
```json
{
  "success": true,
  "admin": {
    "id": "...",
    "username": "rami",
    "name": "Rami",
    "role": "admin"
  }
}
```

## 🚨 Troubleshooting

### Error: "Environment variable not found"
- Verifica que todas las variables estén configuradas en Vercel
- Confirma que estén habilitadas para "Production"
- Verifica que los valores sean exactos (sin espacios extra)

### Error: "Database connection failed"
- Verifica que la DATABASE_URL sea correcta
- Confirma que la base de datos Neon esté activa
- Revisa los logs de Vercel en "Functions" tab

### Error: "Invalid credentials"
- Verifica ADMIN_USERNAME y ADMIN_PASSWORD
- Confirma que las variables estén configuradas correctamente

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de Vercel en "Functions" tab
2. Verifica las variables de entorno
3. Confirma la conexión a Neon
4. Revisa el estado de la base de datos

## 🎉 ¡Listo para Producción!

Una vez configuradas todas las variables, tu proyecto estará 100% funcional en:
**https://creditwithrami.com** 🚀
