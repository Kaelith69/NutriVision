
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onReset?: () => void;
  onExport?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onReset, onExport }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">NutriVision <span className="text-blue-600">AI</span></h1>
          </div>
          <div className="flex items-center gap-4">
            {onExport && (
              <button 
                onClick={onExport}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
            )}
            {onReset && (
              <button 
                onClick={onReset}
                className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors"
              >
                Reset Data
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} NutriVision AI. Scientifically Grounded Nutrition Analysis.
          </p>
          <p className="text-slate-400 text-[10px] mt-1 uppercase tracking-widest">
            BMR (Mifflin St Jeor) • Energy Balance Physics • Gemini Vision
          </p>
        </div>
      </footer>
    </div>
  );
};
