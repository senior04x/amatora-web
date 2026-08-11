import React from 'react';
import { Smartphone, Globe, Download } from 'lucide-react';

export const AppsPage: React.FC = () => {
  return (
    <div className="space-y-16 py-6">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="glass-badge">
          <Smartphone className="w-3.5 h-3.5 text-white" />
          <span>Rasmiy Yuklab Olish Markazi (amatora.uz)</span>
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-white">AMATORA Mobile & Web Distributsiya</h1>
        <p className="text-sm sm:text-base text-slate-400">
          Adminlar va o'yinchilar uchun ishlab chiqilgan mobil va veb platformalar to'plami.
        </p>
      </div>

      {/* Primary Download Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Android Admin App Card */}
        <div className="glass-card p-8 space-y-6 flex flex-col justify-between border-white/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <span className="glass-badge text-[10px]">Android (APK)</span>
            </div>
            
            <h2 className="font-heading font-black text-2xl text-white">AMATORA Admin for Android</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Turnirlar, o'yinchilar, match taymerlari, hakamlik paneli hamda grafikalar eksportini bevosita mobil qurilmangizdan boshqaring.
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Versiya:</span>
                <span className="font-bold text-white">1.0.0 Stable</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Fayl hajmi:</span>
                <span className="font-bold text-white">42.8 MB</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Tizim talabi:</span>
                <span className="font-bold text-white">Android 8.0 (Oreo) va undan yuqori</span>
              </div>
            </div>
          </div>

          <a
            href="https://amatora.uz/downloads/amatora-admin.apk"
            download
            className="glass-button glass-button-primary w-full py-3.5 text-center"
          >
            <Download className="w-4 h-4 text-black" />
            <span>Android APK Yuklab Olish</span>
          </a>
        </div>

        {/* iOS Admin App Card */}
        <div className="glass-card p-8 space-y-6 flex flex-col justify-between border-white/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <span className="glass-badge text-[10px]">iOS (TestFlight)</span>
            </div>

            <h2 className="font-heading font-black text-2xl text-white">AMATORA Admin for iPhone & iPad</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Apple iOS va iPadOS apparatlari uchun maxsus moslashtirilgan shisha dizaynli admin ilovasi.
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Versiya:</span>
                <span className="font-bold text-white">1.0.0 (Build 14)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Fayl hajmi:</span>
                <span className="font-bold text-white">38.2 MB</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Tizim talabi:</span>
                <span className="font-bold text-white">iOS 14.0 va undan yuqori</span>
              </div>
            </div>
          </div>

          <a
            href="https://amatora.uz/ios"
            target="_blank"
            rel="noreferrer"
            className="glass-button w-full py-3.5 text-center"
          >
            <Download className="w-4 h-4 text-white" />
            <span>TestFlight Orqali Olish</span>
          </a>
        </div>

      </div>

      {/* Web Access Container */}
      <div className="glass-card p-8 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-white/20">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-white" />
            <h3 className="font-heading font-bold text-xl text-white">AMATORA Web Portal (amatora.uz)</h3>
          </div>
          <p className="text-xs text-slate-400">
            Hech qanday dastur o'rnatmasdan to'g'ridan-to'g'ri brauzer orqali admin paneliga va o'yinlar statistikasiga kiring.
          </p>
        </div>

        <a
          href="https://amatora.uz"
          target="_blank"
          rel="noreferrer"
          className="glass-button glass-button-primary py-3 px-8 text-sm whitespace-nowrap"
        >
          <span>Web Portalga Kirish</span>
        </a>
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
