import './styles.css';
import './styles-rtl.css';
import { useHashRoute } from './useHashRoute';
import { Gallery } from './Gallery';
import { Examples } from './Examples';
import { Docs } from './Docs';
import { Playground } from './Playground';
import { charts } from './registry';
import { useTranslation } from 'react-i18next';
import { useRTL } from './useRTL';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function App() {
  const [route, navigate] = useHashRoute();
  const { t } = useTranslation();
  useRTL();

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <h1>react-d3-viz</h1>
          <span className="tagline">{t('tagline')}</span>
        </div>
        <nav className="nav">
          <button
            className={route.view === 'gallery' ? 'nav-active' : ''}
            onClick={() => navigate({ view: 'gallery' })}
          >
            {t('nav.gallery')}
          </button>
          <button
            className={route.view === 'examples' ? 'nav-active' : ''}
            onClick={() => navigate({ view: 'examples' })}
          >
            {t('nav.examples')}
          </button>
          <button
            className={route.view === 'docs' ? 'nav-active' : ''}
            onClick={() => navigate({ view: 'docs' })}
          >
            {t('nav.docs')}
          </button>
          <button
            className={route.view === 'playground' ? 'nav-active' : ''}
            onClick={() => navigate({ view: 'playground', chartId: charts[0].id })}
          >
            {t('nav.playground')}
          </button>
          <a className="nav-ext" href="https://www.npmjs.com/package/react-d3-viz" target="_blank" rel="noreferrer">
            {t('nav.npm')}
          </a>
          <a className="nav-ext" href="https://github.com/kiranb555/react-d3-viz" target="_blank" rel="noreferrer">
            {t('nav.github')}
          </a>
          <LanguageSwitcher />
        </nav>
      </header>

      <main className="main">
        {route.view === 'gallery' && <Gallery navigate={navigate} />}
        {route.view === 'examples' && <Examples navigate={navigate} />}
        {route.view === 'docs' && <Docs navigate={navigate} />}
        {route.view === 'playground' && (
          <Playground
            key={`${route.chartId}:${route.dataset ?? ''}:${route.preset ?? ''}`}
            chartId={route.chartId}
            dataset={route.dataset}
            preset={route.preset}
            navigate={navigate}
          />
        )}
      </main>

      <footer className="footer">
        <div dangerouslySetInnerHTML={{ __html: t('footer.text') }} />
      </footer>
    </div>
  );
}
