import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  StatusBar,
  Animated,
  Switch,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  FileText, 
  Settings, 
  HelpCircle,
  LogOut,
  ChevronRight,
  Bell,
  Globe,
  Lock,
  Moon,
  ChevronDown
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

export default function ProfileScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const settingsHeight = useRef(new Animated.Value(0)).current;
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    triggerHaptic();
  };
  
  const toggleNotifications = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
    triggerHaptic();
  };
  
  const toggleBiometric = () => {
    setIsBiometricEnabled(!isBiometricEnabled);
    triggerHaptic();
  };
  
  const toggleSettings = () => {
    const toValue = showSettings ? 0 : 280; // Approximate height of settings section
    setShowSettings(!showSettings);
    triggerHaptic();
    
    Animated.spring(settingsHeight, {
      toValue,
      friction: 8,
      tension: 40,
      useNativeDriver: false
    }).start();
  };
  
  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/7429868/pexels-photo-7429868.jpeg' }}
          style={styles.headerBackground}
        />
        <BlurView intensity={80} style={styles.headerBlur} tint="dark">
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' }}
                style={styles.avatar}
              />
              <View style={styles.avatarBadge}>
                <Text style={styles.avatarBadgeText}>✓</Text>
              </View>
            </View>
            <Text style={styles.userName}>মোহাম্মদ রহিম</Text>
            <Text style={styles.userInfo}>NID: ১২৩৪৫৬৭৮৯০১২৩</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>প্রোফাইল এডিট</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>৫</Text>
            <Text style={styles.statLabel}>আবেদন</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>১২</Text>
            <Text style={styles.statLabel}>ডকুমেন্ট</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>৩</Text>
            <Text style={styles.statLabel}>নোটিফিকেশন</Text>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>অ্যাকাউন্ট</Text>
          
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={[styles.menuIcon, { backgroundColor: '#E0F2FE' }]}>
                <User size={20} color="#0284C7" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>ব্যক্তিগত তথ্য</Text>
              </View>
              <ChevronRight size={18} color="#94A3B8" />
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={[styles.menuIcon, { backgroundColor: '#E0E7FF' }]}>
                <FileText size={20} color="#4338CA" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>আমার ডকুমেন্ট</Text>
              </View>
              <ChevronRight size={18} color="#94A3B8" />
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={toggleSettings}
            >
              <View style={[styles.menuIcon, { backgroundColor: '#F0F9FF' }]}>
                <Settings size={20} color="#0284C7" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>সেটিংস</Text>
              </View>
              <ChevronDown 
                size={18} 
                color="#94A3B8" 
                style={{
                  transform: [{ rotate: showSettings ? '180deg' : '0deg' }]
                }}
              />
            </TouchableOpacity>
            
            <Animated.View style={{ height: settingsHeight, overflow: 'hidden' }}>
              <View style={styles.settingsContainer}>
                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Globe size={18} color="#64748B" />
                    <Text style={styles.settingLabel}>ভাষা</Text>
                  </View>
                  <TouchableOpacity style={styles.languageSelector}>
                    <Text style={styles.languageText}>বাংলা</Text>
                    <ChevronDown size={14} color="#64748B" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Bell size={18} color="#64748B" />
                    <Text style={styles.settingLabel}>নোটিফিকেশন</Text>
                  </View>
                  <Switch
                    value={isNotificationsEnabled}
                    onValueChange={toggleNotifications}
                    trackColor={{ false: '#CBD5E1', true: '#BFDBFE' }}
                    thumbColor={isNotificationsEnabled ? '#1E40AF' : '#F8FAFC'}
                  />
                </View>
                
                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Lock size={18} color="#64748B" />
                    <Text style={styles.settingLabel}>বায়োমেট্রিক লক</Text>
                  </View>
                  <Switch
                    value={isBiometricEnabled}
                    onValueChange={toggleBiometric}
                    trackColor={{ false: '#CBD5E1', true: '#BFDBFE' }}
                    thumbColor={isBiometricEnabled ? '#1E40AF' : '#F8FAFC'}
                  />
                </View>
                
                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Moon size={18} color="#64748B" />
                    <Text style={styles.settingLabel}>ডার্ক মোড</Text>
                  </View>
                  <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    trackColor={{ false: '#CBD5E1', true: '#BFDBFE' }}
                    thumbColor={isDarkMode ? '#1E40AF' : '#F8FAFC'}
                  />
                </View>
              </View>
            </Animated.View>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={[styles.menuIcon, { backgroundColor: '#F1F5F9' }]}>
                <HelpCircle size={20} color="#64748B" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>সাহায্য</Text>
              </View>
              <ChevronRight size={18} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={18} color="#DC2626" />
          <Text style={styles.logoutText}>লগআউট</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>ভার্সন ১.০.০</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    height: 220,
    overflow: 'hidden',
  },
  headerBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  headerBlur: {
    flex: 1,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userName: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userInfo: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#E2E8F0',
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editButtonText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 20,
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 8,
  },
  menuSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
  },
  settingsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8FAFC',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 10,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  languageText: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 12,
    color: '#64748B',
    marginRight: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 14,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 16,
    color: '#DC2626',
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 24,
  },
});