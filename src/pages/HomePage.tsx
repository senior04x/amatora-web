import React from 'react';
import { Shield, Smartphone, Trophy, Users, Zap, CheckCircle2, ArrowRight, Download, BarChart3, Image as ImageIcon, Lock } from 'lucide-react';

interface HomePageProps {
  onOpenDownload: () => void;
  setActiveTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDownload, setActiveTab }) => {
  return (
    <div className="space-y-16 sm:space-y-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 text-center space-y-6 max-w-4xl mx-auto">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 glass-badge py-1 px-3">
          <Shield className="w-3.5 h-3.5 text-white" />
          <span>Futbol Boshqaruv Ekotizimi</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-white leading-tight">
          Havaskor Futbol Ligalari Platformasi
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
          Turnirlar, o'yinlar jadvali, statistikalar va match grafikalarini tezkor boshqaring.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenDownload}
            className="glass-button glass-button-primary w-full sm:w-auto py-3 px-6 text-sm"
          >
            <Download className="w-4 h-4 text-black" />
            <span>Ilovani Yuklash</span>
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className="glass-button w-full sm:w-auto py-3 px-6 text-sm"
          >
            <span>Imkoniyatlar</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8">
          
          <div className="glass-card p-4 text-center space-y-1">
            <Trophy className="w-5 h-5 text-white mx-auto opacity-80" />
            <div className="font-heading font-black text-xl sm:text-2xl text-white">100+</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ligalar</div>
          </div>

          <div className="glass-card p-4 text-center space-y-1">
            <Users className="w-5 h-5 text-white mx-auto opacity-80" />
            <div className="font-heading font-black text-xl sm:text-2xl text-white">5,000+</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">O'yinchilar</div>
          </div>

          <div className="glass-card p-4 text-center space-y-1">
            <Zap className="w-5 h-5 text-white mx-auto opacity-80" />
            <div className="font-heading font-black text-xl sm:text-2xl text-white">0.1s</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sinxronizatsiya</div>
          </div>

          <div className="glass-card p-4 text-center space-y-1">
            <Lock className="w-5 h-5 text-white mx-auto opacity-80" />
            <div className="font-heading font-black text-xl sm:text-2xl text-white">amatora.uz</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Xavfsizlik</div>
          </div>

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
            <Download className="w-4 h-4 text-black" />
            <span>Yuklab Olish</span>
          </button>
        </div>
      </section>

    </div>
  );
};
