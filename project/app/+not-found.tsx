import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Home } from 'lucide-react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'পাওয়া যায়নি',
          headerStyle: { backgroundColor: '#1E40AF' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontFamily: 'Hind-Siliguri-Bold',
          }
        }} 
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.emoji}>🔍</Text>
          <Text style={styles.title}>পেজ পাওয়া যায়নি</Text>
          <Text style={styles.description}>
            দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          </Text>
          
          <Link href="/" asChild>
            <TouchableOpacity style={styles.homeButton}>
              <Home size={20} color="#FFFFFF" />
              <Text style={styles.homeButtonText}>হোম পেজে ফিরে যান</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: 32,
    opacity: 0.8,
  },
  title: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 32,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E40AF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  homeButtonText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
