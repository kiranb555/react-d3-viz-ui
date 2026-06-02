import { useEffect, useState } from 'react';

export type Route =
  | { view: 'gallery' }
  | { view: 'examples' }
  | { view: 'docs' }
  | { view: 'playground'; chartId: string; dataset?: string; preset?: number };

function parse(): Route {
  const hash = window.location.hash.replace(/^#/, '');
  const [path, query = ''] = hash.split('?');

  const play = path.match(/^\/play\/([\w-]+)/);
  if (play) {
    const params = new URLSearchParams(query);
    const dataset = params.get('dataset') ?? undefined;
    const presetRaw = params.get('preset');
    const preset = presetRaw !== null ? Number(presetRaw) : undefined;
    return { view: 'playground', chartId: play[1], dataset, preset: Number.isNaN(preset) ? undefined : preset };
  }
  if (path === '/examples') return { view: 'examples' };
  if (path === '/docs') return { view: 'docs' };
  return { view: 'gallery' };
}

function serialize(r: Route): string {
  if (r.view === 'playground') {
    const params = new URLSearchParams();
    if (r.dataset) params.set('dataset', r.dataset);
    if (r.preset !== undefined) params.set('preset', String(r.preset));
    const q = params.toString();
    return `/play/${r.chartId}${q ? `?${q}` : ''}`;
  }
  if (r.view === 'examples') return '/examples';
  if (r.view === 'docs') return '/docs';
  return '/';
}

/** Minimal hash router: gallery, examples, docs, and `#/play/<chartId>`. */
export function useHashRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = (r: Route) => {
    window.location.hash = serialize(r);
  };

  return [route, navigate];
}
