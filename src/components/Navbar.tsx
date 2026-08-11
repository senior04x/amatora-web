import React, { useState } from 'react';
import { Shield, Smartphone, Layers, Info, Lock, Menu, X, Download } from 'lucide-react';
import logoWhite from '../assets/amatora-logo-white.png';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenDownload }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Bosh Sahifa', icon: Shield },
    { id: 'apps', label: 'Ilovalar', icon: Smartphone },
    { id: 'features', label: 'Xususiyatlar', icon: Layers },
    { id: 'about', label: 'Haqida', icon: Info },
    { id: 'security', label: 'Xavfsizlik', icon: Lock },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Official AMATORA Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <img 
            src={logoWhite} 
            alt="AMATORA Logo" 
            className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform" 
          />
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-slate-300">.UZ</span>
        </div>

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-black shadow-lg shadow-white/10 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenDownload}
            className="glass-button glass-button-primary text-sm py-2 px-4"
          >
            <Download className="w-4 h-4 text-black" />
            <span>Yuklab Olish</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-3 p-4 glass-card rounded-2xl border border-white/20 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 w-full p-3 rounded-xl text-left text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-black font-bold'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenDownload();
            }}
            className="glass-button glass-button-primary w-full mt-2 py-3"
          >
            <Download className="w-4 h-4 text-black" />
            <span>Yuklab Olish</span>
          </button>
        </div>
      )}
    </header>
  );
};
