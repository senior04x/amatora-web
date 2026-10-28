export const APP_STORE_URL = 'https://apps.apple.com/app/id6825692888';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.amatora.mobile';

export type MobilePlatform = 'ios' | 'android';

export function detectMobilePlatform(device: Pick<Navigator, 'userAgent' | 'platform' | 'maxTouchPoints'>): MobilePlatform | null {
  if (/android/i.test(device.userAgent)) return 'android';
  if (/iPad|iPhone|iPod/i.test(device.userAgent)
    || (/Mac/i.test(device.platform) && device.maxTouchPoints > 1)) return 'ios';
  return null;
}

let availability: { value: boolean; expires: number } | undefined;
let pendingAvailability: Promise<boolean> | undefined;

export function getAppStoreAvailability(): Promise<boolean> {
  if (availability && availability.expires > Date.now()) return Promise.resolve(availability.value);
  if (pendingAvailability) return pendingAvailability;
  pendingAvailability = fetch('/api/store-availability', { signal: AbortSignal.timeout(6500) })
    .then(async response => {
      if (!response.ok) throw new Error('Store status unavailable');
      const data: unknown = await response.json();
      const value = typeof data === 'object' && data !== null
        && 'appStoreAvailable' in data && data.appStoreAvailable === true;
      availability = { value, expires: Date.now() + 300_000 };
      return value;
    })
    .catch(() => {
      availability = { value: false, expires: Date.now() + 30_000 };
      return false;
    })
    .finally(() => { pendingAvailability = undefined; });
  return pendingAvailability;
}
