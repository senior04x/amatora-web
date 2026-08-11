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
      
      {/* Background Floating Glass Ambient Glow */}
      <div className="bg-mesh-blur" />

      {/* Top Glass Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDownload={() => setDownloadModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {activeTab === 'home' && (
          <HomePage
            onOpenDownload={() => setDownloadModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'apps' && (
          <AppsPage />
        )}

        {activeTab === 'features' && <FeaturesPage />}

        {activeTab === 'about' && <AboutPage />}

        {activeTab === 'security' && <SecurityPage />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Download Popup Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

    </div>
  );
}

export default App;
