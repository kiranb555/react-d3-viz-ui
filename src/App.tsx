import './styles.css';
import './styles-rtl.css';
import { useState, useEffect, useRef } from 'react';
import { useHashRoute } from './useHashRoute';
import { Gallery } from './Gallery';
import { Examples } from './Examples';
import { Docs } from './Docs';
import { Playground } from './Playground';
import { charts } from './registry';
import { useTranslation } from 'react-i18next';
import { useRTL } from './useRTL';
import { useTheme } from './useTheme';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import {
  PhotoIcon,
  SparklesIcon,
  DocumentTextIcon,
  PlayIcon,
  Bars3Icon,
  ArrowTopRightOnSquareIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export default function App() {
  const [route, navigate] = useHashRoute();
  const { t } = useTranslation();
  useRTL();
  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <div className="app">
      <header className="header" ref={menuRef} data-menu-open={isMenuOpen}>
        <div className="brand">
          <h1>react-d3-viz</h1>
          <span className="tagline">{t('tagline')}</span>
        </div>
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <Bars3Icon className="hamburger-icon" />
        </button>
        <nav className="nav">
          <button
            className={route.view === 'gallery' ? 'nav-active' : ''}
            onClick={() => {
              navigate({ view: 'gallery' });
              closeMenu();
            }}
            title={t('nav.gallery')}
          >
            <PhotoIcon className="nav-icon" />
            <span className="nav-label">{t('nav.gallery')}</span>
          </button>
          <button
            className={route.view === 'examples' ? 'nav-active' : ''}
            onClick={() => {
              navigate({ view: 'examples' });
              closeMenu();
            }}
            title={t('nav.examples')}
          >
            <SparklesIcon className="nav-icon" />
            <span className="nav-label">{t('nav.examples')}</span>
          </button>
          <button
            className={route.view === 'docs' ? 'nav-active' : ''}
            onClick={() => {
              navigate({ view: 'docs' });
              closeMenu();
            }}
            title={t('nav.docs')}
          >
            <DocumentTextIcon className="nav-icon" />
            <span className="nav-label">{t('nav.docs')}</span>
          </button>
          <button
            className={`playground-btn ${route.view === 'playground' ? 'nav-active' : ''}`}
            onClick={() => {
              navigate({ view: 'playground', chartId: charts[0].id });
              closeMenu();
            }}
            title={t('nav.playground')}
          >
            <PlayIcon className="nav-icon" />
            <span className="nav-label">{t('nav.playground')}</span>
          </button>
          <a className="nav-ext" href="https://www.npmjs.com/package/react-d3-viz" target="_blank" rel="noreferrer" title={t('nav.npm')}>
            npm <ArrowTopRightOnSquareIcon className="nav-ext-icon" />
          </a>
          <a className="nav-ext" href="https://github.com/kiranb555/react-d3-viz" target="_blank" rel="noreferrer" title={t('nav.github')}>
            GitHub <ArrowTopRightOnSquareIcon className="nav-ext-icon" />
          </a>
          <LanguageSwitcher />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
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
        <div className="footer-heart">
          Built with <HeartIcon className="heart-icon" /> by Kiran
        </div>
        <div className="footer-contributor">
          <a href="https://www.kirandev.in" target="_blank" rel="noreferrer" className="footer-link">www.kirandev.in</a>
        </div>
      </footer>
    </div>
  );
}
