# Configuración de Variables de Entorno para Vercel + Neon

## 🚀 Variables de Entorno Requeridas

Para que el proyecto funcione correctamente en Vercel con la base de datos Neon, necesitas configurar las siguientes variables de entorno en el dashboard de Vercel:

### 📊 Base de Datos (Neon)

```env
DATABASE_URL="postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

**Cómo obtener la DATABASE_URL:**
1. Ve a tu dashboard de Neon
2. Selecciona tu proyecto
3. Ve a la sección "Connection Details"
4. Copia la "Connection String"
5. Reemplaza `[password]` con tu contraseña real

### 🔐 Autenticación de Admin

```env
ADMIN_USERNAME="rami"
ADMIN_PASSWORD="tu_password_seguro_aqui"
```

### 🌐 Configuración del Servidor

```env
NODE_ENV="production"
NEXTAUTH_URL="https://tu-dominio.vercel.app"
NEXTAUTH_SECRET="tu_secret_key_muy_largo_y_seguro"
```

## 📋 Pasos para Configurar en Vercel

### 1. Acceder al Dashboard de Vercel
- Ve a [vercel.com](https://vercel.com)
- Inicia sesión con tu cuenta
- Selecciona tu proyecto "credit-with-rami"

### 2. Configurar Variables de Entorno
- Ve a la pestaña "Settings"
- Selecciona "Environment Variables"
- Agrega cada variable una por una:

| Variable | Valor | Entorno |
|----------|-------|---------|
| `DATABASE_URL` | Tu connection string de Neon | Production, Preview, Development |
| `ADMIN_USERNAME` | `rami` | Production, Preview, Development |
| `ADMIN_PASSWORD` | Tu contraseña segura | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `NEXTAUTH_URL` | `https://tu-dominio.vercel.app` | Production |
| `NEXTAUTH_SECRET` | Genera una clave segura | Production, Preview, Development |

### 3. Generar NEXTAUTH_SECRET
Puedes generar una clave segura usando:
```bash
openssl rand -base64 32
```

O usar un generador online como: https://generate-secret.vercel.app/32

## 🔧 Configuración de Neon

### 1. Crear Base de Datos
- Ve a tu dashboard de Neon
- Crea una nueva base de datos si no existe
- Anota la connection string

### 2. Ejecutar Migraciones
Una vez configuradas las variables, Vercel ejecutará automáticamente:
```bash
npm run db:generate
npm run db:push
```

### 3. Poblar Datos Iniciales
Si necesitas datos de prueba, puedes ejecutar:
```bash
npm run db:seed
```

## 🚀 Comandos de Despliegue

### Despliegue Automático
Vercel se conectará automáticamente a tu repositorio de GitHub y desplegará cada push a main.

### Despliegue Manual
Si necesitas forzar un despliegue:
1. Ve al dashboard de Vercel
2. Selecciona tu proyecto
3. Haz clic en "Deployments"
4. Haz clic en "Redeploy" en el último deployment

## 🔍 Verificación Post-Despliegue

### 1. Verificar Variables de Entorno
- Ve a "Settings" > "Environment Variables"
- Confirma que todas las variables estén configuradas

### 2. Verificar Base de Datos
- Visita: `https://tu-dominio.vercel.app/api/test-db/`
- Debería devolver: `{"success": true, "message": "Database connection successful"}`

### 3. Verificar APIs
- `/api/appointments/` - Debería devolver array de citas
- `/api/admin/auth/` - Debería funcionar con credenciales correctas
- `/api/submit-application/` - Debería crear nuevas aplicaciones

## 🛠️ Troubleshooting

### Error: "Environment variable not found: DATABASE_URL"
- Verifica que la variable esté configurada en Vercel
- Confirma que el valor sea correcto
- Asegúrate de que esté habilitada para "Production"

### Error: "Database connection failed"
- Verifica la connection string de Neon
- Confirma que la base de datos esté activa
- Revisa que el usuario tenga permisos correctos

### Error: "Invalid credentials"
- Verifica ADMIN_USERNAME y ADMIN_PASSWORD
- Confirma que las variables estén configuradas correctamente

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de Vercel en "Functions" tab
2. Verifica las variables de entorno
3. Confirma la conexión a Neon
4. Revisa el estado de la base de datos

## 🎯 URLs Importantes

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Neon Dashboard**: https://console.neon.tech
- **GitHub Repository**: https://github.com/AngelvisYanez/credit-with-rami
- **Proyecto Desplegado**: https://tu-dominio.vercel.app
