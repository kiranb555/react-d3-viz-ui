import './styles.css';
import { useHashRoute } from './useHashRoute';
import { Gallery } from './Gallery';
import { Playground } from './Playground';
import { charts } from './registry';

export default function App() {
  const [route, navigate] = useHashRoute();

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <h1>react-d3-viz</h1>
          <span className="tagline">Cross-platform SVG charts for React &amp; React Native</span>
        </div>
        <nav className="nav">
          <button
            className={route.view === 'gallery' ? 'nav-active' : ''}
            onClick={() => navigate({ view: 'gallery' })}
          >
            Gallery
          </button>
          <button
            className={route.view === 'playground' ? 'nav-active' : ''}
            onClick={() => navigate({ view: 'playground', chartId: charts[0].id })}
          >
            Playground
          </button>
          <a className="nav-ext" href="https://www.npmjs.com/package/react-d3-viz" target="_blank" rel="noreferrer">
            npm ↗
          </a>
          <a className="nav-ext" href="https://github.com/kiranb555/react-d3-viz" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </nav>
      </header>

      <main className="main">
        {route.view === 'gallery' ? (
          <Gallery navigate={navigate} />
        ) : (
          <Playground chartId={route.chartId} navigate={navigate} />
        )}
      </main>

      <footer className="footer">
        Built with <code>react-d3-viz</code> · install via <code>npm i react-d3-viz</code>
      </footer>
    </div>
  );
}
