import { useTranslation } from 'react-i18next';
import { charts } from './registry';
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
            return (
              <div key={idx} className="examples-preset">
                <h3>{t(`charts.${c.id}.examples.${exampleKey}.title`, ex.title)}</h3>
                <p>{t(`charts.${c.id}.examples.${exampleKey}.description`, ex.description)}</p>
                <button
                  className="btn-link"
                  onClick={() => navigate({ view: 'playground', chartId: c.id, preset: ex.title })}
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
