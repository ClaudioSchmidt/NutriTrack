// frontend/components/mock-data/types.ts
export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Sustainability {
  co2PerKg: number;
  dietType: string;
}

export interface Ingredient {
  id: string;
  name: string;
  brand: string;
  category: string;
  nutrition: Nutrition;
  sustainability: Sustainability;
}
