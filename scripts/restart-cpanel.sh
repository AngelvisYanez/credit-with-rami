#!/bin/bash

# Script para reiniciar la aplicación en cPanel

echo "=== Reiniciando Credit With Rami ==="

# Reiniciar aplicación con PM2
pm2 restart credit-with-rami

echo "=== Aplicación reiniciada correctamente ==="
echo "Para ver los logs: pm2 logs credit-with-rami"
echo "Para ver el estado: pm2 status"
