import React from 'react';
import {View, Text} from 'react-native';
import CircularProgress from './CircularProgress/CircularProgress';
import MealHistory from './MealHistory/MealHistory';
import AddMealButton from './AddMealButton/AddMealButton';
import SearchField from './SearchField/SearchField';
import styles from './DashboardStyles';
import Score from './Score/Score';

const Dashboard: React.FC = () => {
  const dailyCalorieIntake = 2300;
  const caloriesEaten = 1300;
  const progress = (caloriesEaten / dailyCalorieIntake) * 100;

  return (
    <View style={{flex: 1, backgroundColor: 'darkgrey'}}>
      <View>
        <SearchField />
      </View>

      <View
        style={{
          width: '100%',
          height: 300,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <CircularProgress
            strokeWidth={20}
            progress={progress}
            calories={caloriesEaten}
          />
        </View>

        <View
          style={{
            margin: 10,
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 80,
            height: 80,
          }}>
          <AddMealButton />
        </View>
      </View>
      <View>
        <Score />
      </View>
      <View style={{flex: 1}}>
        <MealHistory />
      </View>
    </View>
  );
};

export default Dashboard;
