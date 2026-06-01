import { useEffect, useState } from 'react';

export type Route =
  | { view: 'gallery' }
  | { view: 'playground'; chartId: string };

function parse(): Route {
  const hash = window.location.hash.replace(/^#/, '');
  const m = hash.match(/^\/play\/([\w-]+)/);
  if (m) return { view: 'playground', chartId: m[1] };
  return { view: 'gallery' };
}

/** Minimal hash router: `#/` (gallery) and `#/play/<chartId>` (playground). */
export function useHashRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = (r: Route) => {
    window.location.hash = r.view === 'playground' ? `/play/${r.chartId}` : '/';
  };

  return [route, navigate];
}
