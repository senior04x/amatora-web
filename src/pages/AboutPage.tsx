import React from 'react';
import { Info, Shield, Server, Terminal } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="glass-badge">
          <Info className="w-3.5 h-3.5 text-white" />
          <span>Ekotizim Haqida</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
          AMATORA Futbol Boshqaruv Platformasi
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Havaskor futbol ligalari va turnirlarini raqamlashtirish, boshqarish va avtomatlashtirish uchun yaratilgan platforma.
        </p>
      </div>

      {/* Mission & Infrastructure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        
        <div className="glass-card p-6 sm:p-8 space-y-4 border-white/20">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-xl text-white">Bizning Maqsadimiz</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            O'zbekistondagi havaskor futbol ligalari va mahalla turnirlarini zamonaviy raqamli vositalar bilan ta'minlash. Turnirlarni tashkil etish, jamoalar va o'yinchilarni boshqarish, natijalarni yuritish hamda qog'ozbozlik va murakkab hisob-kitoblarni kamaytirish.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 space-y-4 border-white/20">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Server className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-xl text-white">Platforma Infratuzilmasi</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            AMATORA zamonaviy veb va mobil texnologiyalar hamda Supabase PostgreSQL ma'lumotlar bazasi asosida ishlab chiqilgan bo'lib, barqaror va tezkor ishlashni ta'minlaydi.
          </p>
        </div>

      </div>

      {/* System Technical Specs Box */}
      <div className="glass-card p-6 sm:p-8 max-w-5xl mx-auto space-y-6 border-white/20">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Terminal className="w-6 h-6 text-white" />
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white">Platforma Texnologiyalari</h3>
            <p className="text-xs text-slate-400">Asosiy texnologik stek</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Web</div>
            <div className="text-xs text-slate-400">React, TypeScript, Vite</div>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Mobile</div>
            <div className="text-xs text-slate-400">React Native, Expo</div>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Desktop</div>
            <div className="text-xs text-slate-400">Windows .NET, WPF, OBS WebSocket</div>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Backend</div>
            <div className="text-xs text-slate-400">Supabase, PostgreSQL, RLS</div>
          </div>

        </div>
      </div>

    </div>
  );
};
