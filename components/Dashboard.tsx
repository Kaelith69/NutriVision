
import React, { useState, useMemo } from 'react';
import { UserProfile, MealLog, FoodItem } from '../types';
import CameraModule from './CameraModule';
import MealDetailModal from './MealDetailModal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  profile: UserProfile;
  mealLogs: MealLog[];
  onAddMeal: (meal: MealLog) => void;
  onUpdateMeal: (meal: MealLog) => void;
  onDeleteMeal: (id: string) => void;
  waterAmount: number;
  onLogWater: (amount: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  profile, 
  mealLogs, 
  onAddMeal, 
  onUpdateMeal, 
  onDeleteMeal, 
  waterAmount, 
  onLogWater 
}) => {
  const [showCamera, setShowCamera] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealLog | null>(null);

  const todayStart = new Date().setHours(0, 0, 0, 0);
  
  const todaysLogs = useMemo(() => 
    mealLogs.filter(log => log.timestamp >= todayStart),
  [mealLogs, todayStart]);

  const stats = useMemo(() => {
    const consumed = todaysLogs.reduce((acc, log) => ({
      calories: acc.calories + log.totalCalories,
      protein: acc.protein + log.totalProtein,
      fat: acc.fat + log.totalFat,
      carbs: acc.carbs + log.totalCarbs,
    }), { calories: 0, protein: 0, fat: 0, carbs: 0 });

    const totalUncertainty = Math.sqrt(
      todaysLogs.reduce((acc, log) => acc + Math.pow((log.uncertaintyRange[1] - log.uncertaintyRange[0]) / 2, 2), 0)
    );

    return {
      consumed,
      remaining: Math.max(0, profile.dailyCalorieTarget - consumed.calories),
      surplus: Math.max(0, consumed.calories - profile.dailyCalorieTarget),
      progress: (consumed.calories / profile.dailyCalorieTarget) * 100,
      uncertainty: totalUncertainty
    };
  }, [todaysLogs, profile.dailyCalorieTarget]);

  // Grouped history by date
  const groupedHistory = useMemo(() => {
    const groups: Record<string, MealLog[]> = {};
    const sortedLogs = [...mealLogs].sort((a, b) => b.timestamp - a.timestamp);
    
    sortedLogs.forEach(log => {
      const date = new Date(log.timestamp).toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(log);
    });
    
    return Object.entries(groups);
  }, [mealLogs]);

  const chartData = useMemo(() => [
    { name: 'Calories', current: stats.consumed.calories, target: profile.dailyCalorieTarget },
    { name: 'Protein (g)', current: stats.consumed.protein, target: profile.weightKg * 1.6 }, 
    { name: 'Carbs (g)', current: stats.consumed.carbs, target: (profile.dailyCalorieTarget * 0.45) / 4 },
    { name: 'Fat (g)', current: stats.consumed.fat, target: (profile.dailyCalorieTarget * 0.25) / 9 },
  ], [stats, profile]);

  const netEnergyBalance = useMemo(() => stats.consumed.calories - profile.tdee, [stats.consumed, profile.tdee]);
  const predicted7DayChange = (netEnergyBalance / 7700) * 7;

  const waterTarget = 2500; // ml
  const waterProgress = Math.min(100, (waterAmount / waterTarget) * 100);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Primary Metrics Card */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Metabolic Budget</h3>
              {stats.uncertainty > 0 && (
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-mono font-bold">
                  VAR: ±{Math.round(stats.uncertainty)} KCAL
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-6xl font-black tracking-tighter ${stats.surplus > 0 ? 'text-rose-500' : 'text-slate-900'}`}>
                {Math.round(stats.consumed.calories)}
              </span>
              <span className="text-slate-400 font-bold text-xl">/ {Math.round(profile.dailyCalorieTarget)} <span className="text-sm font-medium">kcal</span></span>
            </div>
            <div className="mt-6 w-full bg-slate-100 h-5 rounded-full overflow-hidden relative shadow-inner">
              <div 
                className={`h-full transition-all duration-1000 ease-out rounded-full ${stats.surplus > 0 ? 'bg-rose-500' : 'bg-blue-600'}`} 
                style={{ width: `${Math.min(100, stats.progress)}%` }}
              />
              {stats.progress > 100 && (
                 <div className="absolute top-0 right-0 h-full bg-rose-600/20 w-[10%]" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
            <div className="bg-blue-50 p-6 rounded-[2rem] text-center border border-blue-100 shadow-sm">
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1">Surplus/Deficit</p>
              <p className={`text-3xl font-black ${stats.surplus > 0 ? 'text-rose-600' : 'text-blue-700'}`}>
                {stats.surplus > 0 ? `+${Math.round(stats.surplus)}` : `-${Math.round(stats.remaining)}`}
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-[2rem] text-center border border-slate-100">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Base Burn</p>
              <p className="text-3xl font-black text-slate-800">{Math.round(profile.tdee)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Enhanced Water Intake Section */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
               <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${waterProgress}%` }} />
            </div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-blue-100 group-hover:scale-110 transition-transform duration-500">💧</div>
                <div>
                  <h2 className="text-xl font-black text-slate-800">Daily Hydration</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Goal: {waterTarget}ml</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-blue-600 tracking-tighter">{waterAmount} <span className="text-xs uppercase text-slate-300 font-black">ml</span></p>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{Math.round(waterProgress)}% OF TARGET</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => onLogWater(250)}
                className="bg-slate-50 text-slate-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 active:scale-95 transition-all border border-transparent hover:border-blue-200"
              >
                Small (250ml)
              </button>
              <button 
                onClick={() => onLogWater(500)}
                className="bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-200"
              >
                Glass (500ml)
              </button>
              <button 
                onClick={() => onLogWater(750)}
                className="bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 active:scale-95 transition-all shadow-xl shadow-slate-300"
              >
                Bottle (750ml)
              </button>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Macronutrient Profile</h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-slate-200 rounded-full"></span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Goal</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 h-[360px] shadow-sm">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 30, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} className="text-[10px] font-black text-slate-400 uppercase tracking-widest" />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}} 
                    contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', padding: '16px'}}
                    itemStyle={{fontWeight: '900', fontSize: '12px'}}
                  />
                  <Bar dataKey="current" fill="#2563eb" radius={[0, 12, 12, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.current > entry.target ? '#f43f5e' : '#2563eb'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Chronological Journal Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Dietary Journal</h2>
              <button 
                onClick={() => setShowCamera(true)}
                className="bg-blue-600 text-white px-8 py-3.5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2 shadow-2xl shadow-blue-200"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                New Analysis
              </button>
            </div>
            
            <div className="space-y-12">
              {groupedHistory.length === 0 ? (
                <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[3rem] p-24 text-center">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                     <span className="text-4xl">📸</span>
                  </div>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No metabolic data detected.</p>
                </div>
              ) : (
                groupedHistory.map(([date, logs]) => (
                  <div key={date} className="space-y-6">
                    <div className="sticky top-20 z-30 flex items-center gap-4 py-2">
                       <span className="bg-white px-4 py-1.5 rounded-full border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm">
                         {date === new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) ? "Today" : date}
                       </span>
                       <div className="h-px bg-slate-200 flex-1" />
                    </div>
                    <div className="space-y-4">
                      {logs.map(log => (
                        <div 
                          key={log.id} 
                          onClick={() => setSelectedMeal(log)}
                          className="group bg-white p-5 rounded-[2rem] border border-slate-200 flex flex-col md:flex-row gap-5 items-start md:items-center hover:border-blue-400 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                        >
                          <div className="shrink-0 w-full md:w-28 aspect-square rounded-[1.5rem] overflow-hidden bg-slate-100 ring-2 ring-slate-50 group-hover:ring-blue-100 transition-all shadow-inner">
                            <img src={log.imageUrl} alt="Meal" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                          </div>
                          <div className="flex-1 min-w-0 w-full">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-black text-slate-800 text-lg tracking-tight truncate max-w-[200px]">
                                  {log.items[0]?.name || "Unnamed Meal"}
                                  {log.items.length > 1 && <span className="text-slate-400 font-medium ml-1">+{log.items.length - 1} more</span>}
                                </h4>
                                {log.items.some(i => i.isUserCorrected) && (
                                  <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">Verified</span>
                                )}
                              </div>
                              <p className="text-xl font-black text-blue-600 tabular-nums">
                                {Math.round(log.totalCalories)} <span className="text-[10px] uppercase text-slate-300 font-black">kcal</span>
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-slate-50 rounded-lg px-3 py-1.5">
                                <p className="text-[7px] text-slate-400 font-black uppercase mb-0.5">Protein</p>
                                <p className="text-[11px] font-black text-slate-700">{Math.round(log.totalProtein)}g</p>
                              </div>
                              <div className="bg-slate-50 rounded-lg px-3 py-1.5">
                                <p className="text-[7px] text-slate-400 font-black uppercase mb-0.5">Carbs</p>
                                <p className="text-[11px] font-black text-slate-700">{Math.round(log.totalCarbs)}g</p>
                              </div>
                              <div className="bg-slate-50 rounded-lg px-3 py-1.5">
                                <p className="text-[7px] text-slate-400 font-black uppercase mb-0.5">Fat</p>
                                <p className="text-[11px] font-black text-slate-700">{Math.round(log.totalFat)}g</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                              <p className="text-[9px] text-slate-300 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                              <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-all font-black text-[9px] uppercase tracking-widest flex items-center gap-1">
                                Open Details
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Forecast Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/40 transition-all duration-1000" />
            <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] mb-8">System Forecast</h3>
            <div className="space-y-8 relative z-10">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Expected 7D Weight Delta</p>
                <div className="flex items-baseline gap-2">
                  <p className={`text-5xl font-black tracking-tighter ${predicted7DayChange > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {predicted7DayChange > 0 ? '+' : ''}{predicted7DayChange.toFixed(2)}
                  </p>
                  <span className="text-sm font-black text-slate-500 uppercase">kg</span>
                </div>
              </div>
              <div className="h-px bg-white/10 w-full" />
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Daily Flux Balance</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black tracking-tight">{netEnergyBalance > 0 ? '+' : ''}{Math.round(netEnergyBalance)}</p>
                  <span className="text-[10px] font-black text-slate-500 uppercase">kcal/day</span>
                </div>
              </div>
              
              {stats.surplus > 0 && (
                <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/10 animate-pulse">
                  <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-2">Surplus Compensation</p>
                  <p className="text-xs font-medium text-slate-300 leading-relaxed">
                    Detected excess intake of {Math.round(stats.surplus)}kcal. Consider high-intensity aerobic activity to restore thermodynamic balance.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-slate-800 font-black text-xs uppercase tracking-[0.1em]">AI Recommendations</h3>
            <div className="space-y-6">
               <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Protein Synthesis</p>
                  {stats.consumed.protein < (profile.weightKg * 1.5) ? (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Protein deficit of <span className="font-bold text-blue-600">{Math.round((profile.weightKg * 1.6) - stats.consumed.protein)}g</span> detected. 
                      Muscle turnover preservation requires immediate amino acid supplementation.
                    </p>
                  ) : (
                    <p className="text-xs text-emerald-600 font-bold">Protein optimization threshold achieved.</p>
                  )}
               </div>

               <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Water Balance</p>
                  {waterAmount < 1500 ? (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Dehydration risk. Consumption of at least 1000ml of additional fluid is required to maintain metabolic efficiency.
                    </p>
                  ) : (
                    <p className="text-xs text-blue-600 font-bold">Hydration levels are within optimal range.</p>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>

      {showCamera && (
        <CameraModule 
          onClose={() => setShowCamera(false)} 
          onMealAnalyzed={(meal) => {
            onAddMeal(meal);
            setShowCamera(false);
          }}
        />
      )}

      {selectedMeal && (
        <MealDetailModal 
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
          onUpdate={onUpdateMeal}
          onDelete={onDeleteMeal}
        />
      )}
    </div>
  );
};

export default Dashboard;
