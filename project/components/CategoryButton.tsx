import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

interface CategoryButtonProps {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  id, 
  name, 
  icon, 
  isSelected, 
  onSelect 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected ? styles.containerSelected : null
      ]}
      onPress={() => onSelect(id)}
      activeOpacity={0.7}
    >
      <View 
        style={[
          styles.iconContainer,
          isSelected ? styles.iconContainerSelected : null
        ]}
      >
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text 
        style={[
          styles.text,
          isSelected ? styles.textSelected : null
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  containerSelected: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainerSelected: {
    backgroundColor: '#DBEAFE',
  },
  icon: {
    fontSize: 20,
  },
  text: {
    fontFamily: 'Hind-Siliguri-Medium',
    fontSize: 12,
    color: '#64748B',
  },
  textSelected: {
    color: '#1E40AF',
  },
});

export default CategoryButton;