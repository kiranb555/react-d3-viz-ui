# Adding 4 New Charts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add ButterflyChart, HeatmapChart, SunburstChart, and QuadrantChart to the react-d3-viz-ui with complete examples, documentation, and playground support.

**Architecture:** Each chart is added sequentially in the same pattern: (1) realistic sample datasets in `data.ts`, (2) ChartDef entry in `registry.tsx` with datasets, default props, controls, and examples, (3) PropDoc reference in `propDocs.ts`. This auto-flows to Examples, Docs, and Playground views.

**Tech Stack:** React, TypeScript, react-d3-viz v1.2.3, existing registry/control system

---

## File Structure

**Modified Files:**
- `src/data.ts` — Add 6 new dataset exports (2–3 per chart)
- `src/registry.tsx` — Add 4 new ChartDef entries (one per chart)
- `src/propDocs.ts` — Add 4 new PropDoc arrays (one per chart)

Each chart is independent; no other files change.

---

## Chart 1: ButterflyChart

### Task 1: Add ButterflyChart Datasets

**Files:**
- Modify: `src/data.ts` (append at end)

- [ ] **Step 1: Add population pyramid data**

Append this to `src/data.ts`:

```typescript
// ButterflyChart data
export const butterflyPopulation = [
  { ageGroup: '0-10', male: 45, female: 42 },
  { ageGroup: '10-20', male: 52, female: 50 },
  { ageGroup: '20-30', male: 58, female: 61 },
  { ageGroup: '30-40', male: 55, female: 57 },
  { ageGroup: '40-50', male: 48, female: 50 },
  { ageGroup: '50-60', male: 40, female: 42 },
  { ageGroup: '60-70', male: 28, female: 32 },
  { ageGroup: '70-80', male: 15, female: 18 },
  { ageGroup: '80+', male: 8, female: 12 },
];

export const butterflyDepartment = [
  { department: 'Engineering', male: 28, female: 12 },
  { department: 'Product', male: 8, female: 10 },
  { department: 'Design', male: 6, female: 9 },
  { department: 'Sales', male: 15, female: 18 },
  { department: 'Marketing', male: 5, female: 8 },
  { department: 'HR', male: 3, female: 7 },
];
```

- [ ] **Step 2: Verify data.ts syntax**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

---

### Task 2: Add ButterflyChart to Registry

**Files:**
- Modify: `src/registry.tsx`

- [ ] **Step 1: Add ButterflyChart import at top**

At the top of `src/registry.tsx`, add to the existing import from 'react-d3-viz':

```typescript
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
  SankeyDiagram,
  MekkoChart,
  ButterflyChart,  // ADD THIS LINE
} from 'react-d3-viz';
```

- [ ] **Step 2: Add ButterflyChart data imports**

In the existing import from './data', add:

```typescript
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
  waterfallRevenue,
  waterfallQuarters,
  sankeyBasic,
  sankeyComplex,
  mekkoBasic,
  mekkoMarket,
  butterflyPopulation,  // ADD THIS LINE
  butterflyDepartment,  // ADD THIS LINE
} from './data';
```

- [ ] **Step 3: Add ButterflyChart datasets**

Before the `export const charts: ChartDef[]` line, add:

```typescript
// --- butterfly datasets -------------------------------------------------------
const butterflyPopulationCode = `const data = [
  { ageGroup: '0-10', male: 45, female: 42 },
  { ageGroup: '10-20', male: 52, female: 50 },
  // …7 more age groups
];`;

const butterflyDepartmentCode = `const data = [
  { department: 'Engineering', male: 28, female: 12 },
  { department: 'Product', male: 8, female: 10 },
  // …4 more departments
];`;

const butterflyDatasets: Dataset[] = [
  {
    key: 'population',
    name: 'Population pyramid',
    props: { data: butterflyPopulation, x: 'ageGroup', left: 'male', right: 'female' },
    dataCode: butterflyPopulationCode,
    dataAttr: 'data={data}',
    accessors: { x: 'ageGroup', left: 'male', right: 'female' },
  },
  {
    key: 'department',
    name: 'Department gender',
    props: { data: butterflyDepartment, x: 'department', left: 'male', right: 'female' },
    dataCode: butterflyDepartmentCode,
    dataAttr: 'data={data}',
    accessors: { x: 'department', left: 'male', right: 'female' },
  },
];
```

