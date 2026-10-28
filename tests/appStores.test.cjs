const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function loadStores(fetchMock = () => { throw new Error('Unexpected request'); }) {
  const source = fs.readFileSync(new URL('../src/utils/appStores.ts', `file://${__filename.replaceAll('\\', '/')}`), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const context = { exports: {}, fetch: fetchMock, AbortSignal, Date };
  vm.runInNewContext(compiled, context);
  return context.exports;
}

test('iPhone, Android, desktop-mode iPad and desktop resolve to the correct store family', () => {
  const { detectMobilePlatform, APP_STORE_URL, GOOGLE_PLAY_URL } = loadStores();
  assert.equal(detectMobilePlatform({ userAgent: 'Mozilla iPhone', platform: 'iPhone', maxTouchPoints: 5 }), 'ios');
  assert.equal(detectMobilePlatform({ userAgent: 'Mozilla Macintosh', platform: 'MacIntel', maxTouchPoints: 5 }), 'ios');
  assert.equal(detectMobilePlatform({ userAgent: 'Mozilla Macintosh', platform: 'MacIntel', maxTouchPoints: 0 }), null);
  assert.equal(detectMobilePlatform({ userAgent: 'Mozilla Android 16', platform: 'Linux', maxTouchPoints: 5 }), 'android');
  assert.equal(detectMobilePlatform({ userAgent: 'Windows NT', platform: 'Win32', maxTouchPoints: 0 }), null);
  assert.equal(APP_STORE_URL, 'https://apps.apple.com/app/id6825692888');
  assert.equal(GOOGLE_PLAY_URL, 'https://play.google.com/store/apps/details?id=com.amatora.mobile');
});

test('multiple mounted download surfaces share one request and cache the public result', async () => {
  let calls = 0;
  const stores = loadStores(async url => {
    calls++;
    assert.equal(url, '/api/store-availability');
    return { ok: true, json: async () => ({ appStoreAvailable: true }) };
  });
  const first = stores.getAppStoreAvailability();
  assert.equal(first, stores.getAppStoreAvailability());
  assert.equal(await first, true);
  assert.equal(await stores.getAppStoreAvailability(), true);
  assert.equal(calls, 1);
});

test('store lookup failures keep the page usable and never claim Apple availability', async () => {
  const stores = loadStores(async () => { throw new Error('Offline'); });
  assert.equal(await stores.getAppStoreAvailability(), false);
});

test('public lookup accepts only this app, caches responses and rejects writes', async () => {
  const { default: handler } = await import('../api/store-availability.js');
  const originalFetch = global.fetch;
  let requests = 0;
  let results = [];
  global.fetch = async url => {
    requests++;
    assert.equal(url, 'https://itunes.apple.com/lookup?id=6825692888&country=uz');
    return { ok: true, json: async () => ({ results }) };
  };
  async function call(method = 'GET') {
    const res = { headers: {}, setHeader(k, v) { this.headers[k] = v; }, end(body) { this.body = body; } };
    await handler({ method }, res);
    return res;
  }
  try {
    assert.deepEqual(JSON.parse((await call()).body), { appStoreAvailable: false });
    results = [{ trackId: 6825692888, bundleId: 'different.app' }];
    assert.equal(JSON.parse((await call()).body).appStoreAvailable, false);
    results = [{ trackId: 6825692888, bundleId: 'com.amatora.app' }];
    const available = await call();
    assert.equal(JSON.parse(available.body).appStoreAvailable, true);
    assert.match(available.headers['Cache-Control'], /s-maxage=300/);
    const before = requests;
    assert.equal((await call('POST')).statusCode, 405);
    assert.equal(requests, before);
    global.fetch = async () => { throw new Error('Upstream timeout'); };
    const offline = await call();
    assert.equal(JSON.parse(offline.body).appStoreAvailable, false);
    assert.match(offline.headers['Cache-Control'], /s-maxage=30/);
  } finally { global.fetch = originalFetch; }
});
