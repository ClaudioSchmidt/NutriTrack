import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './AddMealButtonStyles';

const AddMealButton: React.FC = () => {
  const handleButtonPress = () => {
    console.log('Add food button pressed');
  };
  return (
    <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
      <Text
        adjustsFontSizeToFit={true}
        numberOfLines={1}
        style={styles.buttonText}>
        +
      </Text>
    </TouchableOpacity>
  );
};

export default AddMealButton;
