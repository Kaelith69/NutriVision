
import React, { useState } from 'react';
import { MealLog, FoodItem } from '../types';
import { TacticalButton } from './ui/TacticalButton';
import { X, Trash2, Save, Activity, Scale, Flame, Utensils, Droplet, Zap } from 'lucide-react';

interface MealDetailModalProps {
  meal: MealLog;
  onClose: () => void;
  onUpdate: (updatedMeal: MealLog) => void;
  onDelete: (id: string) => void;
}

const MealDetailModal: React.FC<MealDetailModalProps> = ({ meal, onClose, onUpdate, onDelete }) => {
  const [items, setItems] = useState<FoodItem[]>(meal.items);

  const handleUpdateItem = (index: number, field: keyof FoodItem, value: any) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
      isUserCorrected: true
    };
    setItems(newItems);
  };

  const handleSave = () => {
    const totalCalories = items.reduce((sum, i) => sum + Number(i.calories || 0), 0);
    const totalProtein = items.reduce((sum, i) => sum + Number(i.protein || 0), 0);
    const totalFat = items.reduce((sum, i) => sum + Number(i.fat || 0), 0);
    const totalCarbs = items.reduce((sum, i) => sum + Number(i.carbs || 0), 0);

    const updatedMeal: MealLog = {
      ...meal,
      items,
      totalCalories,
      totalProtein,
      totalFat,
      totalCarbs,
      uncertaintyRange: [totalCalories * 0.95, totalCalories * 1.05],
    };

    onUpdate(updatedMeal);
    onClose();
  };

  const handleDeleteMeal = () => {
    if (confirm("Delete this metabolic log entry permanently?")) {
      onDelete(meal.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-950/80 flex items-center justify-center p-4 md:p-8 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-3xl rounded-[3rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col border border-white/20">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h3 className="font-black text-slate-900 text-2xl tracking-tighter uppercase italic flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" /> Meal Intelligence
            </h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1">Manual Data Refinement</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full transition-all active:scale-90 group">
            <X className="w-6 h-6 text-slate-400 group-hover:text-slate-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-[2.5rem] overflow-hidden aspect-square bg-slate-100 shadow-inner group ring-4 ring-white">
              <img src={meal.imageUrl} alt="Meal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Cumulative Analysis
                </h4>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-4xl font-black text-slate-900 tracking-tighter">{Math.round(items.reduce((sum, i) => sum + Number(i.calories || 0), 0))}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1"><Flame className="w-3 h-3" /> Total Kcal</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-blue-600 tracking-tighter">{Math.round(items.reduce((sum, i) => sum + Number(i.protein || 0), 0))}g</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1"><Zap className="w-3 h-3" /> Total Protein</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                <p className="text-xs text-blue-800 font-bold leading-relaxed italic">
                  "Fine-tuning helps the system learn your specific portion sizes and ingredient compositions over time."
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Constituent Items</h4>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            <div className="space-y-6">
              {items.map((item, idx) => (
                <div key={item.id || idx} className="p-8 bg-white rounded-[2.5rem] border border-slate-200 space-y-6 hover:border-blue-300 transition-colors shadow-sm">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 md:col-span-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 flex items-center gap-1">
                        <Utensils className="w-3 h-3" /> Detected Food Name
                      </label>
                      <input
                        className="w-full bg-slate-50 px-5 py-4 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        value={item.name}
                        onChange={(e) => handleUpdateItem(idx, 'name', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 flex items-center gap-1">
                        <Scale className="w-3 h-3" /> Estimated Grams
                      </label>
                      <input
                        type="number"
                        className="w-full bg-slate-50 px-5 py-4 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        value={item.portionGrams}
                        onChange={(e) => handleUpdateItem(idx, 'portionGrams', Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Calories', field: 'calories', icon: Flame, color: 'text-slate-800' },
                      { label: 'Protein (g)', field: 'protein', icon: Zap, color: 'text-blue-600' },
                      { label: 'Carbs (g)', field: 'carbs', icon: Droplet, color: 'text-emerald-600' },
                      { label: 'Fat (g)', field: 'fat', icon: Activity, color: 'text-amber-600' }
                    ].map((metric) => (
                      <div key={metric.field}>
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 block text-center flex justify-center items-center gap-1">
                          <metric.icon className="w-3 h-3" /> {metric.label}
                        </label>
                        <input
                          type="number"
                          className={`w-full bg-slate-50 px-4 py-3 border border-slate-200 rounded-2xl text-xs font-black text-center focus:ring-4 focus:ring-blue-100 transition-all outline-none ${metric.color}`}
                          value={item[metric.field as keyof FoodItem] as number}
                          onChange={(e) => handleUpdateItem(idx, metric.field as keyof FoodItem, Number(e.target.value))}
                        />
                      </div>
                    ))}
                  </div>
                  {item.isUserCorrected && (
                    <div className="flex justify-end">
                      <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">Modified by User</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 flex flex-col md:flex-row gap-4 bg-white sticky bottom-0 z-20">
          <TacticalButton
            onClick={handleDeleteMeal}
            variant="danger"
            className="w-full md:w-auto"
          >
            <Trash2 className="w-4 h-4" /> Purge Log Entry
          </TacticalButton>
          <div className="flex-1" />
          <TacticalButton
            onClick={handleSave}
            variant="primary"
            size="lg"
            className="w-full md:w-auto shadow-2xl shadow-blue-900/20"
          >
            <Save className="w-4 h-4" /> Update System Data
          </TacticalButton>
        </div>
      </div>
    </div>
  );
};

export default MealDetailModal;
