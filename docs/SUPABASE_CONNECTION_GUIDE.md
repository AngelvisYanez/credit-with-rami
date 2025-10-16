# 🔗 Guía para Obtener la URL de Conexión de Supabase

## 📋 Pasos para Obtener la URL Correcta

### 1. Acceder al Dashboard de Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto: **nxaljnjgieyfhlmlwyms**

### 2. Obtener la URL de Conexión

1. En el dashboard, ve a **Settings** (Configuración)
2. Selecciona **Database** (Base de datos)
3. Busca la sección **Connection string** (Cadena de conexión)
4. Selecciona **URI** (no Session mode)
5. Copia la URL que se ve así:

```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### 3. Reemplazar la Contraseña

Reemplaza `[YOUR-PASSWORD]` con: **oge3CkODpQ3E2Eq2**

### 4. Posibles URLs de Conexión

Dependiendo de tu configuración de Supabase, la URL puede ser una de estas:

#### Opción 1: Conexión Directa
```
postgresql://postgres:oge3CkODpQ3E2Eq2@db.nxaljnjgieyfhlmlwyms.supabase.co:5432/postgres
```

#### Opción 2: Pooler (Recomendado para producción)
```
postgresql://postgres:oge3CkODpQ3E2Eq2@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

#### Opción 3: Pooler con proyecto específico
```
postgresql://postgres:oge3CkODpQ3E2Eq2@[PROJECT-REF].pooler.supabase.com:6543/postgres
```

### 5. Configurar en Netlify

Una vez que tengas la URL correcta, ejecuta:

```bash
netlify env:set DATABASE_URL "TU_URL_AQUI"
```

### 6. Verificar la Conexión

```bash
# Probar conexión
npx prisma db pull

# Si funciona, aplicar migraciones
npx prisma db push

# Poblar con datos iniciales
npm run db:seed
```

## 🔍 Verificación de la Conexión

### Desde el Dashboard de Supabase:

1. Ve a **Database** > **Tables**
2. Verifica que no haya tablas existentes
3. Si hay tablas, puedes eliminarlas para empezar limpio

### Desde el Terminal:

```bash
# Probar conexión
npx prisma db pull

# Aplicar schema
npx prisma db push

# Ver datos
npx prisma studio
```

## 🚨 Solución de Problemas

### Error: "Can't reach database server"
- Verifica que el proyecto esté activo en Supabase
- Confirma que la URL de conexión sea correcta
- Asegúrate de usar el puerto correcto (5432 para directa, 6543 para pooler)

### Error: "Tenant or user not found"
- Verifica que la contraseña sea correcta
- Confirma que el usuario sea `postgres`
- Asegúrate de usar la URL de pooler si la directa no funciona

### Error: "Connection refused"
- El proyecto puede estar pausado
- Verifica el estado del proyecto en Supabase
- Reactiva el proyecto si es necesario

## 📞 Datos del Proyecto

- **Project Reference**: `nxaljnjgieyfhlmlwyms`
- **Password**: `oge3CkODpQ3E2Eq2`
- **URL Base**: `https://nxaljnjgieyfhlmlwyms.supabase.co`

## ✅ Una Vez Configurado

Cuando la conexión funcione:

1. **Aplicar migraciones**: `npx prisma db push`
2. **Poblar datos**: `npm run db:seed`
3. **Verificar sistema**: Visitar https://creditwithrami.com/admin
4. **Probar funcionalidad**: Crear una cita de prueba
