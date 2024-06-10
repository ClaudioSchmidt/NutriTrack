// frontend/components/Dashboard/AddMealButton.tsx
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './AddMealButtonStyles';

interface AddMealButtonProps {
  onPress: () => void;
}

const AddMealButton: React.FC<AddMealButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Mahlzeit hinzufügen</Text>
    </TouchableOpacity>
  );
};

export default AddMealButton;
