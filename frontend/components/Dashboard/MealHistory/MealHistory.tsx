import React from 'react';
import {View, Text} from 'react-native';
import styles from './MealHistoryStyles';

const MealHistory: React.FC = () => {
  const meals = ['Subway (100 g)', 'BigMac (150 g)', 'Schinken Pizza (200 g)'];

  return (
    <View style={styles.mealHistoryContainer}>
      <Text style={styles.historyHeader}>History</Text>
      {meals.map((meal, index) => (
        <View key={index} style={styles.mealItem}>
          <Text style={styles.mealText}>{meal}</Text>
        </View>
      ))}
    </View>
  );
};

export default MealHistory;
