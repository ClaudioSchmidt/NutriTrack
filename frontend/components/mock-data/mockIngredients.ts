// frontend/components/mock-data/mockIngredients.ts
import {Ingredient} from './types';

export const mockIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Chicken Breast',
    brand: 'Brand A',
    category: 'Meat',
    nutrition: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
    },
    sustainability: {
      co2PerKg: 6.9,
      dietType: 'Omnivore',
    },
  },
  {
    id: '2',
    name: 'Broccoli',
    brand: 'Brand B',
    category: 'Vegetable',
    nutrition: {
      calories: 55,
      protein: 3.7,
      carbs: 11.2,
      fat: 0.6,
    },
    sustainability: {
      co2PerKg: 0.5,
      dietType: 'Vegan',
    },
  },
  {
    id: '3',
    name: 'Paprika',
    brand: 'Brand C',
    category: 'Spice',
    nutrition: {
      calories: 282,
      protein: 14.1,
      carbs: 54.7,
      fat: 12.9,
    },
    sustainability: {
      co2PerKg: 1.1,
      dietType: 'Vegan',
    },
  },
  {
    id: '4',
    name: 'Garlic',
    brand: 'Brand D',
    category: 'Vegetable',
    nutrition: {
      calories: 149,
      protein: 6.4,
      carbs: 33.1,
      fat: 0.5,
    },
    sustainability: {
      co2PerKg: 0.3,
      dietType: 'Vegan',
    },
  },
  {
    id: '5',
    name: 'Olive Oil',
    brand: 'Brand E',
    category: 'Oil',
    nutrition: {
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
    },
    sustainability: {
      co2PerKg: 2.5,
      dietType: 'Vegan',
    },
  },
];
