# Configuración de Variables de Entorno para Vercel

## Variables de Entorno Necesarias en Vercel

Para que la aplicación funcione correctamente en Vercel, necesitas configurar las siguientes variables de entorno en el dashboard de Vercel:

### 1. Acceder a Vercel Dashboard
1. Ve a [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto "credit-with-rami"
3. Ve a Settings > Environment Variables

### 2. Configurar Variables de Entorno

#### DATABASE_URL (Requerida)
```
DATABASE_URL=postgresql://neondb_owner:npg_r3AVs8EWcdbU@ep-tiny-bush-adzpt774-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

#### NODE_ENV (Opcional)
```
NODE_ENV=production
```

#### NEXT_PUBLIC_APP_URL (Opcional)
```
NEXT_PUBLIC_APP_URL=https://credit-with-rami.vercel.app
```

### 3. Pasos para Configurar

1. **Agregar Variable DATABASE_URL:**
   - Name: `DATABASE_URL`
   - Value: `postgresql://neondb_owner:npg_r3AVs8EWcdbU@ep-tiny-bush-adzpt774-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
   - Environment: `Production`, `Preview`, `Development`

2. **Hacer Redeploy:**
   - Después de agregar las variables, ve a Deployments
   - Haz clic en "Redeploy" en el último deployment

### 4. Verificar Configuración

Una vez configurado, puedes verificar que todo funcione:

1. **Test de Base de Datos:**
   - Ve a: `https://credit-with-rami.vercel.app/api/test-db`
   - Debería mostrar información de la base de datos

2. **Test de Login:**
   - Ve a: `https://credit-with-rami.vercel.app/admin`
   - Usuario: `rami`
   - Contraseña: `rami123`

### 5. Troubleshooting

Si el login sigue fallando:

1. **Verificar Variables de Entorno:**
   - Asegúrate de que `DATABASE_URL` esté configurada correctamente
   - Verifica que no haya espacios extra en la URL

2. **Verificar Logs de Vercel:**
   - Ve a Functions > View Function Logs
   - Busca errores relacionados con la base de datos

3. **Verificar Conexión a Neon:**
   - Ve a [https://console.neon.tech](https://console.neon.tech)
   - Verifica que la base de datos esté activa

### 6. Comandos Útiles

```bash
# Verificar estado de la base de datos localmente
npx prisma migrate status

# Generar cliente de Prisma
npx prisma generate

# Verificar conexión
npx prisma db push
```
