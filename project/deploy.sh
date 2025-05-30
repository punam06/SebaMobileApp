#!/bin/bash

# Seba App Deployment Script
# =========================

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Seba (সেবা) App Deployment Script${NC}"
echo "=================================="

# Check that we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Choose deployment target
echo -e "\n${GREEN}Choose a deployment target:${NC}"
echo "1) EAS Build (Android/iOS)"
echo "2) Web (Netlify/Vercel/Firebase)"
echo "3) Docker Container"
echo "4) GitHub Pages"
echo "5) Exit"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo -e "\n${GREEN}EAS Build selected.${NC}"
        echo -e "${YELLOW}Choose platform:${NC}"
        echo "1) Android"
        echo "2) iOS"
        echo "3) Both"
        
        read -p "Enter platform choice (1-3): " platform
        
        echo -e "\n${YELLOW}Choose build profile:${NC}"
        echo "1) Development"
        echo "2) Preview"
        echo "3) Production"
        
        read -p "Enter profile choice (1-3): " profile
        
        # Map selections to commands
        case $platform in
            1) platform_arg="android" ;;
            2) platform_arg="ios" ;;
            3) platform_arg="all" ;;
            *) echo -e "${RED}Invalid choice${NC}"; exit 1 ;;
        esac
        
        case $profile in
            1) profile_arg="development" ;;
            2) profile_arg="preview" ;;
            3) profile_arg="production" ;;
            *) echo -e "${RED}Invalid choice${NC}"; exit 1 ;;
        esac
        
        echo -e "\n${YELLOW}Running: eas build --platform $platform_arg --profile $profile_arg${NC}"
        npx eas build --platform $platform_arg --profile $profile_arg
        ;;
        
    2)
        echo -e "\n${GREEN}Web deployment selected.${NC}"
        echo -e "${YELLOW}Choose hosting service:${NC}"
        echo "1) Netlify"
        echo "2) Vercel"
        echo "3) Firebase"
        echo "4) Custom (build only)"
        
        read -p "Enter hosting choice (1-4): " hosting
        
        # First build the web version
        echo -e "\n${YELLOW}Building web version...${NC}"
        npm run build:web
        
        case $hosting in
            1)
                echo -e "\n${YELLOW}Deploying to Netlify...${NC}"
                npx netlify deploy --prod --dir=web-build
                ;;
            2)
                echo -e "\n${YELLOW}Deploying to Vercel...${NC}"
                npx vercel web-build --prod
                ;;
            3)
                echo -e "\n${YELLOW}Deploying to Firebase...${NC}"
                npx firebase deploy --only hosting
                ;;
            4)
                echo -e "\n${YELLOW}Web build completed. Files are available in the 'web-build' directory.${NC}"
                ;;
            *)
                echo -e "${RED}Invalid choice${NC}"
                exit 1
                ;;
        esac
        ;;
        
    3)
        echo -e "\n${GREEN}Docker deployment selected.${NC}"
        echo -e "${YELLOW}Choose Docker option:${NC}"
        echo "1) Build and run locally with Docker Compose"
        echo "2) Build Docker image only"
        
        read -p "Enter Docker choice (1-2): " docker_choice
        
        case $docker_choice in
            1)
                echo -e "\n${YELLOW}Building and running with Docker Compose...${NC}"
                docker-compose up --build
                ;;
            2)
                echo -e "\n${YELLOW}Building Docker image...${NC}"
                docker build -t seba-app:latest .
                echo -e "\n${GREEN}Docker image built successfully.${NC}"
                echo "Run with: docker run -p 8080:80 seba-app:latest"
                ;;
            *)
                echo -e "${RED}Invalid choice${NC}"
                exit 1
                ;;
        esac
        ;;
        
    4)
        echo -e "\n${GREEN}GitHub Pages deployment selected.${NC}"
        
        # Build the web version
        echo -e "\n${YELLOW}Building web version...${NC}"
        npm run build:web
        
        read -p "Enter your GitHub username: " github_username
        read -p "Enter repository name: " repo_name
        
        echo -e "\n${YELLOW}Deploying to GitHub Pages...${NC}"
        npx gh-pages -d web-build
        
        echo -e "\n${GREEN}Deployment complete!${NC}"
        echo -e "Your app will be available at: https://$github_username.github.io/$repo_name"
        ;;
        
    5)
        echo -e "\n${YELLOW}Exiting.${NC}"
        exit 0
        ;;
        
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo -e "\n${GREEN}Deployment process completed.${NC}"
