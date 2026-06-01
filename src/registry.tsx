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
} from 'react-d3-viz';
import { months, scatter, pie, histValues, radar } from './data';
import type { Control } from './controls';
import type { SnippetSpec } from './snippet';

export interface ChartDef {
  id: string;
  title: string;
  blurb: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fixedProps: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultProps: Record<string, any>;
  controls: Control[];
  snippet: SnippetSpec;
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

// --- snippet data blocks ------------------------------------------------------
const monthsCode = `const data = [
  { month: 'Jan', sales: 42, profit: 18 },
  { month: 'Feb', sales: 55, profit: 22 },
  // …5 more months
];`;
const scatterCode = `const data = Array.from({ length: 60 }, () => ({
  x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 100 + 5,
}));`;
const pieCode = `const data = [
  { label: 'JavaScript', value: 38.7 },
  { label: 'Python', value: 24.5 },
  // …4 more
];`;
const histCode = `// 500 ~normally-distributed values
const values = Array.from({ length: 500 }, () => /* … */ 0);`;
const radarCode = `const data = [
  { axis: 'Speed', team: 80, rival: 60 },
  { axis: 'Power', team: 65, rival: 75 },
  // …4 more axes
];`;

const lineSeries = [{ dataKey: 'sales' }, { dataKey: 'profit' }];

export const charts: ChartDef[] = [
  {
    id: 'line',
    title: 'Line',
    blurb: 'Multi-series line chart with optional points and curve interpolation.',
    Component: LineChart,
    fixedProps: { data: months, x: 'month', series: lineSeries },
    defaultProps: { height: 280, showPoints: true, curve: 'monotone', showLegend: true, ...cartesianDefaults },
    controls: [
      heightCtrl,
      { key: 'showPoints', label: 'showPoints', type: 'boolean' },
      { key: 'curve', label: 'curve', type: 'select', options: ['monotone', 'linear', 'step', 'catmullRom'] },
      ...axisCtrls,
      legendCtrl,
      animateCtrl,
    ],
    snippet: { componentName: 'LineChart', dataCode: monthsCode, dataAttr: 'data={data}', accessors: { x: 'month', series: lineSeries } },
  },
  {
    id: 'area',
    title: 'Area',
    blurb: 'Line chart with the region beneath each series filled.',
    Component: AreaChart,
    fixedProps: { data: months, x: 'month', series: lineSeries },
    defaultProps: { height: 280, showLegend: true, ...cartesianDefaults },
    controls: [heightCtrl, ...axisCtrls, legendCtrl, animateCtrl],
    snippet: { componentName: 'AreaChart', dataCode: monthsCode, dataAttr: 'data={data}', accessors: { x: 'month', series: lineSeries } },
  },
  {
    id: 'bar',
    title: 'Bar',
    blurb: 'Grouped or stacked bars across categories.',
    Component: BarChart,
    fixedProps: { data: months, x: 'month', series: lineSeries },
    defaultProps: { height: 280, stacked: false, radius: 2, showLegend: true, ...cartesianDefaults },
    controls: [
      heightCtrl,
      { key: 'stacked', label: 'stacked', type: 'boolean' },
      { key: 'radius', label: 'radius', type: 'number', min: 0, max: 12, step: 1 },
      ...axisCtrls,
      legendCtrl,
      animateCtrl,
    ],
    snippet: { componentName: 'BarChart', dataCode: monthsCode, dataAttr: 'data={data}', accessors: { x: 'month', series: lineSeries } },
  },
  {
    id: 'scatter',
    title: 'Scatter',
    blurb: 'Points on numeric x/y axes.',
    Component: ScatterPlot,
    fixedProps: { data: scatter, x: 'x', y: 'y' },
    defaultProps: { height: 300, pointRadius: 4, showLegend: false, ...cartesianDefaults },
    controls: [
      heightCtrl,
      { key: 'pointRadius', label: 'pointRadius', type: 'number', min: 2, max: 10, step: 1 },
      ...axisCtrls,
      animateCtrl,
    ],
    snippet: { componentName: 'ScatterPlot', dataCode: scatterCode, dataAttr: 'data={data}', accessors: { x: 'x', y: 'y' } },
  },
  {
    id: 'bubble',
    title: 'Bubble',
    blurb: 'Scatter with a third dimension encoded as bubble area.',
    Component: BubbleChart,
    fixedProps: { data: scatter, x: 'x', y: 'y', size: 'size' },
    defaultProps: { height: 300, showLegend: false, ...cartesianDefaults },
    controls: [heightCtrl, ...axisCtrls, animateCtrl],
    snippet: { componentName: 'BubbleChart', dataCode: scatterCode, dataAttr: 'data={data}', accessors: { x: 'x', y: 'y', size: 'size' } },
  },
  {
    id: 'pie',
    title: 'Pie / Donut',
    blurb: 'Pie chart; set innerRadius for a donut.',
    Component: PieChart,
    fixedProps: { data: pie, value: 'value', label: 'label' },
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
    snippet: { componentName: 'PieChart', dataCode: pieCode, dataAttr: 'data={data}', accessors: { value: 'value', label: 'label' } },
  },
  {
    id: 'histogram',
    title: 'Histogram',
    blurb: 'Bins a set of numeric values and renders the counts.',
    Component: Histogram,
    fixedProps: { values: histValues },
    defaultProps: { height: 280, bins: 20, showGrid: true, showXAxis: true, showYAxis: true, showTooltip: true, animate: true },
    controls: [
      heightCtrl,
      { key: 'bins', label: 'bins', type: 'number', min: 4, max: 40, step: 1 },
      ...axisCtrls,
      animateCtrl,
    ],
    snippet: { componentName: 'Histogram', dataCode: histCode, dataAttr: 'values={values}', accessors: {} },
  },
  {
    id: 'radar',
    title: 'Radar',
    blurb: 'Polygon per series across a set of axes.',
    Component: RadarChart,
    fixedProps: { data: radar, axis: 'axis', series: [{ dataKey: 'team' }, { dataKey: 'rival' }] },
    defaultProps: { height: 360, levels: 4, fillOpacity: 0.2, showAxisLabels: true, showLegend: true, animate: true },
    controls: [
      heightCtrl,
      { key: 'levels', label: 'levels', type: 'number', min: 2, max: 6, step: 1 },
      { key: 'fillOpacity', label: 'fillOpacity', type: 'number', min: 0, max: 0.6, step: 0.05 },
      { key: 'showAxisLabels', label: 'showAxisLabels', type: 'boolean' },
      legendCtrl,
      animateCtrl,
    ],
    snippet: {
      componentName: 'RadarChart',
      dataCode: radarCode,
      dataAttr: 'data={data}',
      accessors: { axis: 'axis', series: [{ dataKey: 'team' }, { dataKey: 'rival' }] },
    },
  },
];

export const chartById = (id: string) => charts.find((c) => c.id === id);
