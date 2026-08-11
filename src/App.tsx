import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';

import { HomePage } from './pages/HomePage';
import { AppsPage } from './pages/AppsPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { AboutPage } from './pages/AboutPage';
import { SecurityPage } from './pages/SecurityPage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-white selection:text-black">
      
      {/* 1. PURE PITCH BLACK DEEP DARK BACKGROUND */}
      <div className="animated-bg-canvas" />

      {/* 2. TOP GLASS NAVIGATION BAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDownload={() => setDownloadModalOpen(true)}
      />

      {/* 3. MAIN PAGE CONTENT (CONCISE, PUNCHY & 100% RESPONSIVE) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        {activeTab === 'home' && (
          <HomePage
            onOpenDownload={() => setDownloadModalOpen(true)}
          />
        )}

        {activeTab === 'apps' && (
          <AppsPage />
        )}

        {activeTab === 'features' && <FeaturesPage />}

        {activeTab === 'about' && <AboutPage />}

        {activeTab === 'security' && <SecurityPage />}
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
