import React from 'react';
import { Smartphone, CheckCircle2, BarChart3, Image as ImageIcon } from 'lucide-react';
import logoWhite from '../assets/amatora-logo-white.png';

interface HomePageProps {
  onOpenDownload: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDownload }) => {
  return (
    <div className="space-y-24">
      
      {/* 1. HERO SECTION (100vh FULLSCREEN CENTERED BRAND DISPLAY) */}
      <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-center px-4 relative">
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto my-auto animate-fade-in">
          <img 
            src={logoWhite} 
            alt="AMATORA Official Logo" 
            className="h-20 sm:h-32 md:h-40 lg:h-44 w-auto object-contain logo-glow-radiance" 
          />
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider text-white">
            AMATORA
          </h1>
        </div>
      </section>

      {/* 2. ECOSYSTEM CARDS */}
      <section className="space-y-8">
        
        <div className="text-center space-y-2">
          <div className="glass-badge">Imkoniyatlar</div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">Platforma Tizim Modullari</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1 */}
          <div className="glass-card p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Turnir Jadvali</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ochko, to'purarlar va kartochkalar avtomatik hisoblanadi.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Real-vaqt ochkolari</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>To'purarlar reytingi</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">PNG Grafika Eksport</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Jadvallar va o'yinlar 1080x1080 rasmlarga 1 soniyada eksport qilinadi.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Avtomatik brending</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Homiylar logotiplari</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Arizalar va Transferlar</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                O'yinchilar pasporti hamda transfer arizalarini bir bosishda tasdiqlang.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Pasport verifikatsiyasi</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Transfer oynalari</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* 3. CTA GLASS BANNER */}
      <section className="glass-card p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-xl mx-auto">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">AMATORA Admin Ilovasini Yuklang</h2>
          <p className="text-xs text-slate-400">
            Turnirlaringizni tezkor va qulay boshqaring (amatora.uz).
          </p>
        </div>
        <div className="pt-2 relative z-10">
          <button
            onClick={onOpenDownload}
            className="glass-button glass-button-primary py-3 px-8 text-sm"
          >
            <span>Yuklab Olish</span>
          </button>
        </div>
      </section>

    </div>
  );
};
