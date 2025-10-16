# 🚂 Guía Paso a Paso para Railway

## 📋 Pasos Detallados

### 1. Crear Cuenta en Railway

1. **Ve a [railway.app](https://railway.app)**
2. **Haz clic en "Start a New Project"**
3. **Selecciona "Login with GitHub"** (recomendado)
4. **Autoriza Railway** para acceder a tu cuenta
5. **Completa el registro** si es necesario

### 2. Crear Nuevo Proyecto

1. **En el dashboard**, haz clic en **"New Project"**
2. **Selecciona "Database"**
3. **Elige "PostgreSQL"**
4. **Espera** a que se cree (1-2 minutos)
5. **Verás un mensaje** "Database is ready"

### 3. Obtener URL de Conexión

1. **Haz clic en la base de datos** creada
2. **Ve a la pestaña "Connect"**
3. **Busca "Connection URL"**
4. **Copia la URL** que se ve así:
   ```
   postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
   ```

### 4. Probar la Conexión

```bash
# Reemplaza TU_URL con la URL real de Railway
node scripts/test-railway-connection.js "TU_URL_DE_RAILWAY"
```

### 5. Configurar en Netlify

```bash
# Reemplaza con tu URL de Railway
netlify env:set DATABASE_URL "postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway"
```

### 6. Aplicar Migraciones

```bash
# Aplicar schema de Prisma
npx prisma db push

# Poblar con datos iniciales
npm run db:seed
```

### 7. Verificar Sistema

1. **Ve a https://creditwithrami.com/admin**
2. **Inicia sesión** con:
   - Usuario: `rami`
   - Contraseña: `rami123`
3. **Crea una cita de prueba**
4. **Verifica que se guarde** correctamente

## 🔧 Información Importante

### Características de Railway:
- ✅ **Gratuito** hasta 1GB de almacenamiento
- ✅ **PostgreSQL 15** (última versión)
- ✅ **SSL habilitado** por defecto
- ✅ **Backup automático**
- ✅ **Monitoreo** incluido

### Credenciales por Defecto:
- **Usuario**: `postgres`
- **Base de datos**: `railway`
- **Puerto**: `5432`
- **SSL**: Requerido

## 🚨 Solución de Problemas

### Error: "Connection refused"
- Verifica que la URL sea correcta
- Confirma que la base de datos esté activa
- Espera 2-3 minutos después de crear

### Error: "SSL required"
- Railway requiere SSL
- El script ya incluye `ssl: { rejectUnauthorized: false }`

### Error: "Database does not exist"
- Railway crea la base de datos automáticamente
- Usa `railway` como nombre de base de datos

## ✅ Verificación Final

Una vez configurado, deberías ver:

1. **Conexión exitosa** en el script de prueba
2. **Tablas creadas** en Railway dashboard
3. **Sistema funcionando** en https://creditwithrami.com/admin
4. **Datos persistiendo** entre sesiones

## 🎯 Próximos Pasos

1. **Configura Railway** siguiendo esta guía
2. **Prueba la conexión** con el script
3. **Configura en Netlify** con la URL
4. **Aplica migraciones** con Prisma
5. **¡Disfruta tu sistema funcionando!**
