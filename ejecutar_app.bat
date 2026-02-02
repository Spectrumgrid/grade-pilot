@echo off
SETLOCAL EnableDelayedExpansion

echo.
echo ============================================================
echo                  Iniciando Grade Pilot
echo ============================================================
echo.

:: Verificar si Docker esta instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker no parece estar instalado o no esta en el PATH.
    echo Por favor, instala Docker Desktop primero: https://www.docker.com/products/docker-desktop/
    pause
    exit /b
)

:: Verificar si el archivo docker-compose.yml existe
if not exist "docker-compose.yml" (
    echo [ERROR] No se encontro docker-compose.yml en el directorio actual.
    echo Asegurate de ejecutar este script desde la carpeta de Grade Pilot.
    pause
    exit /b
)

echo [+] Levantando contenedores de Docker...
echo [+] Esto puede tardar unos minutos la primera vez...
docker compose up --build -d

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Hubo un problema al iniciar los contenedores.
    echo Revisa si Docker Desktop se esta ejecutando.
    pause
    exit /b
)

echo.
echo ============================================================
echo      APLICACION LISTA
echo ============================================================
echo.
echo Puedes acceder a la aplicacion en:
echo - Frontend: http://localhost:8080
echo - Backend: http://localhost:8000/docs
echo.
echo Para detener la aplicacion, cierra esta ventana y ejecuta 'docker compose down' en una terminal.
echo ============================================================
echo.

:: Abrir el navegador automaticamente
start http://localhost:8080

pause
