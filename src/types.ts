
export enum BiologicalSex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum ActivityLevel {
  SEDENTARY = 1.2,
  LIGHTLY_ACTIVE = 1.375,
  MODERATELY_ACTIVE = 1.55,
  VERY_ACTIVE = 1.725,
  EXTREMELY_ACTIVE = 1.9
}

export interface UserProfile {
  age: number;
  sex: BiologicalSex;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  targetWeightKg: number;
  bmr: number;
  tdee: number;
  dailyCalorieTarget: number;
}

export interface FoodItem {
  id: string;
  name: string;
  portionGrams: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber?: number;
  sodium?: number;
  confidence: number;
  isUserCorrected?: boolean;
}

export interface MealLog {
  id: string;
  timestamp: number;
  imageUrl: string;
  items: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  uncertaintyRange: [number, number]; // [min, max]
}

export interface WaterLog {
  date: string; // YYYY-MM-DD
  amountMl: number;
}
