#!/bin/bash

# Script de inicialización rápida para Library System
# Uso: ./init.sh

set -e

echo "📚 Library System - Inicialización Rápida"
echo "=========================================="
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Verificar requisitos
print_step "Verificando requisitos..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    exit 1
fi
print_success "Node.js v$(node -v)"

if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn no está instalado"
    exit 1
fi
print_success "Yarn v$(yarn -v)"

echo ""

# Crear archivo .env si no existe
if [ ! -f ".env" ]; then
    print_step "Creando archivo .env..."
    cp .env.example .env
    print_success "Archivo .env creado"
    
    # Generar JWT_SECRET aleatorio
    if command -v openssl &> /dev/null; then
        JWT_SECRET=$(openssl rand -base64 32)
        sed -i "s/your-secret-key-change-in-production/$JWT_SECRET/" .env
        print_success "JWT_SECRET generado automáticamente"
    elif command -v node &> /dev/null; then
        JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
        sed -i "s/your-secret-key-change-in-production/$JWT_SECRET/" .env
        print_success "JWT_SECRET generado automáticamente"
    fi
else
    print_warning ".env ya existe, saltando..."
fi

echo ""

# Instalar dependencias
print_step "Instalando dependencias..."
yarn install
print_success "Dependencias instaladas"

echo ""

# Build del proyecto
print_step "Compilando proyecto..."
yarn build
print_success "Proyecto compilado"

echo ""

# Mostrar próximos pasos
echo -e "${GREEN}=========================================="
echo "✓ ¡Inicialización completada!"
echo -e "===========================================${NC}"
echo ""
echo "Próximos pasos:"
echo ""
echo "1️⃣  ${BLUE}Desarrollo Local (sin Docker):${NC}"
echo "   Terminal 1: yarn workspace api dev"
echo "   Terminal 2: yarn workspace web dev"
echo "   Frontend:   http://localhost:5173"
echo "   API:        http://localhost:3000"
echo ""
echo "2️⃣  ${BLUE}Con Docker Compose:${NC}"
echo "   docker-compose up -d"
echo "   Frontend:   http://localhost:4173"
echo "   API:        http://localhost:3000"
echo ""
echo "3️⃣  ${BLUE}Ver Componentes en Storybook:${NC}"
echo "   yarn workspace web storybook"
echo "   Storybook:  http://localhost:6006"
echo ""
echo "4️⃣  ${BLUE}Ejecutar Tests:${NC}"
echo "   yarn test"
echo ""
echo "📖 Para más información:"
echo "   - README.md           (Visión general)"
echo "   - FRONTEND_GUIDE.md   (Desarrollo del frontend)"
echo "   - DEPLOYMENT.md       (Despliegue en servidor)"
echo ""
