import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  StatusBar,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MoreHorizontal, ArrowRight, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import ServiceCard from '../../components/ServiceCard';
import AnimatedHeader from '../../components/AnimatedHeader';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, []);

  const quickServices = [
    { id: 1, name: 'NID সংশোধন', icon: '🆔', bgColor: '#E0F2FE', color: '#0369A1' },
    { id: 2, name: 'পাসপোর্ট', icon: '📄', bgColor: '#E0E7FF', color: '#4338CA' },
    { id: 3, name: 'জন্ম নিবন্ধন', icon: '👶', bgColor: '#FCE7F3', color: '#DB2777' },
    { id: 4, name: 'ভূমি সেবা', icon: '🏞️', bgColor: '#D1FAE5', color: '#059669' },
  ];

  const services = [
    { 
      id: 1, 
      name: 'জাতীয় পরিচয়পত্র', 
      description: 'NID সংশোধন ও নবায়ন',
      icon: '🆔',
      bgColor: '#EFF6FF'
    },
    { 
      id: 2, 
      name: 'পাসপোর্ট', 
      description: 'নতুন ও নবায়ন',
      icon: '📄',
      bgColor: '#F0F9FF'
    },
    { 
      id: 3, 
      name: 'জন্ম নিবন্ধন', 
      description: 'অনলাইন আবেদন',
      icon: '👶',
      bgColor: '#FDF2F8'
    },
    { 
      id: 4, 
      name: 'ড্রাইভিং লাইসেন্স', 
      description: 'BRTA সেবা',
      icon: '🚗',
      bgColor: '#ECFDF5'
    },
    { 
      id: 5, 
      name: 'শিক্ষা সনদ', 
      description: 'বোর্ড সার্টিফিকেট',
      icon: '🎓',
      bgColor: '#FEF3C7'
    },
    { 
      id: 6, 
      name: 'ভূমি সেবা', 
      description: 'খতিয়ান ও মিউটেশন',
      icon: '🏞️',
      bgColor: '#F3F4F6'
    },
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <AnimatedHeader 
        scrollY={scrollY} 
        title="সেবা" 
        subtitle="আপনার সব সরকারি সেবা এক জায়গায়" 
      />
      
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        style={styles.scrollView}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TouchableOpacity 
              style={styles.searchBox}
              onPress={() => router.push('/search')}
              activeOpacity={0.7}
            >
              <Search size={20} color="#64748B" />
              <Text style={styles.searchPlaceholder}>সেবা খুঁজুন...</Text>
            </TouchableOpacity>
          </View>
          
          {/* Application Status Cards */}
          <View style={styles.statusContainer}>
            <View style={styles.statusHeader}>
              <Text style={styles.sectionTitle}>চলমান আবেদন</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>সব দেখুন</Text>
                <ChevronRight size={16} color="#1E40AF" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.statusCard}>
              <View style={styles.statusIconContainer}>
                <Text style={styles.statusEmoji}>📄</Text>
              </View>
              <View style={styles.statusInfo}>
                <Text style={styles.statusTitle}>পাসপোর্ট নবায়ন</Text>
                <Text style={styles.statusDate}>আবেদন: ১০ ডিসেম্বর, ২০২৪</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '70%' }]} />
                </View>
                <Text style={styles.statusLabel}>প্রক্রিয়াধীন (৭০%)</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Quick Services */}
          <View style={styles.quickServicesContainer}>
            <Text style={styles.sectionTitle}>দ্রুত সেবা</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickServicesScrollContent}
            >
              {quickServices.map(service => (
                <TouchableOpacity 
                  key={service.id} 
                  style={[styles.quickServiceItem, { backgroundColor: service.bgColor }]}
                >
                  <Text style={styles.quickServiceIcon}>{service.icon}</Text>
                  <Text style={[styles.quickServiceText, { color: service.color }]}>
                    {service.name}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.viewMoreButton}>
                <MoreHorizontal size={24} color="#64748B" />
                <Text style={styles.viewMoreText}>আরও</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          
          {/* All Services */}
          <View style={styles.servicesContainer}>
            <Text style={styles.sectionTitle}>সকল সেবা</Text>
            <View style={styles.servicesGrid}>
              {services.map(service => (
                <ServiceCard 
                  key={service.id} 
                  name={service.name} 
                  description={service.description}
                  icon={service.icon}
                  bgColor={service.bgColor}
                />
              ))}
              <TouchableOpacity style={styles.viewAllServicesButton}>
                <Text style={styles.viewAllServicesText}>সকল সেবা দেখুন</Text>
                <ArrowRight size={16} color="#1E40AF" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* New Services Banner */}
          <TouchableOpacity style={styles.bannerContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/8850706/pexels-photo-8850706.jpeg' }}
              style={styles.bannerImage}
            />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>নতুন সেবা</Text>
              <Text style={styles.bannerText}>
                এখন অনলাইনে একাধিক সেবার জন্য একসাথে আবেদন করুন
              </Text>
              <View style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>আরও জানুন</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 140, // Space for the animated header
    paddingBottom: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  searchPlaceholder: {
    marginLeft: 8,
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#94A3B8',
  },
  statusContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 18,
    color: '#1E293B',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 14,
    color: '#1E40AF',
    marginRight: 4,
  },
  statusCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  statusIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusIcon: {
    width: 32,
    height: 32,
  },
  statusEmoji: {
    fontSize: 24,
    textAlign: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  statusDate: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1E40AF',
    borderRadius: 3,
  },
  statusLabel: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 12,
    color: '#1E40AF',
  },
  quickServicesContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  quickServicesScrollContent: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  quickServiceItem: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    padding: 12,
  },
  quickServiceIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickServiceText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 12,
    textAlign: 'center',
  },
  viewMoreButton: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },
  viewMoreText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  servicesContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  viewAllServicesButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 16,
  },
  viewAllServicesText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 14,
    color: '#1E40AF',
    marginRight: 8,
  },
  bannerContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 160,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(30, 64, 175, 0.85)',
    padding: 16,
    height: '100%',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerText: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 16,
    opacity: 0.9,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 14,
    color: '#1E40AF',
  },
});