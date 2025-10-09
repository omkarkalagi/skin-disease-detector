# 🚀 Deploy to Vercel Script

# This script helps deploy your SkinSight AI application to Vercel

#!/bin/bash

echo "🚀 Starting deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
fi

# Check if user is logged in to Vercel
echo "🔐 Checking Vercel authentication..."
vercel whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Please login to Vercel first:"
    echo "   vercel login"
    exit 1
fi

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🎉 Your SkinSight AI application is now live!"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Set up your custom domain (optional)"
    echo "   2. Configure environment variables in Vercel dashboard"
    echo "   3. Set up monitoring and analytics"
    echo "   4. Test all features on mobile devices"
else
    echo "❌ Deployment failed. Please check the logs above."
    exit 1
fi
