import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {mockIngredients} from '../mock-data/mockIngredients'; // Diese Zeile kann entfernt werden, wenn die Daten von einer API abgerufen werden.
import styles from './AddIntakeStyles';

interface NutritionalValue {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  co2PerKg: number;
}

interface FoodIntake {
  name: string;
  portion: string;
  nutritionalValue: NutritionalValue;
  weight: string;
  mealType: string;
  dietaryPreference: string;
  isLiquid: boolean;
}

const AddIntake: React.FC = () => {
  const navigation = useNavigation();
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(
    null,
  );
  const [name, setName] = useState<string>('Food Title');
  const [quantity, setQuantity] = useState<string>('1');
  const [portion, setPortion] = useState<string>('');
  const [calories, setCalories] = useState<string>('');
  const [carbs, setCarbs] = useState<string>('');
  const [protein, setProtein] = useState<string>('');
  const [fat, setFat] = useState<string>('');
  const [co2PerKg, setCo2PerKg] = useState<string>('');
  const [dietType, setDietType] = useState<string>('OMNIVORE');
  const [isLiquid, setIsLiquid] = useState<string>('no');
  const [weight, setWeight] = useState<string>('');
  const [mealType, setMealType] = useState<string>('breakfast');
  const [dietaryPreference, setDietaryPreference] = useState<string>('normal');

  useEffect(() => {
    if (selectedIngredient) {
      const ingredient = mockIngredients.find(
        item => item.id === selectedIngredient,
      );
      if (ingredient) {
        setName(ingredient.name);
        setCalories(String(ingredient.nutrition.calories));
        setCarbs(String(ingredient.nutrition.carbs));
        setProtein(String(ingredient.nutrition.protein));
        setFat(String(ingredient.nutrition.fat));
      }
    }
  }, [selectedIngredient]);

  const handleIngredientChange = (ingredientId: string) => {
    setSelectedIngredient(ingredientId);
  };

  const isFormValid = () => {
    const isPortionValid =
      (isLiquid === 'yes' &&
        (portion === 'milliliters' || portion === 'liters')) ||
      (isLiquid === 'no' && portion !== 'milliliters' && portion !== 'liters');

    return (
      name.trim() !== '' &&
      quantity.trim() !== '' &&
      portion.trim() !== '' &&
      isPortionValid &&
      calories.trim() !== '' &&
      carbs.trim() !== '' &&
      protein.trim() !== '' &&
      fat.trim() !== '' &&
      co2PerKg.trim() !== ''
    );
  };

  const handleAddUpdate = async () => {
    if (!isFormValid()) {
      ToastAndroid.show('Please fill all fields correctly', ToastAndroid.SHORT);
      return;
    }

    const newIntake: FoodIntake = {
      name,
      portion,
      nutritionalValue: {
        calories: Number(calories),
        carbs: Number(carbs),
        protein: Number(protein),
        fat: Number(fat),
        co2PerKg: Number(co2PerKg),
      },
      weight,
      mealType,
      dietaryPreference,
      isLiquid: isLiquid === 'yes',
    };

    console.log('New Intake:', newIntake);

    // Hier fügen Sie die API-Integration hinzu, um die Daten zu speichern.
    // Zum Beispiel:
    /*
    try {
      const response = await fetch('https://api.yourserver.com/intakes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIntake),
      });

      if (response.ok) {
        ToastAndroid.show('Mahlzeit erfolgreich gespeichert', ToastAndroid.SHORT);
        navigation.navigate('Dashboard');
      } else {
        ToastAndroid.show('Fehler beim Speichern der Mahlzeit', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error saving intake:', error);
      ToastAndroid.show('Netzwerkfehler', ToastAndroid.SHORT);
    }
    */

    // Nach dem Speichern den Zustand zurücksetzen
    setSelectedIngredient(null);
    setName('Food Title');
    setQuantity('1');
    setPortion('');
    setCalories('');
    setCarbs('');
    setProtein('');
    setFat('');
    setCo2PerKg('');
    setDietType('OMNIVORE');
    setIsLiquid('no');
    setWeight('');
    setMealType('');
    setDietaryPreference('');
  };

  const calculatePercentage = (value: number, total: number) =>
    total === 0 ? 0 : (value / total) * 100;

  const totalNutrients = Number(carbs) + Number(protein) + Number(fat);
  const carbsPercentage = calculatePercentage(Number(carbs), totalNutrients);
  const proteinPercentage = calculatePercentage(
    Number(protein),
    totalNutrients,
  );
  const fatPercentage = calculatePercentage(Number(fat), totalNutrients);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.backButton}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 16}}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Is Liquid</Text>
        <Picker
          selectedValue={isLiquid}
          onValueChange={itemValue => setIsLiquid(String(itemValue))}
          style={styles.picker}>
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>

        <View style={styles.quantityContainer}>
          <TextInput
            style={styles.quantityInput}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            placeholderTextColor="#aaa"
          />
          <Picker
            selectedValue={portion}
            onValueChange={itemValue => setPortion(itemValue || '')}
            style={styles.picker}>
            <Picker.Item label="Select portion" value="" />
            <Picker.Item label="1/2 portion (e.g., 55g)" value="0.5" />
            <Picker.Item label="1 portion (e.g., 100g)" value="1" />
            <Picker.Item label="2 portions (e.g., 200g)" value="2" />
            <Picker.Item label="Grams" value="grams" />
            <Picker.Item label="Milliliters" value="milliliters" />
            <Picker.Item label="Liters" value="liters" />
          </Picker>
        </View>

        {(portion === '0.5' ||
          portion === '1' ||
          portion === '2' ||
          portion === 'grams' ||
          portion === 'milliliters' ||
          portion === 'liters') && (
          <TextInput
            style={styles.input}
            placeholder={
              isLiquid === 'yes' ? 'Volume (ml or l)' : 'Weight (grams)'
            }
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholderTextColor="#aaa"
          />
        )}

        <Text style={styles.label}>Meal Type</Text>
        <Picker
          selectedValue={mealType}
          onValueChange={itemValue => setMealType(String(itemValue))}
          style={styles.picker}>
          <Picker.Item label="Breakfast" value="breakfast" />
          <Picker.Item label="Snack" value="snack" />
          <Picker.Item label="Lunch" value="lunch" />
          <Picker.Item label="Dinner" value="dinner" />
        </Picker>

        <Text style={styles.label}>Diet Type</Text>
        <Picker
          selectedValue={dietType}
          onValueChange={itemValue => setDietType(String(itemValue))}
          style={styles.picker}>
          <Picker.Item label="Vegan" value="VEGAN" />
          <Picker.Item label="Vegetarian" value="VEGETARIAN" />
          <Picker.Item label="Omnivore" value="OMNIVORE" />
        </Picker>

        <View style={styles.nutritionalTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}></Text>
            <Text style={styles.tableHeaderText}>Carbs</Text>
            <Text style={styles.tableHeaderText}>Protein</Text>
            <Text style={styles.tableHeaderText}>Fat</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>%</Text>
            <Text style={styles.tableCell}>{carbsPercentage.toFixed(1)}%</Text>
            <Text style={styles.tableCell}>
              {proteinPercentage.toFixed(1)}%
            </Text>
            <Text style={styles.tableCell}>{fatPercentage.toFixed(1)}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {width: `${carbsPercentage}%`, backgroundColor: 'blue'},
              ]}
            />
            <View
              style={[
                styles.progressBar,
                {width: `${proteinPercentage}%`, backgroundColor: 'green'},
              ]}
            />
            <View
              style={[
                styles.progressBar,
                {width: `${fatPercentage}%`, backgroundColor: 'red'},
              ]}
            />
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Kcal</Text>
            <TextInput
              style={styles.tableCellInput}
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
              placeholder=""
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Carbs</Text>
            <TextInput
              style={styles.tableCellInput}
              value={carbs}
              onChangeText={setCarbs}
              keyboardType="numeric"
              placeholder=""
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Protein</Text>
            <TextInput
              style={styles.tableCellInput}
              value={protein}
              onChangeText={setProtein}
              keyboardType="numeric"
              placeholder=""
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Fat</Text>
            <TextInput
              style={styles.tableCellInput}
              value={fat}
              onChangeText={setFat}
              keyboardType="numeric"
              placeholder=""
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>CO2 per Kg</Text>
            <TextInput
              style={styles.tableCellInput}
              value={co2PerKg}
              onChangeText={setCo2PerKg}
              keyboardType="numeric"
              placeholder=""
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.addButton, {opacity: isFormValid() ? 1 : 0.5}]}
          onPress={handleAddUpdate}
          disabled={!isFormValid()}>
          <Text style={styles.addButtonText}>Add/Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddIntake;
