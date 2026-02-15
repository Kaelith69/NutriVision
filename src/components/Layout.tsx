
import React from 'react';
import { TacticalButton } from './ui/TacticalButton';
import { Layout, Share2, Settings, ChevronLeft, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onExport?: () => void;
  onNavigate?: (view: 'dashboard' | 'settings') => void;
  currentView?: 'dashboard' | 'settings';
  isLoggedIn?: boolean;
}

export const AppLayout: React.FC<LayoutProps> = ({ children, onExport, onNavigate, currentView, isLoggedIn }) => {
  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50">
      <header className="fixed top-0 inset-x-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 support-[backdrop-filter]:bg-white/60">
        <div className="max-w-5xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">
          <div
            className="flex items-center gap-3.5 cursor-pointer group select-none transition-transform active:scale-95 py-4"
            onClick={() => onNavigate?.('dashboard')}
          >
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10 group-hover:bg-blue-600 transition-all duration-300 ring-1 ring-black/5">
              <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none flex items-center gap-1">
                NUTRI<span className="text-blue-600">VISION</span>
              </h1>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none mt-1">Bio-Analysis Core</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {isLoggedIn && (
              <>
                <TacticalButton
                  variant={currentView === 'settings' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => onNavigate?.('settings')}
                  aria-label="Settings"
                  className={currentView === 'settings' ? 'shadow-blue-500/20' : ''}
                >
                  <Settings className="w-5 h-5" strokeWidth={2} />
                </TacticalButton>

                {onExport && (
                  <TacticalButton
                    variant="secondary"
                    size="sm"
                    onClick={onExport}
                    className="hidden md:flex"
                  >
                    <Share2 className="w-4 h-4" strokeWidth={2.5} />
                    <span>Archive</span>
                  </TacticalButton>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 pt-24 pb-12">
        {children}
      </main>

      <footer className="py-12 border-t border-slate-200 bg-white/50">
        <div className="max-w-5xl mx-auto px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 opacity-40">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
            <p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.4em]">
              System Operational
            </p>
          </div>
          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em] px-4">
            Deterministic Volumetric Mapping Algorithm v4.2.0 • Powered by Google Gemini
          </p>
        </div>
      </footer>
    </div>
  );
};

