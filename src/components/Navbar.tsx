import React, { useState } from 'react';
import { X, Download } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDownload: (platform?: 'android' | 'ios') => void;
}

const CustomMenuIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5l5 9 10 3" />
    <path d="M4 11l5 9 10 3" />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenDownload }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Bosh Sahifa' },
    { id: 'apps', label: 'Ilovalar' },
    { id: 'features', label: 'Xususiyatlar' },
    { id: 'about', label: 'Haqida' },
    { id: 'security', label: 'Xavfsizlik' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Floating Right Corner Borderless Custom Burger Button */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 flex items-center justify-center text-white hover:opacity-80 active:scale-95 transition-all outline-none"
          aria-label="Toggle Navigation Drawer"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <CustomMenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* 2. Glass Dark Backdrop Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 3. Smooth Animated Glass Side-Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 sm:w-80 bg-black/90 backdrop-blur-2xl border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="space-y-3 pt-1">
          
          {/* Navigation Links List — Bosh Sahifa parallel with X button */}
          <nav className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = activeTab === item.id;
              
              if (index === 0) {
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`flex-1 p-3.5 rounded-2xl text-left text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0 outline-none"
                      aria-label="Close navigation menu"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full p-3.5 rounded-2xl text-left text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer Actions */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenDownload();
            }}
            className="glass-button glass-button-primary w-full py-3.5 text-sm"
          >
            <Download className="w-4 h-4 text-black" />
            <span>Ilovani Yuklab Olish</span>
          </button>
          <div className="text-center text-[11px] text-slate-500 font-mono">
            amatora.uz
          </div>
        </div>
      </aside>
    </>
  );
};
