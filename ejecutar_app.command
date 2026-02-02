#!/bin/bash

# Script para ejecutar Grade Pilot en macOS
cd "$(dirname "$0")"

echo "============================================================"
echo "                 Iniciando Grade Pilot"
echo "============================================================"
echo

# Verificar si Docker está instalado
if ! command -v docker >/dev/null 2>&1; then
    echo "[ERROR] Docker no parece estar instalado."
    echo "Por favor, ejecuta primero 'instalar_docker.command' o instálalo manualmente."
    read -p "Presiona Enter para salir..."
    exit 1
fi

echo "[+] Levantando contenedores de Docker..."
docker compose up --build -d

if [ $? -ne 0 ]; then
    echo
    echo "[ERROR] Hubo un problema al iniciar los contenedores."
    echo "Asegúrate de que Docker Desktop esté abierto y funcionando."
    read -p "Presiona Enter para salir..."
    exit 1
fi

echo "============================================================"
echo "      APLICACIÓN LISTA"
echo "============================================================"
echo
echo "Puedes acceder en: http://localhost:8080"
echo

# Abrir el navegador automáticamente
open http://localhost:8080

echo "Para detener la aplicación, ejecuta 'docker compose down' en una terminal."
echo "============================================================"
read -p "Presiona Enter para cerrar esta ventana..."
