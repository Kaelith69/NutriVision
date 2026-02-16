
import React from 'react';
import { TacticalButton } from './ui/TacticalButton';
import { Layout, Share2, Settings, ChevronLeft, ShieldCheck, Activity, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onExport?: () => void;
  onNavigate?: (view: 'dashboard' | 'settings' | 'analytics') => void;
  currentView?: 'dashboard' | 'settings' | 'analytics';
  isLoggedIn?: boolean;
}

export const AppLayout: React.FC<LayoutProps> = ({ children, onExport, onNavigate, currentView, isLoggedIn }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-3">
                  <TacticalButton
                    variant={currentView === 'analytics' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => onNavigate?.('analytics')}
                    aria-label="Analytics"
                    className={currentView === 'analytics' ? 'shadow-blue-500/20' : ''}
                  >
                    <Activity className="w-5 h-5" strokeWidth={2} />
                  </TacticalButton>

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
                    >
                      <Share2 className="w-4 h-4" strokeWidth={2.5} />
                      <span>Archive</span>
                    </TacticalButton>
                  )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                  <TacticalButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </TacticalButton>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isLoggedIn && isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300 z-50">
            <div onClick={() => { onNavigate?.('analytics'); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 active:bg-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">Analytics</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Performance Metrics</p>
              </div>
            </div>
            <div onClick={() => { onNavigate?.('settings'); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 active:bg-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">System Settings</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Configuration</p>
              </div>
            </div>
            {onExport && (
              <div onClick={() => { onExport(); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 active:bg-slate-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">Export Data</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Archive Protocols</p>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 pt-[calc(6rem+env(safe-area-inset-top))] pb-[calc(3rem+env(safe-area-inset-bottom))]">
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

