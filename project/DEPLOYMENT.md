# Seba (সেবা) App Deployment Guide

This guide walks through different deployment options for the Seba app.

## Option 1: Expo EAS Build (Recommended)

EAS Build is Expo's cloud service for building app binaries.

### Setup

1. Install the EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```

2. Log in to your Expo account:
   ```bash
   eas login
   ```

3. Configure your app:
   ```bash
   eas build:configure
   ```

### Build for Development

Build a development version that can be installed on devices and used with Expo Go:

```bash
eas build --profile development --platform all
```

### Build for Preview/Testing

Build a standalone app for internal distribution:

```bash
eas build --profile preview --platform all
```

### Build for Production

Build the production version for submission to app stores:

```bash
eas build --profile production --platform all
```

## Option 2: Expo Classic Build

If you prefer the classic Expo build workflow:

### For Android

1. Generate an Android APK:
   ```bash
   expo build:android -t apk
   ```

2. Or build an Android App Bundle (AAB) for Google Play:
   ```bash
   expo build:android -t app-bundle
   ```

### For iOS

Build for iOS and download the IPA:
```bash
expo build:ios
```

## Option 3: Manual Build with React Native CLI

For more control, you can eject from Expo managed workflow and use the bare workflow:

1. Install the React Native CLI:
   ```bash
   npm install -g react-native-cli
   ```

2. Eject from Expo managed workflow:
   ```bash
   expo eject
   ```

3. Follow platform-specific instructions:

   For Android:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

   For iOS:
   ```bash
   cd ios
   pod install
   # Open the .xcworkspace file in Xcode and build from there
   ```

## Option 4: Web Deployment

Deploy as a web application:

1. Build web assets:
   ```bash
   npm run build:web
   ```

2. The web build will be in the `web-build` directory.

3. Deploy to any web hosting service:
   - Netlify
   - Vercel
   - Firebase Hosting
   - GitHub Pages

## Option 5: CI/CD Integration

Set up CI/CD pipelines using GitHub Actions:

1. Create a `.github/workflows/build.yml` file in your project.
2. Configure the workflow to build your app on push/PR events.
3. Set up secrets in your GitHub repository for Expo credentials.

## Testing Deployment Locally

Test the production build locally:

1. Start a production server:
   ```bash
   npx expo start --no-dev --minify
   ```

2. Use the Expo Go app to scan the QR code and test on a device.

## Troubleshooting

If you encounter issues during deployment:

1. Check the Expo build logs
2. Verify your app.json configuration
3. Ensure all dependencies are properly installed
4. Use the Expo Doctor:
   ```bash
   npx expo-doctor
   ```

## Additional Resources

- [Expo EAS Documentation](https://docs.expo.dev/eas/)
- [React Native Deployment](https://reactnative.dev/docs/publishing-to-app-store)
- [Expo Web Deployment](https://docs.expo.dev/distribution/publishing-websites/)
