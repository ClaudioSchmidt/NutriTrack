// frontend/mock-data/mockData.ts
import {Product} from './types';

export const mockProduct: Product = {
  title: 'Sample Product',
  brand: 'Sample Brand',
  category: 'Sample Category',
  nutrition: {
    calories: 200,
    protein: 10,
    carbs: 30,
    fat: 10,
  },
  sustainability: {
    co2PerKg: 1.5,
    dietType: 'VEGETARIAN',
  },
  portions: [
    {
      label: 'Serving',
      quantity: 100,
    },
  ],
  liquid: false,
};
