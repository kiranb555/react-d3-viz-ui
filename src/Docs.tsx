import { charts } from './registry';
import { propDocs, seriesConfig, type PropDoc } from './propDocs';
import { buildSnippet } from './snippet';
import { CodeBlock } from './CodeBlock';
import type { Route } from './useHashRoute';

function PropsTable({ rows }: { rows: PropDoc[] }) {
  return (
    <table className="props-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
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
  return (
    <div className="docs">
      <section className="docs-intro">
        <h2>Getting started</h2>
        <p>
          Install the package and import the chart you need. Every chart takes a{' '}
          <code>data</code> array plus a few <em>accessor</em> props (like{' '}
          <code>x</code>, <code>value</code> or <code>series</code>) that tell it
          which fields to read.
        </p>
        <CodeBlock code="npm i react-d3-viz" label="Terminal" />
        <p>
          Pass multiple series via <code>series={'{[{ dataKey: \'sales\' }, …]}'}</code>,
          or a single series with the <code>y</code> shorthand. Colors, fonts and
          spacing come from a <code>theme</code> you can partially override.
        </p>

        <h3>SeriesConfig</h3>
        <p>Each entry in a chart&apos;s <code>series</code> (or radar <code>series</code>) array:</p>
        <PropsTable rows={seriesConfig} />
      </section>

      {charts.map((c) => {
        const ds = c.datasets[0];
        const usage = buildSnippet(c.componentName, ds, c.defaultProps);
        return (
          <section className="docs-chart" key={c.id}>
            <div className="docs-chart-head">
              <h2>{c.title}</h2>
              <button
                className="btn-link"
                onClick={() => navigate({ view: 'playground', chartId: c.id })}
              >
                Try in playground →
              </button>
            </div>
            <p className="docs-blurb">{c.blurb}</p>
            <CodeBlock code={usage} label={`${c.componentName} usage`} />
            <h3>Props</h3>
            <PropsTable rows={propDocs[c.id]} />
          </section>
        );
      })}
    </div>
  );
}
