import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ImageSourcePropType,
  Platform
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

interface ServiceCardProps {
  name: string;
  description: string;
  icon: ImageSourcePropType | string;
  bgColor: string;
  onPress?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  name, 
  description, 
  icon, 
  bgColor = '#F8FAFC',
  onPress 
}) => {
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (onPress) {
      onPress();
    } else {
      // Navigate to service details screen
      router.push('/service-details');
    }
  };

  const renderIcon = () => {
    if (typeof icon === 'string') {
      // Handle emoji icons
      return <Text style={styles.emojiIcon}>{icon}</Text>;
    } else {
      // Handle image icons
      return <Image source={icon} style={styles.icon} />;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: bgColor }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.arrowContainer}>
        <ChevronRight size={16} color="#1E40AF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
  emojiIcon: {
    fontSize: 24,
    textAlign: 'center',
  },
  name: {
    fontFamily: 'Hind-Siliguri-Bold',
    fontSize: 14,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Hind-Siliguri-Regular',
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default ServiceCard;