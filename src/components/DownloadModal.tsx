import React from 'react';
import { X, Smartphone, Globe, Download, CheckCircle, ShieldCheck } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-lg p-6 lg:p-8 rounded-3xl border border-white/25 relative shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="glass-badge">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Rasmiy Distributsiya (amatora.uz)</span>
          </div>
          <h3 className="font-heading font-black text-2xl text-white">AMATORA Ilovalarini Yuklab Olish</h3>
          <p className="text-xs text-slate-400">
            Tizim ilovalarini Android, iOS hamda Veb versiyalari uchun yuklab oling.
          </p>
        </div>

        {/* Download Options */}
        <div className="space-y-3">
          
          {/* Android APK */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">AMATORA Admin (Android APK)</h4>
                <p className="text-[11px] text-slate-400">Versiya 1.0.0 • 42 MB • Android 8.0+</p>
              </div>
            </div>
            <a
              href="https://amatora.uz/downloads/amatora-admin.apk"
              download
              className="glass-button text-xs py-2 px-3.5 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>APK</span>
            </a>
          </div>

          {/* iOS App */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">AMATORA Admin (iOS / TestFlight)</h4>
                <p className="text-[11px] text-slate-400">Versiya 1.0.0 • iOS 14.0+</p>
              </div>
            </div>
            <a
              href="https://amatora.uz/ios"
              target="_blank"
              rel="noreferrer"
              className="glass-button text-xs py-2 px-3.5 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>IPA / IPA</span>
            </a>
          </div>

          {/* Web Access */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Veb Platforma (amatora.uz)</h4>
                <p className="text-[11px] text-slate-400">Brauzer orqali darhol kirish</p>
              </div>
            </div>
            <a
              href="https://amatora.uz"
              target="_blank"
              rel="noreferrer"
              className="glass-button glass-button-primary text-xs py-2 px-3.5 whitespace-nowrap"
            >
              <span>Kirish</span>
            </a>
          </div>

        </div>

        {/* Security Note */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-slate-400">
          <CheckCircle className="w-4 h-4 text-white shrink-0" />
          <span>Faqat rasmiy <strong>amatora.uz</strong> manbasidan yuklab oling. Fayllar raqamli imzo bilan tayyorlangan.</span>
        </div>

      </div>
    </div>
  );
};
