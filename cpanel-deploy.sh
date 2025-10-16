#!/bin/bash

# Script completo de despliegue para cPanel
# Este script prepara todo el proyecto para subir a cPanel

echo "=== Preparando proyecto para cPanel ==="

# Crear directorio de despliegue
DEPLOY_DIR="credit-with-rami-cpanel"
rm -rf $DEPLOY_DIR
mkdir $DEPLOY_DIR

echo "Copiando archivos del proyecto..."

# Copiar archivos esenciales
cp -r src $DEPLOY_DIR/
cp -r public $DEPLOY_DIR/
cp package.json $DEPLOY_DIR/
cp package-lock.json $DEPLOY_DIR/
cp next.config.js $DEPLOY_DIR/
cp tailwind.config.js $DEPLOY_DIR/
cp postcss.config.js $DEPLOY_DIR/
cp tsconfig.json $DEPLOY_DIR/
cp ecosystem.config.js $DEPLOY_DIR/

# Copiar scripts de cPanel
cp start-cpanel.sh $DEPLOY_DIR/
cp stop-cpanel.sh $DEPLOY_DIR/
cp restart-cpanel.sh $DEPLOY_DIR/

# Crear archivo .env para producción
cat > $DEPLOY_DIR/.env.production << EOF
NODE_ENV=production
PORT=3000
EOF

# Crear archivo .htaccess para redirección
cat > $DEPLOY_DIR/.htaccess << EOF
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
EOF

# Crear archivo de instrucciones
cat > $DEPLOY_DIR/INSTRUCCIONES_CPANEL.md << 'EOF'
# Instrucciones de Despliegue en cPanel

## Requisitos Previos
1. Acceso SSH a tu servidor cPanel
2. Node.js instalado (versión 18 o superior)
3. npm instalado
4. PM2 instalado globalmente

## Pasos de Despliegue

### 1. Subir archivos
- Sube todos los archivos del directorio `credit-with-rami-cpanel` a tu directorio web en cPanel
- Asegúrate de que todos los archivos se suban correctamente

### 2. Conectar por SSH
```bash
ssh tu_usuario@tu_servidor.com
cd /home/tu_usuario/public_html
```

### 3. Instalar dependencias
```bash
npm install --production
```

### 4. Crear build de producción
```bash
npm run build
```

### 5. Instalar PM2 (si no está instalado)
```bash
npm install -g pm2
```

### 6. Iniciar la aplicación
```bash
chmod +x start-cpanel.sh
./start-cpanel.sh
```

### 7. Configurar dominio (opcional)
Si quieres usar un dominio específico, edita el archivo `.htaccess` y cambia la URL de redirección.

## Comandos Útiles

### Ver estado de la aplicación
```bash
pm2 status
```

### Ver logs
```bash
pm2 logs credit-with-rami
```

### Reiniciar aplicación
```bash
./restart-cpanel.sh
```

### Detener aplicación
```bash
./stop-cpanel.sh
```

### Iniciar aplicación
```bash
./start-cpanel.sh
```

## Solución de Problemas

### Si la aplicación no inicia
1. Verifica que Node.js esté instalado: `node --version`
2. Verifica que npm esté instalado: `npm --version`
3. Revisa los logs: `pm2 logs credit-with-rami`

### Si hay errores de permisos
```bash
chmod +x *.sh
```

### Si el puerto está ocupado
Cambia el puerto en `ecosystem.config.js` y en `.env.production`

## Notas Importantes
- La aplicación se ejecutará en el puerto 3000 por defecto
- Los logs se guardan en el directorio `logs/`
- PM2 reiniciará automáticamente la aplicación si se cae
- Asegúrate de que el firewall permita conexiones al puerto 3000
EOF

# Crear archivo .gitignore para el despliegue
cat > $DEPLOY_DIR/.gitignore << EOF
node_modules/
.next/
logs/
*.log
.env.local
.env.development.local
.env.test.local
.env.production.local
EOF

# Crear directorio de logs
mkdir $DEPLOY_DIR/logs

echo "=== Proyecto preparado para cPanel ==="
echo "Directorio de despliegue: $DEPLOY_DIR"
echo "Archivos listos para subir a cPanel"
echo ""
echo "Próximos pasos:"
echo "1. Comprimir el directorio $DEPLOY_DIR"
echo "2. Subir a cPanel"
echo "3. Extraer en el directorio web"
echo "4. Seguir las instrucciones en INSTRUCCIONES_CPANEL.md"
