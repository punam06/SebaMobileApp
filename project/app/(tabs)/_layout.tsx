import { Tabs } from 'expo-router';
import { Home, Clipboard, Bell, User } from 'lucide-react-native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Hind-Siliguri-Regular': 'https://fonts.googleapis.com/css2?family=Hind+Siliguri&display=swap',
    'Hind-Siliguri-Medium': 'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500&display=swap',
    'Hind-Siliguri-Bold': 'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@700&display=swap',
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: '#FFFFFF',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Hind-Siliguri-Medium',
          fontSize: 12,
        },
        tabBarActiveTintColor: '#1E40AF',
        tabBarInactiveTintColor: '#64748B',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'হোম',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'সেবা',
          tabBarIcon: ({ color, size }) => <Clipboard size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'নোটিফিকেশন',
          tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'প্রোফাইল',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="service-details"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}