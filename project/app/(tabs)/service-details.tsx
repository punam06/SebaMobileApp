import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Image,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, DollarSign, FileText, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function ServiceDetailsScreen() {
  const params = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Extract service data from params with defaults
  const serviceName = params.name as string || 'জাতীয় পরিচয়পত্র';
  const serviceDescription = params.description as string || 'NID সংশোধন ও নবায়ন';
  const serviceIcon = params.icon as string || '🆔';
  const serviceBgColor = params.bgColor as string || '#EFF6FF';

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const handleApply = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    // Navigate to application form
    router.push('/application-form');
  };

  const steps = [
    {
      id: 1,
      title: 'আবেদন জমা দিন',
      description: 'অনলাইনে ফর্ম পূরণ করুন এবং প্রয়োজনীয় কাগজপত্র আপলোড করুন',
      duration: '১০ মিনিট',
      isCompleted: false
    },
    {
      id: 2,
      title: 'ফি পরিশোধ',
      description: 'মোবাইল ব্যাংকিং বা কার্ডের মাধ্যমে ফি পরিশোধ করুন',
      duration: '৫ মিনিট',
      isCompleted: false
    },
    {
      id: 3,
      title: 'যাচাইকরণ',
      description: 'আপনার তথ্য ও ডকুমেন্ট যাচাই করা হবে',
      duration: '৩-৫ দিন',
      isCompleted: false
    },
    {
      id: 4,
      title: 'অনুমোদন',
      description: 'আবেদন অনুমোদিত হলে SMS এর মাধ্যমে জানানো হবে',
      duration: '১-২ দিন',
      isCompleted: false
    },
    {
      id: 5,
      title: 'সংগ্রহ',
      description: 'নিকটতম কার্যালয় থেকে ডকুমেন্ট সংগ্রহ করুন',
      duration: '১ দিন',
      isCompleted: false
    }
  ];

  const requirements = [
    'জন্ম নিবন্ধন সনদের সত্যায়িত কপি',
    'শিক্ষাগত যোগ্যতার সনদ',
    'পাসপোর্ট সাইজের ছবি (৩ কপি)',
    'জাতীয় পরিচয়পত্রের কপি',
    'ভোটার আইডি কার্ডের কপি (যদি থাকে)'
  ];

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
          <Text style={styles.headerTitle}>{serviceName}</Text>
          <View style={styles.headerPlaceholder} />
        </LinearGradient>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[
            styles.content, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Service Info Card */}
          <View style={styles.serviceInfoCard}>
            <Text style={styles.serviceIcon}>{serviceIcon}</Text>
            <Text style={styles.serviceTitle}>{serviceName}</Text>
            <Text style={styles.serviceDescription}>
              {serviceDescription} - আপনার প্রয়োজনীয় সেবা পেতে এখানে আবেদন করুন।
            </Text>
            
            <View style={styles.serviceMetaContainer}>
              <View style={styles.serviceMeta}>
                <Clock size={16} color="#64748B" />
                <Text style={styles.serviceMetaText}>১০-১৫ দিন</Text>
              </View>
              <View style={styles.serviceMeta}>
                <DollarSign size={16} color="#64748B" />
                <Text style={styles.serviceMetaText}>৫০০ টাকা</Text>
              </View>
              <View style={styles.serviceMeta}>
                <FileText size={16} color="#64748B" />
                <Text style={styles.serviceMetaText}>৫টি ডকুমেন্ট</Text>
              </View>
            </View>
          </View>

          {/* Process Steps */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>আবেদন প্রক্রিয়া</Text>
            {steps.map((step, index) => (
              <View key={step.id} style={styles.stepItem}>
                <View style={styles.stepIndicator}>
                  <View style={[
                    styles.stepNumber,
                    step.isCompleted ? styles.stepCompleted : null
                  ]}>
                    <Text style={[
                      styles.stepNumberText,
                      step.isCompleted ? styles.stepCompletedText : null
                    ]}>
                      {step.id}
                    </Text>
                  </View>
                  {index < steps.length - 1 && (
                    <View style={styles.stepConnector} />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                  <Text style={styles.stepDuration}>⏱️ {step.duration}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Requirements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>প্রয়োজনীয় কাগজপত্র</Text>
            <View style={styles.requirementsCard}>
              {requirements.map((requirement, index) => (
                <View key={index} style={styles.requirementItem}>
                  <View style={styles.requirementBullet} />
                  <Text style={styles.requirementText}>{requirement}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Important Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>গুরুত্বপূর্ণ তথ্য</Text>
            <View style={styles.notesCard}>
              <Text style={styles.noteText}>
                • সকল ডকুমেন্ট অবশ্যই স্পষ্ট এবং পড়ার যোগ্য হতে হবে
              </Text>
              <Text style={styles.noteText}>
                • ভুল তথ্য প্রদান করলে আবেদন বাতিল হতে পারে
              </Text>
              <Text style={styles.noteText}>
                • আবেদন ফি একবার পরিশোধের পর ফেরত দেওয়া হয় না
              </Text>
              <Text style={styles.noteText}>
                • আবেদনের স্থিতি SMS ও অ্যাপের মাধ্যমে জানানো হবে
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.applyButtonContainer}>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={handleApply}
        >
          <LinearGradient
            colors={['#1E40AF', '#2563EB']}
            style={styles.applyButtonGradient}
          >
            <Text style={styles.applyButtonText}>আবেদন করুন</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 80,
  },
  headerGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  headerPlaceholder: {
    width: 32,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  serviceInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  serviceIcon: {
    fontSize: 48,
    marginBottom: 16,
    textAlign: 'center',
  },
  serviceTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 20,
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  serviceDescription: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  serviceMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceMetaText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCompleted: {
    backgroundColor: '#10B981',
  },
  stepNumberText: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 14,
    color: '#64748B',
  },
  stepCompletedText: {
    color: '#FFFFFF',
  },
  stepConnector: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 4,
  },
  stepContent: {
    flex: 1,
    paddingBottom: 8,
  },
  stepTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  stepDescription: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 4,
  },
  stepDuration: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 12,
    color: '#1E40AF',
  },
  requirementsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  requirementBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1E40AF',
    marginTop: 6,
    marginRight: 12,
  },
  requirementText: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
    lineHeight: 18,
  },
  notesCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  noteText: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#92400E',
    marginBottom: 8,
    lineHeight: 18,
  },
  applyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  applyButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  applyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  applyButtonText: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 8,
  },
});
