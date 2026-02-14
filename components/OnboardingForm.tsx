
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
    
    // Default strategy: 500 kcal deficit for weight loss, surplus for gain, maintenance if same
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

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Establish Baseline</h2>
        <p className="text-slate-500 mt-2">Precision metabolic modeling requires accurate inputs.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
            <input 
              type="number" 
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.age}
              onChange={e => setFormData({...formData, age: Number(e.target.value)})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Sex</label>
            <select 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.sex}
              onChange={e => setFormData({...formData, sex: e.target.value as BiologicalSex})}
            >
              <option value={BiologicalSex.MALE}>Male</option>
              <option value={BiologicalSex.FEMALE}>Female</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Height (cm)</label>
            <input 
              type="number" 
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.heightCm}
              onChange={e => setFormData({...formData, heightCm: Number(e.target.value)})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Weight (kg)</label>
            <input 
              type="number" 
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.weightKg}
              onChange={e => setFormData({...formData, weightKg: Number(e.target.value)})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Activity Level</label>
          <select 
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.activityLevel}
            onChange={e => setFormData({...formData, activityLevel: Number(e.target.value) as ActivityLevel})}
          >
            <option value={ActivityLevel.SEDENTARY}>Sedentary (Little/no exercise)</option>
            <option value={ActivityLevel.LIGHTLY_ACTIVE}>Lightly Active (1-3 days/week)</option>
            <option value={ActivityLevel.MODERATELY_ACTIVE}>Moderately Active (3-5 days/week)</option>
            <option value={ActivityLevel.VERY_ACTIVE}>Very Active (6-7 days/week)</option>
            <option value={ActivityLevel.EXTREMELY_ACTIVE}>Extremely Active (Daily hard exercise)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Target Weight (kg)</label>
          <input 
            type="number" 
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.targetWeightKg}
            onChange={e => setFormData({...formData, targetWeightKg: Number(e.target.value)})}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          Initialize System
        </button>
      </form>
    </div>
  );
};

export default OnboardingForm;
