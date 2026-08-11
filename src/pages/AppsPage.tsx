import React from 'react';

const PlayStoreIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.183-.198-.295-.469-.295-.77V2.584c0-.301.112-.572.294-.77zM15.206 13.414l2.766 2.766-12.753 7.363 9.987-10.129zm2.766-5.594L15.206 10.585 5.219.456l12.753 7.364zm1.414 1.414l3.197 1.846c.55.318.55.836 0 1.154l-3.197 1.846-2.92-2.92 2.92-2.926z" />
  </svg>
);

const AppStoreIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.66-.8 1.11-1.92.99-3.05-.96.04-2.12.64-2.81 1.44-.62.72-1.16 1.86-1.01 2.98 1.07.08 2.17-.57 2.83-1.37z"/>
  </svg>
);

export const AppsPage: React.FC = () => {
  return (
    <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 py-16 space-y-16">
      
      {/* Primary Download Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Android Admin App Card */}
        <div className="glass-card p-8 space-y-6 flex flex-col justify-between border-white/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <PlayStoreIcon className="w-7 h-7" />
              </div>
              <span className="glass-badge text-[10px]">Google Play</span>
            </div>
            
            <h2 className="font-heading font-black text-2xl text-white">AMATORA Admin for Android</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Turnirlar, o'yinchilar, match taymerlari, hakamlik paneli hamda grafikalar eksportini bevosita mobil qurilmangizdan boshqaring.
            </p>
          </div>

          <a
            href="https://amatora.uz/downloads/amatora-admin.apk"
            download
            className="glass-button glass-button-primary w-full py-3.5 text-center gap-2"
          >
            <PlayStoreIcon className="w-4 h-4 text-black" />
            <span>Google Play Orqali Olish</span>
          </a>
        </div>

        {/* iOS Admin App Card */}
        <div className="glass-card p-8 space-y-6 flex flex-col justify-between border-white/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <AppStoreIcon className="w-7 h-7" />
              </div>
              <span className="glass-badge text-[10px]">App Store</span>
            </div>

            <h2 className="font-heading font-black text-2xl text-white">AMATORA Admin for iPhone & iPad</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Apple iOS va iPadOS apparatlari uchun maxsus moslashtirilgan shisha dizaynli admin ilovasi.
            </p>
          </div>

          <a
            href="https://amatora.uz/ios"
            target="_blank"
            rel="noreferrer"
            className="glass-button w-full py-3.5 text-center gap-2"
          >
            <AppStoreIcon className="w-4 h-4 text-white" />
            <span>App Store Orqali Olish</span>
          </a>
        </div>

      </div>

      {/* Installation Guide */}
      <div className="max-w-5xl mx-auto space-y-6">
        <h3 className="font-heading font-black text-2xl text-white text-center">APK O'rnatish Qo'llanmasi</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 space-y-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm">1</div>
            <h4 className="font-bold text-sm text-white">Faylni Yuklang</h4>
            <p className="text-xs text-slate-400">Yuqoridagi "Android APK Yuklab Olish" tugmasini bosib APK faylini qurilmangizga saqlang.</p>
          </div>

          <div className="glass-card p-6 space-y-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm">2</div>
            <h4 className="font-bold text-sm text-white">Ruxsat Bering</h4>
            <p className="text-xs text-slate-400">Android sozlamalaridan "Noma'lum manbalardan o'rnatish" (Allow Unknown Sources) opsiyasini yoqing.</p>
          </div>

          <div className="glass-card p-6 space-y-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm">3</div>
            <h4 className="font-bold text-sm text-white">Ishga Tushiring</h4>
            <p className="text-xs text-slate-400">Faylni oching hamda o'rnatishni yakunlang. Tizimga amatora.uz akkauntingiz orqali kiring.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
