import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { APP_STORE_URL, GOOGLE_PLAY_URL, getAppStoreAvailability } from '../utils/appStores';
import type { MobilePlatform } from '../utils/appStores';
import './StoreDownloadLinks.css';

export function StoreIcon({ platform }: { platform: MobilePlatform }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={platform === 'ios'
        ? 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.66-.8 1.11-1.92.99-3.05-.96.04-2.12.64-2.81 1.44-.62.72-1.16 1.86-1.01 2.98 1.07.08 2.17-.57 2.83-1.37z'
        : 'M3.609 1.814L13.792 12 3.61 22.186c-.183-.198-.295-.469-.295-.77V2.584c0-.301.112-.572.294-.77zM15.206 13.414l2.766 2.766-12.753 7.363 9.987-10.129zm2.766-5.594L15.206 10.585 5.219.456l12.753 7.364zm1.414 1.414l3.197 1.846c.55.318.55.836 0 1.154l-3.197 1.846-2.92-2.92 2.92-2.926z'} />
    </svg>
  );
}

export function StoreDownloadLinks({ platform = 'all' }: { platform?: MobilePlatform | 'all' }) {
  const { t } = useLanguage();
  const [appStoreAvailable, setAppStoreAvailable] = useState(false);
  useEffect(() => {
    if (platform === 'android') return;
    let active = true;
    void getAppStoreAvailability().then(value => { if (active) setAppStoreAvailable(value); });
    return () => { active = false; };
  }, [platform]);

  const appleContent = <><StoreIcon platform="ios" /><span>App Store{!appStoreAvailable && <small>{t('download.soon')}</small>}</span></>;
  return (
    <div className="store-download-links">
      {platform !== 'android' && (appStoreAvailable
        ? <a className="store-download-button" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">{appleContent}</a>
        : <button className="store-download-button" type="button" disabled aria-label={`App Store — ${t('download.soon')}`}>{appleContent}</button>)}
      {platform !== 'ios' && <a className="store-download-button" href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer"><StoreIcon platform="android" /><span>Google Play</span></a>}
    </div>
  );
}
