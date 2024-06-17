import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import Dashboard from './components/Dashboard/Dashboard';
import AddIntake from './components/AddIntake/AddIntake';
// import MealHistory from './frontend/components/MealHistory/MealHistory'; // Uncomment this line when you add MealHistory component

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen
            name="AddIntake"
            component={AddIntake}
            options={{title: 'Add Meal Intake'}}
          />
          {/* <Stack.Screen
            name="MealHistory"
            component={MealHistory}
            options={{ title: 'Meal History' }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
