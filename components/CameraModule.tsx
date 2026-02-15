
import React, { useRef, useState } from 'react';
import { analyzeFoodImage } from '../services/geminiService';
import { MealLog } from '../types';

interface CameraModuleProps {
  onClose: () => void;
  onMealAnalyzed: (meal: MealLog) => void;
}

const REFERENCE_OBJECTS = [
  { id: 'none', label: 'Auto', description: 'Internal calibration' },
  { id: 'card', label: 'Card', description: 'Credit card size' },
  { id: 'coin', label: 'Coin', description: 'Standard 24mm' },
  { id: 'plate', label: 'Plate', description: 'Standard 10-inch' },
  { id: 'utensil', label: 'Fork', description: 'Standard length' },
];

const CameraModule: React.FC<CameraModuleProps> = ({ onClose, onMealAnalyzed }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scaleContext, setScaleContext] = useState("");
  const [selectedRef, setSelectedRef] = useState(REFERENCE_OBJECTS[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const processImage = async () => {
    if (!previewUrl) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const base64Data = previewUrl.split(',')[1];
      const fullContext = `Reference: ${selectedRef.label} (${selectedRef.description}). Notes: ${scaleContext}`;
      
      const items = await analyzeFoodImage(base64Data, fullContext);

      if (items.length === 0) throw new Error("Plate decomposition failed. No items detected.");

      const totalCalories = items.reduce((sum, i) => sum + i.calories, 0);
      const totalProtein = items.reduce((sum, i) => sum + i.protein, 0);
      const totalFat = items.reduce((sum, i) => sum + i.fat, 0);
      const totalCarbs = items.reduce((sum, i) => sum + i.carbs, 0);

      const mealLog: MealLog = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        imageUrl: previewUrl,
        items,
        totalCalories,
        totalProtein,
        totalFat,
        totalCarbs,
        uncertaintyRange: [totalCalories * 0.8, totalCalories * 1.2],
      };

      onMealAnalyzed(mealLog);
    } catch (err: any) {
      setError(err.message || "Visual analysis error.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/95 flex items-center justify-center p-4 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
          <div>
            <h3 className="font-black text-slate-900 text-2xl tracking-tighter uppercase italic">Vision Core</h3>
            <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase mt-1">Plate Decomposition v4.2</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full btn-tactical">
            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto no-scrollbar">
          {!previewUrl ? (
            <div 
              className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50 group hover:bg-slate-100 hover:border-blue-400 transition-all cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-slate-200 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><circle cx="12" cy="13" r="3" strokeWidth={1.5} /></svg>
              </div>
              <p className="text-slate-900 font-black text-xl tracking-tight">Initialize Optical Input</p>
              <p className="text-slate-400 text-[10px] mt-2 uppercase tracking-[0.2em] font-black">Ready for Capture</p>
              <input type="file" accept="image/*" capture="environment" className="hidden" ref={fileInputRef} onChange={handleCapture} />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] bg-slate-900 shadow-2xl ring-4 ring-slate-100">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[4px] flex flex-col items-center justify-center">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="scanner-line w-full" />
                    </div>
                    <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-6" />
                    <p className="font-black text-white text-[10px] uppercase tracking-[0.4em] animate-pulse-soft">Processing Volumetric Data</p>
                  </div>
                )}
              </div>
              
              {!isAnalyzing && (
                <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                      Calibration Reference
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {REFERENCE_OBJECTS.map((obj) => (
                        <button
                          key={obj.id}
                          onClick={() => setSelectedRef(obj)}
                          className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                            selectedRef.id === obj.id
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200'
                              : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          {obj.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                      Optical Context
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. 12oz glass, oversized plate..."
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                      value={scaleContext}
                      onChange={(e) => setScaleContext(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="p-6 bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center gap-4">
                      <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      {error}
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => { setPreviewUrl(null); setScaleContext(""); setSelectedRef(REFERENCE_OBJECTS[0]); }}
                      className="flex-1 py-5 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all btn-tactical"
                    >
                      Discard
                    </button>
                    <button 
                      onClick={processImage}
                      className="flex-[2] py-5 bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 btn-tactical"
                    >
                      Process Scan
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.4em] mono">Precision Sensor Core Active</p>
        </div>
      </div>
    </div>
  );
};

export default CameraModule;
