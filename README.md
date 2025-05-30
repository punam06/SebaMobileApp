# Seba (সেবা) Mobile App

A comprehensive government services mobile application for Bangladesh, built with React Native and Expo. This app provides easy access to various government services like NID correction, passport application, birth registration, and more.

## 🚀 Features

- **Multi-language Support**: Primarily Bengali (বাংলা) with English support
- **Government Services**: Access to 15+ government services
- **Application Tracking**: Track your application status in real-time
- **Document Management**: Upload and manage required documents
- **Secure Authentication**: Biometric and traditional login options
- **Offline Support**: Basic functionality works offline
- **Push Notifications**: Get updates about your applications
- **Modern UI/UX**: Beautiful and intuitive Bangladeshi-themed design

## 📱 Screens

### Main Tabs
- **Home (হোম)**: Dashboard with quick services and application status
- **Services (সেবা)**: Browse all available government services
- **Notifications (নোটিফিকেশন)**: Application updates and system notifications
- **Profile (প্রোফাইল)**: User profile and settings

### Additional Screens
- **Search**: Find services quickly with smart search
- **Service Details**: Detailed information about each service
- **Application Form**: Step-by-step application process
- **Document Upload**: Secure document upload system
- **Payment**: Integrated payment gateway

## 🛠 Technology Stack

- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router (file-based routing)
- **UI Components**: Custom components with Lucide React Native icons
- **Animations**: React Native Animated API
- **Fonts**: Hind Siliguri (Bengali typography)
- **State Management**: React Hooks
- **Platform**: iOS, Android, and Web

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd SebaMobileApp/project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   npx expo start
   ```

4. **Run on different platforms**:
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   
   # Web
   npm run web
   ```

## 🏗 Project Structure

```
project/
├── app/                    # App screens (file-based routing)
│   ├── (tabs)/            # Tab-based screens
│   │   ├── index.tsx      # Home screen
│   │   ├── services.tsx   # Services listing
│   │   ├── notifications.tsx # Notifications
│   │   ├── profile.tsx    # User profile
│   │   ├── search.tsx     # Search functionality
│   │   └── service-details.tsx # Service details
│   ├── _layout.tsx        # Root layout
│   └── +not-found.tsx     # 404 screen
├── components/            # Reusable components
│   ├── AnimatedHeader.tsx # Animated header component
│   ├── ServiceCard.tsx    # Service card component
│   └── CategoryButton.tsx # Category button component
├── hooks/                 # Custom hooks
│   └── useFrameworkReady.ts
├── assets/               # Images, icons, and fonts
│   ├── icons/           # Service icons
│   └── images/          # App images
└── package.json         # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: #1E40AF (Blue 700)
- **Secondary**: #2563EB (Blue 600)
- **Background**: #F8FAFC (Slate 50)
- **Surface**: #FFFFFF (White)
- **Text Primary**: #1E293B (Slate 800)
- **Text Secondary**: #64748B (Slate 500)

### Typography
- **Font Family**: Hind Siliguri (optimized for Bengali text)
- **Weights**: Regular (400), Medium (500), Bold (700)

### Spacing
- **Base Unit**: 4px
- **Common Spacing**: 8px, 12px, 16px, 20px, 24px, 32px

## 🚀 Deployment

### Development Build
```bash
npm run dev
```

### Web Build
```bash
npm run build:web
```

### Mobile Build (EAS)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for different platforms
eas build --profile development --platform all  # Development
eas build --profile preview --platform all      # Preview/Testing
eas build --profile production --platform all   # Production
```

### Docker Deployment
```bash
# Build Docker image
docker build -t seba-app .

# Run with Docker Compose
docker-compose up -d
```

## 🌐 Available Services

1. **জাতীয় পরিচয়পত্র** (National ID Card)
2. **পাসপোর্ট** (Passport)
3. **জন্ম নিবন্ধন** (Birth Registration)
4. **ড্রাইভিং লাইসেন্স** (Driving License)
5. **শিক্ষা সনদ** (Education Certificate)
6. **ভূমি সেবা** (Land Services)
7. **ভোটার আইডি** (Voter ID)
8. **বিবাহ নিবন্ধন** (Marriage Registration)
9. **আয়কর রিটার্ন** (Tax Return)
10. **ট্রেড লাইসেন্স** (Trade License)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_API_URL=https://api.seba.gov.bd
EXPO_PUBLIC_APP_VERSION=1.0.0
```

### App Configuration
Update `app.json` for production:
```json
{
  "expo": {
    "name": "Seba",
    "slug": "seba-app",
    "version": "1.0.0",
    "bundleIdentifier": "bd.gov.seba",
    "package": "bd.gov.seba"
  }
}
```

## 📱 Platform-Specific Features

### iOS
- Touch ID / Face ID authentication
- iOS-specific navigation patterns
- App Store compliance

### Android
- Fingerprint authentication
- Android-specific UI components
- Google Play Store compliance

### Web
- Responsive design
- Progressive Web App (PWA) support
- Web-specific optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@seba.gov.bd
- Phone: +880-2-9999999
- Website: https://seba.gov.bd

## 🙏 Acknowledgments

- Government of Bangladesh
- Department of ICT
- Expo team for the amazing framework
- React Native community

---

**Seba (সেবা)** - Bringing government services to your fingertips 🇧🇩