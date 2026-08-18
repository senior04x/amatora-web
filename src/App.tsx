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

import { supabase } from './lib/supabase';

const RESERVED_TABS = new Set([
  'home', 'apps', 'features', 'about', 'security', 
  'downloads', 'obs', 'api', 'assets', 'favicon', 
  'manifest', 'robots', 'sitemap', 'terms', 'privacy', 
  'apply', 'application'
]);

// In-memory cache for validated organization slugs
const validatedOrgSlugs = new Map<string, boolean>();

// Strict security regex: Only alphanumeric, hyphens, and underscores between 2 and 50 characters
const SAFE_SLUG_REGEX = /^[a-zA-Z0-9_-]{2,50}$/;

const sanitizeSlug = (raw: string): string | null => {
  if (!raw || typeof raw !== 'string') return null;
  const clean = raw.trim().toLowerCase();
  // Reject if contains file extensions (.apk, .exe, etc) or path traversal characters
  if (clean.includes('.') || clean.includes('/') || clean.includes('\\') || clean.includes('%')) {
    return null;
  }
  if (!SAFE_SLUG_REGEX.test(clean)) {
    return null;
  }
  return clean;
};

export function App() {
  // Synchronize initial activeTab and orgSlug from URL pathname or hash slug
  const getRouteFromUrl = (): { tab: string; orgSlug?: string; streamId?: string } => {
    const rawPath = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
    const path = rawPath.toLowerCase();
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    const target = path || hash;

    // 1. Check if URL is OBS Scoreboard overlay route
    if (path.startsWith('obs/scoreboard')) {
      const parts = rawPath.split('/');
      const streamId = parts[2] || 'stream1';
      const pathOrgSlug = parts[3] || undefined;
      return { tab: 'obs_scoreboard', streamId, orgSlug: pathOrgSlug };
    }

    // 2. Default Home Route
    if (!target || target === 'home') {
      return { tab: 'home' };
    }

    // 3. Known Static Tabs
    if (RESERVED_TABS.has(target)) {
      if (target === 'apply' || target === 'application') {
        return { tab: 'application', orgSlug: 'llf' };
      }
      return { tab: target };
    }

    // 4. Explicit apply routes (e.g. /apply/llf or /application/hfl)
    if (path.startsWith('apply/') || path.startsWith('application/')) {
      const parts = rawPath.split('/');
      const orgSlug = sanitizeSlug(parts[1]) || 'llf';
      return { tab: 'application', orgSlug };
    }

    // 5. Dynamic Organization Slugs (e.g. /llf, /hfl, /superliga)
    const sanitized = sanitizeSlug(target);
    if (sanitized && !RESERVED_TABS.has(sanitized)) {
      // Check cache first for instant 0ms routing
      if (validatedOrgSlugs.has(sanitized)) {
        return validatedOrgSlugs.get(sanitized)
          ? { tab: 'application', orgSlug: sanitized }
          : { tab: 'home' };
      }
      // Trigger async database verification
      return { tab: 'verifying_slug', orgSlug: sanitized };
    }

    // 6. Any other unknown route, file download or invalid slug safely falls back to home
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
    else if (tab === 'application') newPath = orgSlug ? `/${orgSlug}` : '/apply';
    else newPath = `/${tab}`;

    if (window.location.pathname !== newPath) {
      window.history.pushState({ tab, orgSlug }, '', newPath);
    }
  };

  // Secure asynchronous database verification for custom organization slugs
  useEffect(() => {
    if (route.tab === 'verifying_slug' && route.orgSlug) {
      const slugToVerify = route.orgSlug;
      let isMounted = true;

      const verifyOrgSlugInDatabase = async () => {
        try {
          // Parametrized query to prevent any injection vulnerability
          const { data, error } = await supabase
            .from('organizations')
            .select('id, slug, name')
            .eq('slug', slugToVerify)
            .maybeSingle();

          if (!error && data && data.slug) {
            validatedOrgSlugs.set(slugToVerify, true);
            if (isMounted) {
              setRoute({ tab: 'application', orgSlug: data.slug });
            }
          } else {
            validatedOrgSlugs.set(slugToVerify, false);
            if (isMounted) {
              setRoute({ tab: 'home' });
            }
          }
        } catch {
          validatedOrgSlugs.set(slugToVerify, false);
          if (isMounted) {
            setRoute({ tab: 'home' });
          }
        }
      };

      verifyOrgSlugInDatabase();

      return () => {
        isMounted = false;
      };
    }
  }, [route]);

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
