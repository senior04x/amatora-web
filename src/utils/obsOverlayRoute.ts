const ADMIN_OVERLAY_ORIGIN = 'https://hfl-forma-admin.vercel.app';
const MATCH_ID = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

export function readObsOverlayRoute(id: string, search: string, pathOrgSlug?: string) {
  const params = new URLSearchParams(search);
  const fieldOverride = params.get('field') || params.get('field_id') || params.get('stream') || params.get('maydon');
  if (!fieldOverride && MATCH_ID.test(id)) return { overlayId: id, orgId: null, slug: null };

  const field = (fieldOverride || id).match(/(?:^|[^0-9])([1-4])(?![0-9])/)?.[1] ?? '1';
  const overlayId = 'stream' + field;
  const org = (params.get('org_id') || params.get('id') || params.get('org_slug') ||
    params.get('org') || params.get('slug') || pathOrgSlug || '').trim().toLowerCase();
  if (/^\d+$/.test(org)) {
    const number = Number(org);
    return { overlayId, orgId: Number.isSafeInteger(number) && number > 0 ? String(number) : null, slug: null };
  }
  return { overlayId, orgId: null, slug: /^[a-z0-9_-]{2,50}$/.test(org) ? org : null };
}

export function adminObsOverlayUrl(overlayId: string, orgId: string | null) {
  if (!MATCH_ID.test(overlayId) && (!/^stream[1-4]$/.test(overlayId) || !orgId || !/^[1-9]\d*$/.test(orgId))) return null;
  const url = new URL('/obs/scoreboard/' + overlayId, ADMIN_OVERLAY_ORIGIN);
  if (orgId) url.searchParams.set('org_id', orgId);
  return url.href;
}
