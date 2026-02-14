
import React, { useState } from 'react';
import { MealLog, FoodItem } from '../types';

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
      uncertaintyRange: [totalCalories * 0.95, totalCalories * 1.05], // User correction significantly reduces uncertainty
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
            <h3 className="font-black text-slate-900 text-2xl tracking-tighter">Meal Intelligence</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1">Manual Data Refinement</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full transition-all active:scale-90 group">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-[2.5rem] overflow-hidden aspect-square bg-slate-100 shadow-inner group">
              <img src={meal.imageUrl} alt="Meal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            
            <div className="space-y-6">
               <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Cumulative Analysis</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-3xl font-black text-slate-800">{Math.round(items.reduce((sum, i) => sum + Number(i.calories || 0), 0))}</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total Kcal</p>
                     </div>
                     <div className="text-right">
                        <p className="text-xl font-black text-blue-600">{Math.round(items.reduce((sum, i) => sum + Number(i.protein || 0), 0))}g</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total Protein</p>
                     </div>
                  </div>
               </div>
               <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                 "Fine-tuning helps the system learn your specific portion sizes and ingredient compositions over time."
               </p>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] border-l-4 border-blue-600 pl-4">Constituent Items</h4>
            <div className="space-y-6">
              {items.map((item, idx) => (
                <div key={item.id || idx} className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 space-y-6 hover:bg-slate-50 transition-colors">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 md:col-span-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Detected Food Name</label>
                      <input 
                        className="w-full bg-white px-5 py-3 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        value={item.name}
                        onChange={(e) => handleUpdateItem(idx, 'name', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Estimated Grams</label>
                      <input 
                        type="number"
                        className="w-full bg-white px-5 py-3 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        value={item.portionGrams}
                        onChange={(e) => handleUpdateItem(idx, 'portionGrams', Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 text-center">Calories</label>
                      <input 
                        type="number"
                        className="w-full bg-white px-4 py-3 border border-slate-200 rounded-2xl text-xs font-black text-slate-800 text-center focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        value={item.calories}
                        onChange={(e) => handleUpdateItem(idx, 'calories', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 text-center">Protein (g)</label>
                      <input 
                        type="number"
                        className="w-full bg-white px-4 py-3 border border-slate-200 rounded-2xl text-xs font-black text-slate-800 text-center focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        value={item.protein}
                        onChange={(e) => handleUpdateItem(idx, 'protein', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 text-center">Carbs (g)</label>
                      <input 
                        type="number"
                        className="w-full bg-white px-4 py-3 border border-slate-200 rounded-2xl text-xs font-black text-slate-800 text-center focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        value={item.carbs}
                        onChange={(e) => handleUpdateItem(idx, 'carbs', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 text-center">Fat (g)</label>
                      <input 
                        type="number"
                        className="w-full bg-white px-4 py-3 border border-slate-200 rounded-2xl text-xs font-black text-slate-800 text-center focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        value={item.fat}
                        onChange={(e) => handleUpdateItem(idx, 'fat', Number(e.target.value))}
                      />
                    </div>
                  </div>
                  {item.isUserCorrected && (
                     <div className="flex justify-end">
                        <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.2em] bg-blue-50 px-2 py-1 rounded-md">Modified by User</span>
                     </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 flex flex-col md:flex-row gap-4 bg-white sticky bottom-0 z-20">
          <button 
            onClick={handleDeleteMeal}
            className="w-full md:w-auto px-8 py-5 text-rose-500 font-black text-xs uppercase tracking-widest rounded-[1.5rem] hover:bg-rose-50 transition-all active:scale-95"
          >
            Purge Log Entry
          </button>
          <div className="flex-1" />
          <button 
            onClick={handleSave}
            className="w-full md:w-auto px-12 py-5 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-[1.5rem] hover:bg-slate-800 active:scale-95 transition-all shadow-2xl shadow-slate-300"
          >
            Update System Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealDetailModal;
