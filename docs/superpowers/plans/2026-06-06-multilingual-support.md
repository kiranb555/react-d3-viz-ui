# Multilingual Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add comprehensive multi-language support (English, French, Arabic, Kannada) with browser language detection, persistence, and RTL layout support.

**Architecture:** Use i18next with namespaced JSON translation files, automatic browser language detection via localStorage fallback, and a language switcher in the header. RTL layout toggles based on language selection.

**Tech Stack:** i18next, react-i18next, i18next-browser-languagedetector

---

## File Structure

**New files:**
- `src/i18n.ts` — i18next configuration and initialization
- `src/LanguageSwitcher.tsx` — language selection dropdown component
- `src/useRTL.ts` — RTL direction toggle hook
- `src/styles-rtl.css` — RTL stylesheet overrides
- `src/locales/en/{common,registry,docs,propDocs}.json` — English translations
- `src/locales/fr/{common,registry,docs,propDocs}.json` — French translations
- `src/locales/ar/{common,registry,docs,propDocs}.json` — Arabic translations
- `src/locales/kn/{common,registry,docs,propDocs}.json` — Kannada translations

**Modified files:**
- `package.json` — add i18next dependencies
- `src/main.tsx` — import i18n module
- `src/App.tsx` — initialize i18next, render LanguageSwitcher
- `src/Gallery.tsx` — use useTranslation hook
- `src/Examples.tsx` — use useTranslation hook
- `src/Docs.tsx` — use useTranslation hook
- `src/Playground.tsx` — use useTranslation hook
- `src/registry.tsx` — structure for translated content
- `src/styles.css` — import RTL stylesheet

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add i18next packages to dependencies**

Run:
```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

Expected: Dependencies added to `package.json` and `node_modules/`

- [ ] **Step 2: Verify installation**

Run:
```bash
npm list i18next react-i18next i18next-browser-languagedetector
```

Expected: All three packages listed with versions

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add i18next for multilingual support"
```

---

## Task 2: Create i18n Configuration

**Files:**
- Create: `src/i18n.ts`

- [ ] **Step 1: Create i18n.ts with configuration**

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
import commonEn from './locales/en/common.json';
import registryEn from './locales/en/registry.json';
import docsEn from './locales/en/docs.json';
import propDocsEn from './locales/en/propDocs.json';

// French translations
import commonFr from './locales/fr/common.json';
import registryFr from './locales/fr/registry.json';
import docsFr from './locales/fr/docs.json';
import propDocsFr from './locales/fr/propDocs.json';

// Arabic translations
import commonAr from './locales/ar/common.json';
import registryAr from './locales/ar/registry.json';
import docsAr from './locales/ar/docs.json';
import propDocsAr from './locales/ar/propDocs.json';

// Kannada translations
import commonKn from './locales/kn/common.json';
import registryKn from './locales/kn/registry.json';
import docsKn from './locales/kn/docs.json';
import propDocsKn from './locales/kn/propDocs.json';

