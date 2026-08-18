import React from 'react';

const WindowsIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.8z" />
  </svg>
);

const ObsStudioIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

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
    <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20 space-y-16">
      
      {/* Page Heading */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="glass-badge px-4 py-1.5 text-xs uppercase tracking-wider text-emerald-400 border-emerald-500/30">
          Rasmiy AMATORA Dasturlari
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
          Barcha Qurilmalar Uchun Ilovalar
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Stadion tablolarini boshqarish, OBS jonli translyatsiyalari, match nazorati hamda turnir statistikasi uchun rasmiy AMATORA ilovalarini yuklab oling.
        </p>
      </div>

      {/* Windows Desktop Applications (Scoreboard & OBS Controller) */}
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400">
          <WindowsIcon className="w-5 h-5" />
          <span>Windows Desktop & Stadion Dasturlari</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: AMATORA Scoreboard for Windows */}
          <div className="glass-card relative overflow-hidden p-8 border-cyan-500/30 bg-gradient-to-br from-cyan-950/25 via-slate-900/60 to-black/80 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                  <WindowsIcon className="w-8 h-8" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  ⚡ v2.0.0 • Scoreboard
                </span>
              </div>

              <div>
                <h2 className="font-heading font-black text-2xl text-white">
                  AMATORA Scoreboard
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Stadion LED va HDMI Monitor Tablosi</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Stadion LED ekranlari, HDMI monitorlar va jonli efir tablolari uchun maxsus <strong>Native Desktop</strong> ilovasi. 0ms drift-free aniq taymer, avtomatik gol animatsiyalari va internet uzilganda ham mustaqil ishlash tizimi.
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400">
                <span>💻 Windows 10/11 (64-bit)</span>
                <span>📦 ~2.3 MB (Setup.exe)</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="/downloads/AMATORA-Scoreboard-Setup.exe"
                download="AMATORA-Scoreboard-Setup.exe"
                className="glass-button glass-button-primary w-full py-3.5 text-center text-xs font-black shadow-[0_0_20px_rgba(6,182,212,0.3)] gap-2 flex items-center justify-center"
              >
                <WindowsIcon className="w-4 h-4 text-black" />
                <span>Scoreboard Yuklab Olish (.exe)</span>
              </a>
              <span className="block text-[10px] text-center text-slate-500">
                1-klikda o'rnatiladi • Avto Desktop Shortcut
              </span>
            </div>
          </div>

          {/* Card 2: AMATORA OBS Controller for Windows */}
          <div className="glass-card relative overflow-hidden p-8 border-indigo-500/30 bg-gradient-to-br from-indigo-950/25 via-slate-900/60 to-black/80 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                  <ObsStudioIcon className="w-8 h-8" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  🎬 v2.0.0 • OBS Studio
                </span>
              </div>

              <div>
                <h2 className="font-heading font-black text-2xl text-white">
                  AMATORA OBS Controller
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">OBS Replay va Efir Avtomatizatsiyasi</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                OBS Studio bilan WebSocket orqali ulanib, <strong>Replay (takroriy lavhalar)</strong> buferi, Stinger o'tish animatsiyalari, kamera almashishlari hamda translyatsiya grafikasini to'liq avtomatik boshqaradi.
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400">
                <span>💻 Windows 10/11 (64-bit)</span>
                <span>📦 ~2.4 MB (Setup.exe)</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="/downloads/AMATORA-OBS-Controller-Setup.exe"
                download="AMATORA-OBS-Controller-Setup.exe"
                className="glass-button w-full py-3.5 text-center text-xs font-black shadow-[0_0_20px_rgba(99,102,241,0.3)] gap-2 flex items-center justify-center border-indigo-500/40 hover:border-indigo-400 text-indigo-200"
              >
                <WindowsIcon className="w-4 h-4 text-indigo-300" />
                <span>OBS Controller Yuklab Olish (.exe)</span>
              </a>
              <span className="block text-[10px] text-center text-slate-500">
                OBS Template & Stinger fayllari bilan birga o'rnatiladi
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Apps Grid */}
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
          <span>📱 Mobil Admin Ilovalari</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
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
              className="glass-button glass-button-primary w-full py-3.5 text-center gap-2 flex items-center justify-center"
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
              className="glass-button w-full py-3.5 text-center gap-2 flex items-center justify-center"
            >
              <AppStoreIcon className="w-4 h-4 text-white" />
              <span>App Store Orqali Olish</span>
            </a>
          </div>

        </div>
      </div>

      {/* Installation Guide */}
      <div className="max-w-5xl mx-auto space-y-6">
        <h3 className="font-heading font-black text-2xl text-white text-center">O'rnatish Qo'llanmasi</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 space-y-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-sm">1</div>
            <h4 className="font-bold text-sm text-white">Faylni Yuklang</h4>
            <p className="text-xs text-slate-400">Kerakli dastur (Scoreboard yoki OBS Controller) Setup faylini kompyuteringizga yuklab oling.</p>
          </div>

          <div className="glass-card p-6 space-y-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-sm">2</div>
            <h4 className="font-bold text-sm text-white">Setup Faylini Ochish</h4>
            <p className="text-xs text-slate-400">Yuklangan <code className="text-cyan-300">Setup.exe</code> faylini ishga tushiring va "Install" tugmasini bosing.</p>
          </div>

          <div className="glass-card p-6 space-y-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-sm">3</div>
            <h4 className="font-bold text-sm text-white">Ishga Tushiring</h4>
            <p className="text-xs text-slate-400">Ish stolida paydo bo'lgan rasmiy yorliq orqali dasturga kiring va sozlamalarni tanlang.</p>
          </div>
        </div>
      </div>

    </div>
  );
};


