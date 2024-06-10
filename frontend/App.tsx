import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AddMeal from './components/AddMeal/AddMeal';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AddMeal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
