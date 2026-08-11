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
      {/* Floating Right Corner Burger Button ONLY */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-2xl hover:border-white/50 hover:scale-105 transition-all"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Floating Full Glass Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6 animate-fade-in">
          <div className="w-full max-w-sm glass-card p-6 sm:p-8 space-y-6 border border-white/25 relative shadow-2xl">
            
            {/* Header Brand */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <img src={logoWhite} alt="AMATORA" className="h-7 w-auto object-contain" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-slate-300">.UZ</span>
              </div>
            </div>

            {/* Nav Items */}
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3.5 w-full p-3.5 rounded-xl text-left text-sm font-semibold transition-all ${
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
            </div>

            {/* Action Download Button */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenDownload();
                }}
                className="glass-button glass-button-primary w-full py-3.5"
              >
                <Download className="w-4 h-4 text-black" />
                <span>Ilovani Yuklab Olish</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
