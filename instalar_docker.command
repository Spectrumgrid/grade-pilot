#!/bin/bash

# Script para instalar Docker Desktop en macOS
echo "============================================================"
echo "          Instalador de Docker Desktop para macOS"
echo "============================================================"
echo

# Verificar si Docker ya está instalado
if command -v docker >/dev/null 2>&1; then
    echo "[+] Docker ya parece estar instalado en este sistema."
    docker --version
    echo
    read -p "Presiona Enter para salir..."
    exit 0
fi

echo "Este script descargará e iniciará el instalador de Docker Desktop."
echo

# Detectar arquitectura (Intel o Apple Silicon)
ARCH=$(uname -m)
if [ "$ARCH" == "arm64" ]; then
    echo "[+] Detectado Apple Silicon (M1/M2/M3)"
    DOCKER_URL="https://desktop.docker.com/mac/main/arm64/Docker.dmg"
else
    echo "[+] Detectado Intel Mac"
    DOCKER_URL="https://desktop.docker.com/mac/main/amd64/Docker.dmg"
fi

TEMP_DMG="/tmp/Docker.dmg"

echo "[+] Descargando Docker Desktop..."
curl -L "$DOCKER_URL" -o "$TEMP_DMG"

echo "[+] Montando instalador..."
hdiutil attach "$TEMP_DMG"

echo "[+] Por favor, arrastra Docker a la carpeta Applications en la ventana que se ha abierto."
echo "[!] Una vez copiado, abre Docker desde tu Launchpad para completar la configuración."
echo

open /Volumes/Docker*

echo "============================================================"
echo "       SIGUE LAS INSTRUCCIONES EN PANTALLA"
echo "============================================================"
read -p "Cuando hayas arrastrado Docker a Aplicaciones y lo hayas abierto, presiona Enter para terminar..."

# Limpieza básica
hdiutil detach /Volumes/Docker*
rm "$TEMP_DMG"

echo "[+] Proceso completado. Una vez que Docker aparezca como 'Running' en tu barra de menús, podrás usar 'ejecutar_app.command'."
