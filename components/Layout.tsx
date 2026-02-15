
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onExport?: () => void;
  onNavigate?: (view: 'dashboard' | 'settings') => void;
  currentView?: 'dashboard' | 'settings';
  isLoggedIn?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, onExport, onNavigate, currentView, isLoggedIn }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="bg-white/80 backdrop-blur-2xl border-b border-slate-200 sticky top-0 z-[60]">
        <div className="max-w-5xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none transition-transform active:scale-95"
            onClick={() => onNavigate?.('dashboard')}
          >
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200 group-hover:bg-blue-600 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">NUTRI<span className="text-blue-600">VISION</span></h1>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 leading-none">Bio-Intelligence Core</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            {isLoggedIn && (
              <>
                <button 
                  onClick={() => onNavigate?.('settings')}
                  className={`p-2.5 rounded-xl transition-all btn-tactical ${currentView === 'settings' ? 'bg-slate-900 text-white shadow-xl shadow-slate-300 scale-105' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
                  aria-label="System Settings"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" strokeWidth={2.5} />
                  </svg>
                </button>
                {onExport && (
                  <button 
                    onClick={onExport}
                    className="hidden md:flex text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition-all items-center gap-2 px-6 py-3 border-2 border-slate-900 rounded-xl btn-tactical"
                  >
                    Archive Data
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-6 md:py-12">
        {children}
      </main>

      <footer className="py-16 border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 opacity-30">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
            <p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.5em]">
              NutriVision Tactical Intelligence System
            </p>
          </div>
          <p className="text-slate-400 text-[8px] font-bold uppercase tracking-[0.2em]">
            Deterministic Volumetric Mapping Algorithm v4.2.0 • Powered by Google Gemini 3
          </p>
        </div>
      </footer>
    </div>
  );
};
