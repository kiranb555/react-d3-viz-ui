import type { ComponentType } from 'react';
import {
  LineChart,
  AreaChart,
  BarChart,
  ScatterPlot,
  BubbleChart,
  PieChart,
  Histogram,
  RadarChart,
  TreemapChart,
  WaterfallChart,
  MekkoChart,
  SankeyDiagram,
} from 'react-d3-viz';
import {
  months,
  weather,
  traffic,
  scatter,
  correlation,
  pie,
  marketShare,
  budget,
  histValues,
  incomes,
  radar,
  skills,
  treemapLanguages,
  treemapBrowsers,
  treemapTech,
  waterfallRevenueData,
  waterfallProjectData,
  mekkoSalesData,
  mekkoProductData,
  sankeySampleData,
  sankeySupplyData,
} from './data';
import type { Control } from './controls';

/** A named dataset for a chart — feeds the live chart and the code snippet. */
export interface Dataset {
  key: string;
  name: string;
  /** Data + accessor props merged straight into the chart component. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
  /** The `const data = …` lines shown above the JSX in a snippet. */
  dataCode: string;
  /** The data prop rendered verbatim, e.g. `data={data}` or `values={values}`. */
  dataAttr: string;
  /** Accessor props (x, value, series, …) serialized into the snippet. */
  accessors: Record<string, unknown>;
}

