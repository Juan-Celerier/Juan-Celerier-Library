@echo off
REM Script de inicialización para Library System (Windows)
REM Uso: init.bat

setlocal enabledelayedexpansion

cls
echo.
echo 📚 Library System - Inicializacion Rapida
echo ===========================================
echo.

REM Verificar Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no esta instalado
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION%

REM Verificar Yarn
yarn -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Yarn no esta instalado
    exit /b 1
)
for /f "tokens=*" %%i in ('yarn -v') do set YARN_VERSION=%%i
echo [OK] Yarn %YARN_VERSION%

echo.

REM Crear .env si no existe
if not exist ".env" (
    echo [*] Creando archivo .env...
    copy .env.example .env >nul
    echo [OK] Archivo .env creado
    
    REM Generar JWT_SECRET usando Node.js
    for /f "tokens=*" %%i in ('node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"') do set JWT_SECRET=%%i
    
    REM Reemplazar el placeholder (Windows no tiene sed fácil, así que usamos PowerShell)
    powershell -Command "(Get-Content .env) -replace 'your-secret-key-change-in-production', '%JWT_SECRET%' | Set-Content .env"
    echo [OK] JWT_SECRET generado automaticamente
) else (
    echo [!] .env ya existe, saltando...
)

echo.

REM Instalar dependencias
echo [*] Instalando dependencias...
call yarn install
if errorlevel 1 (
    echo [ERROR] Fallo la instalacion de dependencias
    exit /b 1
)
echo [OK] Dependencias instaladas

echo.

REM Build
echo [*] Compilando proyecto...
call yarn build
if errorlevel 1 (
    echo [ERROR] Fallo la compilacion
    exit /b 1
)
echo [OK] Proyecto compilado

echo.

REM Mostrar instrucciones
echo [OK] ¡Inicializacion completada!
echo.
echo Proximos pasos:
echo.
echo 1 - Desarrollo Local (sin Docker):
echo    Terminal 1: yarn workspace api dev
echo    Terminal 2: yarn workspace web dev
echo    Frontend:   http://localhost:5173
echo    API:        http://localhost:3000
echo.
echo 2 - Con Docker Compose:
echo    docker-compose up -d
echo    Frontend:   http://localhost:4173
echo    API:        http://localhost:3000
echo.
echo 3 - Ver Componentes en Storybook:
echo    yarn workspace web storybook
echo    Storybook:  http://localhost:6006
echo.
echo 4 - Ejecutar Tests:
echo    yarn test
echo.
echo Para mas informacion:
echo   - README.md           (Vision general)
echo   - FRONTEND_GUIDE.md   (Desarrollo del frontend)
echo   - DEPLOYMENT.md       (Despliegue en servidor)
echo.
pause
