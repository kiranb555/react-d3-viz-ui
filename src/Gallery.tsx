import { useTranslation } from 'react-i18next';
import { charts, datasetByKey } from './registry';
import type { Route } from './useHashRoute';

export function Gallery({ navigate }: { navigate: (r: Route) => void }) {
  const { t } = useTranslation(['common', 'registry']);

  return (
    <div className="gallery">
      {charts.map((c) => {
        const ds = datasetByKey(c);
        const Chart = c.Component;
        return (
          <div key={c.id} className="gallery-item">
            <div className="gallery-chart-preview">
              <Chart {...ds.props} {...c.defaultProps} />
            </div>
            <h3>{t(`charts.${c.id}.title`, c.title)}</h3>
            <p>{t(`charts.${c.id}.blurb`, c.blurb)}</p>
            <button
              className="btn"
              onClick={() => navigate({ view: 'playground', chartId: c.id })}
            >
              {t('nav.playground')}
            </button>
          </div>
        );
      })}
    </div>
  );
}
