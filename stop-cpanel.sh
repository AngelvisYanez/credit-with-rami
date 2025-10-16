#!/bin/bash

# Script para detener la aplicación en cPanel

echo "=== Deteniendo Credit With Rami ==="

# Detener aplicación con PM2
pm2 stop credit-with-rami

# Eliminar aplicación de PM2
pm2 delete credit-with-rami

echo "=== Aplicación detenida correctamente ==="
