@echo off
SETLOCAL EnableDelayedExpansion

echo.
echo ============================================================
echo           Instalador de Docker Desktop para Windows
echo ============================================================
echo.

:: Verificar si ya esta instalado
docker --version >nul 2>&1
if %errorlevel% eq 0 (
    echo [+] Docker ya parece estar instalado en este sistema.
    docker --version
    echo.
    echo No es necesario volver a instalarlo.
    pause
    exit /b
)

echo Este script intentara instalar Docker Desktop automaticamente.
echo Se requieren permisos de Administrador para la instalacion.
echo.

:: Intentar con winget (metodo preferido en Windows 10/11)
where winget >nul 2>&1
if %errorlevel% eq 0 (
    echo [+] winget detectado. Iniciando instalacion de Docker...
    winget install Docker.DockerDesktop --accept-package-agreements --accept-source-agreements
    if %errorlevel% eq 0 (
        goto :SUCCESS
    ) else (
        echo [-] Error al instalar con winget. Intentando descarga directa...
    )
)

:: Metodo alternativo: Descarga directa con curl
echo [+] Descargando instalador oficial de Docker Desktop...
set "DOCKER_URL=https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe"
set "INSTALLER_PATH=%TEMP%\DockerDesktopInstaller.exe"

curl -L "%DOCKER_URL%" -o "%INSTALLER_PATH%"

if %errorlevel% neq 0 (
    echo [ERROR] No se pudo descargar el instalador. 
    echo Por favor, descargalo manualmente desde: https://www.docker.com/products/docker-desktop/
    pause
    exit /b
)

echo [+] Descarga completada. Iniciando instalador...
echo.
echo [!] Por favor, sigue las instrucciones en la ventana que se abrira.
echo [!] Es posible que el sistema se reinicie al terminar.
echo.

start /wait "" "%INSTALLER_PATH%"

:SUCCESS
echo.
echo ============================================================
echo        PROCESO DE INSTALACION INICIADO/COMPLETADO
echo ============================================================
echo.
echo Si la instalacion fue exitosa, es posible que necesites 
echo REINICIAR el sistema antes de poder usar Docker.
echo.
echo Despues de reiniciar, podras usar 'ejecutar_app.bat'.
echo ============================================================
echo.
pause
