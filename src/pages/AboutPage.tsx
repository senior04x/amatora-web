import React from 'react';
import { Info, Shield, Server, Terminal } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="glass-badge">
          <Info className="w-3.5 h-3.5 text-white" />
          <span>Ekotizim Haqida (amatora.uz)</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">AMATORA Futbol Boshqaruv Platformasi</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Havaskor sportni raqamlashtirish hamda futbol ligalariga professional IT-infratuzilmani taqdim etish loyihasi.
        </p>
      </div>

      {/* Mission & Vision Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        
        <div className="glass-card p-6 sm:p-8 space-y-4">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-heading font-bold text-xl text-white">Bizning Maqsadimiz</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            O'zbekistondagi barcha havaskor futbol ligalari va mahalla turnirlarini yagona, avtomatlashtirilgan raqamli platformaga birlashtirish. Turnir tashkilotchilarining qg'ozbozlik va murakkab hisob-kitoblariga bo'lgan ehtiyojini to'liq tugatish.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 space-y-4">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <Server className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-heading font-bold text-xl text-white">Infratuzilma Standarti</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            AMATORA ekotizimi yuqori yuklamalarga chidamli Supabase PostgreSQL backend hamda shaffof Glassmorphic React Native va Web frontend texnologiyalari asosida barpo etilgan.
          </p>
        </div>

      </div>

      {/* System Technical Specs Box */}
      <div className="glass-card p-6 sm:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Terminal className="w-6 h-6 text-white" />
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white">Tizim Arxitekturasi va Texnik Spetsifikatsiyasi</h3>
            <p className="text-xs text-slate-400">Domen: amatora.uz</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Brauzer va Web</div>
            <div className="text-xs text-slate-400">Vite, React 19, TypeScript, Vanilla Glassmorphism CSS</div>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Mobil Dastur</div>
            <div className="text-xs text-slate-400">React Native 0.81, Expo SDK 54, Dimezis BlurView Engine</div>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Ma'lumotlar Baza</div>
            <div className="text-xs text-slate-400">Supabase Cloud, PostgreSQL, Row-Level Security (RLS)</div>
          </div>

        </div>
      </div>

    </div>
  );
};