- [ ] **Step 4: Add ButterflyChart ChartDef**

At the end of the `charts` array (before the closing bracket), add:

```typescript
  {
    id: 'butterfly',
    title: 'Butterfly',
    blurb: 'Back-to-back bar chart, ideal for comparing two opposing series across categories.',
    componentName: 'ButterflyChart',
    Component: ButterflyChart,
    datasets: butterflyDatasets,
    defaultProps: { height: 320, animate: true, showLegend: true },
    controls: [
      heightCtrl,
      animateCtrl,
      legendCtrl,
    ],
    examples: [
      { title: 'Age pyramid', description: 'Population distribution by age and gender.', datasetKey: 'population', props: {} },
      { title: 'Department gender', description: 'Staffing breakdown by department.', datasetKey: 'department', props: {} },
      { title: 'Custom left/right labels', description: 'Override default Male/Female labels.', datasetKey: 'population', props: { leftLabel: 'Men', rightLabel: 'Women' } },
    ],
  },
```

- [ ] **Step 5: Verify registry.tsx syntax**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

---

### Task 3: Add ButterflyChart Prop Docs

**Files:**
- Modify: `src/propDocs.ts`

- [ ] **Step 1: Add ButterflyChart prop documentation**

At the end of `src/propDocs.ts`, before the final `propDocs` object, add:

```typescript
const butterflyProps: PropDoc[] = [
  { name: 'data', type: 'Datum[]', default: '—', description: 'Array of records, one per category. Required.' },
  { name: 'x', type: 'string | (d) => unknown', default: '—', description: 'Category accessor (age group, department, etc.). Required.' },
  { name: 'left', type: 'string | (d) => number', default: '—', description: 'Left-side series numeric value (e.g., male count). Required.' },
  { name: 'right', type: 'string | (d) => number', default: '—', description: 'Right-side series numeric value (e.g., female count). Required.' },
  { name: 'leftLabel', type: 'string', default: 'Left', description: 'Label for the left series (shown in legend and axis).' },
  { name: 'rightLabel', type: 'string', default: 'Right', description: 'Label for the right series (shown in legend and axis).' },
  { name: 'height', type: 'number', default: '300', description: 'Pixel height of the chart.' },
  { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show the interactive legend.' },
  { name: 'animate', type: 'boolean', default: 'true', description: 'Enable enter animation.' },
  { name: 'theme', type: 'DeepPartial<ChartTheme>', default: 'defaultTheme', description: 'Theme overrides (colors, fonts, etc.).' },
];
```

- [ ] **Step 2: Register ButterflyChart in propDocs object**

Find the line `export const propDocs: Record<string, PropDoc[]> = {` and add a `butterfly` entry:

```typescript
export const propDocs: Record<string, PropDoc[]> = {
  // ... existing entries ...
  butterfly: butterflyProps,
};
```

- [ ] **Step 3: Verify propDocs.ts syntax**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

---

### Task 4: Test ButterflyChart in Dev Server