const resources = {
  en: {
    common: commonEn,
    registry: registryEn,
    docs: docsEn,
    propDocs: propDocsEn,
  },
  fr: {
    common: commonFr,
    registry: registryFr,
    docs: docsFr,
    propDocs: propDocsFr,
  },
  ar: {
    common: commonAr,
    registry: registryAr,
    docs: docsAr,
    propDocs: propDocsAr,
  },
  kn: {
    common: commonKn,
    registry: registryKn,
    docs: docsKn,
    propDocs: propDocsKn,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
```

- [ ] **Step 2: Verify file created**

Run:
```bash
ls -la src/i18n.ts
```

Expected: File exists at `src/i18n.ts`

- [ ] **Step 3: Commit**

```bash
git add src/i18n.ts
git commit -m "feat: create i18next configuration"
```

---

## Task 3: Create Locale Directory Structure

**Files:**
- Create: `src/locales/{en,fr,ar,kn}/` directories

- [ ] **Step 1: Create locale directories**

Run:
```bash
mkdir -p src/locales/{en,fr,ar,kn}
```

Expected: Directory structure created

- [ ] **Step 2: Verify directories**

Run:
```bash
ls -la src/locales/
```

Expected: Four language directories visible

---

## Task 4: Create English common.json

**Files:**
- Create: `src/locales/en/common.json`

- [ ] **Step 1: Create common.json with UI strings**

```json
{
  "nav.gallery": "Gallery",
  "nav.examples": "Examples",
  "nav.docs": "Docs",
  "nav.playground": "Playground",
  "nav.npm": "npm ↗",
  "nav.github": "GitHub ↗",
  "tagline": "Cross-platform SVG charts for React & React Native",
  "footer.text": "Built with <code>react-d3-viz</code> · install via <code>npm i react-d3-viz</code>",
  "footer.install": "install via",
  "language.english": "English",
  "language.french": "Français",
  "language.arabic": "العربية",
  "language.kannada": "ಕನ್ನಡ",
  "playground.tryPlayground": "Try in playground →",
  "terminal": "Terminal"
}
```

- [ ] **Step 2: Verify file created**

Run:
```bash
cat src/locales/en/common.json | jq
```

Expected: Valid JSON output

- [ ] **Step 3: Commit**

```bash
git add src/locales/en/common.json
git commit -m "feat: add English common translations"
```

---

## Task 5: Create English registry.json

**Files:**
- Create: `src/locales/en/registry.json`

- [ ] **Step 1: Create registry.json with chart definitions**

```json
{
  "charts.line.title": "Line",
  "charts.line.blurb": "Multi-series line chart with optional points and curve interpolation.",
  "charts.line.examples.smooth.title": "Smooth multi-series",
  "charts.line.examples.smooth.description": "Two series with monotone curves and points.",
  "charts.line.examples.stepped.title": "Stepped",
  "charts.line.examples.stepped.description": "Step interpolation for discrete, stair-like changes.",
  "charts.line.examples.dashed.title": "Dashed comparison",
  "charts.line.examples.dashed.description": "A dashed second series via series[].dashArray.",
  "charts.line.examples.single.title": "Single series",
  "charts.line.examples.single.description": "One line against weekly traffic, no legend.",
  
  "charts.area.title": "Area",
  "charts.area.blurb": "Line chart with the region beneath each series filled.",
  "charts.area.examples.multi.title": "Multi-series fill",
  "charts.area.examples.multi.description": "Two overlaid filled regions.",
  "charts.area.examples.single.title": "Single series + points",
  "charts.area.examples.single.description": "One area for temperature, with dots.",
  
  "charts.bar.title": "Bar",
  "charts.bar.blurb": "Grouped or stacked bars across categories.",
  "charts.bar.examples.grouped.title": "Grouped",
  "charts.bar.examples.grouped.description": "Side-by-side bars per category.",
  "charts.bar.examples.stacked.title": "Stacked",
  "charts.bar.examples.stacked.description": "Series stacked on top of each other.",
  "charts.bar.examples.rounded.title": "Rounded",
  "charts.bar.examples.rounded.description": "Softer bars via a larger corner radius.",
  "charts.bar.examples.single.title": "Single series",
  "charts.bar.examples.single.description": "Just sales, no legend.",
  
  "charts.scatter.title": "Scatter",
  "charts.scatter.blurb": "Points on numeric x/y axes.",
  "charts.scatter.examples.random.title": "Random cloud",
  "charts.scatter.examples.random.description": "Uniform noise across the plane.",
  "charts.scatter.examples.correlated.title": "Correlated",
  "charts.scatter.examples.correlated.description": "A clear positive trend in the data.",
  "charts.scatter.examples.large.title": "Large points",
  "charts.scatter.examples.large.description": "Bigger dots for sparse data.",
  
  "charts.bubble.title": "Bubble",
  "charts.bubble.blurb": "Scatter with a third dimension encoded as bubble area.",
  "charts.bubble.examples.default.title": "Default range",
  "charts.bubble.examples.default.description": "Bubble area encodes size.",
  "charts.bubble.examples.correlated.title": "Correlated",
  "charts.bubble.examples.correlated.description": "Size on a trending cloud.",
  "charts.bubble.examples.wider.title": "Wider radius range",
  "charts.bubble.examples.wider.description": "Exaggerated bubble sizes.",
  
  "charts.pie.title": "Pie / Donut",
  "charts.pie.blurb": "Pie chart; set innerRadius for a donut.",
  "charts.pie.examples.pie.title": "Pie",
  "charts.pie.examples.pie.description": "Classic full pie with labels.",
  "charts.pie.examples.donut.title": "Donut",
  "charts.pie.examples.donut.description": "Hollow centre via innerRadius.",
  "charts.pie.examples.gapped.title": "Gapped donut",
  "charts.pie.examples.gapped.description": "Padded, rounded slices.",
  "charts.pie.examples.market.title": "Market share",
  "charts.pie.examples.market.description": "A different dataset as a donut.",
  
  "charts.histogram.title": "Histogram",
  "charts.histogram.blurb": "Bins a set of numeric values and renders the counts.",
  "charts.histogram.examples.few.title": "Few bins",
  "charts.histogram.examples.few.description": "Coarse buckets for a broad view.",
  "charts.histogram.examples.many.title": "Many bins",
  "charts.histogram.examples.many.description": "Fine-grained distribution.",
  "charts.histogram.examples.skewed.title": "Skewed incomes",
  "charts.histogram.examples.skewed.description": "A right-skewed dataset.",
  
  "charts.radar.title": "Radar",
  "charts.radar.blurb": "Polygon per series across a set of axes.",
  "charts.radar.examples.team.title": "Team vs rival",
  "charts.radar.examples.team.description": "Two polygons across six axes.",
  "charts.radar.examples.skills.title": "Skills profile",
  "charts.radar.examples.skills.description": "Frontend vs backend strengths.",
  "charts.radar.examples.rings.title": "More rings",
  "charts.radar.examples.rings.description": "Six grid levels for finer reading.",
  
  "charts.treemap.title": "Treemap",
  "charts.treemap.blurb": "Nested rectangles sized by value — flat, grouped, or a full hierarchy.",
  "charts.treemap.examples.flat.title": "Flat",
  "charts.treemap.examples.flat.description": "One rectangle per record, sized by value.",
  "charts.treemap.examples.grouped.title": "Grouped",
  "charts.treemap.examples.grouped.description": "Two-level treemap colored by group, with header bands.",
  "charts.treemap.examples.nested.title": "Nested hierarchy",
  "charts.treemap.examples.nested.description": "A deep hierarchy; leaves colored by their top-level branch (flare style).",
  "charts.treemap.examples.noLabels.title": "No labels",
  "charts.treemap.examples.noLabels.description": "Hide cell labels for a pure heatmap look.",
  
  "charts.waterfall.title": "Waterfall",
  "charts.waterfall.blurb": "Shows cumulative effect of sequential positive and negative values.",
  "charts.waterfall.examples.revenue.title": "Revenue flow",
  "charts.waterfall.examples.revenue.description": "Basic revenue with costs and net income.",
  "charts.waterfall.examples.multiStep.title": "Multi-step",
  "charts.waterfall.examples.multiStep.description": "Quarterly breakdown with subtotals.",
  "charts.waterfall.examples.formatter.title": "Custom formatter",
  "charts.waterfall.examples.formatter.description": "Format values with custom function.",
  
  "charts.sankey.title": "Sankey",
  "charts.sankey.blurb": "Shows flow relationships from sources to targets with proportional link widths.",
  "charts.sankey.examples.simple.title": "Simple flow",
  "charts.sankey.examples.simple.description": "Two sources to two sinks.",
  "charts.sankey.examples.complex.title": "Complex network",
  "charts.sankey.examples.complex.description": "Multi-layer flow with many connections.",
  "charts.sankey.examples.custom.title": "Custom colors",
  "charts.sankey.examples.custom.description": "Per-node color override.",
  
  "charts.mekko.title": "Mekko",
  "charts.mekko.blurb": "Categories as columns with width proportional to value, series stacked within.",
  "charts.mekko.examples.quarterly.title": "Quarterly products",
  "charts.mekko.examples.quarterly.description": "Product mix across quarters.",
  "charts.mekko.examples.market.title": "Market segments",
  "charts.mekko.examples.market.description": "Revenue by region and tier.",
  "charts.mekko.examples.formatters.title": "Custom formatters",
  "charts.mekko.examples.formatters.description": "Format categories and values.",
  
  "charts.butterfly.title": "Butterfly",
  "charts.butterfly.blurb": "Back-to-back bar chart, ideal for comparing two opposing series across categories.",
  "charts.butterfly.examples.age.title": "Age pyramid",
  "charts.butterfly.examples.age.description": "Population distribution by age and gender.",
  "charts.butterfly.examples.department.title": "Department gender",
  "charts.butterfly.examples.department.description": "Staffing breakdown by department.",
  "charts.butterfly.examples.labels.title": "Custom left/right labels",
  "charts.butterfly.examples.labels.description": "Override default Male/Female labels.",
  
  "charts.heatmap.title": "Heatmap",
  "charts.heatmap.blurb": "Color-coded grid showing relationships across two dimensions.",
  "charts.heatmap.examples.sales.title": "Sales by region",
  "charts.heatmap.examples.sales.description": "Product revenue across North America, Europe, Asia, and LATAM.",
  "charts.heatmap.examples.utilization.title": "Team utilization",
  "charts.heatmap.examples.utilization.description": "Daily team utilization percentages (warm = busy).",
  "charts.heatmap.examples.dense.title": "Dense cells",
  "charts.heatmap.examples.dense.description": "Minimal padding for a compact grid.",
  
  "charts.sunburst.title": "Sunburst",
  "charts.sunburst.blurb": "Hierarchical radial chart showing nested data as concentric rings.",
  "charts.sunburst.examples.org.title": "Organization",
  "charts.sunburst.examples.org.description": "Company hierarchy: departments and teams.",
  "charts.sunburst.examples.files.title": "File sizes",
  "charts.sunburst.examples.files.description": "Project structure with file sizes.",
  "charts.sunburst.examples.legend.title": "Legend only",
  "charts.sunburst.examples.legend.description": "Hide labels for a clean visual.",
  
  "charts.quadrant.title": "Quadrant",
  "charts.quadrant.blurb": "Scatter plot divided into four quadrants by reference lines — great for prioritization matrices.",
  "charts.quadrant.examples.impact.title": "Impact-effort matrix",
  "charts.quadrant.examples.impact.description": "Project prioritization: high impact + low effort = quick wins (top-left).",
  "charts.quadrant.examples.performance.title": "Performance grid",
  "charts.quadrant.examples.performance.description": "Employee satisfaction vs productivity.",
  "charts.quadrant.examples.thresholds.title": "Custom thresholds",
  "charts.quadrant.examples.thresholds.description": "Adjust dividing lines to 5/5 for different quadrant split."
}
```

- [ ] **Step 2: Verify file created and valid**

Run:
```bash
cat src/locales/en/registry.json | jq length
```

Expected: JSON parses without error

- [ ] **Step 3: Commit**

```bash
git add src/locales/en/registry.json
git commit -m "feat: add English registry translations"
```

---

## Task 6: Create English docs.json

**Files:**
- Create: `src/locales/en/docs.json`

- [ ] **Step 1: Create docs.json with documentation content**

```json
{
  "docs.gettingStarted.title": "Getting started",
  "docs.gettingStarted.intro": "Install the package and import the chart you need. Every chart takes a <code>data</code> array plus a few <em>accessor</em> props (like <code>x</code>, <code>value</code> or <code>series</code>) that tell it which fields to read.",
  "docs.npm": "npm i react-d3-viz",
  "docs.series": "Pass multiple series via <code>series='{[{ dataKey: 'sales' }, …]}'</code>, or a single series with the <code>y</code> shorthand. Colors, fonts and spacing come from a <code>theme</code> you can partially override.",
  "docs.seriesConfig.title": "SeriesConfig",
  "docs.seriesConfig.desc": "Each entry in a chart's <code>series</code> (or radar <code>series</code>) array:",
  "docs.props": "Props",
  "propDocs.height": "Height in pixels",
  "propDocs.animate": "Enable/disable animation on data change",
  "propDocs.showGrid": "Display grid lines on the plot area",
  "propDocs.showXAxis": "Display X axis labels and ticks",
  "propDocs.showYAxis": "Display Y axis labels and ticks",
  "propDocs.showTooltip": "Enable tooltips on hover",
  "propDocs.showLegend": "Display the legend",
  "propDocs.showPoints": "Display point markers on line chart",
  "propDocs.curve": "Line interpolation method: monotone, linear, step, catmullRom",
  "propDocs.stacked": "Stack series on top of each other instead of grouped",
  "propDocs.radius": "Corner radius for bar chart elements",
  "propDocs.pointRadius": "Radius of scatter/bubble points in pixels",
  "propDocs.innerRadius": "Inner radius for donut/sunburst (0-1 ratio)",
  "propDocs.padAngle": "Space between pie slices",
  "propDocs.cornerRadius": "Corner radius for pie slices",
  "propDocs.showLabels": "Display labels on treemap/sunburst cells",
  "propDocs.showValues": "Display values on treemap cells",
  "propDocs.bins": "Number of histogram bins",
  "propDocs.levels": "Number of concentric rings in radar chart",
  "propDocs.fillOpacity": "Opacity of filled radar polygons (0-1)",
  "propDocs.showAxisLabels": "Display axis labels in radar chart",
  "propDocs.padding": "Padding between treemap cells",
  "propDocs.cellPadding": "Padding between heatmap cells",
  "propDocs.radiusRange": "Min and max radius for bubble sizes [min, max]",
  "propDocs.xThreshold": "X-axis dividing line for quadrant chart",
  "propDocs.yThreshold": "Y-axis dividing line for quadrant chart"
}
```

- [ ] **Step 2: Verify file created**

Run:
```bash
cat src/locales/en/docs.json | jq
```

Expected: Valid JSON output

- [ ] **Step 3: Commit**

```bash
git add src/locales/en/docs.json
git commit -m "feat: add English docs translations"
```

---

## Task 7: Create English propDocs.json

**Files:**
- Create: `src/locales/en/propDocs.json`

- [ ] **Step 1: Create propDocs.json template (minimal for now)**

```json
{
  "line.data": "Array of objects",
  "line.x": "Data key for X-axis values",
  "line.series": "Array of series definitions",
  "line.height": "Chart height in pixels",
  "line.showPoints": "Show point markers",
  "line.curve": "Curve interpolation method",
  "line.showLegend": "Show legend",
  "line.showGrid": "Show grid",
  "line.showXAxis": "Show X axis",
  "line.showYAxis": "Show Y axis",
  "line.showTooltip": "Show tooltips",
  "line.animate": "Animate transitions",
  
  "area.data": "Array of objects",
  "area.x": "Data key for X-axis values",
  "area.series": "Array of series definitions",
  "area.height": "Chart height in pixels",
  "area.showLegend": "Show legend",
  "area.showGrid": "Show grid",
  "area.showXAxis": "Show X axis",
  "area.showYAxis": "Show Y axis",
  "area.showTooltip": "Show tooltips",
  "area.animate": "Animate transitions",
  
  "bar.data": "Array of objects",
  "bar.x": "Data key for categories",
  "bar.series": "Array of series definitions",
  "bar.height": "Chart height in pixels",
  "bar.stacked": "Stack bars vertically",
  "bar.radius": "Corner radius",
  "bar.showLegend": "Show legend",
  "bar.showGrid": "Show grid",
  "bar.showXAxis": "Show X axis",
  "bar.showYAxis": "Show Y axis",
  "bar.showTooltip": "Show tooltips",
  "bar.animate": "Animate transitions",
  
  "scatter.data": "Array of objects",
  "scatter.x": "Data key for X values",
  "scatter.y": "Data key for Y values",
  "scatter.height": "Chart height in pixels",
  "scatter.pointRadius": "Radius of points",
  "scatter.showLegend": "Show legend",
  "scatter.showGrid": "Show grid",
  "scatter.showXAxis": "Show X axis",
  "scatter.showYAxis": "Show Y axis",
  "scatter.showTooltip": "Show tooltips",
  "scatter.animate": "Animate transitions",
  
  "bubble.data": "Array of objects",
  "bubble.x": "Data key for X values",
  "bubble.y": "Data key for Y values",
  "bubble.size": "Data key for bubble sizes",
  "bubble.height": "Chart height in pixels",
  "bubble.radiusRange": "Min/max radius range",
  "bubble.showLegend": "Show legend",
  "bubble.showGrid": "Show grid",
  "bubble.showXAxis": "Show X axis",
  "bubble.showYAxis": "Show Y axis",
  "bubble.showTooltip": "Show tooltips",
  "bubble.animate": "Animate transitions",
  
  "pie.data": "Array of objects",
  "pie.value": "Data key for values",
  "pie.label": "Data key for labels",
  "pie.height": "Chart height in pixels",
  "pie.innerRadius": "Inner radius for donut (0-1)",
  "pie.padAngle": "Padding between slices",
  "pie.cornerRadius": "Corner radius",
  "pie.showLabels": "Show slice labels",
  "pie.showLegend": "Show legend",
  "pie.animate": "Animate transitions",
  
  "histogram.values": "Array of numeric values",
  "histogram.height": "Chart height in pixels",
  "histogram.bins": "Number of bins",
  "histogram.showGrid": "Show grid",
  "histogram.showXAxis": "Show X axis",
  "histogram.showYAxis": "Show Y axis",
  "histogram.showTooltip": "Show tooltips",
  "histogram.animate": "Animate transitions",
  
  "radar.data": "Array of objects",
  "radar.axis": "Data key for axis labels",
  "radar.series": "Array of series definitions",
  "radar.height": "Chart height in pixels",
  "radar.levels": "Number of levels",
  "radar.fillOpacity": "Fill opacity",
  "radar.showAxisLabels": "Show axis labels",
  "radar.showLegend": "Show legend",
  "radar.animate": "Animate transitions",
  
  "treemap.data": "Array of objects or nested hierarchy",
  "treemap.value": "Data key for values",
  "treemap.label": "Data key for labels",
  "treemap.group": "Data key for grouping",
  "treemap.childrenKey": "Key for nested children",
  "treemap.height": "Chart height in pixels",
  "treemap.padding": "Cell padding",
  "treemap.showLabels": "Show labels",
  "treemap.showValues": "Show values",
  "treemap.showLegend": "Show legend",
  "treemap.showTooltip": "Show tooltips",
  "treemap.animate": "Animate transitions",
  
  "waterfall.data": "Array of objects with value and isTotal",
  "waterfall.height": "Chart height in pixels",
  "waterfall.animate": "Animate transitions",
  
  "sankey.data": "Object with nodes and links",
  "sankey.height": "Chart height in pixels",
  "sankey.animate": "Animate transitions",
  
  "mekko.data": "Object with categories and series",
  "mekko.height": "Chart height in pixels",
  "mekko.animate": "Animate transitions",
  
  "butterfly.data": "Array of objects",
  "butterfly.category": "Data key for categories",
  "butterfly.left": "Data key for left side",
  "butterfly.right": "Data key for right side",
  "butterfly.height": "Chart height in pixels",
  "butterfly.showLegend": "Show legend",
  "butterfly.animate": "Animate transitions",
  
  "heatmap.data": "Array of objects",
  "heatmap.rowKey": "Data key for rows",
  "heatmap.columnKey": "Data key for columns",
  "heatmap.valueKey": "Data key for cell values",
  "heatmap.height": "Chart height in pixels",
  "heatmap.cellPadding": "Cell padding",
  "heatmap.showLegend": "Show legend",
  "heatmap.animate": "Animate transitions",
  
  "sunburst.data": "Nested hierarchy object",
  "sunburst.value": "Data key for values",
  "sunburst.label": "Data key for labels",
  "sunburst.childrenKey": "Key for children",
  "sunburst.height": "Chart height in pixels",
  "sunburst.innerRadius": "Inner radius",
  "sunburst.showLabels": "Show labels",
  "sunburst.showLegend": "Show legend",
  "sunburst.animate": "Animate transitions",
  
  "quadrant.data": "Array of objects",
  "quadrant.x": "Data key for X values",
  "quadrant.y": "Data key for Y values",
  "quadrant.size": "Data key for bubble sizes",
  "quadrant.label": "Data key for labels",
  "quadrant.xThreshold": "X threshold",
  "quadrant.yThreshold": "Y threshold",
  "quadrant.height": "Chart height in pixels",
  "quadrant.showLegend": "Show legend",
  "quadrant.animate": "Animate transitions"
}
```

- [ ] **Step 2: Verify file created**

Run:
```bash
cat src/locales/en/propDocs.json | jq '.line' | head
```

Expected: Shows line chart properties

- [ ] **Step 3: Commit**

```bash
git add src/locales/en/propDocs.json
git commit -m "feat: add English propDocs translations"
```

---

## Task 8: Create useRTL Hook

**Files:**
- Create: `src/useRTL.ts`

- [ ] **Step 1: Create useRTL hook**

```typescript
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useRTL() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = i18n.language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [i18n.language]);
}
```

- [ ] **Step 2: Verify file created**

Run:
```bash
ls -la src/useRTL.ts
```

Expected: File exists

- [ ] **Step 3: Commit**

```bash
git add src/useRTL.ts
git commit -m "feat: create useRTL hook for RTL support"
```

---

## Task 9: Create LanguageSwitcher Component

**Files:**
- Create: `src/LanguageSwitcher.tsx`

- [ ] **Step 1: Create LanguageSwitcher component**

```typescript
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'fr', label: 'Français', native: 'Français' },
    { code: 'ar', label: 'العربية', native: 'العربية' },
    { code: 'kn', label: 'ಕನ್ನಡ', native: 'ಕನ್ನಡ' },
  ];

  const currentLang = languages.find((l) => l.code === i18n.language);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        {currentLang?.native || 'EN'}
      </button>
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${i18n.language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.native}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify file created**

