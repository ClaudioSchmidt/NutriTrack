import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  ScrollView,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import styles from './AddMealStyles';
import UserService from '../../android/app/src/services/UserService';
import MealService from '../../android/app/src/services/MealService';
import { Ingredient } from '../mock-data/types'; // Assuming this type is defined somewhere in your project

const userService = new UserService();
const mealService = new MealService();

const AddMeal: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<{ ingredient: Ingredient; quantity: number }[]>([]);
  const [currentQuantities, setCurrentQuantities] = useState<{ [key: string]: string }>({});
  const [mealName, setMealName] = useState<string>('');
  const [mealType, setMealType] = useState<string>('omnivore');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedForModal, setSelectedForModal] = useState<{ [key: string]: boolean }>({});
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [selectedIngredientDetails, setSelectedIngredientDetails] = useState<Ingredient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const authenticateAndFetchData = async () => {
      try {
        const token = await userService.authenticateUser('username', 'password');
        mealService.setAuthToken(token);
        const response = await mealService.getMealsByUser();
        setIngredients(response);
      } catch (error: any) {
        setError(error.message);
      }
    };

    authenticateAndFetchData();
  }, []);

  const handleQuantityChange = (id: string, value: string) => {
    const regex = /^\d*\.?\d{0,1}$/;
    if (regex.test(value)) {
      setCurrentQuantities({
        ...currentQuantities,
        [id]: value,
      });
    }
  };

  const handleBlur = (id: string) => {
    if (!currentQuantities[id]) {
      setCurrentQuantities({
        ...currentQuantities,
        [id]: '1',
      });
    }
  };

  const toggleSelectForModal = (id: string) => {
    setSelectedForModal({
      ...selectedForModal,
      [id]: !selectedForModal[id],
    });
  };

  const addSelectedIngredientsToMeal = () => {
    const newIngredients = Object.keys(selectedForModal)
      .filter(id => selectedForModal[id])
      .map(id => {
        const ingredient = ingredients.find(item => item.id === id);
        const quantity = parseFloat(currentQuantities[id] || '1');
        return { ingredient, quantity };
      })
      .filter(item => item.ingredient);

    const updatedSelectedIngredients = [...selectedIngredients];

    newIngredients.forEach(({ ingredient, quantity }) => {
      const existingIngredientIndex = updatedSelectedIngredients.findIndex(
        selected => selected.ingredient.id === ingredient.id,
      );

      if (existingIngredientIndex !== -1) {
        updatedSelectedIngredients[existingIngredientIndex].quantity += quantity;
      } else {
        updatedSelectedIngredients.push({ ingredient, quantity });
      }
    });

    setSelectedIngredients(updatedSelectedIngredients);
    setIsModalVisible(false);
    setSelectedForModal({});
    setCurrentQuantities({});
  };

  const formatValue = (value: number, asInt = false) => {
    if (asInt) {
      return Math.round(value).toString();
    }
    return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
  };

  const calculateTotalNutrition = (
    nutrient: keyof Ingredient['nutrition'],
    asInt = false,
  ) => {
    const total = selectedIngredients.reduce((total, item) => {
      return total + item.ingredient.nutrition[nutrient] * item.quantity;
    }, 0);
    return formatValue(total, asInt);
  };

  const handleIngredientPress = (ingredient: Ingredient) => {
    setSelectedIngredientDetails(ingredient);
  };

  const closeIngredientDetailsModal = () => {
    setSelectedIngredientDetails(null);
  };

  const handleAddMeal = async () => {
    const mealData = {
      name: mealName,
      type: mealType,
      ingredients: selectedIngredients.map(item => ({
        id: item.ingredient.id,
        quantity: item.quantity,
      })),
    };

    try {
      await mealService.createMeal(mealData);
      alert('Meal added successfully');
    } catch (error) {
      alert('Error adding meal');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Meal</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meal Info</Text>
          <TextInput
            style={styles.input}
            placeholder="Name of meal"
            placeholderTextColor="#ccc"
            value={mealName}
            onChangeText={setMealName}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Type:</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                value="omnivore"
                status={mealType === 'omnivore' ? 'checked' : 'unchecked'}
                onPress={() => setMealType('omnivore')}
              />
              <Text style={styles.radioText}>Omnivore</Text>
              <RadioButton
                value="vegetarian"
                status={mealType === 'vegetarian' ? 'checked' : 'unchecked'}
                onPress={() => setMealType('vegetarian')}
              />
              <Text style={styles.radioText}>Vegetarian</Text>
              <RadioButton
                value="vegan"
                status={mealType === 'vegan' ? 'checked' : 'unchecked'}
                onPress={() => setMealType('vegan')}
              />
              <Text style={styles.radioText}>Vegan</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setIsCollapsed(!isCollapsed)}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <Text style={styles.collapseButton}>
              {isCollapsed ? '+' : '-'}
            </Text>
          </TouchableOpacity>
          {!isCollapsed && (
            <View>
              {selectedIngredients.map(item => (
                <TouchableOpacity
                  key={item.ingredient.id}
                  style={styles.ingredientItem}
                  onPress={() => handleIngredientPress(item.ingredient)}>
                  <Text style={styles.ingredientName}>{item.ingredient.name}</Text>
                  <Text style={styles.ingredientQuantity}>
                    Quantity: {formatValue(item.quantity)}g
                  </Text>
                </TouchableOpacity>
              ))}
              <Button
                title="Add Ingredients"
                onPress={() => setIsModalVisible(true)}
              />
            </View>
          )}
        </View>

        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <FlatList
              data={ingredients}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.ingredientContainer,
                    selectedForModal[item.id] && styles.selectedItem,
                  ]}>
                  <TouchableOpacity
                    style={styles.ingredientItem}
                    onPress={() => toggleSelectForModal(item.id)}>
                    <Text style={styles.ingredientName}>{item.name}</Text>
                    <Text style={{ color: '#ccc' }}>Brand: {item.brand}</Text>
                    <Text style={{ color: '#ccc' }}>Category: {item.category}</Text>
                    <Text style={{ color: '#ccc' }}>
                      Calories (per 100g): {item.nutrition.calories}
                    </Text>
                    <Text style={{ color: '#ccc' }}>
                      Protein (per 100g): {item.nutrition.protein}g
                    </Text>
                    <Text style={{ color: '#ccc' }}>
                      Carbs (per 100g): {item.nutrition.carbs}g
                    </Text>
                    <Text style={{ color: '#ccc' }}>
                      Fat (per 100g): {item.nutrition.fat}g
                    </Text>
                  </TouchableOpacity>
                  {selectedForModal[item.id] && (
                    <TextInput
                    style={styles.quantityInput}
                    keyboardType="numeric"
                    placeholder="Qty"
                    placeholderTextColor="#ccc"
                    value={currentQuantities[item.id] || ''}
                    onChangeText={value =>
                      handleQuantityChange(item.id, value)
                    }
                    onBlur={() => handleBlur(item.id)}
                  />
                )}
              </View>
            )}
          />
          <Button title="Add to Meal" onPress={addSelectedIngredientsToMeal} />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>

      {selectedIngredientDetails && (
        <Modal visible={true} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {selectedIngredientDetails.name}
            </Text>
            <Text style={{ color: '#ccc' }}>
              Brand: {selectedIngredientDetails.brand}
            </Text>
            <Text style={{ color: '#ccc' }}>
              Category: {selectedIngredientDetails.category}
            </Text>
            <Text style={{ color: '#ccc' }}>
              Calories (per 100g): {selectedIngredientDetails.nutrition.calories}
            </Text>
            <Text style={{ color: '#ccc' }}>
              Protein (per 100g): {selectedIngredientDetails.nutrition.protein}g
            </Text>
            <Text style={{ color: '#ccc' }}>
              Carbs (per 100g): {selectedIngredientDetails.nutrition.carbs}g
            </Text>
            <Text style={{ color: '#ccc' }}>
              Fat (per 100g): {selectedIngredientDetails.nutrition.fat}g
            </Text>
            <Button title="Close" onPress={closeIngredientDetailsModal} />
          </View>
        </Modal>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutritional Values</Text>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Calories:</Text>
          <Text style={styles.nutritionValue}>
            {calculateTotalNutrition('calories', true)} kcal
          </Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Protein:</Text>
          <Text style={styles.nutritionValue}>
            {calculateTotalNutrition('protein')} g
          </Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Carbs:</Text>
          <Text style={styles.nutritionValue}>
            {calculateTotalNutrition('carbs')} g
          </Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Fat:</Text>
          <Text style={styles.nutritionValue}>
            {calculateTotalNutrition('fat')} g
          </Text>
        </View>
      </View>
      <Button title="Add Meal" onPress={handleAddMeal} />
    </ScrollView>
  </View>
);
};

export default AddMeal;
