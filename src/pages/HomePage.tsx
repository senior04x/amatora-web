import React, { useEffect } from 'react';
import { Smartphone, CheckCircle2, BarChart3, Image as ImageIcon, ChevronUp } from 'lucide-react';
import logoWhite from '../assets/amatora-logo-white.png';

interface HomePageProps {
  onOpenDownload: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDownload }) => {
  
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      
      {/* 1. HERO VIEWPORT SPACE WITH ANIMATED UP ARROW INDICATOR */}
      <div className="h-[100dvh] flex flex-col justify-end items-center pb-8 sm:pb-12 pointer-events-none relative z-10">
        <div 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity animate-bounce pointer-events-auto cursor-pointer"
        >
          <ChevronUp className="w-5 h-5 text-white" />
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Scroll</span>
        </div>
      </div>

      {/* 2. FULL-WIDTH COLORLESS GLASS OVERLAY SHEET — no side margins, no side padding */}
      <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full">
        
        {/* Imkoniyatlar Section */}
        <section className="pt-16 pb-0 px-4 sm:px-8 lg:px-12">

          <div className="text-center space-y-2 reveal-on-scroll delay-1 mb-10">
            <div className="glass-badge">Imkoniyatlar</div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">Platforma Tizim Modullari</h2>
          </div>

          {/* Cards — tailored for amatora-app & amatora-admin-app */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Card 1: amatora-app (Player / Public app) */}
            <div className="glass-card p-6 space-y-4 flex flex-col justify-between reveal-on-scroll delay-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-slate-300">AMATORA App</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">Turnir Jadvali va Statistika</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O'yinchilar va ishqibozlar uchun real-vaqt rejimida yangilanuvchi ligalar statistikasi.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Real-vaqt ochkolari</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>To'purarlar va kartochkalar reytingi</span>
                </li>
              </ul>
            </div>

            {/* Card 2: amatora-admin-app (Organizers app) */}
            <div className="glass-card p-6 space-y-4 flex flex-col justify-between reveal-on-scroll delay-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-slate-300">AMATORA Admin</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">PNG Grafika Eksport</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Turnir jadvallari va match natijalarini 1080x1080 rasmlarga 1 soniyada eksport qiling.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Avtomatik brending va rasmlar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Homiylar logotiplari eksporti</span>
                </li>
              </ul>
            </div>

            {/* Card 3: amatora-admin-app & amatora-app ecosystem */}
            <div className="glass-card p-6 space-y-4 flex flex-col justify-between reveal-on-scroll delay-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-slate-300">Ekotizim</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">Arizalar va Transferlar</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O'yinchilar pasporti hamda komandalar transfer arizalarini bir bosishda tasdiqlang.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Pasport verifikatsiyasi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Transfer oynalari boshqaruvi</span>
                </li>
              </ul>
            </div>

          </div>

        </section>

        {/* CTA — Logo + AMATORA text + Download button */}
        <section className="text-center py-16 px-4 reveal-on-scroll delay-2 flex flex-col items-center gap-6">
          <div className="flex flex-row items-center justify-center gap-2">
            <img
              src={logoWhite}
              alt="AMATORA Logo"
              className="h-8 sm:h-10 w-auto object-contain logo-glow-radiance"
            />
            <span className="font-heading font-black text-lg sm:text-xl tracking-wider text-white">AMATORA</span>
          </div>
          <button
            onClick={onOpenDownload}
            className="glass-button glass-button-primary py-3 px-10 text-sm"
          >
            <span>Yuklab Olish</span>
          </button>
        </section>

      </div>


    </div>
  );
};
