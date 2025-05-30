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
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Upload, Camera, FileText, CreditCard } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function ApplicationFormScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    nidNumber: '',
    phoneNumber: '',
    email: '',
    address: '',
    reason: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const totalSteps = 4;

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDocumentUpload = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    Alert.alert(
      'ডকুমেন্ট আপলোড',
      'ক্যামেরা অথবা গ্যালারি থেকে ছবি নির্বাচন করুন',
      [
        { text: 'ক্যামেরা', onPress: () => uploadFromCamera() },
        { text: 'গ্যালারি', onPress: () => uploadFromGallery() },
        { text: 'বাতিল', style: 'cancel' }
      ]
    );
  };

  const uploadFromCamera = () => {
    // Simulate camera upload
    setUploadedDocs(prev => [...prev, `camera_doc_${Date.now()}`]);
  };

  const uploadFromGallery = () => {
    // Simulate gallery upload
    setUploadedDocs(prev => [...prev, `gallery_doc_${Date.now()}`]);
  };

  const handleSubmit = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    Alert.alert(
      'আবেদন সফল',
      'আপনার আবেদনটি সফলভাবে জমা দেওয়া হয়েছে। অ্যাপ্লিকেশন আইডি: NID-2024-001234',
      [
        { text: 'ঠিক আছে', onPress: () => router.back() }
      ]
    );
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View key={index} style={styles.progressStep}>
          <View style={[
            styles.progressDot,
            index + 1 <= currentStep ? styles.progressDotActive : styles.progressDotInactive
          ]}>
            <Text style={[
              styles.progressDotText,
              index + 1 <= currentStep ? styles.progressDotTextActive : styles.progressDotTextInactive
            ]}>
              {index + 1}
            </Text>
          </View>
          {index < totalSteps - 1 && (
            <View style={[
              styles.progressLine,
              index + 1 < currentStep ? styles.progressLineActive : styles.progressLineInactive
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>ব্যক্তিগত তথ্য</Text>
      <Text style={styles.stepDescription}>আপনার ব্যক্তিগত তথ্য প্রদান করুন</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>পূর্ণ নাম *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.fullName}
          onChangeText={(value) => handleInputChange('fullName', value)}
          placeholder="আপনার পূর্ণ নাম লিখুন"
          placeholderTextColor="#94A3B8"
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>জাতীয় পরিচয়পত্র নম্বর *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.nidNumber}
          onChangeText={(value) => handleInputChange('nidNumber', value)}
          placeholder="১৭ ডিজিটের NID নম্বর"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          maxLength={17}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>মোবাইল নম্বর *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.phoneNumber}
          onChangeText={(value) => handleInputChange('phoneNumber', value)}
          placeholder="01XXXXXXXXX"
          placeholderTextColor="#94A3B8"
          keyboardType="phone-pad"
          maxLength={11}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>ইমেইল ঠিকানা</Text>
        <TextInput
          style={styles.textInput}
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="example@email.com"
          placeholderTextColor="#94A3B8"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>ঠিকানা ও বিবরণ</Text>
      <Text style={styles.stepDescription}>আপনার ঠিকানা এবং আবেদনের কারণ লিখুন</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>বর্তমান ঠিকানা *</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          value={formData.address}
          onChangeText={(value) => handleInputChange('address', value)}
          placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>সংশোধনের কারণ *</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          value={formData.reason}
          onChangeText={(value) => handleInputChange('reason', value)}
          placeholder="কি কারণে সংশোধন প্রয়োজন তা বিস্তারিত লিখুন"
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>ডকুমেন্ট আপলোড</Text>
      <Text style={styles.stepDescription}>প্রয়োজনীয় কাগজপত্র আপলোড করুন</Text>
      
      <View style={styles.documentList}>
        <Text style={styles.documentListTitle}>প্রয়োজনীয় ডকুমেন্ট:</Text>
        <Text style={styles.documentItem}>• জন্ম নিবন্ধন সনদ</Text>
        <Text style={styles.documentItem}>• শিক্ষাগত যোগ্যতার সনদ</Text>
        <Text style={styles.documentItem}>• পাসপোর্ট সাইজ ছবি</Text>
        <Text style={styles.documentItem}>• বর্তমান NID এর কপি</Text>
      </View>
      
      <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentUpload}>
        <Upload size={24} color="#1E40AF" />
        <Text style={styles.uploadButtonText}>ডকুমেন্ট আপলোড করুন</Text>
      </TouchableOpacity>
      
      {uploadedDocs.length > 0 && (
        <View style={styles.uploadedDocsContainer}>
          <Text style={styles.uploadedDocsTitle}>আপলোড করা ডকুমেন্ট ({uploadedDocs.length})</Text>
          {uploadedDocs.map((doc, index) => (
            <View key={index} style={styles.uploadedDocItem}>
              <FileText size={16} color="#10B981" />
              <Text style={styles.uploadedDocText}>ডকুমেন্ট {index + 1}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>পেমেন্ট</Text>
      <Text style={styles.stepDescription}>আবেদনের ফি পরিশোধ করুন</Text>
      
      <View style={styles.paymentSummary}>
        <Text style={styles.paymentSummaryTitle}>পেমেন্ট সারসংক্ষেপ</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>আবেদন ফি:</Text>
          <Text style={styles.paymentAmount}>৫০০ টাকা</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>সার্ভিস চার্জ:</Text>
          <Text style={styles.paymentAmount}>২০ টাকা</Text>
        </View>
        <View style={[styles.paymentRow, styles.paymentTotal]}>
          <Text style={styles.paymentTotalLabel}>মোট:</Text>
          <Text style={styles.paymentTotalAmount}>৫২০ টাকা</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.paymentButton}>
        <CreditCard size={20} color="#FFFFFF" />
        <Text style={styles.paymentButtonText}>পেমেন্ট করুন</Text>
      </TouchableOpacity>
      
      <Text style={styles.paymentNote}>
        পেমেন্ট সফল হওয়ার পর আপনার আবেদন প্রক্রিয়াকরণ শুরু হবে
      </Text>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

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
          <Text style={styles.headerTitle}>আবেদন ফর্ম</Text>
          <View style={styles.headerPlaceholder} />
        </LinearGradient>
      </View>

      {/* Progress Bar */}
      {renderProgressBar()}

      <Animated.ScrollView 
        style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        showsVerticalScrollIndicator={false}
      >
        {renderCurrentStep()}
      </Animated.ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
            <Text style={styles.previousButtonText}>পূর্ববর্তী</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.nextButton, currentStep === 1 ? styles.nextButtonFull : null]} 
          onPress={handleNext}
        >
          <LinearGradient
            colors={['#1E40AF', '#2563EB']}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === totalSteps ? 'জমা দিন' : 'পরবর্তী'}
            </Text>
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDotActive: {
    backgroundColor: '#1E40AF',
  },
  progressDotInactive: {
    backgroundColor: '#E2E8F0',
  },
  progressDotText: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 14,
  },
  progressDotTextActive: {
    color: '#FFFFFF',
  },
  progressDotTextInactive: {
    color: '#64748B',
  },
  progressLine: {
    width: 30,
    height: 2,
    marginHorizontal: 8,
  },
  progressLineActive: {
    backgroundColor: '#1E40AF',
  },
  progressLineInactive: {
    backgroundColor: '#E2E8F0',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  stepContainer: {
    paddingBottom: 20,
  },
  stepTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 8,
  },
  stepDescription: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textArea: {
    height: 100,
    paddingTop: 16,
  },
  documentList: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  documentListTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 12,
  },
  documentItem: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#1E40AF',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  uploadButtonText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 16,
    color: '#1E40AF',
    marginLeft: 8,
  },
  uploadedDocsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  uploadedDocsTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 12,
  },
  uploadedDocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  uploadedDocText: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#10B981',
    marginLeft: 8,
  },
  paymentSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  paymentSummaryTitle: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  paymentLabel: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  paymentAmount: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  paymentTotal: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginTop: 8,
    paddingTop: 8,
  },
  paymentTotalLabel: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 16,
    color: '#1E293B',
  },
  paymentTotalAmount: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 16,
    color: '#1E40AF',
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  paymentButtonText: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  paymentNote: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  navigationContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  previousButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  previousButtonText: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 16,
    color: '#64748B',
  },
  nextButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginLeft: 8,
  },
  nextButtonFull: {
    marginLeft: 0,
  },
  nextButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
