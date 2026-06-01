import { useEffect, useMemo, useState } from 'react';
import { charts, chartById } from './registry';
import { ControlField, type PropValue } from './controls';
import { buildSnippet } from './snippet';
import { palettes } from './data';
import type { Route } from './useHashRoute';

export function Playground({ chartId, navigate }: { chartId: string; navigate: (r: Route) => void }) {
  const def = chartById(chartId) ?? charts[0];
  const [props, setProps] = useState<Record<string, PropValue>>(def.defaultProps);
  const [paletteIdx, setPaletteIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  // Reset controls when the selected chart changes.
  useEffect(() => {
    setProps(def.defaultProps);
    setPaletteIdx(0);
  }, [def]);

  const onChange = (key: string, value: PropValue) =>
    setProps((p) => ({ ...p, [key]: value }));

  // The palette (when not Default) becomes a real `theme` prop — shown in code too.
  const themeProp = paletteIdx > 0 ? { theme: { colors: palettes[paletteIdx].colors } } : {};
  const renderProps = { ...props, ...themeProp };
  const snippetProps = { ...props, ...themeProp };

  const code = useMemo(() => buildSnippet(def.snippet, snippetProps), [def, snippetProps]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard may be unavailable */
    }
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
            <Chart {...def.fixedProps} {...renderProps} />
          </div>

          <div className="code">
            <div className="code-head">
              <span>Code</span>
              <button className="btn" onClick={copy}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre>
              <code>{code}</code>
            </pre>
          </div>
        </div>

        <aside className="panel">
          <div className="panel-section">
            <div className="panel-title">Props</div>
            {def.controls.map((ctrl) => (
              <ControlField key={ctrl.key} control={ctrl} value={props[ctrl.key]} onChange={onChange} />
            ))}
          </div>

          <div className="panel-section">
            <div className="panel-title">Palette (theme)</div>
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

          <button className="btn btn-ghost" onClick={() => { setProps(def.defaultProps); setPaletteIdx(0); }}>
            Reset
          </button>
        </aside>
      </div>
    </div>
  );
}
