import React, { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDownload: () => void;
}

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
      {/* 1. Floating Right Corner Borderless Burger Button */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 rounded-2xl bg-black/70 backdrop-blur-xl flex items-center justify-center text-white shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none"
          aria-label="Toggle Navigation Drawer"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 2. Glass Dark Backdrop Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 3. Smooth Animated Glass Side-Drawer (No Logo, No Link Icons) */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 sm:w-80 bg-black/90 backdrop-blur-2xl border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header (Close Button Only, No Logo) */}
        <div className="space-y-6">
          <div className="flex items-center justify-end border-b border-white/10 pb-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links List (Clean Text Only, No Icons) */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
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
