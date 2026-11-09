import test from 'node:test';
import assert from 'node:assert/strict';
import { adminObsOverlayUrl, readObsOverlayRoute } from '../src/utils/obsOverlayRoute.ts';

const resolve = (stream, search, slug) => {
  const route = readObsOverlayRoute(stream, search, slug);
  return adminObsOverlayUrl(route.overlayId, route.orgId);
};

test('the public stream uses the existing admin overlay for the same organization and field', () => {
  assert.equal(resolve('stream1', '?org_id=1'), 'https://hfl-forma-admin.vercel.app/obs/scoreboard/stream1?org_id=1');
  assert.equal(resolve('stream2', '?org_id=25&field=2'), 'https://hfl-forma-admin.vercel.app/obs/scoreboard/stream2?org_id=25');
  assert.equal(resolve('stream1', '?org_id=25&field=4'), 'https://hfl-forma-admin.vercel.app/obs/scoreboard/stream4?org_id=25');
});

test('direct match and organization slug routes stay supported', () => {
  const uuid = '61736800-ba9a-4e16-a1ab-b1e4e7dbf0db';
  assert.equal(resolve(uuid, ''), 'https://hfl-forma-admin.vercel.app/obs/scoreboard/' + uuid);
  assert.deepEqual(readObsOverlayRoute('stream2', '', 'hfl'), { overlayId: 'stream2', orgId: null, slug: 'hfl' });
  assert.equal(resolve('stream1', '', '25'), 'https://hfl-forma-admin.vercel.app/obs/scoreboard/stream1?org_id=25');
});

test('a missing or malformed organization cannot load a different organization', () => {
  assert.equal(resolve('stream1', ''), null);
  assert.equal(resolve('stream1', '?org_id=0'), null);
  assert.equal(resolve('stream1', '?org_slug=%25'), null);
  assert.equal(adminObsOverlayUrl('//evil.example', '1'), null);
});
