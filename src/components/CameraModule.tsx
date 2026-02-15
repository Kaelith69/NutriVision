
import React, { useRef, useState } from 'react';
import { analyzeFoodImage } from '../services/geminiService';
import { MealLog } from '../types';
import { TacticalButton } from './ui/TacticalButton';
import { ScannerOverlay } from './ui/ScannerOverlay';
import { X, Camera, Upload, AlertCircle, Check, ScanLine } from 'lucide-react';

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
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[90vh] relative">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50 backdrop-blur-md shrink-0">
          <div>
            <h3 className="font-black text-slate-900 text-xl tracking-tighter uppercase italic flex items-center gap-2">
              <ScanLine className="w-5 h-5 text-blue-600" /> Vision Core
            </h3>
            <p className="text-[9px] text-slate-400 font-black tracking-[0.3em] uppercase mt-1">Plate Decomposition v4.2</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto no-scrollbar bg-slate-50/50 flex-1">
          {!previewUrl ? (
            <div
              className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-300 rounded-[2rem] bg-slate-100/50 group hover:bg-white hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer relative overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform duration-300 ring-1 ring-slate-100">
                <Camera className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
              </div>
              <p className="text-slate-900 font-black text-lg tracking-tight">Initialize Optical Input</p>
              <p className="text-slate-400 text-[9px] mt-2 uppercase tracking-[0.2em] font-black group-hover:text-blue-500 transition-colors">Tap to Capture</p>
              <input type="file" accept="image/*" capture="environment" className="hidden" ref={fileInputRef} onChange={handleCapture} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-slate-900 shadow-xl ring-4 ring-white">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
                <ScannerOverlay active={isAnalyzing} />

                {isAnalyzing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4" />
                    <div className="bg-slate-950/80 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                      <p className="font-black text-white text-[9px] uppercase tracking-[0.3em] animate-pulse">Processing Volumetric Data</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => { setPreviewUrl(null); setScaleContext(""); setSelectedRef(REFERENCE_OBJECTS[0]); }}
                  className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-rose-600 transition-colors z-30"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!isAnalyzing && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        Calibration Reference
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {REFERENCE_OBJECTS.map((obj) => (
                          <button
                            key={obj.id}
                            onClick={() => setSelectedRef(obj)}
                            className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all border ${selectedRef.id === obj.id
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'
                              }`}
                          >
                            {obj.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        Optical Context Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 12oz glass, oversized plate..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        value={scaleContext}
                        onChange={(e) => setScaleContext(e.target.value)}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <TacticalButton
                    onClick={processImage}
                    className="w-full shadow-xl shadow-blue-500/20"
                    size="lg"
                  >
                    <ScanLine className="w-4 h-4" /> Initiate Analysis
                  </TacticalButton>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] mono">Precision Sensor Core Active</p>
        </div>
      </div>
    </div>
  );
};

export default CameraModule;
