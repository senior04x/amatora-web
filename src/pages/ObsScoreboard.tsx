import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { adminObsOverlayUrl, readObsOverlayRoute } from '../utils/obsOverlayRoute';
import './ObsScoreboard.css';

interface ObsScoreboardProps {
  streamId?: string;
  pathOrgSlug?: string;
}

export function ObsScoreboard({ streamId = 'stream1', pathOrgSlug }: ObsScoreboardProps) {
  const { overlayId, orgId, slug } = readObsOverlayRoute(streamId, window.location.search, pathOrgSlug);
  const [resolvedOrg, setResolvedOrg] = useState<{ slug: string; id: string } | null>(null);

  useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();
    void (async () => {
      try {
        const pattern = slug.replace(/_/g, '\\_');
        const { data } = await supabase.from('organizations').select('id').ilike('slug', pattern)
          .abortSignal(controller.signal).maybeSingle();
        if (data && !controller.signal.aborted) setResolvedOrg({ slug, id: String(data.id) });
      } catch (error) {
        if (!controller.signal.aborted) console.warn('OBS organization lookup failed:', error);
      }
    })();
    return () => controller.abort();
  }, [slug]);

  const targetOrg = orgId ?? (resolvedOrg?.slug === slug ? resolvedOrg?.id : null) ?? null;
  const src = adminObsOverlayUrl(overlayId, targetOrg);
  // The public Browser Source uses the same prematch and live overlay as Match Control.
  return src ? <iframe className="obs-overlay-frame" title="AMATORA OBS overlay" src={src} /> : null;
}
