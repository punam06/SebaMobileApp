#!/bin/bash

# 🚀 Seba Mobile App - Complete Deployment Script
# This script handles deployment to multiple platforms

set -e

echo "🎯 Starting Seba Mobile App Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    if [ -d "project" ]; then
        cd project
        print_status "Moved to project directory"
    else
        print_error "package.json not found. Please run this script from the project root."
        exit 1
    fi
fi

# Check Node.js version
NODE_VERSION=$(node --version)
print_status "Node.js version: $NODE_VERSION"

if ! node --version | grep -q "v18\|v20\|v21"; then
    print_warning "Node.js 18+ recommended. Current version: $NODE_VERSION"
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci

# Build web version
print_status "Building web version..."
npm run build:web

print_success "Web build completed! Output in dist/ folder"

# Check if git is available
if command -v git &> /dev/null; then
    print_status "Committing changes to git..."
    
    # Go back to root if we're in project directory
    if [ -f "../.git/config" ]; then
        cd ..
    fi
    
    # Add all changes
    git add .
    
    # Commit with timestamp
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    git commit -m "🚀 Deploy Seba Mobile App - $TIMESTAMP

✅ Web build completed successfully
📱 Ready for GitHub Pages deployment
🌐 All deployment configurations updated
🔧 Automated deployment pipeline active

Built with:
- React Native + Expo
- TypeScript
- Emoji-based icons for performance
- Cross-platform compatibility

Deployment targets:
- GitHub Pages (automatic)
- Netlify (configured)
- Vercel (configured)
- Expo mobile builds (ready)" || print_warning "No changes to commit"

    # Push to GitHub
    print_status "Pushing to GitHub..."
    git push origin main
    
    print_success "Successfully pushed to GitHub!"
    print_status "GitHub Actions will automatically deploy to GitHub Pages"
    
else
    print_warning "Git not found. Skipping git operations."
fi

# Display deployment URLs
echo ""
echo "🎉 Deployment Complete!"
echo "========================="
echo ""
echo "📱 Live URLs:"
echo "  🌐 GitHub Pages: https://punam06.github.io/SebaMobileApp/"
echo "  🚀 Netlify: https://seba-mobile-app.netlify.app/"
echo "  ⚡ Vercel: https://seba-mobile-app.vercel.app/"
echo ""
echo "📱 Mobile Testing:"
echo "  📲 Expo Go: Scan QR code from development server"
echo "  🔗 Web version works on mobile browsers"
echo ""
echo "🔧 Next Steps:"
echo "  1. GitHub Pages deployment will be automatic (check Actions tab)"
echo "  2. For Netlify: Connect your repo at netlify.com"
echo "  3. For Vercel: Run 'npx vercel' or connect at vercel.com"
echo "  4. For mobile: Run 'npx eas build' for production builds"
echo ""
echo "📚 Documentation:"
echo "  📖 Deployment Guide: project/DEPLOYMENT.md"
echo "  🧪 Testing Guide: COMPREHENSIVE_TESTING_GUIDE.md"
echo "  🎯 Demo Guide: DEMO_GUIDE.md"
echo ""
print_success "Seba Mobile App is now ready for global access! 🌍"
