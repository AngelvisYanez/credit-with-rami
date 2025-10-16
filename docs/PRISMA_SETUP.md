# Configuración de Prisma con Supabase

## 🚀 Configuración Completa

### 1. Crear cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Anota la URL de conexión y la clave API

### 2. Configurar variables de entorno

#### En Netlify Dashboard:
1. Ve a tu proyecto en Netlify
2. Ve a **Site settings** > **Environment variables**
3. Agrega la variable:
   ```
   DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?schema=public
   ```

#### Para desarrollo local:
1. Crea un archivo `.env` en la raíz del proyecto
2. Agrega:
   ```
   DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?schema=public
   ```

### 3. Ejecutar migraciones

```bash
# Generar Prisma Client
npm run db:generate

# Aplicar migraciones a la base de datos
npm run db:push

# (Opcional) Poblar con datos de prueba
npm run db:seed
```

### 4. Deploy a Netlify

```bash
# Hacer commit de los cambios
git add .
git commit -m "feat: Configurar Prisma con Supabase"

# Deploy
netlify deploy --prod
```

## 📊 Estructura de la Base de Datos

### Tabla: appointments
- `id` - ID único (CUID)
- `name` - Nombre del cliente
- `email` - Email del cliente
- `phone` - Teléfono del cliente
- `businessName` - Nombre del negocio
- `businessType` - Tipo de negocio
- `creditCards` - Tiene tarjetas de crédito
- `establishedBusiness` - Negocio establecido
- `strongCreditScore` - Buen puntaje crediticio
- `cleanHistory` - Historial limpio
- `preferredDate` - Fecha preferida
- `preferredTime` - Hora preferida
- `timezone` - Zona horaria
- `message` - Mensaje del cliente
- `isEligible` - Es elegible
- `eligibilityReason` - Razón de elegibilidad
- `status` - Estado (PENDING, CONFIRMED, COMPLETED, CANCELLED)
- `createdAt` - Fecha de creación
- `updatedAt` - Fecha de actualización

### Tabla: admin_users
- `id` - ID único (CUID)
- `username` - Nombre de usuario
- `password` - Contraseña (hashear en producción)
- `name` - Nombre del admin
- `role` - Rol (admin)
- `createdAt` - Fecha de creación

## 🔧 Comandos Útiles

```bash
# Generar Prisma Client
npm run db:generate

# Aplicar cambios al schema
npm run db:push

# Crear migración
npm run db:migrate

# Poblar con datos de prueba
npm run db:seed

# Abrir Prisma Studio
npx prisma studio
```

## 🚨 Notas Importantes

1. **Seguridad**: En producción, hashear las contraseñas de admin
2. **Variables de entorno**: Nunca commitear el archivo `.env`
3. **Backup**: Configurar backup automático en Supabase
4. **Monitoreo**: Monitorear el uso de la base de datos

## 🔍 Verificación

Después del deploy, verifica que:
1. Las API routes funcionen correctamente
2. El sistema de administración cargue los datos
3. Se puedan crear, actualizar y eliminar appointments
4. Los datos persistan entre sesiones
