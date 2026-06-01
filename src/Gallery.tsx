import { charts } from './registry';
import type { Route } from './useHashRoute';

export function Gallery({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="gallery">
      {charts.map((c) => {
        const Chart = c.Component;
        return (
          <div className="card" key={c.id}>
            <div className="card-head">
              <h3>{c.title}</h3>
              <button className="btn-link" onClick={() => navigate({ view: 'playground', chartId: c.id })}>
                Open in playground →
              </button>
            </div>
            <p className="card-blurb">{c.blurb}</p>
            <div className="card-chart">
              <Chart {...c.fixedProps} {...c.defaultProps} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
