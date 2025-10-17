# Configuración de Base de Datos PostgreSQL para Prisma

## Opción 1: Neon (Recomendado - Gratuito)

### 1. Crear cuenta en Neon
1. Ve a [https://neon.tech](https://neon.tech)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

### 2. Obtener la URL de conexión
1. En el dashboard de Neon, ve a "Connection Details"
2. Copia la "Connection String" que se ve así:
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

### 3. Configurar en el proyecto
1. Actualiza el archivo `.env` con la nueva URL:
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
   ```

## Opción 2: Supabase (Alternativa gratuita)

### 1. Crear cuenta en Supabase
1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

### 2. Obtener la URL de conexión
1. Ve a Settings > Database
2. Copia la "Connection string" (URI)
3. Reemplaza `[YOUR-PASSWORD]` con tu contraseña

### 3. Configurar en el proyecto
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"
```

## Opción 3: Railway (Alternativa)

### 1. Crear cuenta en Railway
1. Ve a [https://railway.app](https://railway.app)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto con PostgreSQL

### 2. Obtener la URL de conexión
1. Ve a la pestaña "Variables"
2. Copia la variable `DATABASE_URL`

## Pasos después de configurar la base de datos:

1. **Generar el cliente de Prisma:**
   ```bash
   npx prisma generate
   ```

2. **Crear y aplicar migraciones:**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Verificar la conexión:**
   ```bash
   npx prisma db push
   ```

4. **Opcional - Poblar con datos de prueba:**
   ```bash
   npx prisma db seed
   ```

## Comandos útiles:

- `npx prisma studio` - Abrir interfaz visual de la base de datos
- `npx prisma migrate status` - Ver estado de las migraciones
- `npx prisma db push` - Sincronizar esquema sin migraciones
- `npx prisma migrate reset` - Resetear base de datos (¡CUIDADO!)

## Variables de entorno necesarias:

```env
# Base de datos
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Para producción (opcional)
DIRECT_URL="postgresql://username:password@host:port/database?sslmode=require"
```
