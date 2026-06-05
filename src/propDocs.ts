// Prop reference for the Docs page. Descriptions/types/defaults are taken from
// react-d3-viz's own TypeScript declarations (node_modules/react-d3-viz/dist).

export interface PropDoc {
  name: string;
  type: string;
  default: string;
  description: string;
}

/** SeriesConfig — the shape of each entry in a chart's `series` array. */
export const seriesConfig: PropDoc[] = [
  { name: 'dataKey', type: 'string | (d) => number', default: '—', description: 'Key or function selecting the numeric value from each datum. Required.' },
  { name: 'label', type: 'string', default: 'dataKey', description: 'Human label shown in legend / tooltip.' },
  { name: 'color', type: 'string', default: 'palette[i]', description: 'Series color. Defaults to the theme palette by index.' },
  { name: 'curve', type: "'monotone' | 'linear' | 'step' | 'catmullRom'", default: '—', description: 'Line / area curve interpolation.' },
  { name: 'strokeWidth', type: 'number', default: '—', description: 'Line stroke width.' },
  { name: 'showPoints', type: 'boolean', default: 'false', description: 'Render dots at each point (line / area).' },
  { name: 'fillOpacity', type: 'number', default: '—', description: 'Area fill opacity.' },
  { name: 'dashArray', type: 'string', default: '—', description: 'Dashed stroke, e.g. "6 4".' },
];

