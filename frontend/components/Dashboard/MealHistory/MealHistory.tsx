import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './MealHistoryStyles';

const MealHistory: React.FC = () => {
  interface Meal {
    title: string; // e.g. BigMac, Schinken Pizza
    brand?: string; // e.g. Subway, McDonalds, Home Made
    category?: string; // e.g. Fast Food, Restaurant, Home Made
    portionSize: number; // in grams
  }

  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealsToday, setMealsToday] = useState<Meal[]>([]);

  const test: Meal[] = [
    {
      title: 'BigMac',
      portionSize: 150,
      brand: 'McDonalds',
      category: 'Fast Food',
    },
    {
      title: 'Schinken Pizza',
      portionSize: 200,
      brand: 'Pizza Hut',
      category: 'Restaurant',
    },
    {
      title: 'Salat',
      portionSize: 100,
      brand: 'Home Made',
      category: 'Healthy',
    },
    {
      title: 'Apfel',
      portionSize: 200,
      brand: 'Farm Fresh',
      category: 'Fruit',
    },
    {
      title: 'Burger',
      portionSize: 250,
      brand: 'Burger King',
      category: 'Fast Food',
    },
    {
      title: 'Fries',
      portionSize: 150,
      brand: 'McDonalds',
      category: 'Fast Food',
    },
    {
      title: 'Coke',
      portionSize: 300,
      brand: 'Coca Cola',
      category: 'Beverage',
    },
  ];

  const init: Meal[] = [
    {
      title: 'Init example meal 1',
      portionSize: 0,
    },
  ];
  useEffect(() => {
    setMealsToday(init);
  }, []);

  const handleButtonLeft = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
    setMealForToday(currentDate);
    console.log('Left button pressed');
  };
  const handleButtonRight = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
    setMealForToday(currentDate);
    console.log('Right button pressed');
  };

  const setMealForToday = (date: Date) => {
    //Get meals from backend/db
    console.log('Getting meals for date: ' + date);
    setMealsToday(test);
  };

  return (
    <View style={{flex: 1}}>
      {/* Upper Part */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 10,
        }}>
        <TouchableOpacity onPress={handleButtonLeft} style={styles.button}>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={styles.buttonText}>
            &lt;
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: '#4CAF50',
            fontSize: 25,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontWeight: 'bold',
          }}>
          {currentDate.getDate()}.{currentDate.getMonth() + 1}.
          {currentDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={handleButtonRight} style={styles.button}>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={styles.buttonText}>
            &gt;
          </Text>
        </TouchableOpacity>
      </View>
      {/* Lower Part */}
      <View style={{flex: 1}}>
        <ScrollView
          overScrollMode="always"
          style={{flex: 1, padding: 5}}
          contentContainerStyle={{paddingBottom: 10}}>
          {mealsToday.map((meal, index) => (
            <View key={index} style={styles.mealContainer}>
              <Text style={styles.mealTitle}>{meal.title}</Text>
              <Text>Portionsgröße: {meal.portionSize}g</Text>
              {meal.brand && <Text>Marke: {meal.brand}</Text>}
              {meal.category && <Text>Kategorie: {meal.category}</Text>}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MealHistory;
