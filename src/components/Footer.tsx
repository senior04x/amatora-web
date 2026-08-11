import React from 'react';
import { Lock, ArrowUpRight } from 'lucide-react';
import logoWhite from '../assets/amatora-logo-white.png';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-xl text-slate-400 py-16 px-4 lg:px-8 relative z-10 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Column 1: Brand & Domain */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <img src={logoWhite} alt="AMATORA Logo" className="h-5 w-auto object-contain" />
            <span className="font-heading font-black text-sm tracking-wider text-white">AMATORA</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Havaskor futbol ligalarini raqamlashtirish va avtomatlashtirilgan professional boshqaruv platformasi.
          </p>

        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-sm text-white tracking-wider uppercase">Platforma</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors flex items-center gap-1">
                <span>Bosh Sahifa</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('apps')} className="hover:text-white transition-colors flex items-center gap-1">
                <span>Mobil Ilovalarni Yuklash</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('features')} className="hover:text-white transition-colors flex items-center gap-1">
                <span>Ligalar va Turnirlar</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Architecture & Security */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-sm text-white tracking-wider uppercase">Tizim va Xavfsizlik</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors flex items-center gap-1">
                <span>Ekotizim Haqida</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('security')} className="hover:text-white transition-colors flex items-center gap-1">
                <span>Xavfsizlik Standartlari</span>
              </button>
            </li>
            <li>
              <a href="https://amatora.uz/manifest.json" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                <span>Manifest Specification</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Security Shield Badge */}
        <div className="space-y-3 glass-card p-5 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-2 text-white font-bold text-xs">
            <Lock className="w-4 h-4 text-white" />
            <span>Zero-Trust Security</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Barcha ma'lumotlar shifrlangan va SSL/TLS protokoli ostida amatora.uz domeni orqali himoyalanadi.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 text-center text-xs text-slate-500">
        <p>© 2026 AMATORA (amatora.uz). Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  );
};
