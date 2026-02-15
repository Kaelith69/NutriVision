
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
  // Input Validation
  if (age < 0 || weightKg < 0 || heightCm < 0) {
    console.error("Invalid metabolic inputs");
    return 1500; // Safe fallback
  }

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
 * Scientific Hydration Target (ml)
 * Baseline: 35ml per kg of bodyweight
 * Activity Adder: 500ml per activity level step above sedentary
 */
export const calculateWaterTarget = (weightKg: number, activityLevel: ActivityLevel): number => {
  const baseline = weightKg * 35;
  const activityAdder = (activityLevel - 1.2) * 1000; // Approx 200ml per 0.2 step
  return Math.round(baseline + Math.max(0, activityAdder));
};


/**
 * Macro Partitioning Logic
 * Protein: 1.6g - 2.2g per kg (using 1.8g as balanced standard)
 * Fat: 0.8g per kg (hormonal baseline)
 * Carbs: Remainder of TDEE
 */
export const calculateMacroTargets = (tdee: number, weightKg: number) => {
  const proteinGrams = Math.round(weightKg * 1.8);
  const fatGrams = Math.round(weightKg * 0.8);

  const proteinCals = proteinGrams * 4;
  const fatCals = fatGrams * 9;

  // Safety Guard: Clamp remaining calories to 0 to prevent negative carbs
  const remainingCals = Math.max(0, tdee - (proteinCals + fatCals));
  const carbGrams = Math.round(remainingCals / 4);

  return {
    protein: proteinGrams,
    fat: fatGrams,
    carbs: carbGrams
  };
};

/**
 * Predicts weight change based on net energy balance over 7 days.
 * 7700 kcal ≈ 1kg of fat
 */
export const predictWeightChange = (netEnergyBalance: number): number => {
  return netEnergyBalance / 7700;
};
