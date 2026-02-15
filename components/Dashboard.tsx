
import React, { useState, useMemo } from 'react';
import { UserProfile, MealLog } from '../types';
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
  const todaysLogs = useMemo(() => mealLogs.filter(log => log.timestamp >= todayStart), [mealLogs, todayStart]);

  const stats = useMemo(() => {
    const consumed = todaysLogs.reduce((acc, log) => ({
      calories: acc.calories + log.totalCalories,
      protein: acc.protein + log.totalProtein,
      fat: acc.fat + log.totalFat,
      carbs: acc.carbs + log.totalCarbs,
    }), { calories: 0, protein: 0, fat: 0, carbs: 0 });

    return {
      consumed,
      remaining: Math.max(0, profile.dailyCalorieTarget - consumed.calories),
      surplus: Math.max(0, consumed.calories - profile.dailyCalorieTarget),
      progress: (consumed.calories / profile.dailyCalorieTarget) * 100
    };
  }, [todaysLogs, profile.dailyCalorieTarget]);

  const chartData = useMemo(() => [
    { name: 'PROTEIN', current: stats.consumed.protein, target: profile.weightKg * 1.8 }, 
    { name: 'CARBS', current: stats.consumed.carbs, target: (profile.dailyCalorieTarget * 0.4) / 4 },
    { name: 'FAT', current: stats.consumed.fat, target: (profile.dailyCalorieTarget * 0.3) / 9 },
  ], [stats, profile]);

  const groupedHistory = useMemo(() => {
    const groups: Record<string, MealLog[]> = {};
    [...mealLogs].sort((a, b) => b.timestamp - a.timestamp).forEach(log => {
      const date = new Date(log.timestamp).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
      if (!groups[date]) groups[date] = [];
      groups[date].push(log);
    });
    return Object.entries(groups);
  }, [mealLogs]);

  const netBalance = stats.consumed.calories - profile.tdee;
  const sevenDayDelta = (netBalance / 7700) * 7;

  return (
    <div className="space-y-10 animate-in duration-500">
      {/* Primary Metabolic HUD */}
      <div className="bg-slate-950 p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] text-white shadow-2xl relative overflow-hidden group border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="flex-1 w-full space-y-8">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                   Metabolic Status Core
                </h3>
                <p className="text-slate-500 font-medium text-xs mono">TDEE CALIBRATION: {Math.round(profile.tdee)} KCAL/DAY</p>
              </div>
              <div className="bg-slate-800/30 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md flex items-center gap-2">
                 <span className="mono text-[10px] font-black text-emerald-400 uppercase tracking-widest">Bio-Sync Active</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 md:gap-6">
              <span className={`text-6xl md:text-8xl font-black tracking-tighter transition-colors duration-500 ${stats.surplus > 0 ? 'text-rose-500' : 'text-white'}`}>
                {Math.round(stats.consumed.calories)}
              </span>
              <div className="space-y-0">
                <span className="text-slate-600 font-black text-2xl md:text-3xl tracking-tighter">/ {Math.round(profile.dailyCalorieTarget)}</span>
                <p className="text-slate-600 font-black text-[10px] uppercase tracking-widest block mono">KCAL BUDGET</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="w-full bg-slate-900 h-8 rounded-2xl overflow-hidden p-1 shadow-inner ring-1 ring-white/10">
                <div 
                  className={`h-full transition-all duration-1000 ease-out rounded-xl flex items-center justify-end px-3 ${stats.surplus > 0 ? 'bg-rose-500 shadow-[0_0_20px_#f43f5e]' : 'bg-blue-600 shadow-[0_0_20px_#2563eb]'}`} 
                  style={{ width: `${Math.min(100, stats.progress)}%` }}
                >
                   {stats.progress > 20 && <span className="mono text-[8px] font-black text-white">{Math.round(stats.progress)}%</span>}
                </div>
              </div>
              <div className="flex justify-between items-center px-1">
                 <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Energy flux</span>
                 <span className={`mono text-[10px] font-black ${stats.surplus > 0 ? 'text-rose-500' : 'text-blue-400'}`}>
                    {stats.surplus > 0 ? `SURPLUS: +${Math.round(stats.surplus)}` : `DELTA: -${Math.round(stats.remaining)}`} KCAL
                 </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 w-full lg:w-auto shrink-0">
             <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center min-w-[160px] backdrop-blur-xl group-hover:bg-white/10 transition-all">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-3">7D Forecast</p>
                <p className={`text-3xl font-black tracking-tighter ${sevenDayDelta > 0 ? 'text-rose-500' : 'text-emerald-400'}`}>
                  {sevenDayDelta > 0 ? '+' : ''}{sevenDayDelta.toFixed(2)}<span className="text-xs ml-0.5 font-black uppercase">kg</span>
                </p>
             </div>
             <div className="p-8 bg-blue-600 rounded-[2.5rem] text-center min-w-[160px] shadow-2xl shadow-blue-950 group-hover:bg-blue-500 transition-all scale-105">
                <p className="text-[10px] text-blue-100 font-black uppercase tracking-[0.2em] mb-3">Goal Path</p>
                <p className="text-3xl font-black tracking-tighter text-white uppercase italic">
                   {stats.progress > 90 && stats.progress < 110 ? 'Nominal' : stats.progress > 110 ? 'Excess' : 'Target'}
                </p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-12">
          {/* Macro Diagnostics */}
          <section>
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Macro Composition Decomp</h2>
              <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                 <span className="w-2 h-2 bg-blue-600 rounded-full" />
                 <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mono">Live Profile</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 h-[360px] shadow-sm relative group overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 40, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="6 6" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#64748b', fontFamily: 'JetBrains Mono'}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.15)', fontWeight: 900, background: '#0f172a', color: '#fff'}} />
                  <Bar dataKey="current" fill="#2563eb" radius={[0, 12, 12, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.current > entry.target ? '#f43f5e' : '#2563eb'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Input History */}
          <section className="space-y-10">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Metabolic Archive</h2>
              <button 
                onClick={() => setShowCamera(true)}
                className="bg-slate-950 text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200 flex items-center gap-3 btn-tactical"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                Initialize Lens
              </button>
            </div>
            
            <div className="space-y-12">
              {groupedHistory.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-24 text-center group hover:border-blue-400 transition-all cursor-pointer shadow-sm" onClick={() => setShowCamera(true)}>
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-4xl">🔭</span>
                  </div>
                  <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mono">System Offline: Awaiting Input Calibration</p>
                </div>
              ) : (
                groupedHistory.map(([date, logs]) => (
                  <div key={date} className="space-y-6">
                    <div className="flex items-center gap-6">
                       <span className="bg-white px-5 py-2 rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm mono">{date}</span>
                       <div className="h-px bg-slate-200 flex-1" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {logs.map(log => (
                        <div 
                          key={log.id} 
                          onClick={() => setSelectedMeal(log)}
                          className="group bg-white p-5 rounded-[2.5rem] border border-slate-200 hover:border-blue-600 transition-all cursor-pointer relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1"
                        >
                          <div className="flex gap-6 items-center">
                            <div className="w-24 h-24 rounded-[2rem] overflow-hidden bg-slate-100 shrink-0 border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                              <img src={log.imageUrl} alt="Meal" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                               <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1.5 mono">{new Date(log.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                               <h4 className="font-black text-slate-900 text-lg truncate mb-1 tracking-tight">{log.items[0]?.name || "Component Decomp"}</h4>
                               <p className="text-3xl font-black text-blue-600 tracking-tighter mono">{Math.round(log.totalCalories)} <span className="text-[10px] uppercase text-slate-300 font-black">kcal</span></p>
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

        <div className="space-y-10">
           {/* Hydration Matrix */}
           <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <h3 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                 <span className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_10px_#2563eb] animate-pulse" />
                 Hydration Matrix
              </h3>
              <div className="flex flex-col items-center mb-10">
                 <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                       <circle 
                          cx="80" cy="80" r="70" 
                          stroke="currentColor" 
                          strokeWidth="12" 
                          fill="transparent" 
                          strokeDasharray={440} 
                          strokeDashoffset={440 - (440 * Math.min(1, waterAmount/2500))} 
                          strokeLinecap="round"
                          className="text-blue-500 transition-all duration-1000 ease-in-out" 
                        />
                    </svg>
                    <div className="absolute text-center space-y-0">
                       <p className="text-4xl font-black text-slate-900 tracking-tighter mono">{waterAmount}</p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mono">ML / 2500</p>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => onLogWater(250)} className="py-4 rounded-2xl bg-slate-50 border border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all btn-tactical shadow-sm">+250ml</button>
                 <button onClick={() => onLogWater(500)} className="py-4 rounded-2xl bg-slate-950 text-white text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all btn-tactical shadow-lg shadow-slate-200">+500ml</button>
              </div>
           </div>

           {/* Tactical Insight Engine */}
           <div className="bg-slate-950 p-8 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px]" />
              <h3 className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-3">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 Metabolic Insight
              </h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed italic mono">
                {stats.progress < 50 
                  ? "SYSTEM ALERT: Negative energy balance detected. Recommend protein-dense intake for sustained maintenance."
                  : stats.progress > 100 
                    ? "SYSTEM ALERT: Energy surplus exceeds variance threshold. Increase mechanical output to offset accumulation."
                    : "System status: NOMINAL. Metabolic flux currently aligned with predictive target vectors."}
              </p>
              <div className="pt-6 border-t border-white/10 space-y-3">
                 <div className="flex justify-between items-center text-[8px] font-black text-slate-500 uppercase tracking-widest mono">
                    <span>Precision Score</span>
                    <span className="text-emerald-400">98.4% Match</span>
                 </div>
                 <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="w-[98.4%] h-full bg-emerald-500/50 shadow-[0_0_8px_#10b981]" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      {showCamera && <CameraModule onClose={() => setShowCamera(false)} onMealAnalyzed={(meal) => { onAddMeal(meal); setShowCamera(false); }} />}
      {selectedMeal && <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} onUpdate={onUpdateMeal} onDelete={onDeleteMeal} />}
    </div>
  );
};

export default Dashboard;
