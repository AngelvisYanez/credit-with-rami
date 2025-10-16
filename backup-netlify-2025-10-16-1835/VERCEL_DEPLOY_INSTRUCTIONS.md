# 🚀 Instrucciones de Deploy en Vercel

## 📋 Preparación

### **1. Crear Proyecto en Vercel**
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta
3. Haz clic en "New Project"
4. Conecta tu repositorio de GitHub
5. Selecciona el repositorio `credit-with-rami`

### **2. Configurar Variables de Entorno**
En el dashboard de Vercel, ve a Settings > Environment Variables y agrega:

```
DATABASE_URL=postgresql://neondb_owner:npg_r3AVs8EWcdbU@ep-tiny-bush-adzpt774-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**Importante**: Marca esta variable para todos los entornos (Production, Preview, Development)

## 🔧 Configuración del Proyecto

### **Build Settings:**
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### **Root Directory:**
- Deja vacío (raíz del proyecto)

## 🗄️ Configuración de Base de Datos

### **1. Aplicar Schema:**
```bash
# En el directorio del proyecto
npx prisma db push
```

### **2. Sembrar Datos:**
```bash
npm run db:seed
```

### **3. Generar Cliente:**
```bash
npx prisma generate
```

## 🚀 Deploy

### **1. Deploy Automático:**
- Vercel detectará automáticamente que es un proyecto Next.js
- El deploy se iniciará automáticamente después de configurar las variables de entorno

### **2. Deploy Manual:**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 🧪 Verificación Post-Deploy

### **1. Probar URLs:**
- **Landing**: `https://tu-proyecto.vercel.app`
- **Aplicación**: `https://tu-proyecto.vercel.app/application`
- **Admin**: `https://tu-proyecto.vercel.app/admin`

### **2. Probar Base de Datos:**
- Ve a `https://tu-proyecto.vercel.app/api/test-db`
- Debe mostrar conexión exitosa

### **3. Probar Funcionalidades:**
- **Crear cita** desde la página de aplicación
- **Iniciar sesión** en admin (rami / rami123)
- **Gestionar citas** en el dashboard

## 🔐 Credenciales

### **Panel de Administración:**
- **Usuario**: `rami`
- **Contraseña**: `rami123`

### **Base de Datos:**
- **URL**: `postgresql://neondb_owner:npg_r3AVs8EWcdbU@ep-tiny-bush-adzpt774-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require`

## 🌐 Configuración de Dominio

### **1. Dominio Personalizado:**
1. Ve a Settings > Domains
2. Agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones de Vercel

### **2. SSL:**
- Vercel maneja automáticamente los certificados SSL
- HTTPS estará disponible inmediatamente

## 📊 Monitoreo

### **1. Analytics:**
- Vercel Analytics está disponible en el dashboard
- Monitorea performance y errores

### **2. Logs:**
- Ve a Functions > Logs para ver logs de las API routes
- Útil para debugging

## 🔄 Diferencias con Netlify

### **Ventajas de Vercel:**
- ✅ **Mejor integración** con Next.js
- ✅ **Edge Functions** más rápidas
- ✅ **Analytics** integrado
- ✅ **Preview deployments** automáticos
- ✅ **Mejor performance** para Next.js

### **Consideraciones:**
- ⚠️ **Variables de entorno** deben configurarse manualmente
- ⚠️ **Base de datos** debe reconfigurarse
- ⚠️ **Dominio** debe reconfigurarse

## 🎯 Checklist de Migración

- [ ] Crear proyecto en Vercel
- [ ] Configurar variables de entorno
- [ ] Conectar repositorio
- [ ] Hacer deploy inicial
- [ ] Configurar base de datos
- [ ] Sembrar datos iniciales
- [ ] Probar funcionalidades
- [ ] Configurar dominio personalizado
- [ ] Verificar SSL
- [ ] Probar sistema completo

## 📞 Soporte

### **Documentación:**
- [Vercel Docs](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)

### **Comandos Útiles:**
```bash
# Ver logs
vercel logs

# Ver deployments
vercel ls

# Rollback
vercel rollback

# Inspect
vercel inspect
```

## 🎉 Resultado Esperado

**Después de completar la migración:**
- ✅ Sistema funcionando en Vercel
- ✅ Base de datos conectada
- ✅ Todas las funcionalidades operativas
- ✅ Performance optimizado
- ✅ SSL configurado
- ✅ Dominio personalizado (opcional)

**¡El sistema estará listo para producción en Vercel!**
