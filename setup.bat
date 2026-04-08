@echo off
REM Quick setup script for Windows
REM Restaurant POS System Setup

echo.
echo ===================================================
echo   Restaurant POS System - Setup Script (Windows)
echo ===================================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    exit /b 1
)

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo [OK] Node.js %NODE_VERSION%
echo [OK] npm %NPM_VERSION%

REM Setup Backend
echo.
echo === Setting up Backend ===
cd backend

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo [WARNING] Please edit backend\.env with your database credentials
)

echo Installing backend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    exit /b 1
)

echo [OK] Backend setup complete
cd ..

REM Setup Frontend
echo.
echo === Setting up Frontend ===
cd frontend

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)

echo Installing frontend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies
    exit /b 1
)

echo [OK] Frontend setup complete
cd ..

REM Success message
echo.
echo ===================================================
echo   Setup Complete!
echo ===================================================
echo.
echo Next steps:
echo.
echo 1. Setup PostgreSQL database:
echo    createdb pos_db
echo    psql -U postgres -d pos_db -f database/schema.sql
echo    psql -U postgres -d pos_db -f database/seed.sql
echo.
echo 2. Start backend (in terminal 1):
echo    cd backend
echo    npm run dev
echo.
echo 3. Start frontend (in terminal 2):
echo    cd frontend
echo    npm start
echo.
echo 4. Open http://localhost:3000 and login:
echo    Username: admin
echo    Password: password
echo.
echo Happy billing!
echo.
