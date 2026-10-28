// Public store metadata only. No credentials, user data or database requests.
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    res.setHeader('Cache-Control', 'no-store');
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
  let appStoreAvailable = false;
  let cacheSeconds = 300;
  try {
    const response = await fetch('https://itunes.apple.com/lookup?id=6825692888&country=uz', {
      signal: AbortSignal.timeout(5000),
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error('Store lookup unavailable');
    const data = await response.json();
    appStoreAvailable = Array.isArray(data?.results) && data.results.some(app =>
      app?.trackId === 6825692888 && app?.bundleId === 'com.amatora.app');
  } catch {
    cacheSeconds = 30;
  }
  res.setHeader('Cache-Control', `public, max-age=30, s-maxage=${cacheSeconds}, stale-while-revalidate=60`);
  res.statusCode = 200;
  return res.end(req.method === 'HEAD' ? undefined : JSON.stringify({ appStoreAvailable }));
}
