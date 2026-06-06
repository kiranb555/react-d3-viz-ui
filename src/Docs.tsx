import { useTranslation } from 'react-i18next';
import { charts } from './registry';
import { propDocs, seriesConfig, type PropDoc } from './propDocs';
import { buildSnippet } from './snippet';
import { CodeBlock } from './CodeBlock';
import type { Route } from './useHashRoute';
import { ScrollToTopButton } from './ScrollToTopButton';

function PropsTable({ rows }: { rows: PropDoc[] }) {
  const { t } = useTranslation('docs');

  return (
    <table className="props-table">
      <thead>
        <tr>
          <th>{t('propDocs.prop', 'Prop')}</th>
          <th>{t('propDocs.type', 'Type')}</th>
          <th>{t('propDocs.default', 'Default')}</th>
          <th>{t('propDocs.description', 'Description')}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((p) => (
          <tr key={p.name}>
            <td><code>{p.name}</code></td>
            <td><code className="ty">{p.type}</code></td>
            <td><code className="ty">{p.default}</code></td>
            <td>{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Docs({ navigate }: { navigate: (r: Route) => void }) {
  const { t } = useTranslation(['docs', 'common', 'registry']);

  return (
    <div className="docs">
      <section className="docs-intro">
        <h2>{t('docs.gettingStarted.title')}</h2>
        <p>{t('docs.gettingStarted.intro')}</p>
        <CodeBlock code={t('docs.npm')} label={t('terminal')} />
        <p>{t('docs.series')}</p>

        <h3>{t('docs.seriesConfig.title')}</h3>
        <p>{t('docs.seriesConfig.desc')}</p>
        <PropsTable rows={seriesConfig} />
      </section>

      {charts.map((c) => {
        const ds = c.datasets[0];
        const usage = buildSnippet(c.componentName, ds, c.defaultProps);
        return (
          <section className="docs-chart" key={c.id}>
            <div className="docs-chart-head">
              <h2>{t(`charts.${c.id}.title`, c.title)}</h2>
              <button
                className="btn-link"
                onClick={() => navigate({ view: 'playground', chartId: c.id })}
              >
                {t('playground.tryPlayground', 'Try in playground →')}
              </button>
            </div>
            <p className="docs-blurb">{t(`charts.${c.id}.blurb`, c.blurb)}</p>
            <CodeBlock code={usage} label={`${c.componentName} usage`} />
            <h3>{t('docs.props')}</h3>
            <PropsTable rows={propDocs[c.id]} />
          </section>
        );
      })}
      <ScrollToTopButton />
    </div>
  );
}