/** A preset variant shown on the Examples page and deep-linkable in the playground. */
export interface Example {
  title: string;
  description: string;
  /** Dataset to use; defaults to the chart's first dataset. */
  datasetKey?: string;
  /** Prop overrides applied on top of the chart defaults. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
}

export interface ChartDef {
  id: string;
  title: string;
  blurb: string;
  componentName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>;
  datasets: Dataset[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultProps: Record<string, any>;
  controls: Control[];
  examples: Example[];
}

// --- shared control fragments -------------------------------------------------
const heightCtrl: Control = { key: 'height', label: 'height', type: 'number', min: 160, max: 480, step: 20 };
const animateCtrl: Control = { key: 'animate', label: 'animate', type: 'boolean' };
const axisCtrls: Control[] = [
  { key: 'showGrid', label: 'showGrid', type: 'boolean' },
  { key: 'showXAxis', label: 'showXAxis', type: 'boolean' },
  { key: 'showYAxis', label: 'showYAxis', type: 'boolean' },
  { key: 'showTooltip', label: 'showTooltip', type: 'boolean' },
];
const legendCtrl: Control = { key: 'showLegend', label: 'showLegend', type: 'boolean' };
const cartesianDefaults = {
  showGrid: true,
  showXAxis: true,
  showYAxis: true,
  showTooltip: true,
  animate: true,
};

// --- series-shape datasets (line / area / bar) -------------------------------
const monthsCode = `const data = [
  { month: 'Jan', sales: 42, profit: 18 },
  { month: 'Feb', sales: 55, profit: 22 },
  // …5 more months
];`;
const weatherCode = `const data = [
  { month: 'Jan', temp: 4, rainfall: 78 },
  { month: 'Feb', temp: 6, rainfall: 62 },
  // …5 more months
];`;
const trafficCode = `const data = [
  { week: 'W1', visitors: 1200, signups: 180 },
  { week: 'W2', visitors: 1480, signups: 240 },
  // …4 more weeks
];`;

const monthsSeries = [{ dataKey: 'sales' }, { dataKey: 'profit' }];
const weatherSeries = [{ dataKey: 'temp' }, { dataKey: 'rainfall' }];
const trafficSeries = [{ dataKey: 'visitors' }, { dataKey: 'signups' }];

const seriesDatasets: Dataset[] = [
  {
    key: 'months',
    name: 'Monthly sales',
    props: { data: months, x: 'month', series: monthsSeries },
    dataCode: monthsCode,
    dataAttr: 'data={data}',
    accessors: { x: 'month', series: monthsSeries },
  },
  {
    key: 'weather',
    name: 'Weather',
    props: { data: weather, x: 'month', series: weatherSeries },
    dataCode: weatherCode,
    dataAttr: 'data={data}',
    accessors: { x: 'month', series: weatherSeries },
  },
  {
    key: 'traffic',
    name: 'Web traffic',
    props: { data: traffic, x: 'week', series: trafficSeries },
    dataCode: trafficCode,
    dataAttr: 'data={data}',
    accessors: { x: 'week', series: trafficSeries },
  },
];

// --- xy-shape datasets (scatter / bubble) ------------------------------------
const scatterCode = `const data = Array.from({ length: 60 }, () => ({
  x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 100 + 5,
}));`;
const correlationCode = `const data = Array.from({ length: 60 }, () => {
  const x = Math.random() * 100;
  return { x, y: x * 0.8 + (Math.random() - 0.5) * 35, size: Math.random() * 80 + 10 };
});`;

const scatterDatasets: Dataset[] = [
  {
    key: 'random',
    name: 'Random cloud',
    props: { data: scatter, x: 'x', y: 'y' },
    dataCode: scatterCode,
    dataAttr: 'data={data}',
    accessors: { x: 'x', y: 'y' },
  },
  {
    key: 'correlation',
    name: 'Correlated',
    props: { data: correlation, x: 'x', y: 'y' },
    dataCode: correlationCode,
    dataAttr: 'data={data}',
    accessors: { x: 'x', y: 'y' },
  },
];

const bubbleDatasets: Dataset[] = [
  {
    key: 'random',
    name: 'Random cloud',
    props: { data: scatter, x: 'x', y: 'y', size: 'size' },
    dataCode: scatterCode,
    dataAttr: 'data={data}',
    accessors: { x: 'x', y: 'y', size: 'size' },
  },
  {
    key: 'correlation',
    name: 'Correlated',
    props: { data: correlation, x: 'x', y: 'y', size: 'size' },
    dataCode: correlationCode,
    dataAttr: 'data={data}',
    accessors: { x: 'x', y: 'y', size: 'size' },
  },
];

// --- pie-shape datasets ------------------------------------------------------
const pieCode = `const data = [
  { label: 'JavaScript', value: 38.7 },
  { label: 'Python', value: 24.5 },
  // …4 more
];`;
const marketShareCode = `const data = [
  { label: 'Chrome', value: 63.4 },
  { label: 'Safari', value: 19.8 },
  // …3 more
];`;
const budgetCode = `const data = [
  { label: 'Engineering', value: 420 },
  { label: 'Sales', value: 280 },
  // …3 more
];`;

const pieDatasets: Dataset[] = [
  {
    key: 'languages',
    name: 'Languages',
    props: { data: pie, value: 'value', label: 'label' },
    dataCode: pieCode,
    dataAttr: 'data={data}',
    accessors: { value: 'value', label: 'label' },
  },
  {
    key: 'marketShare',
    name: 'Market share',
    props: { data: marketShare, value: 'value', label: 'label' },
    dataCode: marketShareCode,
    dataAttr: 'data={data}',
    accessors: { value: 'value', label: 'label' },
  },
  {
    key: 'budget',
    name: 'Budget',
    props: { data: budget, value: 'value', label: 'label' },
    dataCode: budgetCode,
    dataAttr: 'data={data}',
    accessors: { value: 'value', label: 'label' },
  },
];

// --- values-shape datasets (histogram) ---------------------------------------
const histCode = `// 500 ~normally-distributed values
const values = Array.from({ length: 500 }, () => /* … */ 0);`;
const incomesCode = `// 500 right-skewed values (incomes in $k)
const values = Array.from({ length: 500 }, () => /* … */ 0);`;

const histDatasets: Dataset[] = [
  {
    key: 'normal',
    name: 'Normal',
    props: { values: histValues },
    dataCode: histCode,
    dataAttr: 'values={values}',
    accessors: {},
  },
  {
    key: 'incomes',
    name: 'Incomes (skewed)',
    props: { values: incomes },
    dataCode: incomesCode,
    dataAttr: 'values={values}',
    accessors: {},
  },
];

// --- radar-shape datasets ----------------------------------------------------
const radarCode = `const data = [
  { axis: 'Speed', team: 80, rival: 60 },
  { axis: 'Power', team: 65, rival: 75 },
  // …4 more axes
];`;
const skillsCode = `const data = [
  { axis: 'React', frontend: 90, backend: 40 },
  { axis: 'CSS', frontend: 85, backend: 30 },
  // …4 more axes
];`;

const radarSeries = [{ dataKey: 'team' }, { dataKey: 'rival' }];
const skillsSeries = [{ dataKey: 'frontend' }, { dataKey: 'backend' }];

const radarDatasets: Dataset[] = [
  {
    key: 'matchup',
    name: 'Team vs rival',
    props: { data: radar, axis: 'axis', series: radarSeries },
    dataCode: radarCode,
    dataAttr: 'data={data}',
    accessors: { axis: 'axis', series: radarSeries },
  },
  {
    key: 'skills',
    name: 'Skills',
    props: { data: skills, axis: 'axis', series: skillsSeries },
    dataCode: skillsCode,
    dataAttr: 'data={data}',
    accessors: { axis: 'axis', series: skillsSeries },
  },
];

// --- treemap-shape datasets (flat / grouped / nested) ------------------------
const treemapFlatCode = `const data = [
  { name: 'JavaScript', value: 38.7 },
  { name: 'Python', value: 24.5 },
  // …4 more
];`;
const treemapGroupedCode = `const data = [
  { name: 'Chrome', platform: 'Desktop', share: 45 },
  { name: 'Safari Mobile', platform: 'Mobile', share: 25 },
  // …5 more, grouped by platform
];`;
const treemapNestedCode = `const data = {
  name: 'tech',
  children: [
    { name: 'Frontend', children: [{ name: 'React', value: 40 }, /* … */] },
    { name: 'Backend', children: [{ name: 'Node', value: 30 }, /* … */] },
    // …
  ],
};`;

const treemapDatasets: Dataset[] = [
  {
    key: 'flat',
    name: 'Languages (flat)',
    props: { data: treemapLanguages, value: 'value', label: 'name' },
    dataCode: treemapFlatCode,
    dataAttr: 'data={data}',
    accessors: { value: 'value', label: 'name' },
  },
  {
    key: 'grouped',
    name: 'Browsers (grouped)',
    props: { data: treemapBrowsers, value: 'share', label: 'name', group: 'platform' },
    dataCode: treemapGroupedCode,
    dataAttr: 'data={data}',
    accessors: { value: 'share', label: 'name', group: 'platform' },
  },
  {
    key: 'nested',
    name: 'Tech (nested)',
    props: { data: treemapTech, value: 'value', label: 'name', childrenKey: 'children' },
    dataCode: treemapNestedCode,
    dataAttr: 'data={data}',
    accessors: { value: 'value', label: 'name', childrenKey: 'children' },
  },
];

// --- waterfall-shape datasets (cumulative + negatives) -------------------------
const waterfallRevenueCode = `const data = [
  { label: 'Starting Revenue', value: 420 },
  { label: 'Product Sales', value: 220 },
  { label: 'Service Revenue', value: 150 },
  { label: 'Operating Costs', value: -180 },
  { label: 'Marketing', value: -80 },
  { label: 'Net Income', value: 530, isTotal: true },
];`;
const waterfallProjectCode = `const data = [
  { label: 'Q1', value: 100 },
  { label: 'Q2', value: 150 },
  { label: 'Q3', value: -50 },
  { label: 'Q4', value: 200 },
  { label: 'Year Total', value: 400, isTotal: true },
];`;

const waterfallDatasets: Dataset[] = [
  {
    key: 'revenue',
    name: 'Revenue flow',
    props: { data: waterfallRevenueData },
    dataCode: waterfallRevenueCode,
    dataAttr: 'data={data}',
    accessors: {},
  },
  {
    key: 'quarterly',
    name: 'Quarterly results',
    props: { data: waterfallProjectData },
    dataCode: waterfallProjectCode,
    dataAttr: 'data={data}',
    accessors: {},
  },
];

// --- mekko-shape datasets (categories + stacked series) -------------------------
const mekkoSalesCode = `const data = {
  categories: [
    { label: 'North America', value: 320 },
    { label: 'Europe', value: 280 },
    { label: 'Asia', value: 420 },
  ],
  series: [
    { id: 'online', label: 'Online', data: [
      { categoryId: 'northAmerica', value: 200 },
      /* … */
    ]},
    /* … */
  ],
};`;
const mekkoProductCode = `const data = {
  categories: [
    { label: 'Starter', value: 200 },
    { label: 'Pro', value: 350 },
    { label: 'Enterprise', value: 450 },
  ],
  series: [
    { id: 'features', label: 'Features', data: [
      { categoryId: 'starter', value: 80 },
      /* … */
    ]},
    /* … */
  ],
};`;

const mekkoDatasets: Dataset[] = [
  {
    key: 'sales',
    name: 'Sales by region',
    props: { data: mekkoSalesData },
    dataCode: mekkoSalesCode,
    dataAttr: 'data={data}',
    accessors: {},
  },
  {
    key: 'product',
    name: 'Product pricing',
    props: { data: mekkoProductData },
    dataCode: mekkoProductCode,
    dataAttr: 'data={data}',
    accessors: {},
  },
];

// --- sankey-shape datasets (nodes + links) -------------------------------------
const sankeySampleCode = `const data = {
  nodes: [
    { id: 'browser', label: 'Browser' },
    { id: 'chrome', label: 'Chrome' },
    /* … */
  ],
  links: [
    { source: 'browser', target: 'chrome', value: 500 },
    /* … */
  ],
};`;
const sankeySupplyCode = `const data = {
  nodes: [
    { id: 'supplier1', label: 'Supplier A' },
    { id: 'warehouse', label: 'Warehouse' },
    /* … */
  ],
  links: [
    { source: 'supplier1', target: 'warehouse', value: 600 },
    /* … */
  ],
};`;

const sankeyDatasets: Dataset[] = [
  {
    key: 'browser',
    name: 'Browser & OS flow',
    props: { data: sankeySampleData },
    dataCode: sankeySampleCode,
    dataAttr: 'data={data}',
    accessors: {},
  },
  {
    key: 'supply',
    name: 'Supply chain',
    props: { data: sankeySupplyData },
    dataCode: sankeySupplyCode,
    dataAttr: 'data={data}',
    accessors: {},
  },
];

export const charts: ChartDef[] = [
  {
    id: 'line',
    title: 'Line',
    blurb: 'Multi-series line chart with optional points and curve interpolation.',
    componentName: 'LineChart',
    Component: LineChart,
    datasets: seriesDatasets,
    defaultProps: { height: 280, showPoints: true, curve: 'monotone', showLegend: true, ...cartesianDefaults },
    controls: [
      heightCtrl,
      { key: 'showPoints', label: 'showPoints', type: 'boolean' },
      { key: 'curve', label: 'curve', type: 'select', options: ['monotone', 'linear', 'step', 'catmullRom'] },
      ...axisCtrls,
      legendCtrl,
      animateCtrl,
    ],
    examples: [
      { title: 'Smooth multi-series', description: 'Two series with monotone curves and points.', props: { curve: 'monotone', showPoints: true } },
      { title: 'Stepped', description: 'Step interpolation for discrete, stair-like changes.', props: { curve: 'step', showPoints: false } },
      { title: 'Dashed comparison', description: 'A dashed second series via series[].dashArray.', props: { series: [{ dataKey: 'sales' }, { dataKey: 'profit', dashArray: '6 4' }], showPoints: false } },
      { title: 'Single series', description: 'One line against weekly traffic, no legend.', datasetKey: 'traffic', props: { series: [{ dataKey: 'visitors' }], showLegend: false } },
    ],
  },
  {
    id: 'area',
    title: 'Area',
    blurb: 'Line chart with the region beneath each series filled.',
    componentName: 'AreaChart',
    Component: AreaChart,
    datasets: seriesDatasets,
    defaultProps: { height: 280, showLegend: true, ...cartesianDefaults },
    controls: [heightCtrl, ...axisCtrls, legendCtrl, animateCtrl],
    examples: [
      { title: 'Multi-series fill', description: 'Two overlaid filled regions.', props: {} },
      { title: 'Single series + points', description: 'One area for temperature, with dots.', datasetKey: 'weather', props: { series: [{ dataKey: 'temp' }], showPoints: true, showLegend: false } },
    ],
  },
  {
    id: 'bar',
    title: 'Bar',
    blurb: 'Grouped or stacked bars across categories.',
    componentName: 'BarChart',
    Component: BarChart,
    datasets: seriesDatasets,
    defaultProps: { height: 280, stacked: false, radius: 2, showLegend: true, ...cartesianDefaults },
    controls: [
      heightCtrl,
      { key: 'stacked', label: 'stacked', type: 'boolean' },
      { key: 'radius', label: 'radius', type: 'number', min: 0, max: 12, step: 1 },
      ...axisCtrls,
      legendCtrl,
      animateCtrl,
    ],
    examples: [
      { title: 'Grouped', description: 'Side-by-side bars per category.', props: { stacked: false } },
      { title: 'Stacked', description: 'Series stacked on top of each other.', props: { stacked: true } },
      { title: 'Rounded', description: 'Softer bars via a larger corner radius.', props: { radius: 8 } },
      { title: 'Single series', description: 'Just sales, no legend.', props: { series: [{ dataKey: 'sales' }], showLegend: false } },
    ],
  },
  {
    id: 'scatter',
    title: 'Scatter',
    blurb: 'Points on numeric x/y axes.',
    componentName: 'ScatterPlot',
    Component: ScatterPlot,
    datasets: scatterDatasets,
    defaultProps: { height: 300, pointRadius: 4, showLegend: false, ...cartesianDefaults },
    controls: [
      heightCtrl,
      { key: 'pointRadius', label: 'pointRadius', type: 'number', min: 2, max: 10, step: 1 },
      ...axisCtrls,
      animateCtrl,
    ],
    examples: [
      { title: 'Random cloud', description: 'Uniform noise across the plane.', props: {} },
      { title: 'Correlated', description: 'A clear positive trend in the data.', datasetKey: 'correlation', props: {} },
      { title: 'Large points', description: 'Bigger dots for sparse data.', datasetKey: 'correlation', props: { pointRadius: 7 } },
    ],
  },
  {
    id: 'bubble',
    title: 'Bubble',
    blurb: 'Scatter with a third dimension encoded as bubble area.',
    componentName: 'BubbleChart',
    Component: BubbleChart,
    datasets: bubbleDatasets,
    defaultProps: { height: 300, showLegend: false, ...cartesianDefaults },
    controls: [heightCtrl, ...axisCtrls, animateCtrl],
    examples: [
      { title: 'Default range', description: 'Bubble area encodes size.', props: {} },
      { title: 'Correlated', description: 'Size on a trending cloud.', datasetKey: 'correlation', props: {} },
      { title: 'Wider radius range', description: 'Exaggerated bubble sizes.', props: { radiusRange: [6, 40] } },
    ],
  },
  {
    id: 'pie',
    title: 'Pie / Donut',
    blurb: 'Pie chart; set innerRadius for a donut.',
    componentName: 'PieChart',
    Component: PieChart,
    datasets: pieDatasets,
    defaultProps: { height: 340, innerRadius: 0, padAngle: 0.01, cornerRadius: 2, showLabels: true, showLegend: true, animate: true },
    controls: [
      heightCtrl,
      { key: 'innerRadius', label: 'innerRadius (donut)', type: 'number', min: 0, max: 0.9, step: 0.05 },
      { key: 'padAngle', label: 'padAngle', type: 'number', min: 0, max: 0.1, step: 0.01 },
      { key: 'cornerRadius', label: 'cornerRadius', type: 'number', min: 0, max: 12, step: 1 },
      { key: 'showLabels', label: 'showLabels', type: 'boolean' },
      legendCtrl,
      animateCtrl,
    ],
    examples: [
      { title: 'Pie', description: 'Classic full pie with labels.', props: { innerRadius: 0 } },
      { title: 'Donut', description: 'Hollow centre via innerRadius.', props: { innerRadius: 0.6 } },
      { title: 'Gapped donut', description: 'Padded, rounded slices.', props: { innerRadius: 0.6, padAngle: 0.03, cornerRadius: 6 } },
      { title: 'Market share', description: 'A different dataset as a donut.', datasetKey: 'marketShare', props: { innerRadius: 0.5 } },
    ],
  },
  {
    id: 'histogram',
    title: 'Histogram',
    blurb: 'Bins a set of numeric values and renders the counts.',
    componentName: 'Histogram',
    Component: Histogram,
    datasets: histDatasets,
    defaultProps: { height: 280, bins: 20, showGrid: true, showXAxis: true, showYAxis: true, showTooltip: true, animate: true },
    controls: [
      heightCtrl,
      { key: 'bins', label: 'bins', type: 'number', min: 4, max: 40, step: 1 },
      ...axisCtrls,
      animateCtrl,
    ],
    examples: [
      { title: 'Few bins', description: 'Coarse buckets for a broad view.', props: { bins: 8 } },
      { title: 'Many bins', description: 'Fine-grained distribution.', props: { bins: 32 } },
      { title: 'Skewed incomes', description: 'A right-skewed dataset.', datasetKey: 'incomes', props: { bins: 24 } },
    ],
  },
  {
    id: 'radar',
    title: 'Radar',
    blurb: 'Polygon per series across a set of axes.',
    componentName: 'RadarChart',
    Component: RadarChart,
    datasets: radarDatasets,
    defaultProps: { height: 360, levels: 4, fillOpacity: 0.2, showAxisLabels: true, showLegend: true, animate: true },
    controls: [
      heightCtrl,
      { key: 'levels', label: 'levels', type: 'number', min: 2, max: 6, step: 1 },
      { key: 'fillOpacity', label: 'fillOpacity', type: 'number', min: 0, max: 0.6, step: 0.05 },
      { key: 'showAxisLabels', label: 'showAxisLabels', type: 'boolean' },
      legendCtrl,
      animateCtrl,
    ],
    examples: [
      { title: 'Team vs rival', description: 'Two polygons across six axes.', props: {} },
      { title: 'Skills profile', description: 'Frontend vs backend strengths.', datasetKey: 'skills', props: {} },
      { title: 'More rings', description: 'Six grid levels for finer reading.', props: { levels: 6 } },
    ],
  },
  {
    id: 'treemap',
    title: 'Treemap',
    blurb: 'Nested rectangles sized by value — flat, grouped, or a full hierarchy.',
    componentName: 'TreemapChart',
    Component: TreemapChart,
    datasets: treemapDatasets,
    defaultProps: { height: 340, padding: 1, showLabels: true, showValues: true, showLegend: true, showTooltip: true, animate: true },
    controls: [
      heightCtrl,
      { key: 'padding', label: 'padding', type: 'number', min: 0, max: 8, step: 1 },
      { key: 'showLabels', label: 'showLabels', type: 'boolean' },
      { key: 'showValues', label: 'showValues', type: 'boolean' },
      { key: 'showTooltip', label: 'showTooltip', type: 'boolean' },
      legendCtrl,
      animateCtrl,
    ],
    examples: [
      { title: 'Flat', description: 'One rectangle per record, sized by value.', datasetKey: 'flat', props: {} },
      { title: 'Grouped', description: 'Two-level treemap colored by group, with header bands.', datasetKey: 'grouped', props: {} },
      { title: 'Nested hierarchy', description: 'A deep hierarchy; leaves colored by their top-level branch (flare style).', datasetKey: 'nested', props: {} },
      { title: 'No labels', description: 'Hide cell labels for a pure heatmap look.', datasetKey: 'nested', props: { showLabels: false } },
    ],
  },
  {
    id: 'waterfall',
    title: 'Waterfall',
    blurb: 'Shows cumulative effect of sequential positive and negative values with connectors.',
    componentName: 'WaterfallChart',
    Component: WaterfallChart,
    datasets: waterfallDatasets,
    defaultProps: { height: 320, animate: true },
    controls: [
      heightCtrl,
      animateCtrl,
    ],
    examples: [
      { title: 'Revenue flow', description: 'Income statement from starting revenue to net income.', datasetKey: 'revenue', props: {} },
      { title: 'Quarterly results', description: 'Year-on-year quarterly performance with total.', datasetKey: 'quarterly', props: {} },
    ],
  },
  {
    id: 'mekko',
    title: 'Mekko',
    blurb: 'Categories as columns with width proportional to their values, series stacked within.',
    componentName: 'MekkoChart',
    Component: MekkoChart,
    datasets: mekkoDatasets,
    defaultProps: { height: 320, animate: true },
    controls: [
      heightCtrl,
      animateCtrl,
    ],
    examples: [
      { title: 'Sales by region', description: 'Online vs retail across three regions.', datasetKey: 'sales', props: {} },
      { title: 'Product pricing', description: 'Three pricing tiers with feature breakdown.', datasetKey: 'product', props: {} },
    ],
  },
  {
    id: 'sankey',
    title: 'Sankey',
    blurb: 'Flow diagram showing connections between nodes with proportional link widths.',
    componentName: 'SankeyDiagram',
    Component: SankeyDiagram,
    datasets: sankeyDatasets,
    defaultProps: { height: 400, animate: true },
    controls: [
      heightCtrl,
      animateCtrl,
    ],
    examples: [
      { title: 'Browser & OS flow', description: 'User distribution across browsers and operating systems.', datasetKey: 'browser', props: {} },
      { title: 'Supply chain', description: 'Product flow from suppliers through warehouse to customers.', datasetKey: 'supply', props: {} },
    ],
  },
];

export const chartById = (id: string) => charts.find((c) => c.id === id);

/** Resolve a dataset by key, falling back to the chart's first (default) dataset. */
export const datasetByKey = (def: ChartDef, key?: string): Dataset =>
  def.datasets.find((d) => d.key === key) ?? def.datasets[0];
