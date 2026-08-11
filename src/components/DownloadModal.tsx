import React from 'react';
import { X, Download } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-white/25 relative shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title */}
        <div className="pr-8">
          <h3 className="font-heading font-black text-xl text-white">AMATORA Ilovalarini Yuklab Olish</h3>
        </div>

        {/* Download Options — Categorized by AMATORA App & AMATORA Admin */}
        <div className="space-y-5">
          
          {/* Section 1: AMATORA App (O'yinchilar) */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-1">AMATORA App (O'yinchilar & Ishqibozlar)</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <a
                href="https://amatora.uz/downloads/amatora-app.apk"
                download
                className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/40 hover:bg-white/[0.08] transition-all flex items-center justify-between gap-2 group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <PlayStoreIcon className="w-5 h-5 text-white" />
                  <span className="font-heading font-bold text-xs text-white">Google Play</span>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://amatora.uz/ios/app"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/40 hover:bg-white/[0.08] transition-all flex items-center justify-between gap-2 group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <AppStoreIcon className="w-5 h-5 text-white" />
                  <span className="font-heading font-bold text-xs text-white">App Store</span>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>

            </div>
          </div>

          {/* Section 2: AMATORA Admin (Tashkilotchilar) */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-1">AMATORA Admin (Tashkilotchilar & Hakamlar)</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <a
                href="https://amatora.uz/downloads/amatora-admin.apk"
                download
                className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/40 hover:bg-white/[0.08] transition-all flex items-center justify-between gap-2 group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <PlayStoreIcon className="w-5 h-5 text-white" />
                  <span className="font-heading font-bold text-xs text-white">Google Play</span>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://amatora.uz/ios/admin"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/40 hover:bg-white/[0.08] transition-all flex items-center justify-between gap-2 group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <AppStoreIcon className="w-5 h-5 text-white" />
                  <span className="font-heading font-bold text-xs text-white">App Store</span>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
