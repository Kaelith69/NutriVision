
import React, { useState } from 'react';
import { UserProfile, ActivityLevel } from '../types';

interface SettingsProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  onBack: () => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ profile, onUpdate, onBack, onLogout }) => {
  const [data, setData] = useState(profile);

  const handleSave = () => {
    onUpdate(data);
    onBack();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">System Config</h2>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Metabolic Baseline Management</p>
        </div>
        <button onClick={onBack} className="p-4 hover:bg-slate-100 rounded-2xl transition-all">
          <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-10">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Age</label>
            <input 
              type="number" 
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-black outline-none border border-transparent focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all"
              value={data.age}
              onChange={e => setData({...data, age: Number(e.target.value)})}
            />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Weight (kg)</label>
            <input 
              type="number" 
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-black outline-none border border-transparent focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all"
              value={data.weightKg}
              onChange={e => setData({...data, weightKg: Number(e.target.value)})}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Activity Tier</label>
          <select 
            className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-black outline-none border border-transparent focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all"
            value={data.activityLevel}
            onChange={e => setData({...data, activityLevel: Number(e.target.value) as ActivityLevel})}
          >
            <option value={ActivityLevel.SEDENTARY}>Sedentary</option>
            <option value={ActivityLevel.LIGHTLY_ACTIVE}>Lightly Active</option>
            <option value={ActivityLevel.MODERATELY_ACTIVE}>Moderately Active</option>
            <option value={ActivityLevel.VERY_ACTIVE}>Very Active</option>
            <option value={ActivityLevel.EXTREMELY_ACTIVE}>Extremely Active</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-6">
          <button onClick={onLogout} className="flex-1 py-5 rounded-2xl border border-rose-100 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 transition-all">Reset All Data</button>
          <button onClick={handleSave} className="flex-[2] py-5 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">Update Metabolic Base</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
