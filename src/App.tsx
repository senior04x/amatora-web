import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';

import { HomePage } from './pages/HomePage';
import { AppsPage } from './pages/AppsPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { AboutPage } from './pages/AboutPage';
import { SecurityPage } from './pages/SecurityPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { ObsScoreboard } from './pages/ObsScoreboard';
import logoWhite from './assets/amatora-logo-white.png';

const RESERVED_TABS = ['home', 'apps', 'features', 'about', 'security'];

export function App() {
  // Synchronize initial activeTab and orgSlug from URL pathname or hash slug
  const getRouteFromUrl = (): { tab: string; orgSlug?: string; streamId?: string } => {
    const rawPath = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
    const path = rawPath.toLowerCase();
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    const target = path || hash;

    // Check if URL is OBS Scoreboard overlay route (e.g. /obs/scoreboard/stream1/hfl or /obs/scoreboard/stream1)
    if (path.startsWith('obs/scoreboard')) {
      const parts = rawPath.split('/');
      const streamId = parts[2] || 'stream1';
      const pathOrgSlug = parts[3] || undefined;
      return { tab: 'obs_scoreboard', streamId, orgSlug: pathOrgSlug };
    }

    if (!target || target === 'home') {
      return { tab: 'home' };
    }
    if (RESERVED_TABS.includes(target)) {
      return { tab: target };
    }

    // Only route to ApplicationPage if URL explicitly starts with 'apply' or 'application'
    if (path.startsWith('apply') || path.startsWith('application')) {
      const parts = rawPath.split('/');
      const orgSlug = parts[1] || 'llf';
      return { tab: 'application', orgSlug };
    }

    // Any other custom slug, file download path or unknown URL safely defaults to home
    return { tab: 'home' };
  };

  const [route, setRoute] = useState<{ tab: string; orgSlug?: string; streamId?: string }>(getRouteFromUrl);
  const [downloadModalState, setDownloadModalState] = useState<{ isOpen: boolean; platform: 'android' | 'ios' }>({
    isOpen: false,
    platform: 'android',
  });

  const setActiveTab = (tab: string, orgSlug?: string) => {
    setRoute({ tab, orgSlug });
    let newPath = '/';
    if (tab === 'home') newPath = '/';
    else if (tab === 'application') newPath = orgSlug ? `/apply/${orgSlug}` : '/apply';
    else newPath = `/${tab}`;

    if (window.location.pathname !== newPath) {
      window.history.pushState({ tab, orgSlug }, '', newPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenDownload = (platform: 'android' | 'ios' = 'android') => {
    setDownloadModalState({ isOpen: true, platform });
  };

  const activeTab = route.tab;

  // Render OBS Scoreboard Overlay completely standalone (no navbar/footer/canvas)
  if (activeTab === 'obs_scoreboard') {
    return <ObsScoreboard streamId={route.streamId} pathOrgSlug={route.orgSlug} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-white selection:text-black">
      
      {/* 1. PURE PITCH BLACK CANVAS WITH FIXED CENTERED LOGO */}
      <div className="animated-bg-canvas" />
      
      {/* FIXED CENTERED AMATORA BRAND DISPLAY (PERMANENT BODY BACKGROUND) */}
      {activeTab !== 'application' && (
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
      )}

      {/* 2. TOP GLASS NAVIGATION BAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDownload={(platform) => handleOpenDownload(platform)}
      />

      {/* 3. MAIN PAGE CONTENT */}
      <main className="flex-1 w-full mx-auto relative z-10">
        {activeTab === 'home' && (
          <HomePage
            onOpenDownload={(platform) => handleOpenDownload(platform)}
          />
        )}

        {activeTab !== 'home' && (
          <div className={`w-full ${activeTab === 'application' ? 'pt-0' : 'pt-20 sm:pt-24'}`}>
            {activeTab === 'apps' && <AppsPage />}
            {activeTab === 'features' && <FeaturesPage />}
            {activeTab === 'about' && <AboutPage />}
            {activeTab === 'security' && <SecurityPage />}
            {activeTab === 'application' && <ApplicationPage orgSlug={route.orgSlug || 'llf'} />}
          </div>
        )}
      </main>

      {/* 4. FOOTER (Hidden on Organization Application Page) */}
      {activeTab !== 'application' && <Footer setActiveTab={setActiveTab} />}

      {/* 5. DOWNLOAD POPUP MODAL */}
      <DownloadModal
        isOpen={downloadModalState.isOpen}
        platform={downloadModalState.platform}
        onClose={() => setDownloadModalState((prev) => ({ ...prev, isOpen: false }))}
      />

    </div>
  );
}

export default App;
