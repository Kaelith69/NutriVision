
import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, MealLog, WaterLog } from './types';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';
import { Layout } from './components/Layout';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nutrivision_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [mealLogs, setMealLogs] = useState<MealLog[]>(() => {
    const saved = localStorage.getItem('nutrivision_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [waterLogs, setWaterLogs] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('nutrivision_water');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('nutrivision_profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('nutrivision_logs', JSON.stringify(mealLogs));
  }, [mealLogs]);

  useEffect(() => {
    localStorage.setItem('nutrivision_water', JSON.stringify(waterLogs));
  }, [waterLogs]);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleAddMeal = (meal: MealLog) => {
    setMealLogs(prev => [meal, ...prev]);
  };

  const handleUpdateMeal = (updatedMeal: MealLog) => {
    setMealLogs(prev => prev.map(m => m.id === updatedMeal.id ? updatedMeal : m));
  };

  const handleDeleteMeal = (id: string) => {
    setMealLogs(prev => prev.filter(m => m.id !== id));
  };

  const handleLogWater = (amount: number) => {
    const date = new Date().toISOString().split('T')[0];
    setWaterLogs(prev => ({
      ...prev,
      [date]: (prev[date] || 0) + amount
    }));
  };

  const handleExportData = useCallback(() => {
    if (!userProfile) return;

    const headers = ["Timestamp", "Category", "Item/Attribute", "Value", "Calories", "Protein (g)", "Carbs (g)", "Fat (g)", "Verification"];
    const rows: (string | number)[][] = [];

    // User Profile
    const p = userProfile;
    const nowStr = new Date().toISOString();
    rows.push([nowStr, "PROFILE", "Age", p.age, "", "", "", "", ""]);
    rows.push([nowStr, "PROFILE", "Sex", p.sex, "", "", "", "", ""]);
    rows.push([nowStr, "PROFILE", "Height (cm)", p.heightCm, "", "", "", "", ""]);
    rows.push([nowStr, "PROFILE", "Weight (kg)", p.weightKg, "", "", "", "", ""]);
    rows.push([nowStr, "PROFILE", "Activity Multiplier", p.activityLevel, "", "", "", "", ""]);
    rows.push([nowStr, "PROFILE", "Daily Calorie Target", p.dailyCalorieTarget, "", "", "", "", ""]);

    // Meal Logs
    mealLogs.forEach(log => {
      log.items.forEach(item => {
        rows.push([
          new Date(log.timestamp).toISOString(),
          "MEAL",
          item.name,
          `${item.portionGrams}g`,
          item.calories,
          item.protein,
          item.carbs,
          item.fat,
          item.isUserCorrected ? "USER_VERIFIED" : "AI_ESTIMATED"
        ]);
      });
    });

    // Water Logs
    Object.entries(waterLogs).forEach(([date, amount]) => {
      rows.push([
        `${date}T00:00:00.000Z`,
        "WATER",
        "Hydration Intake",
        `${amount}ml`,
        "",
        "",
        "",
        "",
        ""
      ]);
    });

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.map(val => `"${val}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `nutrivision_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [userProfile, mealLogs, waterLogs]);

  const handleReset = () => {
    if (confirm("Clear all data and restart onboarding?")) {
      localStorage.removeItem('nutrivision_profile');
      localStorage.removeItem('nutrivision_logs');
      localStorage.removeItem('nutrivision_water');
      setUserProfile(null);
      setMealLogs([]);
      setWaterLogs({});
    }
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <Layout 
      onReset={userProfile ? handleReset : undefined} 
      onExport={userProfile ? handleExportData : undefined}
    >
      {!userProfile ? (
        <OnboardingForm onComplete={handleOnboardingComplete} />
      ) : (
        <Dashboard 
          profile={userProfile} 
          mealLogs={mealLogs} 
          onAddMeal={handleAddMeal}
          onUpdateMeal={handleUpdateMeal}
          onDeleteMeal={handleDeleteMeal}
          waterAmount={waterLogs[todayDate] || 0}
          onLogWater={handleLogWater}
        />
      )}
    </Layout>
  );
};

export default App;
