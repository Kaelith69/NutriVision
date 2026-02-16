#!/bin/bash

# Deployment Script for NutriVision

echo "🚀 Starting Deployment Sequence..."

# 1. Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# 2. Install dependencies (if needed, skipping for speed in this script usually)
# echo "📦 Checking dependencies..."
# npm install

# 3. Type Check
echo "🛡️ Running Type Safety Checks..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
    echo "❌ Type check failed. Aborting deployment."
    exit 1
fi

# 4. Build
echo "🏗️ Building for Production..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting deployment."
    exit 1
fi

echo "✅ Build Successful!"

# 5. Host (Preview)
echo "🌐 Hosting Production Build locally..."
echo "   Access the app at the URL below."
echo "   (Press Ctrl+C to stop hosting)"
echo ""

npm run preview -- --host
