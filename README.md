# Credit with Rami

Una aplicación web moderna para servicios de financiamiento empresarial y construcción de crédito, desarrollada con Next.js 14, TypeScript y Prisma.

## 🚀 Características

- **Panel de administración** con funcionalidad drag & drop para gestión de citas
- **Formulario de aplicación** optimizado para conversión
- **Sistema de autenticación** para administradores
- **Base de datos** con Prisma ORM y PostgreSQL
- **Diseño responsivo** con Tailwind CSS
- **Optimizado para producción** con configuraciones de memoria baja

## 📁 Estructura del Proyecto

```
credit-with-rami/
├── src/                    # Código fuente principal
│   ├── app/               # Páginas y API routes (App Router)
│   ├── components/        # Componentes React reutilizables
│   └── lib/              # Utilidades y configuración de base de datos
├── scripts/              # Scripts de despliegue y utilidades
├── docs/                 # Documentación del proyecto
├── backup/               # Backups y versiones anteriores
├── prisma/               # Esquema y migraciones de base de datos
├── public/               # Archivos estáticos
└── server.js             # Servidor Express para producción
```

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes, Express.js
- **Base de datos**: PostgreSQL con Prisma ORM
- **Autenticación**: Sistema personalizado
- **UI Components**: Lucide React, @dnd-kit

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd credit-with-rami
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env.local
   # Editar .env.local con tus configuraciones
   ```

4. **Configurar la base de datos**
   ```bash
   npm run db:push
   npm run db:seed
   ```

## 🚀 Desarrollo

```bash
# Desarrollo local
npm run dev:local

# Desarrollo con información de red
npm run dev

# Verificación de tipos
npm run type-check

# Linting
npm run lint

# Build de producción
npm run build
```

## 📊 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con información de red
- `npm run dev:local` - Servidor de desarrollo local
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run type-check` - Verificación de tipos TypeScript
- `npm run lint` - Linting con ESLint
- `npm run db:generate` - Generar cliente Prisma
- `npm run db:push` - Sincronizar esquema con base de datos
- `npm run db:migrate` - Ejecutar migraciones
- `npm run db:seed` - Poblar base de datos con datos iniciales

## 🗂️ Organización de Archivos

### `/scripts/`
Contiene todos los scripts de despliegue, configuración y utilidades:
- Scripts de build para diferentes entornos
- Scripts de despliegue para cPanel, Netlify, etc.
- Configuraciones de servidor alternativas
- Scripts de utilidades y testing

### `/docs/`
Documentación completa del proyecto:
- Instrucciones de despliegue
- Guías de configuración
- Documentación de soluciones a problemas
- Guías de setup para diferentes plataformas

### `/backup/`
Backups y versiones anteriores del proyecto:
- Versiones de despliegue anteriores
- Configuraciones alternativas
- Archivos de respaldo

## 🔧 Configuración

### Variables de Entorno

```env
# Base de datos
DATABASE_URL="postgresql://..."

# Autenticación
ADMIN_USERNAME="rami"
ADMIN_PASSWORD="..."

# Configuración de servidor
PORT=3000
NODE_ENV=production
```

### Base de Datos

El proyecto usa Prisma como ORM. El esquema se encuentra en `prisma/schema.prisma`.

```bash
# Generar cliente Prisma
npm run db:generate

# Aplicar cambios al esquema
npm run db:push

# Crear y aplicar migración
npm run db:migrate
```

## 🚀 Despliegue

### Netlify
```bash
npm run build
# Desplegar carpeta .next
```

### Vercel
```bash
# Conectar repositorio a Vercel
# Configurar variables de entorno
# Deploy automático
```

### cPanel
```bash
# Usar scripts en /scripts/ para despliegue
npm run build
# Subir archivos según instrucciones en /docs/
```

## 📝 Notas de Desarrollo

- El proyecto está optimizado para servidores con poca memoria
- Se eliminaron dependencias no utilizadas (react-player, @netlify/edge-functions-bootstrap)
- Se corrigieron todos los errores de TypeScript y ESLint
- La estructura está organizada para facilitar el mantenimiento

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es privado y confidencial.
