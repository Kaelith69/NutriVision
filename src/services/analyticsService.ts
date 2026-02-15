import { MealLog, UserProfile, FoodItem } from '../types';
import { calculateTDEE, calculateMacroTargets, calculateWaterTarget } from './metabolicService';

export interface DailySummary {
    date: string;
    totalCalories: number;
    totalProtein: number;
    totalFat: number;
    totalCarbs: number;
    waterIntake: number;
    mealCount: number;
}

export interface WeeklyReport {
    startDate: string;
    endDate: string;
    avgCalories: number;
    avgProtein: number;
    avgFat: number;
    avgCarbs: number;
    avgWater: number;
    weightChangePred: number; // kg
    complianceScore: number; // 0-100%
    insights: string[];
}

/**
 * Aggregates logs into daily summaries
 */
export const getDailySummaries = (
    mealLogs: MealLog[],
    waterLogs: Record<string, number>,
    days: number = 7
): DailySummary[] => {
    const summaries: DailySummary[] = [];
    const now = new Date();

    for (let i = 0; i < days; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
        const dateKey = d.toISOString().split('T')[0]; // Matches water log key format

        // Filter meals for this day
        const dayStart = new Date(d.setHours(0, 0, 0, 0)).getTime();
        const dayEnd = new Date(d.setHours(23, 59, 59, 999)).getTime();

        const dayMeals = mealLogs.filter(log => log.timestamp >= dayStart && log.timestamp <= dayEnd);

        const summary = dayMeals.reduce((acc, meal) => ({
            totalCalories: acc.totalCalories + meal.totalCalories,
            totalProtein: acc.totalProtein + meal.totalProtein,
            totalFat: acc.totalFat + meal.totalFat,
            totalCarbs: acc.totalCarbs + meal.totalCarbs,
            mealCount: acc.mealCount + 1,
        }), { totalCalories: 0, totalProtein: 0, totalFat: 0, totalCarbs: 0, mealCount: 0 });

        summaries.push({
            date: dateStr,
            ...summary,
            waterIntake: waterLogs[dateKey] || 0
        });
    }

    return summaries;
};

/**
 * Generates a comprehensive weekly report with insights
 */
export const generateWeeklyReport = (
    mealLogs: MealLog[],
    waterLogs: Record<string, number>,
    profile: UserProfile
): WeeklyReport => {
    const summaries = getDailySummaries(mealLogs, waterLogs, 7);

    // Calculate Averages
    const totalDays = summaries.length; // Should be 7, but robust for empty
    if (totalDays === 0) throw new Error("No data for report");

    const distinctDaysWithData = summaries.filter(s => s.totalCalories > 0 || s.waterIntake > 0).length || 1;

    const totals = summaries.reduce((acc, s) => ({
        cals: acc.cals + s.totalCalories,
        pro: acc.pro + s.totalProtein,
        fat: acc.fat + s.totalFat,
        carb: acc.carb + s.totalCarbs,
        water: acc.water + s.waterIntake
    }), { cals: 0, pro: 0, fat: 0, carb: 0, water: 0 });

    const avgs = {
        cals: totals.cals / distinctDaysWithData,
        pro: totals.pro / distinctDaysWithData,
        fat: totals.fat / distinctDaysWithData,
        carb: totals.carb / distinctDaysWithData,
        water: totals.water / distinctDaysWithData
    };

    // Scientific Insights Engine
    const insights: string[] = [];
    const targets = calculateMacroTargets(profile.tdee, profile.weightKg);
    const waterTarget = calculateWaterTarget(profile.weightKg, profile.activityLevel);

    // 1. Caloric Adherence
    const caloricDiff = avgs.cals - profile.dailyCalorieTarget;
    if (caloricDiff > 500) insights.push("⚠️ Weekly average exceeds surplus target. Reduce intake to prevent unwanted fat gain.");
    else if (caloricDiff < -500) insights.push("⚠️ Severe deficit detected. Risk of metabolic adaptation/muscle loss. Increase intake.");
    else insights.push("✅ Caloric intake within optimal range for goal.");

    // 2. Protein Threshold for Hypertrophy/Retention
    if (avgs.pro < profile.weightKg * 1.6) {
        insights.push(`📉 Protein intake (${Math.round(avgs.pro)}g) is suboptimal for muscle retention. Target >${Math.round(profile.weightKg * 1.6)}g.`);
    } else {
        insights.push("💪 Protein intake optimal for nitrogen balance.");
    }

    // 3. Hydration Status
    if (avgs.water < waterTarget * 0.8) {
        insights.push(`💧 Chronic dehydration detected (${Math.round(avgs.water)}ml avg). Performance impact likely.`);
    }

    // 4. Meal Frequency Analysis
    const avgMeals = summaries.reduce((acc, s) => acc + s.mealCount, 0) / distinctDaysWithData;
    if (avgMeals < 2 && avgs.cals > 1000) {
        insights.push("🍽️ Low meal frequency with high caloric density detected. Consider splitting intake for better glycemic control.");
    }

    // Compliance Score Calculation (Simple heuristic)
    let score = 100;
    if (Math.abs(caloricDiff) > 300) score -= 10;
    if (Math.abs(caloricDiff) > 600) score -= 10;
    if (avgs.pro < targets.protein) score -= 15;
    if (avgs.water < waterTarget) score -= 10;

    return {
        startDate: summaries[6].date,
        endDate: summaries[0].date,
        avgCalories: avgs.cals,
        avgProtein: avgs.pro,
        avgFat: avgs.fat,
        avgCarbs: avgs.carb,
        avgWater: avgs.water,
        weightChangePred: (totals.cals - (profile.tdee * distinctDaysWithData)) / 7700,
        complianceScore: Math.max(0, Math.round(score)),
        insights
    };
};

export const generateCSV = (summaries: DailySummary[]) => {
    const headers = ["Date", "Calories", "Protein (g)", "Fat (g)", "Carbs (g)", "Water (ml)", "Meal Count"];
    const rows = summaries.map(s => [
        s.date,
        s.totalCalories.toFixed(0),
        s.totalProtein.toFixed(1),
        s.totalFat.toFixed(1),
        s.totalCarbs.toFixed(1),
        s.waterIntake.toFixed(0),
        s.mealCount
    ]);
    return [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
};
