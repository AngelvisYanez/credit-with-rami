# Configuración de URL de Supabase

## 🔍 Obtener la URL de Conexión Correcta

### 1. Acceder al Dashboard de Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto: `nxaljnjgieyfhlmlwyms`

### 2. Obtener la URL de Conexión

1. Ve a **Settings** > **Database**
2. Busca la sección **Connection string**
3. Selecciona **URI** (no Session mode)
4. Copia la URL que se ve así:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### 3. Reemplazar la Contraseña

Reemplaza `[YOUR-PASSWORD]` con: `oge3CkODpQ3E2Eq2`

La URL final debería verse así:
```
postgresql://postgres:oge3CkODpQ3E2Eq2@db.nxaljnjgieyfhlmlwyms.supabase.co:5432/postgres
```

### 4. Configurar en Netlify

```bash
netlify env:set DATABASE_URL "postgresql://postgres:oge3CkODpQ3E2Eq2@db.nxaljnjgieyfhlmlwyms.supabase.co:5432/postgres"
```

### 5. Aplicar Migraciones

```bash
# Configurar variable localmente
$env:DATABASE_URL="postgresql://postgres:oge3CkODpQ3E2Eq2@db.nxaljnjgieyfhlmlwyms.supabase.co:5432/postgres"

# Aplicar migraciones
npx prisma db push

# Poblar con datos iniciales
npm run db:seed
```

## 🚨 Notas Importantes

1. **URL de Conexión Directa**: Asegúrate de usar la URL de conexión directa, no la de pooler
2. **Puerto**: Usa el puerto `5432` para conexión directa
3. **Schema**: Incluye `?schema=public` al final de la URL
4. **Seguridad**: La contraseña es sensible, no la compartas públicamente

## 🔧 Verificación

Para verificar que la conexión funciona:

```bash
# Probar conexión
npx prisma db pull

# Si funciona, aplicar migraciones
npx prisma db push
```

## 📊 Datos del Proyecto

- **Project Reference**: `nxaljnjgieyfhlmlwyms`
- **Password**: `oge3CkODpQ3E2Eq2`
- **URL Base**: `https://nxaljnjgieyfhlmlwyms.supabase.co`
