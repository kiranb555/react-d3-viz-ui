import { charts, datasetByKey } from './registry';
import type { Route } from './useHashRoute';

export function Examples({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="examples">
      <p className="page-lead">
        Preset variants for every chart. Each card is a real configuration — open
        it in the playground to tweak the props and copy the code.
      </p>

      {charts.map((c) => {
        const Chart = c.Component;
        return (
          <section className="example-group" key={c.id}>
            <h2 className="example-group-title">{c.title}</h2>
            <div className="gallery">
              {c.examples.map((ex, i) => {
                const ds = datasetByKey(c, ex.datasetKey);
                return (
                  <div className="card" key={ex.title}>
                    <div className="card-head">
                      <h3>{ex.title}</h3>
                      <button
                        className="btn-link"
                        onClick={() =>
                          navigate({ view: 'playground', chartId: c.id, dataset: ds.key, preset: i })
                        }
                      >
                        Open in playground →
                      </button>
                    </div>
                    <p className="card-blurb">{ex.description}</p>
                    <div className="card-chart">
                      <Chart {...c.defaultProps} {...ds.props} {...ex.props} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
