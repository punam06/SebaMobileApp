import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  StatusBar,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, ChevronRight, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const notifications = [
  {
    id: '1',
    title: 'আবেদন গৃহীত হয়েছে',
    description: 'আপনার পাসপোর্ট নবায়নের আবেদন সফলভাবে গৃহীত হয়েছে।',
    time: '৩০ মিনিট আগে',
    type: 'success',
    isRead: false,
    serviceId: 'passport-123'
  },
  {
    id: '2',
    title: 'ডকুমেন্ট যাচাই চলছে',
    description: 'আপনার NID সংশোধনের আবেদনের ডকুমেন্ট যাচাই করা হচ্ছে।',
    time: '২ ঘন্টা আগে',
    type: 'info',
    isRead: false,
    serviceId: 'nid-456'
  },
  {
    id: '3',
    title: 'স্মারক',
    description: 'আপনার ড্রাইভিং লাইসেন্স আবেদনের জন্য ৫ দিন বাকি আছে।',
    time: '৪ ঘন্টা আগে',
    type: 'warning',
    isRead: true,
    serviceId: 'dl-789'
  },
  {
    id: '4',
    title: 'পেমেন্ট বাকি',
    description: 'আপনার ভূমি নিবন্ধন সম্পূর্ণ করতে পেমেন্ট করুন।',
    time: '৮ ঘন্টা আগে',
    type: 'payment',
    isRead: true,
    serviceId: 'land-321'
  },
  {
    id: '5',
    title: 'আবেদন বাতিল',
    description: 'প্রয়োজনীয় ডকুমেন্ট না থাকায় জন্ম নিবন্ধন আবেদন বাতিল হয়েছে।',
    time: '১ দিন আগে',
    type: 'error',
    isRead: true,
    serviceId: 'birth-654'
  },
  {
    id: '6',
    title: 'সেবা সম্পন্ন',
    description: 'আপনার পারিবারিক সনদ প্রস্তুত, সংগ্রহ করতে পারেন।',
    time: '২ দিন আগে',
    type: 'success',
    isRead: true,
    serviceId: 'family-987'
  },
  {
    id: '7',
    title: 'আপডেট',
    description: 'সিস্টেম আপডেটের কারণে আপনার আবেদন প্রক্রিয়া ২৪ ঘন্টা বন্ধ থাকবে।',
    time: '৩ দিন আগে',
    type: 'info',
    isRead: true,
    serviceId: 'system-update'
  },
];

export default function NotificationsScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  const handleNotificationPress = (notification) => {
    // In a real app, this would mark the notification as read and navigate to details
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const markAllAsRead = () => {
    // In a real app, this would mark all notifications as read
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return '#059669';
      case 'info': return '#0284C7';
      case 'warning': return '#D97706';
      case 'error': return '#DC2626';
      case 'payment': return '#7C3AED';
      default: return '#64748B';
    }
  };

  const renderNotification = ({ item }) => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity 
        style={[
          styles.notificationItem, 
          item.isRead ? styles.notificationRead : styles.notificationUnread
        ]}
        onPress={() => handleNotificationPress(item)}
      >
        <View 
          style={[
            styles.notificationIcon, 
            { backgroundColor: `${getNotificationColor(item.type)}20` }
          ]}
        >
          <Bell size={20} color={getNotificationColor(item.type)} />
        </View>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDescription}>{item.description}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        {!item.isRead && <View style={styles.unreadIndicator} />}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>নোটিফিকেশন</Text>
        <TouchableOpacity 
          style={styles.markAllButton}
          onPress={markAllAsRead}
        >
          <Check size={16} color="#1E40AF" />
          <Text style={styles.markAllText}>সব পঠিত করুন</Text>
        </TouchableOpacity>
      </View>
      
      <LinearGradient
        colors={['rgba(219, 234, 254, 0.7)', 'rgba(219, 234, 254, 0)']}
        style={styles.headerGradient}
      />
      
      <View style={styles.notificationSummary}>
        <View style={styles.notificationCount}>
          <Text style={styles.countNumber}>
            {notifications.filter(n => !n.isRead).length}
          </Text>
          <Text style={styles.countLabel}>অপঠিত</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.notificationCount}>
          <Text style={styles.countNumber}>
            {notifications.length}
          </Text>
          <Text style={styles.countLabel}>মোট</Text>
        </View>
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Bell size={64} color="#CBD5E1" />
            <Text style={styles.emptyText}>কোন নোটিফিকেশন নেই</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  markAllText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 12,
    color: '#1E40AF',
    marginLeft: 4,
  },
  headerGradient: {
    height: 8,
    width: '100%',
    zIndex: 5,
  },
  notificationSummary: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    padding: 16,
  },
  notificationCount: {
    flex: 1,
    alignItems: 'center',
  },
  countNumber: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 24,
    color: '#1E40AF',
    marginBottom: 4,
  },
  countLabel: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  divider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
  },
  notificationsList: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Extra space for tab bar
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  notificationUnread: {
    borderLeftWidth: 3,
    borderLeftColor: '#1E40AF',
  },
  notificationRead: {
    opacity: 0.8,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  notificationDescription: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  notificationTime: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 12,
    color: '#94A3B8',
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E40AF',
    marginLeft: 8,
    alignSelf: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 16,
  },
});