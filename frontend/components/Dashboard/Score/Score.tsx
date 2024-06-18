import React from 'react';
import styles from './ScoreStyles';
import {SafeAreaView, Text} from 'react-native';

const Score: React.FC = () => {
  const caloriesToday = 1300;
  const proteinToday = 100;
  const fatToday = 50;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.leftText}>{caloriesToday} kcal</Text>
      <Text style={styles.centerText}>{proteinToday} g</Text>
      <Text style={styles.rightText}>{fatToday} g</Text>
    </SafeAreaView>
  );
};

export default Score;
