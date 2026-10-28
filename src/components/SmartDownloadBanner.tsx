import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { detectMobilePlatform } from '../utils/appStores';
import { StoreDownloadLinks } from './StoreDownloadLinks';
import logoWhite from '../assets/amatora-logo-white.png';
import './SmartDownloadBanner.css';

const DISMISSED_KEY = 'amatora:download-banner:dismissed:v1';

export function SmartDownloadBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    try { if (sessionStorage.getItem(DISMISSED_KEY)) return; } catch { /* Storage may be unavailable in private browsing. */ }
    const timer = window.setTimeout(() => setVisible(true), 650);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => setVisible(false), 180);
    return () => window.clearTimeout(timer);
  }, [closing]);
  const dismiss = () => {
    try { sessionStorage.setItem(DISMISSED_KEY, '1'); } catch { /* Dismissal still works without storage. */ }
    setClosing(true);
  };
  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') dismiss(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);
  if (!visible) return null;
  return (
    <aside className={`smart-download-banner${closing ? ' smart-download-banner--closing' : ''}`} aria-label={t('download.title')}>
      <div className="smart-download-banner__heading">
        <img src={logoWhite} width="36" height="36" alt="" />
        <div><strong>AMATORA</strong><p>{t('download.title')}</p></div>
        <button type="button" className="smart-download-banner__close" onClick={dismiss} aria-label={t('download.close')}><X size={19} aria-hidden="true" /></button>
      </div>
      <StoreDownloadLinks platform={detectMobilePlatform(navigator) ?? 'all'} />
    </aside>
  );
}
