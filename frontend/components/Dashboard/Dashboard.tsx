import React from 'react';
import {View, Text} from 'react-native';
import CircularProgress from './CircularProgress/CircularProgress';
import MealHistory from './MealHistory/MealHistory';
import AddMealButton from './AddMealButton/AddMealButton';
import styles from './DashboardStyles';

const Dashboard: React.FC = () => {
  const dailyCalorieIntake = 2300;
  const caloriesEaten = 1300;
  const progress = (caloriesEaten / dailyCalorieIntake) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Score</Text>
      <CircularProgress
        size={200}
        strokeWidth={20}
        progress={progress}
        calories={caloriesEaten}
      />
      <MealHistory />
      <AddMealButton />
    </View>
  );
};

export default Dashboard;
