import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const WindowsIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.8z" />
  </svg>
);

const ObsStudioIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 512 512" fill="currentColor">
    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm71.7 114.3c35.6 15.2 65.6 42.1 84.4 76.8-19.1 5.9-42.6 12.1-66.8 15.5-12.7-22.3-33-39.7-57.5-48.4 2.9-7.9 7-15.5 12.1-22.6 8.9-12.3 19.9-17.5 27.8-21.3zm-152 49c25.4-27.1 60.9-44.5 100.2-47.5-6.5 7.6-11.7 16.5-15.3 26.2-19.2 17.3-31.5 41.5-33.8 68.3-24.9-5.1-51.2-15.2-74-27.2 4.1-7.2 8.7-13.8 13.9-19.8zm-41.9 144.1c-4.9-15.8-6.9-32.3-6-49 20.4 4.5 47.9 7.7 75.3 5.4 7.6 24.6 24.3 45.4 46.5 57.7-6.2 6.1-13.5 11.1-21.5 14.8-14.7 6.8-28.7 7.7-36.9 8-24.3-9.5-43.9-22.2-57.4-36.9zm135.2 121.7c-38.3 1.3-75.3-13.7-103.1-40.4 7.7-6.3 16.2-11.7 25.2-15.8 25.1 4.5 51.5 0 74.3-12.6 15.1 19.9 37.8 33.7 63.6 37.9-1.9 8.2-5.4 16-10.2 23-8.8 12.5-20.2 17.7-28.2 21.6l-21.6-13.7zm134.2-76c-17.4 34.6-47.5 61.2-84.3 75.5 1.5-9.7 1.1-19.7-1.3-29.4-4.5-25.2-18.4-47.3-38.6-61.4 12.4-21.8 18.2-47.1 16-72.3 22.8 9.8 45.5 23.3 64.1 39.8 16.3 14.4 28.5 30.6 34.1 47.8h10zm-87.7-142.3c3.8 18.7 1.3 38.3-7.1 55.4-17.7-13.3-39.7-21.6-63.5-23.2-13.6-16.1-33-26.8-54.8-29.8 4.7-7.1 10.7-13.3 17.8-18.2 13-9.2 26.6-11.4 34.8-12.4 25.5 7.4 53.6 14.8 72.8 28.2z"/>
  </svg>
);

const SmartphoneIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
    <path d="M12 18h.01"/>
  </svg>
);

