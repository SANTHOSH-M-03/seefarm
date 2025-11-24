#!/bin/bash
# Installation Script for Mr.Sea Farm Admin Features
# Run this script to install all dependencies

echo "🚀 Installing Mr.Sea Farm Admin Features..."
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"
echo "✅ NPM detected: $(npm --version)"
echo ""

# Step 1: Install Firebase packages
echo "📦 Installing Firebase packages..."
npm install firebase react-firebase-hooks

if [ $? -ne 0 ]; then
    echo "❌ Firebase installation failed"
    exit 1
fi
echo "✅ Firebase packages installed"
echo ""

# Step 2: Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "⚠️  Please fill in your Firebase and Cloudinary credentials in .env"
    echo ""
fi

# Step 3: Display next steps
echo "================================================"
echo "✅ Installation Complete!"
echo "================================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  Configure Environment Variables:"
echo "   - Open .env file"
echo "   - Add your Firebase credentials"
echo "   - Add your Cloudinary credentials"
echo ""
echo "2️⃣  Setup Firebase:"
echo "   - Go to https://console.firebase.google.com/"
echo "   - Create project named 'MrSeaFarm'"
echo "   - Enable Google Authentication"
echo "   - Create Realtime Database"
echo "   - Copy credentials to .env"
echo ""
echo "3️⃣  Setup Cloudinary:"
echo "   - Go to https://cloudinary.com/"
echo "   - Get Cloud Name"
echo "   - Create Upload Preset"
echo "   - Add to .env"
echo ""
echo "4️⃣  Update Firebase Rules:"
echo "   - Copy content from FIREBASE_RULES.json"
echo "   - Paste in Firebase Console > Database > Rules"
echo "   - Publish rules"
echo ""
echo "5️⃣  Start Development Server:"
echo "   npm run dev"
echo ""
echo "6️⃣  Access Admin Panel:"
echo "   http://localhost:5173/admin/auth"
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: QUICK_START.md"
echo "   - Full Setup: ADMIN_SETUP.md"
echo "   - Features: ADMIN_FEATURES.md"
echo "   - Complete Guide: COMPLETE_FEATURES.md"
echo ""
echo "================================================"
echo "🎉 Ready to build your admin panel!"
echo "================================================"
