import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Animated,
  Image,
  FlatList,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  time: string;
  fee: string;
}

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef<TextInput>(null);

  const allServices = [
    { id: 1, name: 'জাতীয় পরিচয়পত্র সংশোধন', category: 'পরিচয়পত্র', description: 'NID সংশোধন ও নবায়ন', time: '১০-১৫ দিন', fee: '৫০০ টাকা' },
    { id: 2, name: 'ই-পাসপোর্ট আবেদন', category: 'ভ্রমণ', description: 'নতুন ও নবায়ন', time: '৭-১০ দিন', fee: '৩,৫০০ টাকা' },
    { id: 3, name: 'জন্ম নিবন্ধন সনদ', category: 'পরিচয়পত্র', description: 'অনলাইন আবেদন', time: '৫-৭ দিন', fee: 'বিনামূল্যে' },
    { id: 4, name: 'ড্রাইভিং লাইসেন্স', category: 'ভ্রমণ', description: 'BRTA সেবা', time: '১৫-২০ দিন', fee: '২,০০০ টাকা' },
    { id: 5, name: 'এসএসসি সনদ সংশোধন', category: 'শিক্ষা', description: 'বোর্ড সার্টিফিকেট', time: '৩০-৪৫ দিন', fee: '১,০০০ টাকা' },
    { id: 6, name: 'ভূমি নিবন্ধন', category: 'ভূমি', description: 'খতিয়ান ও মিউটেশন', time: '২০-৩০ দিন', fee: '৫,০০০ টাকা' },
    { id: 7, name: 'ভোটার আইডি কার্ড', category: 'পরিচয়পত্র', description: 'নতুন ভোটার নিবন্ধন', time: '১০-১৫ দিন', fee: 'বিনামূল্যে' },
    { id: 8, name: 'বিবাহ নিবন্ধন', category: 'পরিচয়পত্র', description: 'বিবাহ সনদ', time: '৫-৭ দিন', fee: '৫০০ টাকা' },
    { id: 9, name: 'আয়কর রিটার্ন', category: 'কর', description: 'অনলাইন রিটার্ন', time: '১-২ দিন', fee: 'বিনামূল্যে' },
    { id: 10, name: 'ট্রেড লাইসেন্স', category: 'ব্যবসা', description: 'ব্যবসার অনুমতি', time: '১৫-২০ দিন', fee: '২,৫০০ টাকা' },
  ];

  const recentSearches = [
    'পাসপোর্ট',
    'জন্ম নিবন্ধন',
    'ভোটার আইডি',
    'ড্রাইভিং লাইসেন্স'
  ];

  const popularServices = [
    'জাতীয় পরিচয়পত্র',
    'পাসপোর্ট',
    'জন্ম নিবন্ধন',
    'ভূমি নিবন্ধন'
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();

    // Auto focus search input
    if (searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setIsLoading(true);

    // Simulate search delay
    setTimeout(() => {
      if (text.trim()) {
        const filtered = allServices.filter(service => 
          service.name.toLowerCase().includes(text.toLowerCase()) ||
          service.category.toLowerCase().includes(text.toLowerCase()) ||
          service.description.toLowerCase().includes(text.toLowerCase())
        );
        setSearchResults(filtered);
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    }, 300);
  };

  const handleServicePress = (service: Service) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push({
      pathname: '/service-details',
      params: {
        id: String(service.id),
        name: service.name,
        description: service.description,
        icon: '🆔', // Default icon for search results
        bgColor: '#EFF6FF'
      }
    });
  };

  const handleRecentSearchPress = (search: string) => {
    setSearchText(search);
    handleSearch(search);
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity 
      style={styles.serviceItem}
      onPress={() => handleServicePress(item)}
    >
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <View style={styles.serviceMeta}>
          <Text style={styles.serviceMetaText}>⏱️ {item.time}</Text>
          <Text style={styles.serviceMetaText}>💰 {item.fee}</Text>
        </View>
      </View>
      <View style={styles.serviceCategory}>
        <Text style={styles.serviceCategoryText}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecentSearchItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={styles.recentSearchItem}
      onPress={() => handleRecentSearchPress(item)}
    >
      <Search size={16} color="#64748B" />
      <Text style={styles.recentSearchText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderPopularServiceItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={styles.popularServiceChip}
      onPress={() => handleRecentSearchPress(item)}
    >
      <Text style={styles.popularServiceText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={['#1E40AF', '#2563EB']}
          style={styles.headerGradient}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color="#64748B" />
              <TextInput
                ref={searchInputRef}
                style={styles.searchInput}
                placeholder="সেবা খুঁজুন..."
                placeholderTextColor="#94A3B8"
                value={searchText}
                onChangeText={handleSearch}
                returnKeyType="search"
              />
              {searchText ? (
                <TouchableOpacity onPress={clearSearch}>
                  <X size={18} color="#64748B" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </LinearGradient>
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {searchText ? (
          // Search Results
          <View style={styles.searchResults}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>খুঁজে দেখা হচ্ছে...</Text>
              </View>
            ) : searchResults.length > 0 ? (
              <>
                <Text style={styles.resultsCount}>
                  {searchResults.length}টি ফলাফল পাওয়া গেছে
                </Text>
                <FlatList
                  data={searchResults}
                  renderItem={renderServiceItem}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.resultsList}
                />
              </>
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsEmoji}>🔍</Text>
                <Text style={styles.noResultsText}>কোন ফলাফল পাওয়া যায়নি</Text>
                <Text style={styles.noResultsSubtext}>
                  অন্য কিছু খোঁজার চেষ্টা করুন
                </Text>
              </View>
            )}
          </View>
        ) : (
          // Initial State
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Recent Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>সাম্প্রতিক অনুসন্ধান</Text>
              <FlatList
                data={recentSearches}
                renderItem={renderRecentSearchItem}
                keyExtractor={(item) => item}
                scrollEnabled={false}
              />
            </View>

            {/* Popular Services */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>জনপ্রিয় সেবা</Text>
              <FlatList
                data={popularServices}
                renderItem={renderPopularServiceItem}
                keyExtractor={(item) => item}
                numColumns={2}
                scrollEnabled={false}
                columnWrapperStyle={styles.popularServicesRow}
              />
            </View>

            {/* Search Tips */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>অনুসন্ধানের টিপস</Text>
              <View style={styles.tipsContainer}>
                <Text style={styles.tipText}>• সেবার নাম লিখুন (উদাহরণ: পাসপোর্ট)</Text>
                <Text style={styles.tipText}>• ক্যাটাগরি অনুযায়ী খুঁজুন (উদাহরণ: শিক্ষা)</Text>
                <Text style={styles.tipText}>• বাংলা বা ইংরেজি যেকোনো ভাষায় লিখুন</Text>
              </View>
            </View>
          </ScrollView>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 100,
  },
  headerGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchResults: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 16,
    color: '#64748B',
  },
  resultsCount: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  resultsList: {
    paddingBottom: 20,
  },
  serviceItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  serviceDescription: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  serviceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceMetaText: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  serviceCategory: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 8,
  },
  serviceCategoryText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 12,
    color: '#1E40AF',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  noResultsEmoji: {
    fontSize: 48,
    marginBottom: 16,
    textAlign: 'center',
  },
  noResultsText: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 18,
    color: '#64748B',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#94A3B8',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recentSearchText: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#1E293B',
    marginLeft: 8,
  },
  popularServicesRow: {
    justifyContent: 'space-between',
  },
  popularServiceChip: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 8,
    width: '48%',
    alignItems: 'center',
  },
  popularServiceText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 14,
    color: '#1E40AF',
    textAlign: 'center',
  },
  tipsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tipText: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    lineHeight: 20,
  },
});
