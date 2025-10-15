# 🚀 Instrucciones para Subir a cPanel Hosting

## 📦 Archivos Incluidos

### 1. **credit-with-rami-cpanel.zip** (530 MB)
- **Uso:** Para hosting de cPanel estático
- **Contenido:** Solo archivos estáticos HTML, CSS, JS
- **Tamaño:** Optimizado para subida rápida

### 2. **credit-with-rami-complete.zip** (1.2 GB)
- **Uso:** Para desarrollo o hosting con Node.js
- **Contenido:** Proyecto completo con dependencias
- **Tamaño:** Incluye node_modules

## 🌐 Instrucciones para cPanel

### Paso 1: Acceder a cPanel
1. Inicia sesión en tu panel de control de hosting
2. Busca la sección **"Administrador de archivos"** o **"File Manager"**

### Paso 2: Subir Archivos
1. Navega a la carpeta **`public_html`** (o la carpeta raíz de tu dominio)
2. **IMPORTANTE:** Si ya tienes archivos, haz una copia de seguridad primero
3. Sube el archivo **`credit-with-rami-cpanel.zip`**
4. Extrae el contenido del ZIP directamente en `public_html`

### Paso 3: Estructura de Archivos
Después de extraer, deberías tener esta estructura:
```
public_html/
├── index.html          (Página principal)
├── 404.html           (Página de error)
├── admin/             (Panel de administración)
├── application/       (Página de aplicación)
├── test/              (Página de prueba)
├── images/            (Imágenes del sitio)
├── _next/             (Archivos de Next.js)
├── cwr-logo-1.png     (Logo)
├── cwr-logo-2.png     (Logo alternativo)
├── favicon.png        (Icono del sitio)
└── rami-video.mp4     (Video de Rami)
```

### Paso 4: Configurar Dominio
1. Asegúrate de que tu dominio apunte a la carpeta `public_html`
2. El archivo `index.html` será la página principal

## 🔧 Configuraciones Adicionales

### Configurar .htaccess (Opcional)
Si tu hosting lo permite, crea un archivo `.htaccess` en `public_html`:

```apache
# Habilitar compresión
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache para archivos estáticos
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Redirección para SPA
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

## 📱 Páginas Disponibles

- **Página Principal:** `https://tudominio.com/`
- **Aplicación:** `https://tudominio.com/application/`
- **Admin:** `https://tudominio.com/admin/`
- **Test:** `https://tudominio.com/test/`

## ⚠️ Notas Importantes

1. **Sin Funcionalidad de Backend:** Este build estático no incluye las rutas de API
2. **Formularios:** Los formularios no funcionarán sin un backend
3. **Videos:** El video de Rami está incluido pero puede ser pesado para cargar
4. **Responsive:** El sitio es completamente responsive

## 🆘 Solución de Problemas

### Error 404 en páginas internas
- Verifica que el archivo `.htaccess` esté configurado correctamente
- Asegúrate de que mod_rewrite esté habilitado en tu hosting

### Imágenes no cargan
- Verifica que la carpeta `images/` esté en la ubicación correcta
- Comprueba los permisos de archivos (644 para archivos, 755 para carpetas)

### Video no reproduce
- El archivo `rami-video.mp4` es grande (526 MB)
- Considera comprimirlo o usar un servicio de video externo

## 📞 Soporte

Si tienes problemas con la instalación:
1. Verifica que tu hosting soporte archivos estáticos
2. Comprueba los permisos de archivos
3. Revisa los logs de error de tu hosting

---
**Generado:** $(Get-Date)
**Versión:** 1.0
**Tipo:** Build Estático para cPanel
