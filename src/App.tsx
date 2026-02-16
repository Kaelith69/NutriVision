
import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, MealLog } from './types';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Analytics from './components/Analytics';
import { AppLayout } from './components/Layout';
import { getLocalISODate } from './utils/dateUtils';
import { deleteImage } from './services/db';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'dashboard' | 'settings' | 'analytics'>('dashboard');

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nutrivision_profile');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [mealLogs, setMealLogs] = useState<MealLog[]>(() => {
    const saved = localStorage.getItem('nutrivision_meals');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [waterLogs, setWaterLogs] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('nutrivision_water');
    try {
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('nutrivision_profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('nutrivision_meals', JSON.stringify(mealLogs));
  }, [mealLogs]);

  useEffect(() => {
    localStorage.setItem('nutrivision_water', JSON.stringify(waterLogs));
  }, [waterLogs]);

  const handleUpdateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleAddMeal = (meal: MealLog) => {
    setMealLogs(prev => [meal, ...prev]);
  };

  const handleUpdateMeal = (meal: MealLog) => {
    setMealLogs(prev => prev.map(m => m.id === meal.id ? meal : m));
  };

  // ... (in handleLogWater) ...
  const handleLogWater = (amount: number) => {
    const date = getLocalISODate();
    setWaterLogs(prev => ({
      ...prev,
      [date]: (prev[date] || 0) + amount
    }));
  };

  const handleDeleteMeal = (id: string) => {
    deleteImage(id).catch(err => console.error("Failed to delete image:", err));
    setMealLogs(prev => prev.filter(m => m.id !== id));
  };

  const handleExportData = useCallback(() => {
    if (!userProfile) return;
    const headers = ["Timestamp", "Category", "Item", "Calories", "Protein", "Carbs", "Fat"];
    const rows = mealLogs.map(log => [
      new Date(log.timestamp).toISOString(),
      "MEAL",
      log.items.map(i => i.name).join("; "),
      log.totalCalories,
      log.totalProtein,
      log.totalCarbs,
      log.totalFat
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nutrivision_data.csv";
    link.click();
  }, [userProfile, mealLogs]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Accessing Local Storage Matrix...</p>
      </div>
    );
  }

  return (
    <AppLayout
      onExport={userProfile ? handleExportData : undefined}
      onNavigate={setView}
      currentView={view}
      isLoggedIn={!!userProfile}
    >
      {!userProfile ? (
        <OnboardingForm onComplete={handleUpdateProfile} />
      ) : view === 'settings' ? (
        <Settings
          profile={userProfile}
          onUpdate={handleUpdateProfile}
          onBack={() => setView('dashboard')}
          onLogout={() => {
            if (confirm("Reset all local data?")) {
              localStorage.clear();
              window.location.reload();
            }
          }}
        />
      ) : view === 'analytics' ? (
        <Analytics
          profile={userProfile}
          mealLogs={mealLogs}
          waterLogs={waterLogs}
        />
      ) : (
        <Dashboard
          profile={userProfile}
          mealLogs={mealLogs}
          onAddMeal={handleAddMeal}
          onUpdateMeal={handleUpdateMeal}
          onDeleteMeal={handleDeleteMeal}
          waterAmount={waterLogs[getLocalISODate()] || 0}
          onLogWater={handleLogWater}
        />
      )}
    </AppLayout>
  );
};

export default App;
