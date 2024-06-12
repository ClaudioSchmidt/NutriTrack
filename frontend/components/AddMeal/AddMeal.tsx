import React, {useState} from 'react';
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
import {mockIngredients} from '../mock-data/mockIngredients';
import {Ingredient} from '../mock-data/types';
import {RadioButton} from 'react-native-paper';
import styles from './AddMealStyles';

interface SelectedIngredient {
  ingredient: Ingredient;
  quantity: number;
}

const AddMeal: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<
    SelectedIngredient[]
  >([]);
  const [currentQuantities, setCurrentQuantities] = useState<{
    [key: string]: string;
  }>({});
  const [mealName, setMealName] = useState<string>('');
  const [mealType, setMealType] = useState<string>('omnivore');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedForModal, setSelectedForModal] = useState<{
    [key: string]: boolean;
  }>({});
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [selectedIngredientDetails, setSelectedIngredientDetails] =
    useState<Ingredient | null>(null);

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
        const ingredient = mockIngredients.find(item => item.id === id);
        const quantity = parseFloat(currentQuantities[id] || '1');
        return {ingredient, quantity};
      })
      .filter(item => item.ingredient);

    const updatedSelectedIngredients = [...selectedIngredients];

    newIngredients.forEach(({ingredient, quantity}) => {
      const existingIngredientIndex = updatedSelectedIngredients.findIndex(
        selected => selected.ingredient.id === ingredient.id,
      );

      if (existingIngredientIndex !== -1) {
        updatedSelectedIngredients[existingIngredientIndex].quantity +=
          quantity;
      } else {
        updatedSelectedIngredients.push({ingredient, quantity});
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
          <TouchableOpacity style={styles.photoButton}>
            <Text style={{color: '#fff'}}>Photo of meal</Text>
          </TouchableOpacity>
          <View style={styles.mealTypeContainer}>
            <Text style={styles.mealTypeLabel}>Meal Type:</Text>
            <RadioButton.Group
              onValueChange={value => setMealType(value)}
              value={mealType}>
              <View style={styles.radioGroup}>
                <RadioButton value="omnivore" />
                <Text style={styles.radioLabel}>Omnivore</Text>
              </View>
              <View style={styles.radioGroup}>
                <RadioButton value="vegetarian" />
                <Text style={styles.radioLabel}>Vegetarian</Text>
              </View>
              <View style={styles.radioGroup}>
                <RadioButton value="vegan" />
                <Text style={styles.radioLabel}>Vegan</Text>
              </View>
            </RadioButton.Group>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meal Content</Text>
          <TouchableOpacity
            style={styles.addFoodButton}
            onPress={() => setIsModalVisible(true)}>
            <Text style={styles.addFoodButtonText}>+ Add food to Meal</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
            <Text style={styles.collapseButton}>
              {isCollapsed ? 'Show Ingredients' : 'Hide Ingredients'}
            </Text>
          </TouchableOpacity>
          {!isCollapsed && (
            <FlatList
              data={selectedIngredients}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleIngredientPress(item.ingredient)}>
                  <View style={styles.selectedIngredientItem}>
                    <Text style={styles.ingredientName}>
                      {item.ingredient.name} ({formatValue(item.quantity * 100)}
                      g)
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Food</Text>
            <FlatList
              data={mockIngredients}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View
                  style={[
                    styles.ingredientContainer,
                    selectedForModal[item.id] && styles.selectedItem,
                  ]}>
                  <TouchableOpacity
                    style={styles.ingredientItem}
                    onPress={() => toggleSelectForModal(item.id)}>
                    <Text style={styles.ingredientName}>{item.name}</Text>
                    <Text style={{color: '#ccc'}}>Brand: {item.brand}</Text>
                    <Text style={{color: '#ccc'}}>
                      Category: {item.category}
                    </Text>
                    <Text style={{color: '#ccc'}}>
                      Calories (per 100g): {item.nutrition.calories}
                    </Text>
                    <Text style={{color: '#ccc'}}>
                      Protein (per 100g): {item.nutrition.protein}g
                    </Text>
                    <Text style={{color: '#ccc'}}>
                      Carbs (per 100g): {item.nutrition.carbs}g
                    </Text>
                    <Text style={{color: '#ccc'}}>
                      Fat (per 100g): {item.nutrition.fat}g
                    </Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    keyboardType="numeric"
                    value={currentQuantities[item.id]}
                    onChangeText={value => handleQuantityChange(item.id, value)}
                    onBlur={() => handleBlur(item.id)}
                    placeholder="Quantity"
                    placeholderTextColor="#ccc"
                  />
                </View>
              )}
            />
            <Button
              title={
                Object.values(selectedForModal).some(value => value)
                  ? 'Save'
                  : 'Close'
              }
              onPress={addSelectedIngredientsToMeal}
            />
          </View>
        </Modal>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Nutritional Information (per serving)
          </Text>
          <View style={styles.nutritionInfo}>
            <Text style={{color: '#fff'}}>
              Calories: {calculateTotalNutrition('calories', true)} kcal
            </Text>
            <Text style={{color: '#fff'}}>
              Protein: {calculateTotalNutrition('protein')} g
            </Text>
            <Text style={{color: '#fff'}}>
              Net carbs: {calculateTotalNutrition('carbs')} g
            </Text>
            <Text style={{color: '#fff'}}>
              Fat: {calculateTotalNutrition('fat')} g
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor:
              mealName && selectedIngredients.length > 0
                ? '#007bff'
                : '#cccccc',
          },
        ]}
        disabled={!mealName || selectedIngredients.length === 0}>
        <Text style={styles.addButtonText}>ADD MEAL</Text>
      </TouchableOpacity>

      <Modal
        visible={!!selectedIngredientDetails}
        animationType="slide"
        onRequestClose={closeIngredientDetailsModal}>
        <View style={styles.modalContainer}>
          {selectedIngredientDetails && (
            <>
              <Text style={styles.modalTitle}>
                {selectedIngredientDetails.name}
              </Text>
              <Text style={{color: '#ccc'}}>
                Brand: {selectedIngredientDetails.brand}
              </Text>
              <Text style={{color: '#ccc'}}>
                Category: {selectedIngredientDetails.category}
              </Text>
              <Text style={{color: '#ccc'}}>
                Calories (per 100g):{' '}
                {selectedIngredientDetails.nutrition.calories}
              </Text>
              <Text style={{color: '#ccc'}}>
                Protein (per 100g):{' '}
                {selectedIngredientDetails.nutrition.protein}g
              </Text>
              <Text style={{color: '#ccc'}}>
                Carbs (per 100g): {selectedIngredientDetails.nutrition.carbs}g
              </Text>
              <Text style={{color: '#ccc'}}>
                Fat (per 100g): {selectedIngredientDetails.nutrition.fat}g
              </Text>
              <Button title="Close" onPress={closeIngredientDetailsModal} />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default AddMeal;
