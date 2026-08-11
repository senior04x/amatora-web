import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';

import { HomePage } from './pages/HomePage';
import { AppsPage } from './pages/AppsPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { AboutPage } from './pages/AboutPage';
import { SecurityPage } from './pages/SecurityPage';
import logoWhite from './assets/amatora-logo-white.png';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-white selection:text-black">
      
      {/* 1. PURE PITCH BLACK CANVAS WITH FIXED CENTERED LOGO */}
      <div className="animated-bg-canvas" />
      
      {/* FIXED CENTERED AMATORA BRAND DISPLAY (PERMANENT BODY BACKGROUND) */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none px-4">
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto">
          <img 
            src={logoWhite} 
            alt="AMATORA Official Logo" 
            className="h-20 sm:h-32 md:h-40 lg:h-44 w-auto object-contain logo-glow-radiance" 
          />
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider text-white">
            AMATORA
          </h1>
        </div>
      </div>

      {/* 2. TOP GLASS NAVIGATION BAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDownload={() => setDownloadModalOpen(true)}
      />

      {/* 3. MAIN PAGE CONTENT */}
      <main className="flex-1 w-full mx-auto relative z-10">
        {activeTab === 'home' && (
          <HomePage
            onOpenDownload={() => setDownloadModalOpen(true)}
          />
        )}

        {activeTab === 'apps' && (
          <div className="w-full pt-20 sm:pt-24">
            <AppsPage />
          </div>
        )}

        {activeTab !== 'home' && activeTab !== 'apps' && (
          <div className="w-full pt-20 sm:pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {activeTab === 'features' && <FeaturesPage />}
              {activeTab === 'about' && <AboutPage />}
              {activeTab === 'security' && <SecurityPage />}
            </div>
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <Footer setActiveTab={setActiveTab} />

      {/* 5. DOWNLOAD POPUP MODAL */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

    </div>
  );
}

export default App;
