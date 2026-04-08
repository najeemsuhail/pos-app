#!/bin/bash
# Quick setup script for Windows/Linux/Mac

echo "🚀 Restaurant POS System - Setup Script"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node --version)${NC}"
echo -e "${GREEN}✓ npm $(npm --version)${NC}"

# Setup Backend
echo -e "\n${YELLOW}Setting up Backend...${NC}"
cd backend

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit backend/.env with your database credentials${NC}"
fi

echo "Installing backend dependencies..."
npm install

echo -e "${GREEN}✓ Backend setup complete${NC}"

# Setup Frontend
echo -e "\n${YELLOW}Setting up Frontend...${NC}"
cd ../frontend

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo "Installing frontend dependencies..."
npm install

echo -e "${GREEN}✓ Frontend setup complete${NC}"

# Return to root
cd ..

echo -e "\n${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Setup PostgreSQL database:"
echo "   createdb pos_db"
echo "   psql -U postgres -d pos_db -f database/schema.sql"
echo "   psql -U postgres -d pos_db -f database/seed.sql"
echo ""
echo "2. Start backend (in terminal 1):"
echo "   cd backend && npm run dev"
echo ""
echo "3. Start frontend (in terminal 2):"
echo "   cd frontend && npm start"
echo ""
echo "4. Open http://localhost:3000 and login with:"
echo "   Username: admin"
echo "   Password: password"
echo ""
echo -e "${GREEN}Happy billing! 💰${NC}"
