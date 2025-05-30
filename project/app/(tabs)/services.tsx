import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  FlatList,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import CategoryButton from '../../components/CategoryButton';

const categories = [
  { id: 'identity', name: 'পরিচয়পত্র', icon: '🆔' },
  { id: 'travel', name: 'ভ্রমণ', icon: '✈️' },
  { id: 'education', name: 'শিক্ষা', icon: '🎓' },
  { id: 'land', name: 'ভূমি', icon: '🏞️' },
  { id: 'health', name: 'স্বাস্থ্য', icon: '🏥' },
  { id: 'tax', name: 'কর', icon: '💰' },
  { id: 'business', name: 'ব্যবসা', icon: '🏢' },
  { id: 'utility', name: 'উটিলিটি', icon: '💡' },
];

const featuredServices = [
  { 
    id: 1, 
    name: 'জাতীয় পরিচয়পত্র সংশোধন', 
    category: 'identity',
    image: 'https://images.pexels.com/photos/5699376/pexels-photo-5699376.jpeg',
    time: '১০-১৫ দিন',
    fee: '৫০০ টাকা'
  },
  { 
    id: 2, 
    name: 'ই-পাসপোর্ট আবেদন', 
    category: 'travel',
    image: 'https://images.pexels.com/photos/1051071/pexels-photo-1051071.jpeg',
    time: '৭-১০ দিন',
    fee: '৩,৫০০ টাকা'
  },
  { 
    id: 3, 
    name: 'জন্ম নিবন্ধন', 
    category: 'identity',
    image: 'https://images.pexels.com/photos/3662803/pexels-photo-3662803.jpeg',
    time: '৫-৭ দিন',
    fee: 'বিনামূল্যে'
  },
];

const allServices = [
  { id: 1, name: 'জাতীয় পরিচয়পত্র', category: 'identity' },
  { id: 2, name: 'পাসপোর্ট', category: 'travel' },
  { id: 3, name: 'জন্ম নিবন্ধন', category: 'identity' },
  { id: 4, name: 'ভোটার আইডি', category: 'identity' },
  { id: 5, name: 'ড্রাইভিং লাইসেন্স', category: 'travel' },
  { id: 6, name: 'পারিবারিক সনদ', category: 'identity' },
  { id: 7, name: 'বিবাহ নিবন্ধন', category: 'identity' },
  { id: 8, name: 'এসএসসি সনদ', category: 'education' },
  { id: 9, name: 'ভূমি নিবন্ধন', category: 'land' },
  { id: 10, name: 'খতিয়ান', category: 'land' },
  { id: 11, name: 'আয়কর রিটার্ন', category: 'tax' },
  { id: 12, name: 'ভ্যাট নিবন্ধন', category: 'tax' },
  { id: 13, name: 'ট্রেড লাইসেন্স', category: 'business' },
  { id: 14, name: 'কোম্পানি নিবন্ধন', category: 'business' },
  { id: 15, name: 'বিদ্যুৎ সংযোগ', category: 'utility' },
];

export default function ServicesScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredServices, setFilteredServices] = useState(allServices);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered = allServices.filter(service => 
        service.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(allServices);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    if (categoryId && categoryId !== selectedCategory) {
      const filtered = allServices.filter(service => service.category === categoryId);
      setFilteredServices(filtered);
    } else {
      setFilteredServices(allServices);
    }
  };

  const handleServicePress = (service: any) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/service-details');
  };

  const renderFeaturedItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.featuredCard}
      onPress={() => handleServicePress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.featuredImage}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.featuredGradient}
      >
        <Text style={styles.featuredTitle}>{item.name}</Text>
        <View style={styles.featuredMeta}>
          <Text style={styles.featuredMetaText}>⏱️ {item.time}</Text>
          <Text style={styles.featuredMetaText}>💰 {item.fee}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderServiceItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.serviceItem}
      onPress={() => handleServicePress(item)}
    >
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        {categories.find(cat => cat.id === item.category) && (
          <View style={styles.serviceCategory}>
            <Text style={styles.serviceCategoryText}>
              {categories.find(cat => cat.id === item.category)?.icon} {' '}
              {categories.find(cat => cat.id === item.category)?.name}
            </Text>
          </View>
        )}
      </View>
      <ChevronRight size={20} color="#64748B" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>সেবাসমূহ</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="সেবা খুঁজুন..."
            placeholderTextColor="#94A3B8"
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText ? (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <X size={18} color="#64748B" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>ক্যাটাগরি</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
                isSelected={selectedCategory === category.id}
                onSelect={handleCategorySelect}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* Featured Services */}
        {!searchText && (
          <View style={styles.featuredContainer}>
            <Text style={styles.sectionTitle}>জনপ্রিয় সেবা</Text>
            <FlatList
              data={featuredServices}
              renderItem={renderFeaturedItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredScroll}
            />
          </View>
        )}
        
        {/* All Services or Search Results */}
        <View style={styles.allServicesContainer}>
          <Text style={styles.sectionTitle}>
            {searchText 
              ? 'সার্চ রেজাল্ট' 
              : selectedCategory 
                ? `${categories.find(cat => cat.id === selectedCategory)?.name} সেবাসমূহ` 
                : 'সকল সেবা'
            }
          </Text>
          
          {filteredServices.length > 0 ? (
            <FlatList
              data={filteredServices}
              renderItem={renderServiceItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              contentContainerStyle={styles.servicesList}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsEmoji}>🔍</Text>
              <Text style={styles.noResultsText}>
                {searchText ? 'কোন ফলাফল পাওয়া যায়নি' : 'কোন সেবা নেই'}
              </Text>
              {searchText && (
                <TouchableOpacity 
                  style={styles.resetButton}
                  onPress={() => handleSearch('')}
                >
                  <Text style={styles.resetButtonText}>সার্চ রিসেট করুন</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInputContainer: {
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
  searchInput: {
    flex: 1,
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#1E293B',
    marginLeft: 8,
  },
  categoriesContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
  },
  categoriesScroll: {
    paddingRight: 16,
  },
  featuredContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  featuredScroll: {
    paddingRight: 16,
  },
  featuredCard: {
    width: 250,
    height: 150,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  featuredTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredMetaText: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  allServicesContainer: {
    paddingHorizontal: 16,
    marginBottom: 100, // Extra space for bottom tab
  },
  servicesList: {
    paddingBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  serviceCategory: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  serviceCategoryText: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsEmoji: {
    fontSize: 48,
    marginBottom: 16,
    textAlign: 'center',
  },
  noResultsText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 16,
    color: '#64748B',
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetButtonText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});