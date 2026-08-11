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
      <div className="glass-card w-full max-w-lg p-6 lg:p-8 rounded-3xl border border-white/25 relative shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Download Options */}
        <div className="space-y-4 pt-4">
          
          {/* Google Play / Android */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <PlayStoreIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Google Play</h4>
              </div>
            </div>
            <a
              href="https://amatora.uz/downloads/amatora-admin.apk"
              download
              className="glass-button text-xs py-2 px-3.5 whitespace-nowrap gap-2"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>APK</span>
            </a>
          </div>

          {/* App Store / iOS */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <AppStoreIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">App Store</h4>
              </div>
            </div>
            <a
              href="https://amatora.uz/ios"
              target="_blank"
              rel="noreferrer"
              className="glass-button text-xs py-2 px-3.5 whitespace-nowrap gap-2"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>iOS App</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
