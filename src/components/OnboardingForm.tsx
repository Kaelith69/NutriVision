
import React, { useState } from 'react';
import { UserProfile, BiologicalSex, ActivityLevel } from '../types';
import { calculateBMR, calculateTDEE } from '../services/metabolicService';
import { TacticalButton } from './ui/TacticalButton';
import { Activity, Ruler, Weight, User, ArrowRight, Target } from 'lucide-react';

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
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-2";

  return (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="mb-10 text-center">
        <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-900/20 relative group overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Activity className="w-10 h-10 text-blue-500 relative z-10" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">System Initialization</h2>
        <p className="text-slate-400 font-medium text-sm">Map your metabolic baseline for precision analysis.</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50 pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}><User className="w-3 h-3 text-blue-500" /> Age</label>
              <input
                type="number"
                required
                className={inputClass}
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}><User className="w-3 h-3 text-blue-500" /> Biological Sex</label>
              <select
                className={inputClass}
                value={formData.sex}
                onChange={e => setFormData({ ...formData, sex: e.target.value as BiologicalSex })}
              >
                <option value={BiologicalSex.MALE}>Male</option>
                <option value={BiologicalSex.FEMALE}>Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}><Ruler className="w-3 h-3 text-blue-500" /> Height (cm)</label>
              <input
                type="number"
                required
                className={inputClass}
                value={formData.heightCm}
                onChange={e => setFormData({ ...formData, heightCm: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}><Weight className="w-3 h-3 text-blue-500" /> Weight (kg)</label>
              <input
                type="number"
                required
                className={inputClass}
                value={formData.weightKg}
                onChange={e => setFormData({ ...formData, weightKg: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}><Activity className="w-3 h-3 text-blue-500" /> Activity Tier</label>
            <select
              className={inputClass}
              value={formData.activityLevel}
              onChange={e => setFormData({ ...formData, activityLevel: Number(e.target.value) as ActivityLevel })}
            >
              <option value={ActivityLevel.SEDENTARY}>Level 1: Minimal Physical Output</option>
              <option value={ActivityLevel.LIGHTLY_ACTIVE}>Level 2: 1-3 Training Cycles/Week</option>
              <option value={ActivityLevel.MODERATELY_ACTIVE}>Level 3: 3-5 Training Cycles/Week</option>
              <option value={ActivityLevel.VERY_ACTIVE}>Level 4: 6-7 Training Cycles/Week</option>
              <option value={ActivityLevel.EXTREMELY_ACTIVE}>Level 5: Hard Daily Manual Output</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={labelClass}><Target className="w-3 h-3 text-blue-500" /> Target Body Weight (kg)</label>
            <input
              type="number"
              required
              className={inputClass}
              value={formData.targetWeightKg}
              onChange={e => setFormData({ ...formData, targetWeightKg: Number(e.target.value) })}
            />
          </div>

          <TacticalButton
            type="submit"
            className="w-full shadow-2xl shadow-blue-900/20 mt-4"
            size="lg"
          >
            Authenticate Profile <ArrowRight className="w-4 h-4" />
          </TacticalButton>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