**Files:**
- No code changes (testing only)

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Expected: Output shows "VITE v8.x.x ready in XXXms" (server running on http://localhost:5173)

- [ ] **Step 2: Verify Examples page renders ButterflyChart**

1. Open http://localhost:5173 in browser
2. Click **Examples** tab
3. Scroll down to find "Butterfly" section
4. Verify 3 example cards appear: "Age pyramid", "Department gender", "Custom left/right labels"
5. Each card should display a butterfly chart with no rendering errors

Expected: All 3 charts visible with correct data

- [ ] **Step 3: Verify Docs page has ButterflyChart props**

1. Click **Docs** tab
2. Scroll down to find "Butterfly" section
3. Verify props table appears with columns: Prop, Type, Default, Description
4. Verify all 10 props listed (data, x, left, right, leftLabel, rightLabel, height, showLegend, animate, theme)

Expected: Complete props table visible

- [ ] **Step 4: Test Playground interactive controls**

1. Click **Playground** tab
2. In the "Chart" dropdown, select "Butterfly"
3. Verify the default example renders
4. Toggle "animate" control → chart should update immediately
5. Increase "height" slider → chart should resize
6. Copy code snippet → verify JSX syntax is correct

Expected: All controls responsive, snippet valid

- [ ] **Step 5: Commit ButterflyChart**

```bash
git add src/data.ts src/registry.tsx src/propDocs.ts
git commit -m "feat: add ButterflyChart with examples and documentation"
```

Expected: Commit successful

---

## Chart 2: HeatmapChart

### Task 5: Add HeatmapChart Datasets

**Files:**
- Modify: `src/data.ts` (append at end)

- [ ] **Step 1: Add heatmap data**

Append this to `src/data.ts`:

```typescript
// HeatmapChart data
export const heatmapSales = [
  { product: 'Laptop', 'North America': 450, 'Europe': 320, 'Asia': 280, 'LATAM': 180 },
  { product: 'Phone', 'North America': 520, 'Europe': 480, 'Asia': 650, 'LATAM': 220 },
  { product: 'Tablet', 'North America': 280, 'Europe': 290, 'Asia': 410, 'LATAM': 150 },
  { product: 'Wearable', 'North America': 180, 'Europe': 200, 'Asia': 350, 'LATAM': 100 },
  { product: 'Software', 'North America': 720, 'Europe': 680, 'Asia': 450, 'LATAM': 300 },
];

export const heatmapUtilization = [
  { team: 'Team A', Mon: 85, Tue: 92, Wed: 78, Thu: 88, Fri: 95 },
  { team: 'Team B', Mon: 70, Tue: 75, Wed: 82, Thu: 80, Fri: 73 },
  { team: 'Team C', Mon: 92, Tue: 88, Wed: 95, Thu: 90, Fri: 85 },
  { team: 'Team D', Mon: 60, Tue: 65, Wed: 68, Thu: 72, Fri: 75 },
];
```

- [ ] **Step 2: Verify data.ts syntax**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

---

### Task 6: Add HeatmapChart to Registry

**Files:**
- Modify: `src/registry.tsx`

- [ ] **Step 1: Add HeatmapChart import**

In the import from 'react-d3-viz', add:

```typescript
import {
  // ... existing imports ...
  ButterflyChart,
  HeatmapChart,  // ADD THIS LINE
} from 'react-d3-viz';
```

- [ ] **Step 2: Add HeatmapChart data imports**

In the import from './data', add:

```typescript
import {
  // ... existing imports ...
  butterflyPopulation,
  butterflyDepartment,
  heatmapSales,       // ADD THIS LINE
  heatmapUtilization, // ADD THIS LINE
} from './data';
```

- [ ] **Step 3: Add HeatmapChart datasets**

Before `export const charts: ChartDef[]`, add:

```typescript
// --- heatmap datasets --------------------------------------------------------
const heatmapSalesCode = `const data = [
  { product: 'Laptop', 'North America': 450, 'Europe': 320, … },
  { product: 'Phone', 'North America': 520, 'Europe': 480, … },
  // …3 more products
];`;

const heatmapUtilizationCode = `const data = [
  { team: 'Team A', Mon: 85, Tue: 92, Wed: 78, … },
  { team: 'Team B', Mon: 70, Tue: 75, Wed: 82, … },
  // …2 more teams
];`;

const heatmapDatasets: Dataset[] = [
  {
    key: 'sales',
    name: 'Regional sales',
    props: { data: heatmapSales, x: 'product', y: (d: Record<string, unknown>) => Object.keys(d).filter(k => k !== 'product') as string[], value: (d: Record<string, unknown>, region: string) => d[region] },
    dataCode: heatmapSalesCode,
    dataAttr: 'data={data}',
    accessors: {},
  },
  {
    key: 'utilization',
    name: 'Team utilization',
    props: { data: heatmapUtilization, x: 'team', y: (d: Record<string, unknown>) => Object.keys(d).filter(k => k !== 'team') as string[], value: (d: Record<string, unknown>, day: string) => d[day] },
    dataCode: heatmapUtilizationCode,
    dataAttr: 'data={data}',
    accessors: {},
  },
];
```

- [ ] **Step 4: Add HeatmapChart ChartDef**

At the end of the `charts` array, add:

```typescript
  {
    id: 'heatmap',
    title: 'Heatmap',
    blurb: 'Color-coded grid showing relationships across two dimensions.',
    componentName: 'HeatmapChart',
    Component: HeatmapChart,
    datasets: heatmapDatasets,
    defaultProps: { height: 320, cellPadding: 2, animate: true, showLegend: true },
    controls: [
      heightCtrl,
      { key: 'cellPadding', label: 'cellPadding', type: 'number', min: 0, max: 8, step: 1 },
      animateCtrl,
      legendCtrl,
    ],
    examples: [
      { title: 'Sales by region', description: 'Product revenue across North America, Europe, Asia, and LATAM.', datasetKey: 'sales', props: {} },
      { title: 'Team utilization', description: 'Daily team utilization percentages (warm = busy).', datasetKey: 'utilization', props: {} },
      { title: 'Dense cells', description: 'Minimal padding for a compact grid.', datasetKey: 'sales', props: { cellPadding: 0 } },
    ],
  },
```

- [ ] **Step 5: Verify registry.tsx syntax**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

---

### Task 7: Add HeatmapChart Prop Docs

**Files:**
- Modify: `src/propDocs.ts`

- [ ] **Step 1: Add HeatmapChart prop documentation**

Before the `propDocs` export, add:

```typescript
const heatmapProps: PropDoc[] = [
  { name: 'data', type: 'Datum[]', default: '—', description: 'Array of records. Required.' },
  { name: 'x', type: 'string | (d) => unknown', default: '—', description: 'Row category accessor (product, team, etc.). Required.' },
  { name: 'y', type: 'string[] | (d) => string[]', default: '—', description: 'Column category accessor or array of column names. Required.' },
  { name: 'value', type: '(d, col) => number', default: '—', description: 'Function extracting the numeric value for a cell. Required.' },
  { name: 'cellPadding', type: 'number', default: '2', description: 'Pixel gap between cells.' },
  { name: 'colorScale', type: 'string | (val) => string', default: 'sequential', description: 'Color scale (sequential, diverging, or custom function).' },
  { name: 'height', type: 'number', default: '300', description: 'Pixel height of the chart.' },
  { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show the color scale legend.' },
  { name: 'animate', type: 'boolean', default: 'true', description: 'Enable enter animation.' },
  { name: 'theme', type: 'DeepPartial<ChartTheme>', default: 'defaultTheme', description: 'Theme overrides.' },
];
```

- [ ] **Step 2: Register HeatmapChart in propDocs**

In the `propDocs` object, add:

```typescript
export const propDocs: Record<string, PropDoc[]> = {
  // ... existing entries ...
  heatmap: heatmapProps,
};
```

- [ ] **Step 3: Verify propDocs.ts syntax**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

---

### Task 8: Test HeatmapChart in Dev Server

**Files:**
- No code changes (testing only)

- [ ] **Step 1: Refresh browser (dev server already running)**

Open http://localhost:5173 in browser and do a hard refresh (Cmd+Shift+R on Mac)

- [ ] **Step 2: Verify Examples page renders HeatmapChart**

1. Click **Examples** tab
2. Scroll down to find "Heatmap" section
3. Verify 3 example cards appear: "Sales by region", "Team utilization", "Dense cells"
4. Each card should display a heatmap grid with colors based on values

Expected: All 3 heatmaps visible with correct coloring

- [ ] **Step 3: Verify Docs page has HeatmapChart props**

1. Click **Docs** tab
2. Scroll down to find "Heatmap" section
3. Verify all 10 props listed

Expected: Complete props table visible

- [ ] **Step 4: Test Playground controls**

1. Click **Playground** tab
2. Select "Heatmap" from chart dropdown
3. Toggle "animate" → chart updates
4. Adjust "cellPadding" slider (0–8) → cells gap changes immediately
5. Copy code snippet → verify valid JSX

Expected: All controls responsive, snippet valid

- [ ] **Step 5: Commit HeatmapChart**

```bash
git add src/data.ts src/registry.tsx src/propDocs.ts
git commit -m "feat: add HeatmapChart with examples and documentation"
```

Expected: Commit successful

---

## Chart 3: SunburstChart

### Task 9: Add SunburstChart Datasets

**Files:**
- Modify: `src/data.ts` (append at end)

- [ ] **Step 1: Add sunburst data**

Append this to `src/data.ts`:

```typescript
// SunburstChart data
export const sunburstOrg = {
  name: 'Company',
  children: [
    {
      name: 'Engineering',
      children: [
        { name: 'Frontend', value: 8 },
        { name: 'Backend', value: 6 },
        { name: 'DevOps', value: 3 },
      ],
    },
    {
      name: 'Sales',
      children: [
        { name: 'Enterprise', value: 5 },
        { name: 'SMB', value: 4 },
      ],
    },
    {
      name: 'Operations',
      children: [
        { name: 'HR', value: 4 },
        { name: 'Finance', value: 3 },
        { name: 'Legal', value: 2 },
      ],
    },
  ],
};

export const sunburstFiles = {
  name: 'project',
  children: [
    {
      name: 'src',
      children: [
        { name: 'components', value: 2500 },
        { name: 'utils', value: 1200 },
        { name: 'hooks', value: 800 },
      ],
    },
    {
      name: 'tests',
      children: [
        { name: 'unit', value: 3000 },
        { name: 'integration', value: 2000 },
      ],
    },
    { name: 'dist', value: 5000 },
    { name: 'docs', value: 800 },
  ],
};
```

- [ ] **Step 2: Verify data.ts syntax**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

---

### Task 10: Add SunburstChart to Registry

**Files:**
- Modify: `src/registry.tsx`

- [ ] **Step 1: Add SunburstChart import**

In the import from 'react-d3-viz', add:

```typescript
import {
  // ... existing imports ...
  HeatmapChart,
  SunburstChart,  // ADD THIS LINE
} from 'react-d3-viz';
```

- [ ] **Step 2: Add SunburstChart data imports**

In the import from './data', add:

```typescript
import {
  // ... existing imports ...
  heatmapSales,
  heatmapUtilization,
  sunburstOrg,    // ADD THIS LINE
  sunburstFiles,  // ADD THIS LINE
} from './data';
```

- [ ] **Step 3: Add SunburstChart datasets**

Before `export const charts: ChartDef[]`, add:

```typescript
// --- sunburst datasets -------------------------------------------------------
const sunburstOrgCode = `const data = {
  name: 'Company',
  children: [
    {
      name: 'Engineering',
      children: [
        { name: 'Frontend', value: 8 },
        { name: 'Backend', value: 6 },
        // …more teams
      ],
    },
    // …more departments
  ],
};`;

const sunburstFilesCode = `const data = {
  name: 'project',
  children: [
    {
      name: 'src',
      children: [
        { name: 'components', value: 2500 },
        // …more
      ],
    },
    // …more folders
  ],
};`;

const sunburstDatasets: Dataset[] = [
  {
    key: 'org',
    name: 'Organization',
    props: { data: sunburstOrg },
    dataCode: sunburstOrgCode,
    dataAttr: 'data={data}',
    accessors: {},
  },
  {
    key: 'files',
    name: 'File sizes',
    props: { data: sunburstFiles },
    dataCode: sunburstFilesCode,
    dataAttr: 'data={data}',
    accessors: {},
  },
];
```

- [ ] **Step 4: Add SunburstChart ChartDef**

At the end of the `charts` array, add:

```typescript
  {
    id: 'sunburst',
    title: 'Sunburst',
    blurb: 'Hierarchical radial chart showing nested data as concentric rings.',
    componentName: 'SunburstChart',
    Component: SunburstChart,
    datasets: sunburstDatasets,
    defaultProps: { height: 400, innerRadius: 60, animate: true, showLabels: true, showLegend: true },
    controls: [
      heightCtrl,
      { key: 'innerRadius', label: 'innerRadius', type: 'number', min: 0, max: 150, step: 10 },
      { key: 'showLabels', label: 'showLabels', type: 'boolean' },
      legendCtrl,
      animateCtrl,
    ],
    examples: [
      { title: 'Organization', description: 'Company hierarchy: departments and teams.', datasetKey: 'org', props: {} },
      { title: 'File sizes', description: 'Project structure with file sizes.', datasetKey: 'files', props: {} },
      { title: 'Legend only', description: 'Hide labels for a clean visual.', datasetKey: 'org', props: { showLabels: false } },
    ],
  },
```

- [ ] **Step 5: Verify registry.tsx syntax**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

---

### Task 11: Add SunburstChart Prop Docs

**Files:**
- Modify: `src/propDocs.ts`

- [ ] **Step 1: Add SunburstChart prop documentation**

Before the `propDocs` export, add:

```typescript
const sunburstProps: PropDoc[] = [
  { name: 'data', type: 'HierarchyNode', default: '—', description: 'Nested object with name, children, and optional value. Required.' },
  { name: 'value', type: 'string | (d) => number', default: 'value', description: 'Accessor for leaf node size (outer ring cell area).' },
  { name: 'label', type: 'string | (d) => string', default: 'name', description: 'Accessor for cell label text (shown in cells and tooltip).' },
  { name: 'childrenKey', type: 'string', default: "'children'", description: 'Key containing nested children array.' },
  { name: 'innerRadius', type: 'number', default: '0', description: 'Inner hole size in pixels. 0 = pie, >0 = sunburst rings.' },
  { name: 'showLabels', type: 'boolean', default: 'true', description: 'Show text labels inside cells.' },
  { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show the interactive legend.' },
  { name: 'height', type: 'number', default: '400', description: 'Pixel height of the chart.' },
  { name: 'animate', type: 'boolean', default: 'true', description: 'Enable enter animation.' },
  { name: 'theme', type: 'DeepPartial<ChartTheme>', default: 'defaultTheme', description: 'Theme overrides.' },
];
```

- [ ] **Step 2: Register SunburstChart in propDocs**

In the `propDocs` object, add:

```typescript
export const propDocs: Record<string, PropDoc[]> = {
  // ... existing entries ...
  sunburst: sunburstProps,
};
```

- [ ] **Step 3: Verify propDocs.ts syntax**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

---

### Task 12: Test SunburstChart in Dev Server

**Files:**
- No code changes (testing only)

- [ ] **Step 1: Refresh browser**

Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

- [ ] **Step 2: Verify Examples page renders SunburstChart**

1. Click **Examples** tab
2. Scroll down to find "Sunburst" section
3. Verify 3 example cards appear: "Organization", "File sizes", "Legend only"
4. Each card should display a radial hierarchy chart

Expected: All 3 sunbursts visible, inner hole visible

- [ ] **Step 3: Verify Docs page has SunburstChart props**

1. Click **Docs** tab
2. Scroll down to find "Sunburst" section
3. Verify all 10 props listed

Expected: Complete props table visible

- [ ] **Step 4: Test Playground controls**

1. Click **Playground** tab
2. Select "Sunburst" from chart dropdown
3. Adjust "innerRadius" slider (0–150) → hole in center grows/shrinks
4. Toggle "showLabels" → text in cells appears/disappears
5. Copy code snippet → verify valid JSX

Expected: All controls responsive, snippet valid

- [ ] **Step 5: Commit SunburstChart**

```bash
git add src/data.ts src/registry.tsx src/propDocs.ts
git commit -m "feat: add SunburstChart with examples and documentation"
```

Expected: Commit successful

---

## Chart 4: QuadrantChart

### Task 13: Add QuadrantChart Datasets

**Files:**
- Modify: `src/data.ts` (append at end)

- [ ] **Step 1: Add quadrant data**

Append this to `src/data.ts`:

```typescript
// QuadrantChart data
export const quadrantProjects = [
  { name: 'Refactor auth', impact: 8, effort: 6, size: 1200 },
  { name: 'Add dark mode', impact: 5, effort: 2, size: 800 },
  { name: 'New payment', impact: 9, effort: 8, size: 2000 },
  { name: 'Fix bugs', impact: 4, effort: 3, size: 500 },
  { name: 'API v2', impact: 7, effort: 9, size: 1800 },
  { name: 'Analytics', impact: 6, effort: 4, size: 1000 },
  { name: 'Mobile app', impact: 9, effort: 10, size: 2500 },
  { name: 'Docs update', impact: 3, effort: 2, size: 300 },
];

export const quadrantEmployees = [
  { name: 'Alice', productivity: 85, satisfaction: 92, tenure: 3 },
  { name: 'Bob', productivity: 72, satisfaction: 65, tenure: 5 },
  { name: 'Carol', productivity: 88, satisfaction: 78, tenure: 2 },
  { name: 'Diana', productivity: 78, satisfaction: 88, tenure: 4 },
  { name: 'Eve', productivity: 92, satisfaction: 70, tenure: 1 },
  { name: 'Frank', productivity: 65, satisfaction: 75, tenure: 6 },
];
```

- [ ] **Step 2: Verify data.ts syntax**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

---

### Task 14: Add QuadrantChart to Registry

**Files:**
- Modify: `src/registry.tsx`

- [ ] **Step 1: Add QuadrantChart import**

In the import from 'react-d3-viz', add:

```typescript
import {
  // ... existing imports ...
  SunburstChart,
  QuadrantChart,  // ADD THIS LINE
} from 'react-d3-viz';
```

- [ ] **Step 2: Add QuadrantChart data imports**

In the import from './data', add:

```typescript
import {
  // ... existing imports ...
  sunburstOrg,
  sunburstFiles,
  quadrantProjects,  // ADD THIS LINE
  quadrantEmployees, // ADD THIS LINE
} from './data';
```

- [ ] **Step 3: Add QuadrantChart datasets**

Before `export const charts: ChartDef[]`, add:

```typescript
// --- quadrant datasets -------------------------------------------------------
const quadrantProjectsCode = `const data = [
  { name: 'Refactor auth', impact: 8, effort: 6, size: 1200 },
  { name: 'Add dark mode', impact: 5, effort: 2, size: 800 },
  // …6 more projects
];`;

const quadrantEmployeesCode = `const data = [
  { name: 'Alice', productivity: 85, satisfaction: 92, tenure: 3 },
  { name: 'Bob', productivity: 72, satisfaction: 65, tenure: 5 },
  // …4 more employees
];`;

const quadrantDatasets: Dataset[] = [
  {
    key: 'projects',
    name: 'Impact-effort matrix',
    props: { data: quadrantProjects, x: 'impact', y: 'effort', size: 'size', label: 'name', xThreshold: 6, yThreshold: 6 },
    dataCode: quadrantProjectsCode,
    dataAttr: 'data={data}',
    accessors: { x: 'impact', y: 'effort', size: 'size', label: 'name' },
  },
  {
    key: 'employees',
    name: 'Performance grid',
    props: { data: quadrantEmployees, x: 'productivity', y: 'satisfaction', size: 'tenure', label: 'name', xThreshold: 75, yThreshold: 80 },
    dataCode: quadrantEmployeesCode,
    dataAttr: 'data={data}',
    accessors: { x: 'productivity', y: 'satisfaction', size: 'tenure', label: 'name' },
  },
];
```

- [ ] **Step 4: Add QuadrantChart ChartDef**

At the end of the `charts` array, add:

```typescript
  {
    id: 'quadrant',
    title: 'Quadrant',
    blurb: 'Scatter plot divided into four quadrants by reference lines — great for prioritization matrices.',
    componentName: 'QuadrantChart',
    Component: QuadrantChart,
    datasets: quadrantDatasets,
    defaultProps: { height: 360, animate: true, showLegend: true },
    controls: [
      heightCtrl,
      { key: 'xThreshold', label: 'xThreshold', type: 'number', min: 0, max: 100, step: 5 },
      { key: 'yThreshold', label: 'yThreshold', type: 'number', min: 0, max: 100, step: 5 },
      animateCtrl,
      legendCtrl,
    ],
    examples: [
      { title: 'Impact-effort matrix', description: 'Project prioritization: high impact + low effort = quick wins (top-left).', datasetKey: 'projects', props: {} },
      { title: 'Performance grid', description: 'Employee satisfaction vs productivity.', datasetKey: 'employees', props: {} },
      { title: 'Custom thresholds', description: 'Adjust dividing lines to 5/5 for different quadrant split.', datasetKey: 'projects', props: { xThreshold: 5, yThreshold: 5 } },
    ],
  },
```

- [ ] **Step 5: Verify registry.tsx syntax**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

---

### Task 15: Add QuadrantChart Prop Docs

**Files:**
- Modify: `src/propDocs.ts`

- [ ] **Step 1: Add QuadrantChart prop documentation**

Before the `propDocs` export, add:

```typescript
const quadrantProps: PropDoc[] = [
  { name: 'data', type: 'Datum[]', default: '—', description: 'Array of records to plot. Required.' },
  { name: 'x', type: 'string | (d) => number', default: '—', description: 'Numeric x-axis value (e.g., impact, productivity). Required.' },
  { name: 'y', type: 'string | (d) => number', default: '—', description: 'Numeric y-axis value (e.g., effort, satisfaction). Required.' },
  { name: 'label', type: 'string | (d) => string', default: '—', description: 'Point label (name, project, etc.).' },
  { name: 'size', type: 'string | (d) => number', default: '—', description: 'Optional accessor for bubble size (third dimension).' },
  { name: 'xThreshold', type: 'number', default: '50', description: 'X-axis position of the vertical dividing line.' },
  { name: 'yThreshold', type: 'number', default: '50', description: 'Y-axis position of the horizontal dividing line.' },
  { name: 'quadrantLabels', type: '{ topLeft, topRight, bottomLeft, bottomRight }', default: '—', description: 'Labels for each quadrant (shown on axes).' },
  { name: 'height', type: 'number', default: '300', description: 'Pixel height of the chart.' },
  { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show the interactive legend.' },
  { name: 'animate', type: 'boolean', default: 'true', description: 'Enable enter animation.' },
  { name: 'theme', type: 'DeepPartial<ChartTheme>', default: 'defaultTheme', description: 'Theme overrides.' },
];
```

- [ ] **Step 2: Register QuadrantChart in propDocs**

In the `propDocs` object, add:

```typescript
export const propDocs: Record<string, PropDoc[]> = {
  // ... existing entries ...
  quadrant: quadrantProps,
};
```

- [ ] **Step 3: Verify propDocs.ts syntax**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

---

### Task 16: Test QuadrantChart in Dev Server

**Files:**
- No code changes (testing only)

- [ ] **Step 1: Refresh browser**

Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

- [ ] **Step 2: Verify Examples page renders QuadrantChart**

1. Click **Examples** tab
2. Scroll down to find "Quadrant" section
3. Verify 3 example cards appear: "Impact-effort matrix", "Performance grid", "Custom thresholds"
4. Each card should display a scatter plot divided into 4 quadrants

Expected: All 3 quadrant charts visible with dividing lines

- [ ] **Step 3: Verify Docs page has QuadrantChart props**

1. Click **Docs** tab
2. Scroll down to find "Quadrant" section
3. Verify all 12 props listed

Expected: Complete props table visible

- [ ] **Step 4: Test Playground controls**

1. Click **Playground** tab
2. Select "Quadrant" from chart dropdown
3. Adjust "xThreshold" slider (0–100) → vertical line moves left/right
4. Adjust "yThreshold" slider (0–100) → horizontal line moves up/down
5. Toggle "animate" → animation toggles
6. Copy code snippet → verify valid JSX

Expected: All controls responsive, thresholds move dividing lines, snippet valid

- [ ] **Step 5: Commit QuadrantChart**

```bash
git add src/data.ts src/registry.tsx src/propDocs.ts
git commit -m "feat: add QuadrantChart with examples and documentation"
```

Expected: Commit successful

---

## Final Verification

### Task 17: Final Cross-Chart Testing

**Files:**
- No code changes (testing only)

- [ ] **Step 1: Start fresh dev server (kill and restart)**

1. Stop dev server (Ctrl+C in terminal)
2. Run: `npm run dev`
3. Open http://localhost:5173

- [ ] **Step 2: Walk through Examples page top to bottom**

1. Click **Examples** tab
2. Scroll through entire page
3. Verify all 16 example cards render (12 existing + 4 new charts with 3 examples each)
4. Verify no console errors (open DevTools: F12)

Expected: All examples visible, no red errors in console

- [ ] **Step 3: Walk through Docs page top to bottom**

1. Click **Docs** tab
2. Scroll through entire page
3. Verify prop tables for all 16 charts (12 existing + 4 new)
4. Verify no console errors

Expected: All prop tables visible, properly formatted

- [ ] **Step 4: Test Playground with all 4 new charts**

1. Click **Playground** tab
2. For each of the 4 new charts (ButterflyChart, HeatmapChart, SunburstChart, QuadrantChart):
   - Select chart from dropdown
   - Switch between datasets (if available)
   - Switch between examples (presets)
   - Toggle 2–3 controls
   - Verify code snippet updates correctly

Expected: All interactions work, no errors

- [ ] **Step 5: TypeScript check**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

- [ ] **Step 6: Build check**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 7: Final commit**

```bash
git log --oneline -5
```

Verify the last 5 commits include the 4 chart commits (ButterflyChart, HeatmapChart, SunburstChart, QuadrantChart).

---

## Summary

✅ **4 new charts added**: ButterflyChart, HeatmapChart, SunburstChart, QuadrantChart  
✅ **12 total example cards** (3 per chart)  
✅ **4 new prop documentation tables** with 10–12 props each  
✅ **Full playground support** with interactive controls and code generation  
✅ **Realistic business datasets** for each chart  
✅ **16 tasks total**: 4 charts × 3 tasks each (data + registry + props) + testing task  
✅ **All changes committed** to git  

All 4 charts are now fully integrated and documented in the react-d3-viz-ui.
