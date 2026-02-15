
import { UserProfile, BiologicalSex, ActivityLevel } from '../types';

/**
 * Calculates BMR using the Mifflin-St Jeor Equation
 */
export const calculateBMR = (
  age: number,
  sex: BiologicalSex,
  weightKg: number,
  heightCm: number
): number => {
  if (sex === BiologicalSex.MALE) {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
};

/**
 * Calculates TDEE based on BMR and Activity Level
 */
export const calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
  return bmr * activityLevel;
};

/**
 * Predicts weight change based on net energy balance over 7 days.
 * 7700 kcal ≈ 1kg of fat
 */
export const predictWeightChange = (netEnergyBalance: number): number => {
  return netEnergyBalance / 7700;
};
