import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Smartphone, CheckCircle2, BarChart3, Image as ImageIcon, ChevronUp } from 'lucide-react';
import logoWhite from '../assets/amatora-logo-white.png';

interface HomePageProps {
  onOpenDownload: (platform?: 'android' | 'ios') => void;
}

const PlayStoreIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.183-.198-.295-.469-.295-.77V2.584c0-.301.112-.572.294-.77zM15.206 13.414l2.766 2.766-12.753 7.363 9.987-10.129zm2.766-5.594L15.206 10.585 5.219.456l12.753 7.364zm1.414 1.414l3.197 1.846c.55.318.55.836 0 1.154l-3.197 1.846-2.92-2.92 2.92-2.926z" />
  </svg>
);

const AppStoreIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.66-.8 1.11-1.92.99-3.05-.96.04-2.12.64-2.81 1.44-.62.72-1.16 1.86-1.01 2.98 1.07.08 2.17-.57 2.83-1.37z"/>
  </svg>
);

export const HomePage: React.FC<HomePageProps> = ({ onOpenDownload }) => {
  const { t } = useLanguage();

  
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
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{t('home.scroll')}</span>
        </div>
      </div>

      {/* 2. FULL-WIDTH COLORLESS GLASS OVERLAY SHEET — no side margins, no side padding */}
      <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full">
        
        {/* Imkoniyatlar Section */}
        <section className="pt-16 pb-0 px-4 sm:px-8 lg:px-12">

          <div className="text-center space-y-2 reveal-on-scroll delay-1 mb-10">
            <div className="glass-badge">{t('home.badge')}</div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">{t('home.title')}</h2>
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
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-slate-300">{t('home.card1.badge')}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">{t('home.card1.title')}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('home.card1.desc')}
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{t('home.card1.spec1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{t('home.card1.spec2')}</span>
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
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-slate-300">{t('home.card2.badge')}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">{t('home.card2.title')}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('home.card2.desc')}
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{t('home.card2.spec1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{t('home.card2.spec2')}</span>
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
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-slate-300">{t('home.card3.badge')}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">{t('home.card3.title')}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('home.card3.desc')}
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{t('home.card3.spec1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{t('home.card3.spec2')}</span>
                </li>
              </ul>
            </div>

          </div>

        </section>

        {/* CTA — Logo + AMATORA text + Google Play & App Store buttons */}
        <section className="text-center py-16 px-4 reveal-on-scroll delay-2 flex flex-col items-center gap-6">
          <div className="flex flex-row items-center justify-center gap-2">
            <img
              src={logoWhite}
              alt="AMATORA Logo"
              className="h-8 sm:h-10 w-auto object-contain logo-glow-radiance"
            />
            <span className="font-heading font-black text-lg sm:text-xl tracking-wider text-white">AMATORA</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenDownload('android')}
              className="glass-button glass-button-primary py-3 px-6 text-sm flex items-center gap-2.5"
            >
              <PlayStoreIcon className="w-5 h-5 text-black" />
              <span>Google Play</span>
            </button>
            <button
              onClick={() => onOpenDownload('ios')}
              className="glass-button py-3 px-6 text-sm flex items-center gap-2.5"
            >
              <AppStoreIcon className="w-5 h-5 text-white" />
              <span>App Store</span>
            </button>
          </div>
        </section>

      </div>

    </div>
  );
};
