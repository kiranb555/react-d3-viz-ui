import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { charts, chartById, datasetByKey } from './registry';
import { ControlField, type PropValue } from './controls';
import { buildSnippet } from './snippet';
import { palettes } from './data';
import type { Route } from './useHashRoute';

export function Playground({
  chartId,
  dataset,
  preset,
  navigate,
}: {
  chartId: string;
  dataset?: string;
  preset?: number;
  navigate: (r: Route) => void;
}) {
  const { t } = useTranslation(['common', 'registry']);
  const def = chartById(chartId) ?? charts[0];

  // Starting point — honors an incoming preset (deep-linked from Examples): its
  // dataset and prop overrides seed the controls. This component is remounted
  // (via a `key` in App) whenever the chart / dataset / preset changes, so these
  // initializers double as the reset-on-navigation behavior.
  const example = preset !== undefined ? def.examples[preset] : undefined;
  const initialDatasetKey = datasetByKey(def, example?.datasetKey ?? dataset).key;
  const initialProps = { ...def.defaultProps, ...(example?.props ?? {}) };

  const [datasetKey, setDatasetKey] = useState(initialDatasetKey);
  const [props, setProps] = useState<Record<string, PropValue>>(initialProps);
  const [paletteIdx, setPaletteIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const ds = datasetByKey(def, datasetKey);

  const onChange = (key: string, value: PropValue) =>
    setProps((p) => ({ ...p, [key]: value }));

  // The palette (when not Default) becomes a real `theme` prop — shown in code too.
  const renderProps = useMemo(() => {
    const themeProp = paletteIdx > 0 ? { theme: { colors: palettes[paletteIdx].colors } } : {};
    return { ...props, ...themeProp };
  }, [props, paletteIdx]);

  const code = useMemo(
    () => buildSnippet(def.componentName, ds, renderProps),
    [def.componentName, ds, renderProps],
  );

  const highlightedCode = useMemo(() => {
    try {
      return hljs.highlight(code, { language: 'jsx' }).value;
    } catch {
      return hljs.highlightAuto(code).value;
    }
  }, [code]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  const reset = () => {
    setDatasetKey(def.datasets[0].key);
    setProps(def.defaultProps);
    setPaletteIdx(0);
  };

  const Chart = def.Component;

  return (
    <div className="playground">
      <div className="tabs">
        {charts.map((c) => (
          <button
            key={c.id}
            className={`tab ${c.id === def.id ? 'tab-active' : ''}`}
            onClick={() => navigate({ view: 'playground', chartId: c.id })}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className="play-grid">
        <div className="preview-col">
          <div className="preview">
            <Chart {...ds.props} {...renderProps} />
          </div>

          <div className="code">
            <div className="code-head">
              <span>{t('playground.code')}</span>
              <button className="btn" onClick={copy} title={copied ? t('playground.copied') : t('playground.copy')}>
                {copied ? <CheckIcon width={20} height={20} /> : <DocumentDuplicateIcon width={20} height={20} />}
              </button>
            </div>
            <pre>
              <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
          </div>
        </div>

        <aside className="panel">
          {def.datasets.length > 1 && (
            <div className="panel-section">
              <div className="panel-title">{t('playground.dataset')}</div>
              <label className="ctrl">
                <select value={datasetKey} onChange={(e) => setDatasetKey(e.target.value)}>
                  {def.datasets.map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          <div className="panel-section">
            <div className="panel-title">{t('playground.props')}</div>
            {def.controls.map((ctrl) => (
              <ControlField key={ctrl.key} control={ctrl} value={props[ctrl.key]} onChange={onChange} />
            ))}
          </div>

          <div className="panel-section">
            <div className="panel-title">{t('playground.palette')}</div>
            <div className="palettes">
              {palettes.map((p, i) => (
                <button
                  key={p.name}
                  className={`palette ${i === paletteIdx ? 'palette-active' : ''}`}
                  title={p.name}
                  onClick={() => setPaletteIdx(i)}
                >
                  {p.colors.slice(0, 4).map((c) => (
                    <span key={c} style={{ background: c }} />
                  ))}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-ghost" onClick={reset}>
            {t('playground.reset')}
          </button>
        </aside>
      </div>
    </div>
  );
}