Run:
```bash
cat src/LanguageSwitcher.tsx | head -10
```

Expected: Component code visible

- [ ] **Step 3: Commit**

```bash
git add src/LanguageSwitcher.tsx
git commit -m "feat: create LanguageSwitcher component"
```

---

## Task 10: Create RTL Stylesheet

**Files:**
- Create: `src/styles-rtl.css`

- [ ] **Step 1: Create RTL stylesheet**

```css
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

html[dir="rtl"] .app {
  direction: rtl;
}

html[dir="rtl"] .header {
  flex-direction: row-reverse;
}

html[dir="rtl"] .brand {
  flex-direction: row-reverse;
}

html[dir="rtl"] .nav {
  flex-direction: row-reverse;
}

html[dir="rtl"] .language-switcher {
  margin-left: 0;
  margin-right: 1rem;
}

html[dir="rtl"] .language-dropdown {
  right: auto;
  left: 0;
  text-align: right;
}

html[dir="rtl"] .main {
  direction: rtl;
}

html[dir="rtl"] .gallery-grid {
  direction: rtl;
}

html[dir="rtl"] table {
  text-align: right;
}

html[dir="rtl"] code {
  direction: ltr;
  text-align: left;
}

html[dir="rtl"] .props-table th,
html[dir="rtl"] .props-table td {
  text-align: right;
}

html[dir="rtl"] .docs-chart-head {
  flex-direction: row-reverse;
}
```

- [ ] **Step 2: Verify file created**

Run:
```bash
ls -la src/styles-rtl.css
```

Expected: File exists

- [ ] **Step 3: Commit**

```bash
git add src/styles-rtl.css
git commit -m "feat: add RTL stylesheet"
```

---

## Task 11: Update main.tsx to Initialize i18n

**Files:**
- Modify: `src/main.tsx`

- [ ] **Step 1: Read current main.tsx**

Run:
```bash
cat src/main.tsx
```

Expected: Current content shown

- [ ] **Step 2: Update main.tsx to import i18n**

Add at the top of the file (after imports, before ReactDOM):
```typescript
import './i18n';
```

Full file should look like:
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 3: Verify syntax**

Run:
```bash
cat src/main.tsx | head -10
```

