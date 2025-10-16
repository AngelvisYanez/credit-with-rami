# 🗄️ Información de Backup de Base de Datos

## 📊 Estado de la Base de Datos

**Fecha de Backup**: 16 de Octubre, 2025 - 18:35
**Proveedor**: Neon PostgreSQL
**Estado**: ✅ Activa y funcionando

## 🔗 Información de Conexión

### **URL de Conexión:**
```
postgresql://neondb_owner:npg_r3AVs8EWcdbU@ep-tiny-bush-adzpt774-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### **Detalles de Conexión:**
- **Host**: ep-tiny-bush-adzpt774-pooler.c-2.us-east-1.aws.neon.tech
- **Puerto**: 5432
- **Usuario**: neondb_owner
- **Contraseña**: npg_r3AVs8EWcdbU
- **Base de Datos**: neondb
- **SSL**: Requerido

## 📋 Schema de la Base de Datos

### **Tabla: appointments**
```sql
CREATE TABLE appointments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  businessName TEXT NOT NULL,
  businessType TEXT,
  creditCards TEXT,
  establishedBusiness TEXT,
  strongCreditScore TEXT,
  cleanHistory TEXT,
  preferredDate TEXT,
  preferredTime TEXT,
  timezone TEXT,
  message TEXT,
  isEligible BOOLEAN DEFAULT false,
  eligibilityReason TEXT,
  status TEXT DEFAULT 'PENDING',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Tabla: admin_users**
```sql
CREATE TABLE admin_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Datos Iniciales

### **Usuario Administrador:**
- **ID**: Generado automáticamente
- **Username**: rami
- **Password**: rami123
- **Name**: Rami
- **Role**: admin

### **Appointments de Prueba:**
1. **John Doe** - john.doe@example.com - PENDING
2. **Jane Smith** - jane.smith@example.com - CONFIRMED
3. **Alice Johnson** - alice.j@example.com - COMPLETED
4. **Bob Williams** - bob.w@example.com - CANCELLED

## 🚀 Comandos de Restauración

### **Para restaurar en Vercel:**
```bash
# 1. Configurar variable de entorno
DATABASE_URL=postgresql://neondb_owner:npg_r3AVs8EWcdbU@ep-tiny-bush-adzpt774-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

# 2. Aplicar schema
npx prisma db push

# 3. Sembrar datos iniciales
npm run db:seed

# 4. Generar cliente
npx prisma generate
```

### **Para verificar conexión:**
```bash
# Probar conexión
npx prisma db pull

# Ver datos
npx prisma studio
```

## 📊 Estado de los Datos

### **Conteo de Registros:**
- **Appointments**: 4 registros de prueba
- **Admin Users**: 1 usuario (rami)
- **Estados**: PENDING, CONFIRMED, COMPLETED, CANCELLED

### **Integridad:**
- ✅ **Constraints**: Todos aplicados
- ✅ **Índices**: Optimizados
- ✅ **Relaciones**: Correctas
- ✅ **Validaciones**: Implementadas

## 🔄 Migración a Vercel

### **Pasos Requeridos:**
1. **Configurar** variable DATABASE_URL en Vercel
2. **Aplicar** schema con `prisma db push`
3. **Sembrar** datos con `npm run db:seed`
4. **Verificar** conexión con `/api/test-db`
5. **Probar** funcionalidades completas

### **Consideraciones:**
- ✅ **Misma base de datos** - No se pierden datos
- ✅ **Mismo schema** - Compatibilidad garantizada
- ✅ **Mismas credenciales** - Acceso directo
- ✅ **Misma funcionalidad** - Sin cambios

## 🎯 Conclusión

**La base de datos está lista para migración a Vercel sin pérdida de datos.**

**Todos los datos y configuraciones están preservados y listos para ser utilizados en el nuevo deploy.**
