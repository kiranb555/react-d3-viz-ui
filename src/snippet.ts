// Turn a chart's current dataset + props into a copy-paste JSX snippet.

import type { Dataset } from './registry';

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

export function buildSnippet(
  componentName: string,
  dataset: Dataset,
  props: Record<string, unknown>,
): string {
  // props override accessors of the same key (e.g. a preset that customizes
  // `series`), so the emitted JSX never carries a duplicate attribute.
  const merged = { ...dataset.accessors, ...props };
  const attrs = Object.entries(merged)
    .map(([k, v]) => attr(k, v))
    .join('');

  return `import { ${componentName} } from 'react-d3-viz';

${dataset.dataCode}

<${componentName} ${dataset.dataAttr}${attrs} />`;
}