Expected: Import statement visible

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx
git commit -m "feat: initialize i18n in main.tsx"
```

---

## Task 12: Update App.tsx for i18n and Language Switcher

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update App.tsx with i18n and RTL hook**

Replace the entire file with:
```typescript
import './styles.css';
import './styles-rtl.css';
import { useHashRoute } from './useHashRoute';
import { Gallery } from './Gallery';
import { Examples } from './Examples';
import { Docs } from './Docs';
import { Playground } from './Playground';
import { charts } from './registry';
import { useTranslation } from 'react-i18next';
import { useRTL } from './useRTL';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function App() {
  const [route, navigate] = useHashRoute();
  const { t } = useTranslation();
  useRTL();

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <h1>react-d3-viz</h1>
          <span className="tagline">{t('tagline')}</span>
        </div>
        <nav className="nav">
          <button
            className={route.view === 'gallery' ? 'nav-active' : ''}
            onClick={() => navigate({ view: 'gallery' })}
          >
            {t('nav.gallery')}
          </button>
          <button
            className={route.view === 'examples' ? 'nav-active' : ''}
            onClick={() => navigate({ view: 'examples' })}
          >
            {t('nav.examples')}
          </button>
          <button
            className={route.view === 'docs' ? 'nav-active' : ''}
            onClick={() => navigate({ view: 'docs' })}
          >
            {t('nav.docs')}
          </button>
          <button
            className={route.view === 'playground' ? 'nav-active' : ''}
            onClick={() => navigate({ view: 'playground', chartId: charts[0].id })}
          >
            {t('nav.playground')}
          </button>
          <a className="nav-ext" href="https://www.npmjs.com/package/react-d3-viz" target="_blank" rel="noreferrer">
            {t('nav.npm')}
          </a>
          <a className="nav-ext" href="https://github.com/kiranb555/react-d3-viz" target="_blank" rel="noreferrer">
            {t('nav.github')}
          </a>
          <LanguageSwitcher />
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
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Verify syntax**

Run:
```bash
npm run build 2>&1 | head -20
```

Expected: No syntax errors (compilation may have type issues, that's ok)

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: integrate i18n and language switcher in App"
```

---

## Task 13: Add Language Switcher Styles

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Read current styles.css**

Run:
```bash
tail -20 src/styles.css
```

Expected: Current footer styles shown

- [ ] **Step 2: Add LanguageSwitcher styles to end of styles.css**

Append to file:
```css
.language-switcher {
  margin-left: auto;
  margin-right: 1rem;
  position: relative;
}

.language-button {
  padding: 0.5rem 0.75rem;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  color: inherit;
  transition: all 0.2s ease;
}

.language-button:hover {
  border-color: #999;
  background-color: #f5f5f5;
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 120px;
}

.language-option {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  color: inherit;
  transition: background-color 0.2s ease;
}

.language-option:hover {
  background-color: #f5f5f5;
}

.language-option.active {
  background-color: #e8e8e8;
  font-weight: 600;
}

.language-option:not(:last-child) {
  border-bottom: 1px solid #eee;
}
```

- [ ] **Step 3: Verify styles added**

Run:
```bash
grep -c "language-switcher" src/styles.css
```

Expected: Output is 1 or higher

- [ ] **Step 4: Commit**

```bash
git add src/styles.css
git commit -m "feat: add language switcher styles"
```

---

## Task 14: Update Gallery.tsx to Use Translations

**Files:**
- Modify: `src/Gallery.tsx`

- [ ] **Step 1: Read Gallery.tsx**

Run:
```bash
cat src/Gallery.tsx | head -30
```

Expected: Current content shown

- [ ] **Step 2: Update Gallery.tsx to use translations**

Replace with:
```typescript
import { useTranslation } from 'react-i18next';
import { charts } from './registry';
import type { Route } from './useHashRoute';

export function Gallery({ navigate }: { navigate: (r: Route) => void }) {
  const { t } = useTranslation(['common', 'registry']);

  return (
    <div className="gallery">
      {charts.map((c) => (
        <div key={c.id} className="gallery-item">
          <h3>{t(`charts.${c.id}.title`, c.title)}</h3>
          <p>{t(`charts.${c.id}.blurb`, c.blurb)}</p>
          <button
            className="btn"
            onClick={() => navigate({ view: 'playground', chartId: c.id })}
          >
            {t('nav.playground')}
          </button>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Verify file updated**

Run:
```bash
grep -c "useTranslation" src/Gallery.tsx
```

Expected: Output is 1 or higher

- [ ] **Step 4: Commit**

```bash
git add src/Gallery.tsx
git commit -m "feat: add translations to Gallery component"
```

---

## Task 15: Update Examples.tsx to Use Translations

**Files:**
- Modify: `src/Examples.tsx`

- [ ] **Step 1: Read Examples.tsx**

Run:
```bash
cat src/Examples.tsx | head -30
```

Expected: Current content shown

- [ ] **Step 2: Update Examples.tsx to use translations**

Replace with:
```typescript
import { useTranslation } from 'react-i18next';
import { charts } from './registry';
import type { Route } from './useHashRoute';

export function Examples({ navigate }: { navigate: (r: Route) => void }) {
  const { t } = useTranslation(['common', 'registry']);

  return (
    <div className="examples">
      {charts.map((c) => (
        <div key={c.id} className="examples-chart">
          <h2>{t(`charts.${c.id}.title`, c.title)}</h2>
          {c.examples.map((ex, idx) => {
            const titleKey = `charts.${c.id}.examples.${ex.title.toLowerCase().replace(/\s+/g, '')}`;
            const descKey = `${titleKey}.title`;
            return (
              <div key={idx} className="examples-preset">
                <h3>{t(`${titleKey}.title`, ex.title)}</h3>
                <p>{t(`${titleKey}.description`, ex.description)}</p>
                <button
                  className="btn-link"
                  onClick={() => navigate({ view: 'playground', chartId: c.id, preset: ex.title })}
                >
                  {t('playground.tryPlayground', 'Try in playground →')}
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Verify file updated**

Run:
```bash
grep -c "useTranslation" src/Examples.tsx
```

Expected: Output is 1 or higher

- [ ] **Step 4: Commit**

```bash
git add src/Examples.tsx
git commit -m "feat: add translations to Examples component"
```

---

## Task 16: Update Playground.tsx to Use Translations

**Files:**
- Modify: `src/Playground.tsx`

- [ ] **Step 1: Read current Playground.tsx to find all hardcoded strings**

Run:
```bash
grep -n "label=\|Terminal\|Try in playground" src/Playground.tsx
```

Expected: Hardcoded strings shown

- [ ] **Step 2: Add useTranslation hook and update Playground.tsx**

Add to imports:
```typescript
import { useTranslation } from 'react-i18next';
```

Then in component, add near top:
```typescript
const { t } = useTranslation(['common', 'registry']);
```

Replace hardcoded strings:
- `label="Terminal"` → `label={t('terminal')}`
- `Try in playground →` → `{t('playground.tryPlayground')}`

- [ ] **Step 3: Verify changes**

Run:
```bash
grep "useTranslation" src/Playground.tsx
```

Expected: Import statement visible

- [ ] **Step 4: Commit**

```bash
git add src/Playground.tsx
git commit -m "feat: add translations to Playground component"
```

---

## Task 17: Update Docs.tsx to Use Translations

**Files:**
- Modify: `src/Docs.tsx`

- [ ] **Step 1: Update Docs.tsx to use translations**

Replace with:
```typescript
import { useTranslation } from 'react-i18next';
import { charts } from './registry';
import { propDocs, seriesConfig, type PropDoc } from './propDocs';
import { buildSnippet } from './snippet';
import { CodeBlock } from './CodeBlock';
import type { Route } from './useHashRoute';

function PropsTable({ rows }: { rows: PropDoc[] }) {
  const { t } = useTranslation('docs');

  return (
    <table className="props-table">
      <thead>
        <tr>
          <th>{t('propDocs.prop', 'Prop')}</th>
          <th>{t('propDocs.type', 'Type')}</th>
          <th>{t('propDocs.default', 'Default')}</th>
          <th>{t('propDocs.description', 'Description')}</th>
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
  const { t } = useTranslation(['docs', 'common', 'registry']);

  return (
    <div className="docs">
      <section className="docs-intro">
        <h2>{t('docs.gettingStarted.title')}</h2>
        <p>{t('docs.gettingStarted.intro')}</p>
        <CodeBlock code={t('docs.npm')} label={t('terminal')} />
        <p>{t('docs.series')}</p>

        <h3>{t('docs.seriesConfig.title')}</h3>
        <p>{t('docs.seriesConfig.desc')}</p>
        <PropsTable rows={seriesConfig} />
      </section>

      {charts.map((c) => {
        const ds = c.datasets[0];
        const usage = buildSnippet(c.componentName, ds, c.defaultProps);
        return (
          <section className="docs-chart" key={c.id}>
            <div className="docs-chart-head">
              <h2>{t(`charts.${c.id}.title`, c.title)}</h2>
              <button
                className="btn-link"
                onClick={() => navigate({ view: 'playground', chartId: c.id })}
              >
                {t('playground.tryPlayground', 'Try in playground →')}
              </button>
            </div>
            <p className="docs-blurb">{t(`charts.${c.id}.blurb`, c.blurb)}</p>
            <CodeBlock code={usage} label={`${c.componentName} usage`} />
            <h3>{t('docs.props')}</h3>
            <PropsTable rows={propDocs[c.id]} />
          </section>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Verify file updated**

Run:
```bash
grep -c "useTranslation" src/Docs.tsx
```

Expected: Output is 1 or higher

- [ ] **Step 3: Commit**

```bash
git add src/Docs.tsx
git commit -m "feat: add translations to Docs component"
```

---

## Task 18: Create French Translations (common.json)

**Files:**
- Create: `src/locales/fr/common.json`

- [ ] **Step 1: Create French common.json**

```json
{
  "nav.gallery": "Galerie",
  "nav.examples": "Exemples",
  "nav.docs": "Documentation",
  "nav.playground": "Playground",
  "nav.npm": "npm ↗",
  "nav.github": "GitHub ↗",
  "tagline": "Graphiques SVG multiplateformes pour React et React Native",
  "footer.text": "Construit avec <code>react-d3-viz</code> · installer via <code>npm i react-d3-viz</code>",
  "footer.install": "installer via",
  "language.english": "Anglais",
  "language.french": "Français",
  "language.arabic": "Arabe",
  "language.kannada": "Kannada",
  "playground.tryPlayground": "Essayer dans le playground →",
  "terminal": "Terminal"
}
```

- [ ] **Step 2: Verify file**

Run:
```bash
cat src/locales/fr/common.json | jq '.nav.gallery'
```

Expected: Output is "Galerie"

- [ ] **Step 3: Commit**

```bash
git add src/locales/fr/common.json
git commit -m "feat: add French common translations"
```

---

## Task 19: Create French Translations (registry.json)

**Files:**
- Create: `src/locales/fr/registry.json`

- [ ] **Step 1: Create French registry.json (translated chart titles and descriptions)**

Use French translations for all chart titles, descriptions, and examples. Example:
```json
{
  "charts.line.title": "Courbe",
  "charts.line.blurb": "Graphique en courbe multi-séries avec points optionnels et interpolation.",
  "charts.line.examples.smooth.title": "Courbe lisse multi-séries",
  "charts.line.examples.smooth.description": "Deux séries avec courbes monotones et points.",
  "charts.line.examples.stepped.title": "Escalier",
  "charts.line.examples.stepped.description": "Interpolation en escalier pour les changements discrets.",
  "charts.line.examples.dashed.title": "Comparaison pointillée",
  "charts.line.examples.dashed.description": "Une deuxième série pointillée via series[].dashArray.",
  "charts.line.examples.single.title": "Série unique",
  "charts.line.examples.single.description": "Une courbe sur le trafic hebdomadaire, sans légende.",
  
  "charts.area.title": "Zone",
  "charts.area.blurb": "Graphique en courbe avec la région sous chaque série remplie.",
  "charts.area.examples.multi.title": "Remplissage multi-séries",
  "charts.area.examples.multi.description": "Deux régions remplies superposées.",
  "charts.area.examples.single.title": "Série unique + points",
  "charts.area.examples.single.description": "Une zone pour la température, avec des points.",
  
  "charts.bar.title": "Barres",
  "charts.bar.blurb": "Barres groupées ou empilées dans les catégories.",
  "charts.bar.examples.grouped.title": "Groupé",
  "charts.bar.examples.grouped.description": "Barres côte à côte par catégorie.",
  "charts.bar.examples.stacked.title": "Empilé",
  "charts.bar.examples.stacked.description": "Séries empilées les unes sur les autres.",
  "charts.bar.examples.rounded.title": "Arrondi",
  "charts.bar.examples.rounded.description": "Barres plus douces avec un rayon de coin plus grand.",
  "charts.bar.examples.single.title": "Série unique",
  "charts.bar.examples.single.description": "Juste les ventes, sans légende.",
  
  "charts.scatter.title": "Nuage de points",
  "charts.scatter.blurb": "Points sur les axes x/y numériques.",
  "charts.scatter.examples.random.title": "Nuage aléatoire",
  "charts.scatter.examples.random.description": "Bruit uniforme dans le plan.",
  "charts.scatter.examples.correlated.title": "Corrélé",
  "charts.scatter.examples.correlated.description": "Une tendance positive claire dans les données.",
  "charts.scatter.examples.large.title": "Points larges",
  "charts.scatter.examples.large.description": "Points plus grands pour les données rares.",
  
  "charts.bubble.title": "Bulles",
  "charts.bubble.blurb": "Nuage de points avec une troisième dimension codée en surface de bulle.",
  "charts.bubble.examples.default.title": "Plage par défaut",
  "charts.bubble.examples.default.description": "La surface de bulle encode la taille.",
  "charts.bubble.examples.correlated.title": "Corrélé",
  "charts.bubble.examples.correlated.description": "Taille sur un nuage tendanciel.",
  "charts.bubble.examples.wider.title": "Plage de rayon plus large",
  "charts.bubble.examples.wider.description": "Tailles de bulle exagérées.",
  
  "charts.pie.title": "Secteurs / Beignet",
  "charts.pie.blurb": "Graphique en secteurs ; définissez innerRadius pour un beignet.",
  "charts.pie.examples.pie.title": "Secteurs",
  "charts.pie.examples.pie.description": "Graphique en secteurs classique avec étiquettes.",
  "charts.pie.examples.donut.title": "Beignet",
  "charts.pie.examples.donut.description": "Centre creux via innerRadius.",
  "charts.pie.examples.gapped.title": "Beignet à espacement",
  "charts.pie.examples.gapped.description": "Secteurs rembourés et arrondis.",
  "charts.pie.examples.market.title": "Part de marché",
  "charts.pie.examples.market.description": "Un ensemble de données différent sous forme de beignet.",
  
  "charts.histogram.title": "Histogramme",
  "charts.histogram.blurb": "Classe un ensemble de valeurs numériques et affiche les décomptes.",
  "charts.histogram.examples.few.title": "Peu de bacs",
  "charts.histogram.examples.few.description": "Bacs grossiers pour une vue générale.",
  "charts.histogram.examples.many.title": "Beaucoup de bacs",
  "charts.histogram.examples.many.description": "Distribution granulaire fine.",
  "charts.histogram.examples.skewed.title": "Revenus asymétriques",
  "charts.histogram.examples.skewed.description": "Un ensemble de données asymétrique à droite.",
  
  "charts.radar.title": "Radar",
  "charts.radar.blurb": "Polygone par série sur un ensemble d'axes.",
  "charts.radar.examples.team.title": "Équipe vs rivale",
  "charts.radar.examples.team.description": "Deux polygones sur six axes.",
  "charts.radar.examples.skills.title": "Profil des compétences",
  "charts.radar.examples.skills.description": "Points forts frontal vs arrière-plan.",
  "charts.radar.examples.rings.title": "Plus d'anneaux",
  "charts.radar.examples.rings.description": "Six niveaux de grille pour une lecture plus fine.",
  
  "charts.treemap.title": "Carte thermique hiérarchique",
  "charts.treemap.blurb": "Rectangles imbriqués dimensionnés par valeur — plat, groupé ou hiérarchie complète.",
  "charts.treemap.examples.flat.title": "Plat",
  "charts.treemap.examples.flat.description": "Un rectangle par enregistrement, dimensionné par valeur.",
  "charts.treemap.examples.grouped.title": "Groupé",
  "charts.treemap.examples.grouped.description": "Carte thermique hiérarchique à deux niveaux colorée par groupe.",
  "charts.treemap.examples.nested.title": "Hiérarchie imbriquée",
  "charts.treemap.examples.nested.description": "Une hiérarchie profonde ; feuilles colorées par leur branche de haut niveau.",
  "charts.treemap.examples.noLabels.title": "Pas d'étiquettes",
  "charts.treemap.examples.noLabels.description": "Masquer les étiquettes des cellules pour un look de carte thermique pure.",
  
  "charts.waterfall.title": "Cascade",
  "charts.waterfall.blurb": "Montre l'effet cumulatif des valeurs positives et négatives séquentielles.",
  "charts.waterfall.examples.revenue.title": "Flux de revenus",
  "charts.waterfall.examples.revenue.description": "Revenus de base avec coûts et revenu net.",
  "charts.waterfall.examples.multiStep.title": "Multi-étape",
  "charts.waterfall.examples.multiStep.description": "Ventilation trimestrielle avec sous-totaux.",
  "charts.waterfall.examples.formatter.title": "Formateur personnalisé",
  "charts.waterfall.examples.formatter.description": "Formater les valeurs avec une fonction personnalisée.",
  
  "charts.sankey.title": "Sankey",
  "charts.sankey.blurb": "Affiche les relations de flux des sources aux cibles avec largeurs de lien proportionnelles.",
  "charts.sankey.examples.simple.title": "Flux simple",
  "charts.sankey.examples.simple.description": "Deux sources vers deux récepteurs.",
  "charts.sankey.examples.complex.title": "Réseau complexe",
  "charts.sankey.examples.complex.description": "Flux multi-couches avec de nombreuses connexions.",
  "charts.sankey.examples.custom.title": "Couleurs personnalisées",
  "charts.sankey.examples.custom.description": "Remplacement de couleur par nœud.",
  
  "charts.mekko.title": "Mekko",
  "charts.mekko.blurb": "Catégories en colonnes avec largeur proportionnelle à la valeur, séries empilées.",
  "charts.mekko.examples.quarterly.title": "Produits trimestriels",
  "charts.mekko.examples.quarterly.description": "Mélange de produits dans les trimestres.",
  "charts.mekko.examples.market.title": "Segments de marché",
  "charts.mekko.examples.market.description": "Revenus par région et niveau.",
  "charts.mekko.examples.formatters.title": "Formateurs personnalisés",
  "charts.mekko.examples.formatters.description": "Formater les catégories et les valeurs.",
  
  "charts.butterfly.title": "Papillon",
  "charts.butterfly.blurb": "Graphique en barres dos à dos, idéal pour comparer deux séries opposées.",
  "charts.butterfly.examples.age.title": "Pyramide d'âge",
  "charts.butterfly.examples.age.description": "Distribution de la population par âge et sexe.",
  "charts.butterfly.examples.department.title": "Sexe du département",
  "charts.butterfly.examples.department.description": "Ventilation de l'effectif par département.",
  "charts.butterfly.examples.labels.title": "Étiquettes personnalisées gauche/droite",
  "charts.butterfly.examples.labels.description": "Remplacer les étiquettes par défaut Homme/Femme.",
  
  "charts.heatmap.title": "Carte thermique",
  "charts.heatmap.blurb": "Grille codée par couleur montrant les relations sur deux dimensions.",
  "charts.heatmap.examples.sales.title": "Ventes par région",
  "charts.heatmap.examples.sales.description": "Revenus des produits en Amérique du Nord, Europe, Asie et LATAM.",
  "charts.heatmap.examples.utilization.title": "Utilisation du travail d'équipe",
  "charts.heatmap.examples.utilization.description": "Pourcentages d'utilisation quotidienne de l'équipe (chaud = occupé).",
  "charts.heatmap.examples.dense.title": "Cellules denses",
  "charts.heatmap.examples.dense.description": "Rembourrage minimal pour une grille compacte.",
  
  "charts.sunburst.title": "Sunburst",
  "charts.sunburst.blurb": "Graphique radial hiérarchique affichant les données imbriquées en anneaux concentriques.",
  "charts.sunburst.examples.org.title": "Organisation",
  "charts.sunburst.examples.org.description": "Hiérarchie de l'entreprise : départements et équipes.",
  "charts.sunburst.examples.files.title": "Tailles de fichiers",
  "charts.sunburst.examples.files.description": "Structure du projet avec tailles de fichiers.",
  "charts.sunburst.examples.legend.title": "Légende uniquement",
  "charts.sunburst.examples.legend.description": "Masquer les étiquettes pour un visuel propre.",
  
  "charts.quadrant.title": "Quadrant",
  "charts.quadrant.blurb": "Nuage de points divisé en quatre quadrants par des lignes de référence.",
  "charts.quadrant.examples.impact.title": "Matrice impact-effort",
  "charts.quadrant.examples.impact.description": "Hiérarchisation des projets : impact élevé + effort faible = gains rapides.",
  "charts.quadrant.examples.performance.title": "Grille de performance",
  "charts.quadrant.examples.performance.description": "Satisfaction des employés par rapport à la productivité.",
  "charts.quadrant.examples.thresholds.title": "Seuils personnalisés",
  "charts.quadrant.examples.thresholds.description": "Ajuster les lignes de division à 5/5 pour un fractionnement de quadrant différent."
}
```

- [ ] **Step 2: Verify file created**

Run:
```bash
cat src/locales/fr/registry.json | jq '.charts.line.title'
```

Expected: Output is "Courbe"

- [ ] **Step 3: Commit**

```bash
git add src/locales/fr/registry.json
git commit -m "feat: add French registry translations"
```

---

## Task 20: Create French Translations (docs.json)

**Files:**
- Create: `src/locales/fr/docs.json`

- [ ] **Step 1: Create French docs.json**

```json
{
  "docs.gettingStarted.title": "Premiers pas",
  "docs.gettingStarted.intro": "Installez le paquet et importez le graphique dont vous avez besoin. Chaque graphique prend un tableau <code>data</code> plus quelques accesseurs <em>accessor</em> props (comme <code>x</code>, <code>value</code> ou <code>series</code>) qui indiquent quels champs lire.",
  "docs.npm": "npm i react-d3-viz",
  "docs.series": "Passez plusieurs séries via <code>series='{[{ dataKey: 'sales' }, …]}'</code>, ou une seule série avec le raccourci <code>y</code>. Les couleurs, les polices et l'espacement proviennent d'un <code>theme</code> que vous pouvez partiellement remplacer.",
  "docs.seriesConfig.title": "SeriesConfig",
  "docs.seriesConfig.desc": "Chaque entrée dans le tableau <code>series</code> d'un graphique (ou le <code>series</code> radar) :",
  "docs.props": "Propriétés",
  "propDocs.prop": "Propriété",
  "propDocs.type": "Type",
  "propDocs.default": "Par défaut",
  "propDocs.description": "Description"
}
```

- [ ] **Step 2: Verify file**

Run:
```bash
cat src/locales/fr/docs.json | jq '.docs.gettingStarted.title'
```

Expected: Output is "Premiers pas"

- [ ] **Step 3: Commit**

```bash
git add src/locales/fr/docs.json
git commit -m "feat: add French docs translations"
```

---

## Task 21: Create French Translations (propDocs.json)

**Files:**
- Create: `src/locales/fr/propDocs.json`

- [ ] **Step 1: Create French propDocs.json (minimal props descriptions)**

```json
{
  "line.data": "Tableau d'objets",
  "line.x": "Clé de données pour les valeurs de l'axe X",
  "line.series": "Tableau de définitions de séries",
  "line.height": "Hauteur du graphique en pixels",
  "line.showPoints": "Afficher les marqueurs de points",
  "line.curve": "Méthode d'interpolation de courbe",
  "line.showLegend": "Afficher la légende",
  "line.showGrid": "Afficher la grille",
  "line.showXAxis": "Afficher l'axe X",
  "line.showYAxis": "Afficher l'axe Y",
  "line.showTooltip": "Afficher les infobulle",
  "line.animate": "Animer les transitions",
  
  "area.data": "Tableau d'objets",
  "area.x": "Clé de données pour les valeurs de l'axe X",
  "area.series": "Tableau de définitions de séries",
  "area.height": "Hauteur du graphique en pixels",
  "area.showLegend": "Afficher la légende",
  "area.showGrid": "Afficher la grille",
  "area.showXAxis": "Afficher l'axe X",
  "area.showYAxis": "Afficher l'axe Y",
  "area.showTooltip": "Afficher les infobulle",
  "area.animate": "Animer les transitions",
  
  "bar.data": "Tableau d'objets",
  "bar.x": "Clé de données pour les catégories",
  "bar.series": "Tableau de définitions de séries",
  "bar.height": "Hauteur du graphique en pixels",
  "bar.stacked": "Empiler les barres verticalement",
  "bar.radius": "Rayon du coin",
  "bar.showLegend": "Afficher la légende",
  "bar.showGrid": "Afficher la grille",
  "bar.showXAxis": "Afficher l'axe X",
  "bar.showYAxis": "Afficher l'axe Y",
  "bar.showTooltip": "Afficher les infobulle",
  "bar.animate": "Animer les transitions"
}
```

- [ ] **Step 2: Verify file**

Run:
```bash
cat src/locales/fr/propDocs.json | jq '.bar.data'
```

Expected: Output is "Tableau d'objets"

- [ ] **Step 3: Commit**

```bash
git add src/locales/fr/propDocs.json
git commit -m "feat: add French propDocs translations"
```

---

## Task 22: Create Arabic Translations (common.json)

**Files:**
- Create: `src/locales/ar/common.json`

- [ ] **Step 1: Create Arabic common.json**

```json
{
  "nav.gallery": "المعرض",
  "nav.examples": "أمثلة",
  "nav.docs": "التوثيق",
  "nav.playground": "ساحة اللعب",
  "nav.npm": "npm ↗",
  "nav.github": "GitHub ↗",
  "tagline": "رسوم بيانية SVG متعددة الأنظمة الأساسية لـ React و React Native",
  "footer.text": "مصنوع باستخدام <code>react-d3-viz</code> · التثبيت عبر <code>npm i react-d3-viz</code>",
  "footer.install": "التثبيت عبر",
  "language.english": "English",
  "language.french": "Français",
  "language.arabic": "العربية",
  "language.kannada": "ಕನ್ನಡ",
  "playground.tryPlayground": "جرب في ساحة اللعب ←",
  "terminal": "Terminal"
}
```

- [ ] **Step 2: Verify file**

Run:
```bash
cat src/locales/ar/common.json | jq '.nav.gallery'
```

Expected: Output is "المعرض"

- [ ] **Step 3: Commit**

```bash
git add src/locales/ar/common.json
git commit -m "feat: add Arabic common translations"
```

---

## Task 23: Create Arabic Translations (registry.json)

**Files:**
- Create: `src/locales/ar/registry.json`

- [ ] **Step 1: Create Arabic registry.json (translated chart titles and descriptions)**

```json
{
  "charts.line.title": "خط",
  "charts.line.blurb": "مخطط خطي متعدد السلاسل مع نقاط اختيارية واستيفاء المنحنى.",
  "charts.line.examples.smooth.title": "منحنى سلس متعدد السلاسل",
  "charts.line.examples.smooth.description": "سلسلتان مع منحنيات رتيبة ونقاط.",
  "charts.line.examples.stepped.title": "خطوة",
  "charts.line.examples.stepped.description": "استيفاء الخطوات للتغييرات المنفصلة.",
  "charts.line.examples.dashed.title": "مقارنة متقطعة",
  "charts.line.examples.dashed.description": "سلسلة ثانية متقطعة عبر series[].dashArray.",
  "charts.line.examples.single.title": "سلسلة واحدة",
  "charts.line.examples.single.description": "خط واحد مقابل حركة المرور الأسبوعية، بدون وسيلة إيضاح.",
  
  "charts.area.title": "منطقة",
  "charts.area.blurb": "مخطط خطي مع ملء المنطقة الواقعة تحت كل سلسلة.",
  "charts.area.examples.multi.title": "ملء متعدد السلاسل",
  "charts.area.examples.multi.description": "منطقتان مملوءتان متراكمتان.",
  "charts.area.examples.single.title": "سلسلة واحدة + نقاط",
  "charts.area.examples.single.description": "منطقة واحدة للحرارة، بها نقاط.",
  
  "charts.bar.title": "أعمدة",
  "charts.bar.blurb": "أعمدة مجمعة أو مرصوصة عبر الفئات.",
  "charts.bar.examples.grouped.title": "مجمع",
  "charts.bar.examples.grouped.description": "أعمدة جنباً إلى جنب حسب الفئة.",
  "charts.bar.examples.stacked.title": "مرصوص",
  "charts.bar.examples.stacked.description": "السلاسل مرصوصة فوق بعضها البعض.",
  "charts.bar.examples.rounded.title": "مستدير",
  "charts.bar.examples.rounded.description": "أعمدة أكثر نعومة مع نصف قطر زاوية أكبر.",
  "charts.bar.examples.single.title": "سلسلة واحدة",
  "charts.bar.examples.single.description": "فقط المبيعات، بدون وسيلة إيضاح.",
  
  "charts.scatter.title": "تشتت",
  "charts.scatter.blurb": "نقاط على محاور x/y رقمية.",
  "charts.scatter.examples.random.title": "سحابة عشوائية",
  "charts.scatter.examples.random.description": "ضوضاء موحدة عبر الطائرة.",
  "charts.scatter.examples.correlated.title": "مرتبط",
  "charts.scatter.examples.correlated.description": "اتجاه إيجابي واضح في البيانات.",
  "charts.scatter.examples.large.title": "نقاط كبيرة",
  "charts.scatter.examples.large.description": "نقاط أكبر للبيانات المتفرقة.",
  
  "charts.bubble.title": "فقاعات",
  "charts.bubble.blurb": "تشتت مع بُعد ثالث مشفر كمنطقة فقاعة.",
  "charts.bubble.examples.default.title": "النطاق الافتراضي",
  "charts.bubble.examples.default.description": "مساحة الفقاعة تشفر الحجم.",
  "charts.bubble.examples.correlated.title": "مرتبط",
  "charts.bubble.examples.correlated.description": "الحجم على سحابة تتجه.",
  "charts.bubble.examples.wider.title": "نطاق نصف قطر أوسع",
  "charts.bubble.examples.wider.description": "أحجام فقاعات مبالغ فيها.",
  
  "charts.pie.title": "فطيرة / كعكة",
  "charts.pie.blurb": "مخطط دائري؛ اضبط innerRadius على كعكة.",
  "charts.pie.examples.pie.title": "فطيرة",
  "charts.pie.examples.pie.description": "مخطط دائري كلاسيكي مع تسميات.",
  "charts.pie.examples.donut.title": "كعكة",
  "charts.pie.examples.donut.description": "مركز مجوف عبر innerRadius.",
  "charts.pie.examples.gapped.title": "كعكة مع فجوات",
  "charts.pie.examples.gapped.description": "شرائح مبطنة ومستديرة.",
  "charts.pie.examples.market.title": "حصة السوق",
  "charts.pie.examples.market.description": "مجموعة بيانات مختلفة كحلوى.",
  
  "charts.histogram.title": "الرسم البياني",
  "charts.histogram.blurb": "يصنف مجموعة من القيم الرقمية ويعرض الأعداد.",
  "charts.histogram.examples.few.title": "عدد قليل من الحاويات",
  "charts.histogram.examples.few.description": "حاويات خشنة للحصول على عرض واسع.",
  "charts.histogram.examples.many.title": "عدد كبير من الحاويات",
  "charts.histogram.examples.many.description": "توزيع حبيبي دقيق.",
  "charts.histogram.examples.skewed.title": "دخل منحرف",
  "charts.histogram.examples.skewed.description": "مجموعة بيانات منحرفة لليمين.",
  
  "charts.radar.title": "رادار",
  "charts.radar.blurb": "مضلع لكل سلسلة عبر مجموعة من المحاور.",
  "charts.radar.examples.team.title": "الفريق مقابل الخصم",
  "charts.radar.examples.team.description": "مضلعان عبر ستة محاور.",
  "charts.radar.examples.skills.title": "ملف المهارات",
  "charts.radar.examples.skills.description": "نقاط القوة الأمامية مقابل الخلفية.",
  "charts.radar.examples.rings.title": "المزيد من الحلقات",
  "charts.radar.examples.rings.description": "ستة مستويات شبكة لقراءة أدق.",
  
  "charts.treemap.title": "خريطة الشجرة",
  "charts.treemap.blurb": "مستطيلات متداخلة بحجم القيمة - مسطحة أو مجمعة أو هرمية كاملة.",
  "charts.treemap.examples.flat.title": "مسطح",
  "charts.treemap.examples.flat.description": "مستطيل واحد لكل سجل، مقاس حسب القيمة.",
  "charts.treemap.examples.grouped.title": "مجمع",
  "charts.treemap.examples.grouped.description": "خريطة شجرة ثنائية المستوى ملونة حسب المجموعة.",
  "charts.treemap.examples.nested.title": "الهرمية المتداخلة",
  "charts.treemap.examples.nested.description": "هرمية عميقة؛ الأوراق ملونة حسب فرعها على المستوى الأعلى.",
  "charts.treemap.examples.noLabels.title": "بدون تسميات",
  "charts.treemap.examples.noLabels.description": "إخفاء تسميات الخلايا للحصول على مظهر خريطة حرارية نقي.",
  
  "charts.waterfall.title": "شلال",
  "charts.waterfall.blurb": "يوضح التأثير التراكمي للقيم الموجبة والسالبة المتسلسلة.",
  "charts.waterfall.examples.revenue.title": "تدفق الإيرادات",
  "charts.waterfall.examples.revenue.description": "الإيرادات الأساسية مع التكاليف والدخل الصافي.",
  "charts.waterfall.examples.multiStep.title": "متعدد الخطوات",
  "charts.waterfall.examples.multiStep.description": "توزيع ربع سنوي مع الإجماليات الجزئية.",
  "charts.waterfall.examples.formatter.title": "منسق مخصص",
  "charts.waterfall.examples.formatter.description": "تنسيق القيم بوظيفة مخصصة.",
  
  "charts.sankey.title": "سانكي",
  "charts.sankey.blurb": "يظهر علاقات التدفق من المصادر إلى الأهداف مع عروض الرابط المتناسبة.",
  "charts.sankey.examples.simple.title": "تدفق بسيط",
  "charts.sankey.examples.simple.description": "مصدرين إلى مستقبلين.",
  "charts.sankey.examples.complex.title": "شبكة معقدة",
  "charts.sankey.examples.complex.description": "تدفق متعدد الطبقات مع العديد من الاتصالات.",
  "charts.sankey.examples.custom.title": "ألوان مخصصة",
  "charts.sankey.examples.custom.description": "تجاوز اللون لكل عقدة.",
  
  "charts.mekko.title": "ميكو",
  "charts.mekko.blurb": "الفئات كأعمدة بعرض متناسب مع القيمة، السلاسل مرصوصة.",
  "charts.mekko.examples.quarterly.title": "المنتجات الفصلية",
  "charts.mekko.examples.quarterly.description": "مزيج المنتجات عبر الفصول.",
  "charts.mekko.examples.market.title": "قطاعات السوق",
  "charts.mekko.examples.market.description": "الإيرادات حسب المنطقة والمستوى.",
  "charts.mekko.examples.formatters.title": "منسقات مخصصة",
  "charts.mekko.examples.formatters.description": "تنسيق الفئات والقيم.",
  
  "charts.butterfly.title": "فراشة",
  "charts.butterfly.blurb": "مخطط عمودي ظهراً لظهر، مثالي لمقارنة سلسلتين معاكستين.",
  "charts.butterfly.examples.age.title": "هرم السكان",
  "charts.butterfly.examples.age.description": "توزيع السكان حسب العمر والجنس.",
  "charts.butterfly.examples.department.title": "جنس القسم",
  "charts.butterfly.examples.department.description": "تفصيل الموارد البشرية حسب القسم.",
  "charts.butterfly.examples.labels.title": "تسميات مخصصة يسار/يمين",
  "charts.butterfly.examples.labels.description": "تجاوز تسميات ذكر/أنثى الافتراضية.",
  
  "charts.heatmap.title": "خريطة حرارية",
  "charts.heatmap.blurb": "شبكة مشفرة بالألوان تظهر العلاقات عبر بُعدين.",
  "charts.heatmap.examples.sales.title": "المبيعات حسب المنطقة",
  "charts.heatmap.examples.sales.description": "إيرادات المنتجات عبر أمريكا الشمالية وأوروبا وآسيا وأمريكا اللاتينية.",
  "charts.heatmap.examples.utilization.title": "استخدام الفريق",
  "charts.heatmap.examples.utilization.description": "نسب استخدام الفريق اليومية (الدافئ = مشغول).",
  "charts.heatmap.examples.dense.title": "خلايا كثيفة",
  "charts.heatmap.examples.dense.description": "الحد الأدنى من الحشو لشبكة مضغوطة.",
  
  "charts.sunburst.title": "توهج الشمس",
  "charts.sunburst.blurb": "مخطط شعاعي هرمي يعرض البيانات المتداخلة كحلقات متحدة المركز.",
  "charts.sunburst.examples.org.title": "منظمة",
  "charts.sunburst.examples.org.description": "الهرمية التنظيمية: الأقسام والفرق.",
  "charts.sunburst.examples.files.title": "أحجام الملفات",
  "charts.sunburst.examples.files.description": "هيكل المشروع بأحجام الملفات.",
  "charts.sunburst.examples.legend.title": "وسيلة إيضاح فقط",
  "charts.sunburst.examples.legend.description": "إخفاء التسميات للحصول على بصري نظيف.",
  
  "charts.quadrant.title": "رباعي",
  "charts.quadrant.blurb": "مخطط تشتت مقسم إلى أربعة رباعيات بواسطة خطوط مرجعية.",
  "charts.quadrant.examples.impact.title": "مصفوفة التأثير والجهد",
  "charts.quadrant.examples.impact.description": "أولويات المشروع: التأثير العالي + الجهد المنخفض = المكاسب السريعة.",
  "charts.quadrant.examples.performance.title": "شبكة الأداء",
  "charts.quadrant.examples.performance.description": "رضا الموظفين مقابل الإنتاجية.",
  "charts.quadrant.examples.thresholds.title": "الحدود المخصصة",
  "charts.quadrant.examples.thresholds.description": "اضبط خطوط التقسيم على 5/5 لتقسيم رباعي مختلف."
}
```

- [ ] **Step 2: Verify file**

Run:
```bash
cat src/locales/ar/registry.json | jq '.charts.line.title'
```

Expected: Output is "خط"

- [ ] **Step 3: Commit**

```bash
git add src/locales/ar/registry.json
git commit -m "feat: add Arabic registry translations"
```

---

## Task 24: Create Arabic Translations (docs.json)

**Files:**
- Create: `src/locales/ar/docs.json`

- [ ] **Step 1: Create Arabic docs.json**

```json
{
  "docs.gettingStarted.title": "ابدأ",
  "docs.gettingStarted.intro": "قم بتثبيت الحزمة وقم باستيراد الرسم البياني الذي تحتاجه. يأخذ كل مخطط مصفوفة <code>data</code> بالإضافة إلى بعض خصائص <em>accessor</em> (مثل <code>x</code> أو <code>value</code> أو <code>series</code>) التي تخبره بالحقول التي يجب قراءتها.",
  "docs.npm": "npm i react-d3-viz",
  "docs.series": "مرر السلاسل المتعددة عبر <code>series='{[{ dataKey: 'sales' }, …]}'</code>، أو سلسلة واحدة مع اختصار <code>y</code>. تأتي الألوان والخطوط والمسافات من <code>theme</code> يمكنك تجاوزه جزئياً.",
  "docs.seriesConfig.title": "SeriesConfig",
  "docs.seriesConfig.desc": "كل إدخال في مصفوفة <code>series</code> الخاصة بالمخطط (أو رادار <code>series</code>) :",
  "docs.props": "الخصائص",
  "propDocs.prop": "خاصية",
  "propDocs.type": "نوع",
  "propDocs.default": "افتراضي",
  "propDocs.description": "الوصف"
}
```

- [ ] **Step 2: Verify file**

Run:
```bash
cat src/locales/ar/docs.json | jq '.docs.gettingStarted.title'
```

Expected: Output contains Arabic

- [ ] **Step 3: Commit**

```bash
git add src/locales/ar/docs.json
git commit -m "feat: add Arabic docs translations"
```

---

## Task 25: Create Arabic Translations (propDocs.json)

**Files:**
- Create: `src/locales/ar/propDocs.json`

- [ ] **Step 1: Create Arabic propDocs.json (minimal)**

```json
{
  "line.data": "مصفوفة من الكائنات",
  "line.x": "مفتاح البيانات لقيم المحور X",
  "line.series": "مصفوفة من تعريفات السلسلة",
  "line.height": "ارتفاع المخطط بالبكسل",
  "line.showPoints": "إظهار علامات النقاط",
  "line.curve": "طريقة استيفاء المنحنى",
  "line.showLegend": "إظهار وسيلة الإيضاح",
  "line.showGrid": "إظهار الشبكة",
  "line.showXAxis": "إظهار محور X",
  "line.showYAxis": "إظهار محور Y",
  "line.showTooltip": "إظهار التلميحات",
  "line.animate": "متحركة الانتقالات",
  
  "area.data": "مصفوفة من الكائنات",
  "area.x": "مفتاح البيانات لقيم المحور X",
  "area.series": "مصفوفة من تعريفات السلسلة",
  "area.height": "ارتفاع المخطط بالبكسل",
  "area.showLegend": "إظهار وسيلة الإيضاح",
  "area.showGrid": "إظهار الشبكة",
  "area.showXAxis": "إظهار محور X",
  "area.showYAxis": "إظهار محور Y",
  "area.showTooltip": "إظهار التلميحات",
  "area.animate": "متحركة الانتقالات",
  
  "bar.data": "مصفوفة من الكائنات",
  "bar.x": "مفتاح البيانات للفئات",
  "bar.series": "مصفوفة من تعريفات السلسلة",
  "bar.height": "ارتفاع المخطط بالبكسل",
  "bar.stacked": "رص الأعمدة عمودياً",
  "bar.radius": "نصف قطر الزاوية",
  "bar.showLegend": "إظهار وسيلة الإيضاح",
  "bar.showGrid": "إظهار الشبكة",
  "bar.showXAxis": "إظهار محور X",
  "bar.showYAxis": "إظهار محور Y",
  "bar.showTooltip": "إظهار التلميحات",
  "bar.animate": "متحركة الانتقالات"
}
```

- [ ] **Step 2: Verify file**

Run:
```bash
cat src/locales/ar/propDocs.json | jq '.line.data'
```

Expected: Output is "مصفوفة من الكائنات"

- [ ] **Step 3: Commit**

```bash
git add src/locales/ar/propDocs.json
git commit -m "feat: add Arabic propDocs translations"
```

---

## Task 26: Create Kannada Translations (common.json)

**Files:**
- Create: `src/locales/kn/common.json`

- [ ] **Step 1: Create Kannada common.json**

```json
{
  "nav.gallery": "ಗ್ಯಾಲರಿ",
  "nav.examples": "ಉದಾಹರಣೆಗಳು",
  "nav.docs": "ದಸ್ತಾವೇಜೀಕರಣ",
  "nav.playground": "ಆಟದ ಮೈದಾನ",
  "nav.npm": "npm ↗",
  "nav.github": "GitHub ↗",
  "tagline": "React ಮತ್ತು React Native ಗಾಗಿ ಕ್ರಾಸ್-ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ SVG ಚಾರ್ಟ್‌ಗಳು",
  "footer.text": "<code>react-d3-viz</code> ನೊಂದಿಗೆ ನಿರ್ಮಿತ · <code>npm i react-d3-viz</code> ನ ಮೂಲಕ ಸ್ಥಾಪಿಸಿ",
  "footer.install": "ಮೂಲಕ ಸ್ಥಾಪಿಸಿ",
  "language.english": "English",
  "language.french": "Français",
  "language.arabic": "العربية",
  "language.kannada": "ಕನ್ನಡ",
  "playground.tryPlayground": "ಆಟದ ಮೈದಾನದಲ್ಲಿ ಪ್ರಯತ್ನಿಸಿ ←",
  "terminal": "ಟರ್ಮಿನಲ್"
}
```

- [ ] **Step 2: Verify file**

Run:
```bash
cat src/locales/kn/common.json | jq '.nav.gallery'
```

Expected: Output is "ಗ್ಯಾಲರಿ"

- [ ] **Step 3: Commit**

```bash
git add src/locales/kn/common.json
git commit -m "feat: add Kannada common translations"
```

---

## Task 27: Create Kannada Translations (registry.json)

**Files:**
- Create: `src/locales/kn/registry.json`

- [ ] **Step 1: Create Kannada registry.json (translated chart titles)**

Create a Kannada version with translated chart titles and descriptions. Example structure:
```json
{
  "charts.line.title": "ರೇಖೆ",
  "charts.line.blurb": "ಐಚ್ಛಿಕ ಪಾಯಿಂಟ್‌ಗಳು ಮತ್ತು ವಕ್ರ ಪ್ರಕ್ಷೇಪಣ ಸಹ ಬಹು-ಸರಣಿ ಲೈನ್ ಚಾರ್ಟ್.",
  "charts.line.examples.smooth.title": "ನಯವಾದ ಬಹು-ಸರಣಿ",
  "charts.line.examples.smooth.description": "ಏಕತಾತ್ಮಿಕ ವಕ್ರಗಳು ಮತ್ತು ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಹೊಂದಿರುವ ಎರಡು ಸರಣಿ.",
  ...
}
```

(Include all chart definitions from English, translated to Kannada)

- [ ] **Step 2: Verify file created**

Run:
```bash
cat src/locales/kn/registry.json | jq '.charts.line.title'
```

Expected: Output is "ರೇಖೆ"

- [ ] **Step 3: Commit**

```bash
git add src/locales/kn/registry.json
git commit -m "feat: add Kannada registry translations"
```

---

## Task 28: Create Kannada Translations (docs.json)

**Files:**
- Create: `src/locales/kn/docs.json`

- [ ] **Step 1: Create Kannada docs.json**

```json
{
  "docs.gettingStarted.title": "ಪ್ರಾರಂಭಿಸಿ",
  "docs.gettingStarted.intro": "ಪ್ಯಾಕೇಜ್ ಸ್ಥಾಪಿಸಿ ಮತ್ತು ನಿಮಗೆ ಅಗತ್ಯವಿರುವ ಚಾರ್ಟ್ ಅನ್ನು ಆಮದು ಮಾಡಿ. ಪ್ರತಿಯೊಂದು ಚಾರ್ಟ್ ಒಂದು <code>data</code> ಅರೇ ಜೊತೆಗೆ ಕೆಲವು <em>accessor</em> props (<code>x</code>, <code>value</code> ಅಥವಾ <code>series</code> ನಂತಹ) ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ ಇದು ಯಾವ ಕ್ಷೇತ್ರಗಳನ್ನು ಓದಬೇಕು ಎಂಬುದನ್ನು ಹೇಳುತ್ತದೆ.",
  "docs.npm": "npm i react-d3-viz",
  "docs.series": "<code>series='{[{ dataKey: 'sales' }, …]}'</code> ಮೂಲಕ ಬಹುಸಂಖ್ಯೆಯ ಸರಣಿಗಳನ್ನು ರವಾನಿಸಿ, ಅಥವಾ <code>y</code> ಸಂಕ್ಷಿಪ್ತ ಸಹ ಒಂದು ಸರಣಿ. ರಿಂಗುಗಳು, ಫಾಂಟ್‌ಗಳು ಮತ್ತು ಖಾಲಿ ಜಾಗಗಳು <code>theme</code> ನಿಂದ ಬಂದಿವೆ ಇದನ್ನು ನೀವು ಭಾಗಶಃ ಮೂಲಸ್ವಲ್ಪನೆ ಮಾಡಬಹುದು.",
  "docs.seriesConfig.title": "SeriesConfig",
  "docs.seriesConfig.desc": "ಚಾರ್ಟ್‌ನ <code>series</code> ಅರೇಯಲ್ಲಿ ಪ್ರತಿಯೊಂದು ಪ್ರವೇಶ (ಅಥವಾ ರಡಾರ್ <code>series</code>) :",
  "docs.props": "ಗುಣಲಕ್ಷಣಗಳು",
  "propDocs.prop": "ಆಸ್ತಿ",
  "propDocs.type": "ಪ್ರಕಾರ",
  "propDocs.default": "ಪೂರ್ವನಿರ್ಧಾರಿತ",
  "propDocs.description": "ವರ್ಣನೆ"
}
```

- [ ] **Step 2: Verify file**

Run:
```bash
cat src/locales/kn/docs.json | jq '.docs.gettingStarted.title'
```

Expected: Output contains Kannada

- [ ] **Step 3: Commit**

```bash
git add src/locales/kn/docs.json
git commit -m "feat: add Kannada docs translations"
```

---

## Task 29: Create Kannada Translations (propDocs.json)

**Files:**
- Create: `src/locales/kn/propDocs.json`

- [ ] **Step 1: Create Kannada propDocs.json**

```json
{
  "line.data": "ವಸ್ತುಗಳ ಅರೇ",
  "line.x": "X-ಅಕ್ಷ ಮೌಲ್ಯಗಳ ಡೇಟಾ ಕೀ",
  "line.series": "ಸರಣಿ ವ್ಯಾಖ್ಯಾನಗಳ ಅರೇ",
  "line.height": "ಚಾರ್ಟ್ ಎತ್ತರ ಪಿಕ್ಸೆಲ್‌ನಲ್ಲಿ",
  "line.showPoints": "ಪಾಯಿಂಟ್ ಮಾರ್ಕರ್‌ಗಳನ್ನು ತೋರಿಸಿ",
  "line.curve": "ವಕ್ರ ಪ್ರಕ್ಷೇಪಣ ವಿಧಾನ",
  "line.showLegend": "ದಂತಕತೆ ತೋರಿಸಿ",
  "line.showGrid": "ಗ್ರಿಡ್ ತೋರಿಸಿ",
  "line.showXAxis": "X ಅಕ್ಷ ತೋರಿಸಿ",
  "line.showYAxis": "Y ಅಕ್ಷ ತೋರಿಸಿ",
  "line.showTooltip": "ಶಾಸನಗಳನ್ನು ತೋರಿಸಿ",
  "line.animate": "ಪರಿವರ್ತನೆಗಳನ್ನು ಅನಿಮೇಟ್ ಮಾಡಿ",
  
  "area.data": "ವಸ್ತುಗಳ ಅರೇ",
  "area.x": "X-ಅಕ್ಷ ಮೌಲ್ಯಗಳ ಡೇಟಾ ಕೀ",
  "area.series": "ಸರಣಿ ವ್ಯಾಖ್ಯಾನಗಳ ಅರೇ",
  "area.height": "ಚಾರ್ಟ್ ಎತ್ತರ ಪಿಕ್ಸೆಲ್‌ನಲ್ಲಿ",
  "area.showLegend": "ದಂತಕತೆ ತೋರಿಸಿ",
  "area.showGrid": "ಗ್ರಿಡ್ ತೋರಿಸಿ",
  "area.showXAxis": "X ಅಕ್ಷ ತೋರಿಸಿ",
  "area.showYAxis": "Y ಅಕ್ಷ ತೋರಿಸಿ",
  "area.showTooltip": "ಶಾಸನಗಳನ್ನು ತೋರಿಸಿ",
  "area.animate": "ಪರಿವರ್ತನೆಗಳನ್ನು ಅನಿಮೇಟ್ ಮಾಡಿ",
  
  "bar.data": "ವಸ್ತುಗಳ ಅರೇ",
  "bar.x": "ವರ್ಗಗಳಿಗೆ ಡೇಟಾ ಕೀ",
  "bar.series": "ಸರಣಿ ವ್ಯಾಖ್ಯಾನಗಳ ಅರೇ",
  "bar.height": "ಚಾರ್ಟ್ ಎತ್ತರ ಪಿಕ್ಸೆಲ್‌ನಲ್ಲಿ",
  "bar.stacked": "ಚೌಕಟ್ಟುಗಳನ್ನು ಲಂಬವಾಗಿ ರಚಿಸಿ",
  "bar.radius": "ಮೂಲೆಯ ತ್ರಿಜ್ಯ",
  "bar.showLegend": "ದಂತಕತೆ ತೋರಿಸಿ",
  "bar.showGrid": "ಗ್ರಿಡ್ ತೋರಿಸಿ",
  "bar.showXAxis": "X ಅಕ್ಷ ತೋರಿಸಿ",
  "bar.showYAxis": "Y ಅಕ್ಷ ತೋರಿಸಿ",
  "bar.showTooltip": "ಶಾಸನಗಳನ್ನು ತೋರಿಸಿ",
  "bar.animate": "ಪರಿವರ್ತನೆಗಳನ್ನು ಅನಿಮೇಟ್ ಮಾಡಿ"
}
```

- [ ] **Step 2: Verify file**

Run:
```bash
cat src/locales/kn/propDocs.json | jq '.line.data'
```

Expected: Output is "ವಸ್ತುಗಳ ಅರೇ"

- [ ] **Step 3: Commit**

```bash
git add src/locales/kn/propDocs.json
git commit -m "feat: add Kannada propDocs translations"
```

---

## Task 30: Test Build

**Files:**
- Test build process

- [ ] **Step 1: Run build**

Run:
```bash
npm run build
```

Expected: Build completes without errors

- [ ] **Step 2: Check for build warnings**

Run:
```bash
npm run build 2>&1 | grep -i warning || echo "No warnings"
```

Expected: No critical warnings

- [ ] **Step 3: Verify dist folder created**

Run:
```bash
ls -la dist/ | head
```

Expected: dist folder exists with built files

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "test: verify build succeeds with all translations"
```

---

## Task 31: Manual Testing - Language Switching

**Files:**
- Test app in browser

- [ ] **Step 1: Start dev server**

Run:
```bash
npm run dev
```

Expected: Server running on http://localhost:5173

- [ ] **Step 2: Test language switcher**

Open http://localhost:5173 in browser:
- Click language button in header
- Select each language (English, Français, العربية, ಕನ್ನಡ)
- Verify UI text changes
- Verify language persists on page reload

- [ ] **Step 3: Test RTL for Arabic**

With Arabic selected:
- Verify layout direction is RTL (header elements reversed, text right-aligned)
- Verify footer, nav, and gallery elements properly flipped
- Click links and verify pages still work

- [ ] **Step 4: Test chart translations**

- Click Gallery/Examples/Docs
- Switch languages
- Verify chart titles and descriptions translate
- Verify all 4 languages display correctly

- [ ] **Step 5: Manual testing complete**

No commit needed - testing only

---

## Summary

This plan implements full multilingual support with:
- 4 languages (English, French, Arabic, Kannada)
- i18next with namespaced translations
- Browser language detection + localStorage persistence
- RTL support for Arabic with dynamic layout flipping
- Language switcher in header
- Full coverage of UI, charts, and documentation

All 31 tasks are bite-sized (2-5 minutes each) and build incrementally with frequent commits.
