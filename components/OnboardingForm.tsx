
import React, { useState } from 'react';
import { UserProfile, BiologicalSex, ActivityLevel } from '../types';
import { calculateBMR, calculateTDEE } from '../services/metabolicService';

interface OnboardingFormProps {
  onComplete: (profile: UserProfile) => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    age: 30,
    sex: BiologicalSex.MALE,
    heightCm: 175,
    weightKg: 80,
    activityLevel: ActivityLevel.MODERATELY_ACTIVE,
    targetWeightKg: 75
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bmr = calculateBMR(formData.age, formData.sex, formData.weightKg, formData.heightCm);
    const tdee = calculateTDEE(bmr, formData.activityLevel);
    
    let dailyCalorieTarget = tdee;
    if (formData.targetWeightKg < formData.weightKg) {
      dailyCalorieTarget = tdee - 500;
    } else if (formData.targetWeightKg > formData.weightKg) {
      dailyCalorieTarget = tdee + 500;
    }

    onComplete({
      ...formData,
      bmr,
      tdee,
      dailyCalorieTarget
    });
  };

  const inputClass = "w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all placeholder:text-slate-300";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="max-w-xl mx-auto animate-in">
      <div className="mb-10 text-center">
        <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-slate-200">
           <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">System Initialization</h2>
        <p className="text-slate-400 font-medium mt-2">Map your metabolic baseline for precision analysis.</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}>Age</label>
              <input 
                type="number" 
                required
                className={inputClass}
                value={formData.age}
                onChange={e => setFormData({...formData, age: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Biological Sex</label>
              <select 
                className={inputClass}
                value={formData.sex}
                onChange={e => setFormData({...formData, sex: e.target.value as BiologicalSex})}
              >
                <option value={BiologicalSex.MALE}>Male</option>
                <option value={BiologicalSex.FEMALE}>Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}>Height (cm)</label>
              <input 
                type="number" 
                required
                className={inputClass}
                value={formData.heightCm}
                onChange={e => setFormData({...formData, heightCm: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Weight (kg)</label>
              <input 
                type="number" 
                required
                className={inputClass}
                value={formData.weightKg}
                onChange={e => setFormData({...formData, weightKg: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Activity Tier</label>
            <select 
              className={inputClass}
              value={formData.activityLevel}
              onChange={e => setFormData({...formData, activityLevel: Number(e.target.value) as ActivityLevel})}
            >
              <option value={ActivityLevel.SEDENTARY}>Level 1: Minimal Physical Output</option>
              <option value={ActivityLevel.LIGHTLY_ACTIVE}>Level 2: 1-3 Training Cycles/Week</option>
              <option value={ActivityLevel.MODERATELY_ACTIVE}>Level 3: 3-5 Training Cycles/Week</option>
              <option value={ActivityLevel.VERY_ACTIVE}>Level 4: 6-7 Training Cycles/Week</option>
              <option value={ActivityLevel.EXTREMELY_ACTIVE}>Level 5: Hard Daily Manual Output</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Target Body Weight (kg)</label>
            <input 
              type="number" 
              required
              className={inputClass}
              value={formData.targetWeightKg}
              onChange={e => setFormData({...formData, targetWeightKg: Number(e.target.value)})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-300 hover:bg-blue-600 transition-all active:scale-[0.98] btn-tactical"
          >
            Authenticate Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
