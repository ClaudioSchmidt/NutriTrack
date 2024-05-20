import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './AddMealButtonStyles';

const AddMealButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Mahlzeit hinzufügen</Text>
    </TouchableOpacity>
  );
};

export default AddMealButton;