// Shared props for the Cartesian charts (Line, Area, Bar, Scatter, Bubble).
const cartesianProps: PropDoc[] = [
  { name: 'data', type: 'Datum[]', default: '—', description: 'Array of records to plot. Required.' },
  { name: 'x', type: 'string | (d) => unknown', default: '—', description: 'x accessor — category key for bar/line/area, numeric key for scatter. Required.' },
  { name: 'series', type: 'SeriesConfig[]', default: '—', description: 'One or more series. Mutually exclusive with the `y` shorthand.' },
  { name: 'y', type: 'string | (d) => number', default: '—', description: 'Single-series shorthand instead of `series`.' },
  { name: 'height', type: "number | 'auto'", default: '300', description: "Pixel height, or 'auto' to derive from width via `aspect`." },
  { name: 'width', type: "number | 'auto'", default: "'auto'", description: 'Pixel width, or auto to fill the parent and re-flow on resize.' },
  { name: 'aspect', type: 'number', default: '2', description: "width / height ratio used when height is 'auto'." },
  { name: 'showGrid', type: 'boolean', default: 'true', description: 'Show background grid lines.' },
  { name: 'showXAxis', type: 'boolean', default: 'true', description: 'Show the x axis.' },
  { name: 'showYAxis', type: 'boolean', default: 'true', description: 'Show the y axis.' },
  { name: 'showTooltip', type: 'boolean', default: 'true', description: 'Enable the hover tooltip.' },
  { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show the interactive legend.' },
  { name: 'xTickCount', type: 'number', default: '—', description: 'Suggested number of x-axis ticks.' },
  { name: 'yTickCount', type: 'number', default: '—', description: 'Suggested number of y-axis ticks.' },
  { name: 'formatX', type: '(value, index) => string', default: '—', description: 'Format x-axis tick labels.' },
  { name: 'formatY', type: '(value) => string', default: '—', description: 'Format y-axis tick labels.' },
  { name: 'yDomain', type: '[number, number]', default: 'auto', description: 'Fix the y domain instead of inferring from data.' },
  { name: 'margin', type: 'Partial<Margin>', default: 'DEFAULT_MARGIN', description: 'Override the inner chart margins.' },
  { name: 'theme', type: 'DeepPartial<ChartTheme>', default: 'defaultTheme', description: 'Theme overrides (colors, fonts, etc.).' },
  { name: 'animate', type: 'boolean', default: 'true', description: 'Disable the enter animation when false.' },
];

const lineExtra: PropDoc[] = [
  { name: 'showPoints', type: 'boolean', default: 'false', description: 'Render dots at every point across all series.' },
  { name: 'categoricalX', type: 'boolean', default: 'true', description: 'Use a point scale (true) or a numeric linear x scale.' },
];

const barExtra: PropDoc[] = [
  { name: 'stacked', type: 'boolean', default: 'false', description: 'Stack series on top of each other instead of grouping side-by-side.' },
  { name: 'radius', type: 'number', default: '0', description: 'Bar corner radius.' },
  { name: 'categoryGap', type: 'number', default: '—', description: 'Gap between adjacent categories (band inner padding), 0..1.' },
  { name: 'groupGap', type: 'number', default: '—', description: 'Gap between grouped sub-bars within a category, 0..1.' },
];

const scatterExtra: PropDoc[] = [
  { name: 'pointRadius', type: 'number', default: '—', description: 'Dot radius.' },
  { name: 'categoricalX', type: 'boolean', default: 'false', description: 'Treat x as numeric (linear) or categorical (point scale).' },
];

const bubbleExtra: PropDoc[] = [
  { name: 'size', type: 'string | (d) => number', default: '—', description: "Accessor for each point's magnitude (mapped to bubble area). Required." },
  { name: 'radiusRange', type: '[number, number]', default: '[4, 28]', description: 'Min / max bubble radius in px.' },
  { name: 'categoricalX', type: 'boolean', default: 'false', description: 'Treat x as numeric (default) or categorical.' },
];

const pieProps: PropDoc[] = [
  { name: 'data', type: 'Datum[]', default: '—', description: 'Array of records, one per slice. Required.' },
  { name: 'value', type: 'string | (d) => number', default: '—', description: "Accessor for each slice's numeric value. Required." },
  { name: 'label', type: 'string | (d) => unknown', default: '—', description: "Accessor for each slice's label (legend + tooltip)." },
  { name: 'innerRadius', type: 'number', default: '0', description: 'Donut hole size — a fraction 0..1 of the radius, or absolute px when ≥ 1.' },
  { name: 'padAngle', type: 'number', default: '0', description: 'Angular padding between slices (radians).' },
  { name: 'cornerRadius', type: 'number', default: '0', description: 'Rounded slice corners.' },
  { name: 'showLabels', type: 'boolean', default: 'true', description: 'Show percentage labels inside slices.' },
  { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show the interactive legend.' },
  { name: 'colors', type: 'string[]', default: 'palette', description: 'Override the categorical palette.' },
  { name: 'height', type: "number | 'auto'", default: "'auto'", description: "Pixel height, or 'auto' to match the width (square)." },
  { name: 'theme', type: 'DeepPartial<ChartTheme>', default: 'defaultTheme', description: 'Theme overrides.' },
  { name: 'animate', type: 'boolean', default: 'true', description: 'Disable the enter animation when false.' },
];

const histogramProps: PropDoc[] = [
  { name: 'values', type: 'number[]', default: '—', description: 'Raw numeric values to bin. Provide this OR `data` + `value`.' },
  { name: 'data', type: 'Datum[]', default: '—', description: 'Records to bin (used with `value`).' },
  { name: 'value', type: 'string | (d) => number', default: '—', description: 'Accessor selecting the numeric value from each record.' },
  { name: 'bins', type: 'number', default: '20', description: 'Target number of bins (a hint to d3).' },
  { name: 'color', type: 'string', default: 'palette[0]', description: 'Bar color.' },
  { name: 'formatBin', type: '(x0, x1) => string', default: '—', description: "Format a bin's lower-bound label." },
  { name: 'showGrid', type: 'boolean', default: 'true', description: 'Show background grid lines.' },
  { name: 'showXAxis', type: 'boolean', default: 'true', description: 'Show the x axis.' },
  { name: 'showYAxis', type: 'boolean', default: 'true', description: 'Show the y axis.' },
  { name: 'showTooltip', type: 'boolean', default: 'true', description: 'Enable the hover tooltip.' },
  { name: 'yDomain', type: '[number, number]', default: 'auto', description: 'Fix the y (count) domain.' },
  { name: 'animate', type: 'boolean', default: 'true', description: 'Disable the enter animation when false.' },
];

const radarProps: PropDoc[] = [
  { name: 'data', type: 'Datum[]', default: '—', description: 'One record per axis (spoke). Required.' },
  { name: 'axis', type: 'string | (d) => unknown', default: '—', description: 'Accessor for each axis label. Required.' },
  { name: 'series', type: 'SeriesConfig[]', default: '—', description: 'Series to overlay; each reads a value per axis via its dataKey. Required.' },
  { name: 'maxValue', type: 'number', default: 'auto', description: 'Domain max. Defaults to the largest value across all series.' },
  { name: 'levels', type: 'number', default: '4', description: 'Number of concentric grid rings.' },
  { name: 'fillOpacity', type: 'number', default: '0.2', description: 'Fill opacity for each series polygon.' },
  { name: 'showAxisLabels', type: 'boolean', default: 'true', description: 'Show the axis (spoke) labels.' },
  { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show the interactive legend.' },
  { name: 'height', type: "number | 'auto'", default: "'auto'", description: "Pixel height, or 'auto' to match the width (square)." },
  { name: 'theme', type: 'DeepPartial<ChartTheme>', default: 'defaultTheme', description: 'Theme overrides.' },
  { name: 'animate', type: 'boolean', default: 'true', description: 'Disable the enter animation when false.' },
];

const treemapProps: PropDoc[] = [
  { name: 'data', type: 'Datum[] | Datum', default: '—', description: 'A flat array of records, or a single nested root record. Required.' },
  { name: 'value', type: 'string | (d) => number', default: '—', description: "Accessor for each cell's numeric value (size). Required." },
  { name: 'label', type: 'string | (d) => unknown', default: '—', description: 'Accessor for each cell label (text inside the cell + tooltip).' },
  { name: 'group', type: 'string | (d) => unknown', default: '—', description: 'Flat data only: group records into a 2-level treemap, colored by group.' },
  { name: 'childrenKey', type: 'string | (d) => Datum[]', default: "'children'", description: "Nested data only: how to read a record's children (key or function)." },
  { name: 'padding', type: 'number', default: '1', description: 'Gap between cells, in px.' },
  { name: 'paddingTop', type: 'number', default: 'auto', description: 'Header band height for groups (grouped mode auto-uses 18).' },
  { name: 'colors', type: 'string[]', default: 'palette', description: 'Override the categorical palette.' },
  { name: 'showLabels', type: 'boolean', default: 'true', description: 'Show labels inside cells (hidden when a cell is too small).' },
  { name: 'showValues', type: 'boolean', default: 'false', description: 'Show the value beneath the label.' },
  { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show the interactive legend.' },
  { name: 'showTooltip', type: 'boolean', default: 'true', description: 'Enable the hover / touch tooltip.' },
  { name: 'valueFormat', type: '(value) => string', default: 'toLocaleString', description: 'Format the numeric value shown in labels / tooltip.' },
  { name: 'height', type: "number | 'auto'", default: '300', description: "Pixel height, or 'auto' to derive from width via aspect (1.6)." },
  { name: 'theme', type: 'DeepPartial<ChartTheme>', default: 'defaultTheme', description: 'Theme overrides.' },
  { name: 'animate', type: 'boolean', default: 'true', description: 'Disable the enter animation when false.' },
];

const waterfallProps: PropDoc[] = [
  { name: 'data', type: 'WaterfallDataPoint[]', default: '—', description: 'Array of data points with label and value. Required.' },
  { name: 'width', type: "number | 'auto'", default: "'auto'", description: 'Pixel width, or auto to fill the parent.' },
  { name: 'height', type: "number | 'auto'", default: '300', description: "Pixel height, or 'auto' to derive from width via aspect." },
  { name: 'aspect', type: 'number', default: '1.33', description: 'width / height ratio when height is auto.' },
  { name: 'theme', type: 'DeepPartial<ChartTheme>', default: 'defaultTheme', description: 'Theme overrides.' },
  { name: 'colors', type: 'string[]', default: 'palette', description: 'Override the categorical palette.' },
  { name: 'animate', type: 'boolean', default: 'true', description: 'Show animations.' },
  { name: 'valueFormatter', type: '(value: number) => string', default: '—', description: 'Format the numeric values displayed.' },
];

const sankeyProps: PropDoc[] = [
  { name: 'data', type: 'SankeyData', default: '—', description: 'Nodes and links defining the Sankey flow. Required.' },
  { name: 'width', type: "number | 'auto'", default: "'auto'", description: 'Pixel width, or auto to fill the parent.' },
  { name: 'height', type: "number | 'auto'", default: '300', description: "Pixel height, or 'auto' to derive from width via aspect." },
  { name: 'aspect', type: 'number', default: '1.33', description: 'width / height ratio when height is auto.' },
  { name: 'margin', type: 'Partial<Margin>', default: '{ top: 20, right: 20, bottom: 20, left: 20 }', description: 'Chart margin.' },
  { name: 'theme', type: 'DeepPartial<ChartTheme>', default: 'defaultTheme', description: 'Theme overrides.' },
  { name: 'colors', type: 'string[]', default: 'palette', description: 'Override the categorical palette.' },
  { name: 'animate', type: 'boolean', default: 'true', description: 'Show animations.' },
  { name: 'nodeColors', type: 'Record<string | number, string>', default: '{}', description: 'Optional custom colors per node ID.' },
];

const mekkoProps: PropDoc[] = [
  { name: 'data', type: 'MekkoData', default: '—', description: 'Data with categories and series. Required.' },
  { name: 'width', type: "number | 'auto'", default: "'auto'", description: 'Pixel width, or auto to fill the parent.' },
  { name: 'height', type: "number | 'auto'", default: '300', description: "Pixel height, or 'auto' to derive from width via aspect." },
  { name: 'aspect', type: 'number', default: '1.33', description: 'width / height ratio when height is auto.' },
  { name: 'margin', type: 'Partial<Margin>', default: '{ top: 20, right: 20, bottom: 40, left: 60 }', description: 'Chart margins.' },
  { name: 'theme', type: 'DeepPartial<ChartTheme>', default: 'defaultTheme', description: 'Theme overrides.' },
  { name: 'colors', type: 'string[]', default: 'palette', description: 'Override the categorical palette.' },
  { name: 'animate', type: 'boolean', default: 'true', description: 'Show animations.' },
  { name: 'categoryLabelFormatter', type: '(label: string) => string', default: '—', description: 'Format category labels.' },
  { name: 'valueFormatter', type: '(value: number) => string', default: '—', description: 'Format numeric values.' },
  { name: 'onSegmentHover', type: '(seriesId: string | null) => void', default: '—', description: 'Callback on segment hover.' },
];

/** Prop reference keyed by chart id (matches registry ids). */
export const propDocs: Record<string, PropDoc[]> = {
  line: [...cartesianProps, ...lineExtra],
  area: [...cartesianProps, ...lineExtra],
  bar: [...cartesianProps, ...barExtra],
  scatter: [...cartesianProps, ...scatterExtra],
  bubble: [...cartesianProps, ...bubbleExtra],
  pie: pieProps,
  histogram: histogramProps,
  radar: radarProps,
  treemap: treemapProps,
  waterfall: waterfallProps,
  sankey: sankeyProps,
  mekko: mekkoProps,
};
