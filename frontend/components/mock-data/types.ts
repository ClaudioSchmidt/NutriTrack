// frontend/types.ts
export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Sustainability {
  co2PerKg: number;
  dietType: 'OMNIVORE' | 'VEGETARIAN' | 'VEGAN';
}

export interface Portion {
  label: string;
  quantity: number;
}

export interface Product {
  title: string;
  brand: string;
  category: string;
  nutrition: Nutrition;
  sustainability: Sustainability;
  portions: Portion[];
  liquid: boolean;
}
