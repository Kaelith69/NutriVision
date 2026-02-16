#!/bin/bash

# Deploy to Surge.sh (Free Static Hosting)

echo "🚀 Preparing to deploy to Surge.sh..."

# 1. Build project
echo "🏗️ Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting."
    exit 1
fi

# 2. Deploy
echo "🌐 Uploading to Surge..."
echo "NOTE: If this is your first time, you will be asked to create an account (email/password)."
echo "Press ENTER to continue..."
read

# Generate a unique domain to avoid "Permission Denied" errors
# Uses timestamp to ensure uniqueness
TIMESTAMP=$(date +%s)
DOMAIN="nutrivision-${TIMESTAMP}.surge.sh"

echo "Using unique domain: ${DOMAIN}"

# Use npx to run surge with the custom domain
npx surge ./dist --domain ${DOMAIN}

echo "✅ Deployment Process Complete!"
