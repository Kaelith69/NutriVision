
import React, { useState, useMemo } from 'react';
import { UserProfile, MealLog } from '../types';
import CameraModule from './CameraModule';
import MealDetailModal from './MealDetailModal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TacticalCard } from './ui/TacticalCard';
import { TacticalButton } from './ui/TacticalButton';
import { TacticalBadge } from './ui/TacticalBadge';
import { Activity, Droplet, Zap, Utensils, Camera, Plus, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { getStartOfDay, getLocalISODate } from '../utils/dateUtils';

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

  // ... (inside component) ...

  const todayStart = getStartOfDay();
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
    { name: 'PRO', fullName: 'PROTEIN', current: stats.consumed.protein, target: profile.weightKg * 1.8, fill: '#3b82f6' },
    { name: 'CRB', fullName: 'CARBS', current: stats.consumed.carbs, target: (profile.dailyCalorieTarget * 0.4) / 4, fill: '#10b981' },
    { name: 'FAT', fullName: 'FAT', current: stats.consumed.fat, target: (profile.dailyCalorieTarget * 0.3) / 9, fill: '#f59e0b' },
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
    <div className="space-y-8 animate-in duration-500 pb-20">
      {/* Primary Metabolic HUD */}
      <TacticalCard className="bg-slate-950 p-6 md:p-10 text-white border-slate-800 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="flex-1 w-full space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
                  <h3 className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em]">Metabolic Status Core</h3>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className={`text-6xl md:text-7xl font-black tracking-tighter transition-colors duration-500 ${stats.surplus > 0 ? 'text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'text-white'}`}>
                    {Math.round(stats.consumed.calories)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-slate-500 font-bold text-xl tracking-tight">/ {Math.round(profile.dailyCalorieTarget)}</span>
                    <span className="text-slate-600 font-black text-[9px] uppercase tracking-widest mono">KCAL TARGET</span>
                  </div>
                </div>
              </div>
              <TacticalBadge variant="success" icon={<Zap className="w-3 h-3" />}>
                AUTO-SYNC
              </TacticalBadge>
            </div>

            <div className="space-y-3">
              <div className="w-full bg-slate-900/50 h-5 rounded-full overflow-hidden p-1 shadow-inner ring-1 ring-white/5 backdrop-blur-sm">
                <div
                  className={`h-full transition-all duration-1000 ease-out rounded-full flex items-center justify-end px-2 ${stats.surplus > 0 ? 'bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_15px_#f43f5e]' : 'bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_15px_#2563eb]'}`}
                  style={{ width: `${Math.min(100, stats.progress)}%` }}
                >
                </div>
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Energy Flux
                </span>
                <span className={`mono text-[10px] font-black ${stats.surplus > 0 ? 'text-rose-400' : 'text-blue-400'}`}>
                  {stats.surplus > 0 ? `SURPLUS: +${Math.round(stats.surplus)}` : `DELTA: -${Math.round(stats.remaining)}`} KCAL
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center min-w-[140px] backdrop-blur-md group-hover:bg-white/10 transition-all">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2 flex justify-center items-center gap-1.5"><TrendingUp className="w-3 h-3" /> 7D Trend</p>
              <p className={`text-2xl font-black tracking-tighter ${sevenDayDelta > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {sevenDayDelta > 0 ? '+' : ''}{sevenDayDelta.toFixed(2)}<span className="text-[10px] ml-1 text-slate-500">kg</span>
              </p>
            </div>
            <div className="p-6 bg-blue-600 rounded-3xl text-center min-w-[140px] shadow-xl shadow-blue-900/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              <p className="text-[9px] text-blue-100 font-black uppercase tracking-[0.2em] mb-2 relative z-10">Status</p>
              <p className="text-2xl font-black tracking-tighter text-white uppercase italic relative z-10">
                {stats.progress > 90 && stats.progress < 110 ? 'Optimal' : stats.progress > 110 ? 'Excess' : 'Deficit'}
              </p>
            </div>
          </div>
        </div>
      </TacticalCard>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Macro Diagnostics */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase flex items-center gap-2">
                <div className="w-1 h-4 bg-slate-900 rounded-full" />
                Macro Composition
              </h2>
              <TacticalBadge variant="neutral">Target Profile Active</TacticalBadge>
            </div>

            <TacticalCard className="p-8 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 30, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="4 4" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={50}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 800, fill: '#64748b', fontFamily: 'JetBrains Mono' }}
                  />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{
                      borderRadius: '16px',
                      border: 'none',
                      boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.15)',
                      fontWeight: 800,
                      background: '#0f172a',
                      color: '#fff',
                      fontFamily: 'Inter'
                    }}
                  />
                  <Bar dataKey="current" radius={[0, 8, 8, 0]} barSize={32}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.current > entry.target ? '#f43f5e' : entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </TacticalCard>
          </section>

          {/* Input History */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase flex items-center gap-2">
                <div className="w-1 h-4 bg-slate-900 rounded-full" />
                Metabolic Archive
              </h2>
              <TacticalButton size="sm" onClick={() => setShowCamera(true)}>
                <Camera className="w-4 h-4" /> Initialize Lens
              </TacticalButton>
            </div>

            <div className="space-y-8">
              {groupedHistory.length === 0 ? (
                <div
                  className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center group hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer"
                  onClick={() => setShowCamera(true)}
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Camera className="w-8 h-8 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mono">System Offline: Awaiting Input</p>
                </div>
              ) : (
                groupedHistory.map(([date, logs]) => (
                  <div key={date} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-500 shadow-sm mono">{date}</span>
                      <div className="h-px bg-slate-100 flex-1" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {logs.map(log => (
                        <TacticalCard
                          key={log.id}
                          onClick={() => setSelectedMeal(log)}
                          hoverEffect
                          className="p-4 cursor-pointer"
                        >
                          <div className="flex gap-4 items-center">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                              <img src={log.imageUrl} alt="Meal" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mono">
                                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                              </div>
                              <h4 className="font-black text-slate-900 text-base truncate mb-1">{log.items[0]?.name || "Composite"}</h4>
                              <p className="text-2xl font-black text-blue-600 tracking-tighter mono leading-none">
                                {Math.round(log.totalCalories)}
                                <span className="text-[9px] uppercase text-slate-400 font-black ml-1">kcal</span>
                              </p>
                            </div>
                          </div>
                        </TacticalCard>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Hydration Matrix */}
          <TacticalCard className="p-8 group">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-500" />
                Hydration
              </h3>
              <span className="text-[9px] font-bold text-slate-400 mono">{Math.round((waterAmount / 2500) * 100)}%</span>
            </div>

            <div className="flex flex-col items-center mb-8 relative">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 filter drop-shadow-lg">
                  <circle cx="96" cy="96" r="88" strokeWidth="8" fill="transparent" className="text-slate-100 stroke-slate-100" />
                  <circle
                    cx="96" cy="96" r="88"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={552}
                    strokeDashoffset={552 - (552 * Math.min(1, waterAmount / 2500))}
                    strokeLinecap="round"
                    className="text-blue-500 transition-all duration-1000 ease-in-out"
                  />
                </svg>
                <div className="absolute text-center space-y-0.5">
                  <p className="text-5xl font-black text-slate-900 tracking-tighter mono">{waterAmount}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mono">ML / 2500</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => onLogWater(250)} className="py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center justify-center gap-2">
                <Plus className="w-3 h-3" /> 250ml
              </button>
              <button onClick={() => onLogWater(500)} className="py-3.5 rounded-xl bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
                <Plus className="w-3 h-3" /> 500ml
              </button>
            </div>
          </TacticalCard>

          {/* Tactical Insight Engine */}
          <TacticalCard className="bg-slate-950 p-8 text-white border-slate-800">
            <h3 className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4" />
              Tactical Insight
            </h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed italic mono mb-6">
              {stats.progress < 50
                ? "SYSTEM ALERT: Negative energy balance detected. Recommend protein-dense intake for sustained maintenance."
                : stats.progress > 100
                  ? "SYSTEM ALERT: Energy surplus exceeds variance threshold. Increase mechanical output to offset accumulation."
                  : "System status: NOMINAL. Metabolic flux currently aligned with predictive target vectors."}
            </p>
            <div className="pt-6 border-t border-white/10 space-y-2">
              <div className="flex justify-between items-center text-[9px] font-black text-slate-500 uppercase tracking-widest mono">
                <span>Algorithm Confidence</span>
                <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 98.4%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div className="w-[98.4%] h-full bg-emerald-500/50 shadow-[0_0_8px_#10b981]" />
              </div>
            </div>
          </TacticalCard>
        </div>
      </div>

      {showCamera && <CameraModule onClose={() => setShowCamera(false)} onMealAnalyzed={(meal) => { onAddMeal(meal); setShowCamera(false); }} />}
      {selectedMeal && <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} onUpdate={onUpdateMeal} onDelete={onDeleteMeal} />}
    </div>
  );
};

export default Dashboard;
