// frontend/components/AddMeal/addMeal.tsx
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {mockProduct} from '../mock-data/mockData';
import {Product} from '../mock-data/types';
import styles from './AddMealStyles';

const AddMeal: React.FC = () => {
  const product: Product = mockProduct;
  console.log('Rendering AddMeal component');
  console.log('Product data:', product);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the AddMeal Component</Text>
      <Text style={styles.title}>{product.title}</Text>
      <Text>Brand: {product.brand}</Text>
      <Text>Category: {product.category}</Text>
      <View style={styles.nutrition}>
        <Text>Calories: {product.nutrition.calories}</Text>
        <Text>Protein: {product.nutrition.protein}g</Text>
        <Text>Carbs: {product.nutrition.carbs}g</Text>
        <Text>Fat: {product.nutrition.fat}g</Text>
      </View>
      <View style={styles.sustainability}>
        <Text>CO2 per Kg: {product.sustainability.co2PerKg}</Text>
        <Text>Diet Type: {product.sustainability.dietType}</Text>
      </View>
      <FlatList
        data={product.portions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.portion}>
            <Text>Portion: {item.label}</Text>
            <Text>Quantity: {item.quantity}g</Text>
          </View>
        )}
      />
      <Text>Liquid: {product.liquid ? 'Yes' : 'No'}</Text>
    </View>
  );
};

export default AddMeal;
