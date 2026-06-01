// Turn a chart's current props into a copy-paste JSX snippet.

function jsonish(v: unknown): string {
  // Compact JSON with unquoted object keys and a space after colons/commas.
  return JSON.stringify(v)
    .replace(/"([a-zA-Z_$][\w$]*)":/g, '$1: ')
    .replace(/,(?=\S)/g, ', ');
}

function attr(key: string, value: unknown): string {
  if (value === undefined || value === null) return '';
  if (typeof value === 'boolean') return value ? ` ${key}` : ` ${key}={false}`;
  if (typeof value === 'string') return ` ${key}="${value}"`;
  if (typeof value === 'number') return ` ${key}={${value}}`;
  return ` ${key}={${jsonish(value)}}`;
}

export interface SnippetSpec {
  componentName: string;
  /** The `const data = …` lines shown above the JSX. */
  dataCode: string;
  /** The data prop rendered verbatim, e.g. `data={data}` or `values={values}`. */
  dataAttr: string;
  /** Fixed accessor props (x, value, series, …) serialized as attributes. */
  accessors: Record<string, unknown>;
}

export function buildSnippet(spec: SnippetSpec, props: Record<string, unknown>): string {
  const attrs =
    Object.entries(spec.accessors)
      .map(([k, v]) => attr(k, v))
      .join('') +
    Object.entries(props)
      .map(([k, v]) => attr(k, v))
      .join('');

  return `import { ${spec.componentName} } from 'react-d3-viz';

${spec.dataCode}

<${spec.componentName} ${spec.dataAttr}${attrs} />`;
}
