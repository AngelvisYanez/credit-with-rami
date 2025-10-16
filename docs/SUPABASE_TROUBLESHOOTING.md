# 🚨 Solución de Problemas de Conexión a Supabase

## 🔍 Diagnóstico del Problema

Basado en las pruebas realizadas, el problema es que **no se puede conectar al servidor de Supabase**. Los errores indican:

- `getaddrinfo ENOTFOUND` = El dominio no se puede resolver
- `Tenant or user not found` = El proyecto no existe o está inactivo

## 📋 Pasos para Solucionar

### 1. Verificar Estado del Proyecto en Supabase

1. **Accede a [supabase.com](https://supabase.com)**
2. **Inicia sesión** con tu cuenta
3. **Busca el proyecto** `nxaljnjgieyfhlmlwyms`
4. **Verifica el estado**:
   - ✅ **Activo**: El proyecto está funcionando
   - ⏸️ **Pausado**: El proyecto está pausado (causa común)
   - ❌ **No encontrado**: El proyecto no existe

### 2. Si el Proyecto Está Pausado

1. **Haz clic en el proyecto**
2. **Busca el botón "Resume" o "Reactivar"**
3. **Confirma la reactivación**
4. **Espera 2-3 minutos** para que se active completamente

### 3. Si el Proyecto No Existe

**Opción A: Crear un Nuevo Proyecto**
1. **Haz clic en "New Project"**
2. **Nombre**: `credit-with-rami`
3. **Contraseña**: `oge3CkODpQ3E2Eq2`
4. **Región**: `us-east-1` (recomendado)
5. **Espera** a que se cree (2-3 minutos)

**Opción B: Usar un Proyecto Existente**
1. **Busca otros proyectos** en tu cuenta
2. **Usa uno existente** si tienes uno activo

### 4. Obtener la URL de Conexión Correcta

Una vez que el proyecto esté activo:

1. **Ve a Settings > Database**
2. **Busca "Connection string"**
3. **Selecciona "URI"**
4. **Copia la URL** que se ve así:
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### 5. Configurar en Netlify

```bash
# Reemplaza TU_URL_AQUI con la URL real
netlify env:set DATABASE_URL "postgresql://postgres:oge3CkODpQ3E2Eq2@db.TU_PROYECTO.supabase.co:5432/postgres"
```

### 6. Probar la Conexión

```bash
# Probar conexión
node scripts/test-supabase-connection.js

# Si funciona, aplicar migraciones
npx prisma db push

# Poblar con datos iniciales
npm run db:seed
```

## 🔧 Alternativas si Supabase No Funciona

### Opción 1: Usar Railway (Recomendado)

1. **Ve a [railway.app](https://railway.app)**
2. **Crea una cuenta gratuita**
3. **Nuevo proyecto > Database > PostgreSQL**
4. **Copia la URL de conexión**
5. **Configura en Netlify**

### Opción 2: Usar Neon (Alternativa)

1. **Ve a [neon.tech](https://neon.tech)**
2. **Crea una cuenta gratuita**
3. **Nuevo proyecto PostgreSQL**
4. **Copia la URL de conexión**
5. **Configura en Netlify**

### Opción 3: Usar PlanetScale (MySQL)

1. **Ve a [planetscale.com](https://planetscale.com)**
2. **Crea una cuenta gratuita**
3. **Nuevo proyecto MySQL**
4. **Actualiza el schema de Prisma** para MySQL
5. **Configura en Netlify**

## 📞 Información del Proyecto Actual

- **Project Reference**: `nxaljnjgieyfhlmlwyms`
- **Password**: `oge3CkODpQ3E2Eq2`
- **URL Base**: `https://nxaljnjgieyfhlmlwyms.supabase.co`

## ✅ Una Vez Solucionado

Cuando la conexión funcione:

1. **Aplicar migraciones**: `npx prisma db push`
2. **Poblar datos**: `npm run db:seed`
3. **Verificar sistema**: https://creditwithrami.com/admin
4. **Probar funcionalidad**: Crear una cita de prueba

## 🆘 Si Necesitas Ayuda

1. **Verifica el estado** del proyecto en Supabase
2. **Confirma la contraseña** en Settings > Database
3. **Obtén la URL** desde el dashboard
4. **Considera usar** Railway o Neon como alternativa