export const AppsPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20 space-y-16">
      
      {/* Page Heading */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="glass-badge text-[10px]">
          {t('apps.badge')}
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
          {t('apps.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t('apps.desc')}
        </p>
      </div>

      {/* Desktop & Mobile Apps Grid */}
      {/* Desktop & Mobile Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Card 1: AMATORA App (Players & Fans) */}
        <div className="glass-card p-8 space-y-6 flex flex-col justify-between border-white/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl border border-white/25 overflow-hidden shadow-lg bg-black/40 flex-shrink-0">
                <img 
                  src="/amatora-logo.PNG" 
                  alt="AMATORA App Logo" 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="glass-badge text-[10px]">{t('apps.app.badge')}</span>
            </div>
            
            <div className="space-y-1">
              <h2 className="font-heading font-black text-2xl text-white">
                AMATORA App
              </h2>
              <p className="text-xs text-slate-400">{t('apps.app.subtitle')}</p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t('apps.app.desc')}
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                const isIOS = /iPad|iPhone|iPod|Macintosh/i.test(navigator.userAgent) && !('MSStream' in window);
                if (isIOS) {
                  window.open('https://amatora.uz/ios/app', '_blank');
                } else {
                  window.location.href = 'https://amatora.uz/downloads/amatora-app.apk';
                }
              }}
              className="glass-button glass-button-primary w-full py-3.5 text-center text-xs font-bold gap-2 flex items-center justify-center"
            >
              <SmartphoneIcon className="w-4 h-4 text-black" />
              <span>{t('apps.app.btn')}</span>
            </button>
            <span className="block text-[10px] text-center text-slate-500">
              {t('apps.app.sub')}
            </span>
          </div>
        </div>

        {/* Card 2: AMATORA Admin App (Organizers & Referees) */}
        <div className="glass-card p-8 space-y-6 flex flex-col justify-between border-white/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl border border-white/25 overflow-hidden shadow-lg bg-black/40 flex-shrink-0">
                <img 
                  src="/admin-logo.PNG" 
                  alt="AMATORA Admin Logo" 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="glass-badge text-[10px]">{t('apps.admin.badge')}</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-heading font-black text-2xl text-white">
                AMATORA Admin
              </h2>
              <p className="text-xs text-slate-400">{t('apps.admin.subtitle')}</p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t('apps.admin.desc')}
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                const isIOS = /iPad|iPhone|iPod|Macintosh/i.test(navigator.userAgent) && !('MSStream' in window);
                if (isIOS) {
                  window.open('https://amatora.uz/ios/admin', '_blank');
                } else {
                  window.location.href = 'https://amatora.uz/downloads/amatora-admin.apk';
                }
              }}
              className="glass-button glass-button-primary w-full py-3.5 text-center text-xs font-bold gap-2 flex items-center justify-center"
            >
              <SmartphoneIcon className="w-4 h-4 text-black" />
              <span>{t('apps.admin.btn')}</span>
            </button>
            <span className="block text-[10px] text-center text-slate-500">
              {t('apps.admin.sub')}
            </span>
          </div>
        </div>

        {/* Card 3: AMATORA Scoreboard for Windows */}
        <div className="glass-card p-8 space-y-6 flex flex-col justify-between border-white/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <WindowsIcon className="w-7 h-7" />
              </div>
              <span className="glass-badge text-[10px]">{t('apps.score.badge')}</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-heading font-black text-2xl text-white">
                AMATORA Scoreboard
              </h2>
              <p className="text-xs text-slate-400">{t('apps.score.subtitle')}</p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t('apps.score.desc')}
            </p>
          </div>

          <div className="space-y-2">
            <a
              href="/downloads/AMATORA-Scoreboard-Setup.exe"
              download="AMATORA-Scoreboard-Setup.exe"
              className="glass-button glass-button-primary w-full py-3.5 text-center text-xs font-bold gap-2 flex items-center justify-center"
            >
              <WindowsIcon className="w-4 h-4 text-black" />
              <span>{t('apps.score.btn')}</span>
            </a>
            <span className="block text-[10px] text-center text-slate-500">
              {t('apps.score.sub')}
            </span>
          </div>
        </div>

        {/* Card 4: AMATORA OBS Controller for Windows */}
        <div className="glass-card p-8 space-y-6 flex flex-col justify-between border-white/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <ObsStudioIcon className="w-7 h-7" />
              </div>
              <span className="glass-badge text-[10px]">{t('apps.obs.badge')}</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-heading font-black text-2xl text-white">
                AMATORA OBS Controller
              </h2>
              <p className="text-xs text-slate-400">{t('apps.obs.subtitle')}</p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t('apps.obs.desc')}
            </p>
          </div>

          <div className="space-y-2">
            <a
              href="/downloads/AMATORA-OBS-Controller-Setup.exe"
              download="AMATORA-OBS-Controller-Setup.exe"
              className="glass-button glass-button-primary w-full py-3.5 text-center text-xs font-bold gap-2 flex items-center justify-center"
            >
              <ObsStudioIcon className="w-4 h-4 text-black" />
              <span>{t('apps.obs.btn')}</span>
            </a>
            <span className="block text-[10px] text-center text-slate-500">
              {t('apps.obs.sub')}
            </span>
          </div>
        </div>

      </div>

      {/* Installation Guide */}
      <div className="max-w-5xl mx-auto space-y-6">
        <h3 className="font-heading font-black text-2xl text-white text-center">{t('apps.guide.title')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 space-y-3 border-white/20">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-sm">1</div>
            <h4 className="font-bold text-sm text-white">{t('apps.guide.step1.title')}</h4>
            <p className="text-xs text-slate-400">{t('apps.guide.step1.desc')}</p>
          </div>

          <div className="glass-card p-6 space-y-3 border-white/20">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-sm">2</div>
            <h4 className="font-bold text-sm text-white">{t('apps.guide.step2.title')}</h4>
            <p className="text-xs text-slate-400">{t('apps.guide.step2.desc')} <code className="text-slate-200 bg-white/10 px-1.5 py-0.5 rounded text-[11px]">Setup.exe</code></p>
          </div>

          <div className="glass-card p-6 space-y-3 border-white/20">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-sm">3</div>
            <h4 className="font-bold text-sm text-white">{t('apps.guide.step3.title')}</h4>
            <p className="text-xs text-slate-400">{t('apps.guide.step3.desc')}</p>
          </div>
        </div>
      </div>

    </div>
  );
};



