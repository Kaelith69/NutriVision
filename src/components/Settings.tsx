
import React, { useState } from 'react';
import { UserProfile, ActivityLevel } from '../types';
import { TacticalButton } from './ui/TacticalButton';
import { Settings as SettingsIcon, Save, LogOut, ArrowLeft, Ruler, Weight, Activity, User } from 'lucide-react';

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

  const inputClass = "w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all placeholder:text-slate-300";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-2";

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-600" /> System Config
          </h2>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Metabolic Baseline Management</p>
        </div>
        <button onClick={onBack} className="p-4 hover:bg-slate-100 rounded-2xl transition-all group">
          <ArrowLeft className="w-6 h-6 text-slate-400 group-hover:text-slate-600" />
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50 pointer-events-none" />

        <div className="grid grid-cols-2 gap-8 relative z-10">
          <div className="space-y-2">
            <label className={labelClass}><User className="w-3 h-3 text-blue-500" /> Age</label>
            <input
              type="number"
              className={inputClass}
              value={data.age}
              onChange={e => setData({ ...data, age: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}><Weight className="w-3 h-3 text-blue-500" /> Weight (kg)</label>
            <input
              type="number"
              className={inputClass}
              value={data.weightKg}
              onChange={e => setData({ ...data, weightKg: Number(e.target.value) })}
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className={labelClass}><Activity className="w-3 h-3 text-blue-500" /> Activity Tier</label>
            <select
              className={inputClass}
              value={data.activityLevel}
              onChange={e => setData({ ...data, activityLevel: Number(e.target.value) as ActivityLevel })}
            >
              <option value={ActivityLevel.SEDENTARY}>Sedentary: Minimal Physical Output</option>
              <option value={ActivityLevel.LIGHTLY_ACTIVE}>Lightly Active: 1-3 Training Cycles/Week</option>
              <option value={ActivityLevel.MODERATELY_ACTIVE}>Moderately Active: 3-5 Training Cycles/Week</option>
              <option value={ActivityLevel.VERY_ACTIVE}>Very Active: 6-7 Training Cycles/Week</option>
              <option value={ActivityLevel.EXTREMELY_ACTIVE}>Extremely Active: Hard Daily Manual Output</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-6 relative z-10">
          <TacticalButton
            onClick={onLogout}
            variant="danger"
            className="flex-1"
          >
            <LogOut className="w-4 h-4" /> Reset All Data
          </TacticalButton>
          <TacticalButton
            onClick={handleSave}
            variant="primary"
            size="lg"
            className="flex-[2] shadow-xl shadow-blue-500/20"
          >
            <Save className="w-4 h-4" /> Update Metabolic Base
          </TacticalButton>
        </div>
      </div>
    </div>
  );
};

export default Settings;
