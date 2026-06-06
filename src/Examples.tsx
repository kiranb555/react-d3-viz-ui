import { useTranslation } from 'react-i18next';
import { charts, datasetByKey } from './registry';
import type { Route } from './useHashRoute';

export function Examples({ navigate }: { navigate: (r: Route) => void }) {
  const { t } = useTranslation(['common', 'registry']);

  return (
    <div className="examples">
      {charts.map((c) => (
        <div key={c.id} className="examples-chart">
          <h2>{t(`charts.${c.id}.title`, c.title)}</h2>
          {c.examples.map((ex, idx) => {
            const exampleKey = ex.title.toLowerCase().replace(/\s+/g, '');
            const datasetKey = ex.datasetKey;
            const ds = datasetByKey(c, datasetKey);
            const Chart = c.Component;
            return (
              <div key={idx} className="examples-preset">
                <div className="examples-chart-preview">
                  <Chart {...ds.props} {...c.defaultProps} {...ex.props} />
                </div>
                <h3>{t(`charts.${c.id}.examples.${exampleKey}.title`, ex.title)}</h3>
                <p>{t(`charts.${c.id}.examples.${exampleKey}.description`, ex.description)}</p>
                <button
                  className="btn-link"
                  onClick={() => navigate({ view: 'playground', chartId: c.id, preset: idx })}
                >
                  {t('playground.tryPlayground', 'Try in playground →')}
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
