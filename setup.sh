#!/bin/bash

# BlogForge Setup Script
# This script helps you set up BlogForge for local development

set -e

echo "🔥 Welcome to BlogForge Setup! 🔥"
echo ""
echo "This script will help you set up BlogForge for local development."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Check if .env file exists
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env file and add your configuration:"
    echo "   - Database URL (PostgreSQL)"
    echo "   - NextAuth Secret (run: openssl rand -base64 32)"
    echo "   - Google OAuth credentials (optional)"
    echo "   - Resend API Key"
    echo "   - Cloudinary credentials"
    echo ""
    read -p "Press Enter when you've updated .env file..." 
else
    echo "✅ .env file already exists"
fi

# Generate Prisma Client
echo ""
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Ask if user wants to push database schema
echo ""
read -p "Do you want to push the database schema now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗄️  Pushing database schema..."
    npx prisma db push
    echo "✅ Database schema pushed!"
else
    echo "⏭️  Skipped database schema push. Run 'npx prisma db push' when ready."
fi

echo ""
echo "✅ Setup complete! 🎉"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser."
echo ""
echo "Happy coding! 🚀"