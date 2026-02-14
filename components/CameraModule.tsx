
import React, { useRef, useState } from 'react';
import { analyzeFoodImage } from '../services/geminiService';
import { MealLog } from '../types';

interface CameraModuleProps {
  onClose: () => void;
  onMealAnalyzed: (meal: MealLog) => void;
}

const REFERENCE_OBJECTS = [
  { id: 'none', label: 'None', description: 'Auto-detect' },
  { id: 'card', label: 'Credit Card', description: '85.6mm x 54mm' },
  { id: 'coin', label: 'Quarter/Coin', description: 'Standard 24mm' },
  { id: 'plate', label: 'Standard Plate', description: '10-inch / 25cm' },
  { id: 'can', label: 'Soda Can', description: '12oz / 66mm diam' },
];

const CameraModule: React.FC<CameraModuleProps> = ({ onClose, onMealAnalyzed }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scaleContext, setScaleContext] = useState("");
  const [selectedRef, setSelectedRef] = useState(REFERENCE_OBJECTS[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async () => {
    if (!previewUrl) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const base64Data = previewUrl.split(',')[1];
      
      // Combine structured reference with custom context
      const fullContext = [
        selectedRef.id !== 'none' ? `Reference object: ${selectedRef.label} (${selectedRef.description})` : '',
        scaleContext.trim()
      ].filter(Boolean).join('. ');

      const items = await analyzeFoodImage(base64Data, fullContext);

      if (items.length === 0) {
        throw new Error("No food items recognized with high confidence.");
      }

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
        uncertaintyRange: [totalCalories * 0.75, totalCalories * 1.25], 
      };

      onMealAnalyzed(mealLog);
    } catch (err: any) {
      setError(err.message || "Deterministic mapping failed. Please retry.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-black text-slate-800 text-lg tracking-tight">Vision Engine</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Multimodal Decomposition</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-90">
            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto">
          {!previewUrl ? (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 group hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all">
                <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-slate-800 font-black text-lg">Initialize Camera</p>
              <p className="text-slate-400 text-sm mt-1">Capture meal for volumetric analysis</p>
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleCapture}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-inner shrink-0">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin mb-6" />
                    <p className="font-black text-xl tracking-tighter">Decomposing Plate</p>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.3em] mt-2">Mapping to USDA Central</p>
                  </div>
                )}
              </div>
              
              {!isAnalyzing && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Reference Scaling Object</label>
                    <div className="flex flex-wrap gap-2">
                      {REFERENCE_OBJECTS.map((obj) => (
                        <button
                          key={obj.id}
                          onClick={() => setSelectedRef(obj)}
                          className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                            selectedRef.id === obj.id
                              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
                              : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {obj.label}
                        </button>
                      ))}
                    </div>
                    {selectedRef.id !== 'none' && (
                      <p className="text-[10px] text-blue-500 font-medium ml-1">
                        System will use {selectedRef.description} as a dimensional anchor.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Notes / Custom Container Size</label>
                    <input 
                      type="text" 
                      placeholder="e.g. half-filled large bowl, 12oz mug..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={scaleContext}
                      onChange={(e) => setScaleContext(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-3 animate-shake">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => { setPreviewUrl(null); setScaleContext(""); setSelectedRef(REFERENCE_OBJECTS[0]); }}
                      className="flex-1 py-4 text-slate-500 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-colors active:scale-95"
                    >
                      Discard
                    </button>
                    <button 
                      onClick={processImage}
                      className="flex-[2] py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-200"
                    >
                      Start Analysis
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0">
          <p className="text-[10px] text-slate-400 leading-relaxed text-center px-4 font-medium italic">
            Visual analysis is probabilistic. Use of reference objects (coin, card, etc.) significantly reduces volumetric estimation variance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CameraModule;
