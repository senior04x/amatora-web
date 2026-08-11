import React, { useState } from 'react';
import { Shield, Smartphone, Layers, Info, Lock, Menu, X, Download } from 'lucide-react';
import logoWhite from '../assets/amatora-logo-white.png';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenDownload }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Bosh Sahifa', icon: Shield },
    { id: 'apps', label: 'Ilovalar', icon: Smartphone },
    { id: 'features', label: 'Xususiyatlar', icon: Layers },
    { id: 'about', label: 'Haqida', icon: Info },
    { id: 'security', label: 'Xavfsizlik', icon: Lock },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Floating Right Corner Burger Toggle Button */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-2xl hover:border-white/50 hover:scale-105 active:scale-95 transition-all"
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

      {/* 3. Smooth Animated Glass Side-Drawer (Sliding from Right) */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 sm:w-96 bg-black/85 backdrop-blur-2xl border-l border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-2.5">
              <img src={logoWhite} alt="AMATORA Logo" className="h-8 w-auto object-contain" />
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-slate-300">.UZ</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-4 w-full p-3.5 rounded-2xl text-left text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-slate-400'}`} />
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
            amatora.uz • Rasmiy Platforma
          </div>
        </div>
      </aside>
    </>
  );
};
