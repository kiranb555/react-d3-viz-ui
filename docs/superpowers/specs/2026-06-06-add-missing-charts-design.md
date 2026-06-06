---
name: add-missing-charts
description: Design for adding 4 missing charts (ButterflyChart, HeatmapChart, SunburstChart, QuadrantChart) to react-d3-viz-ui with complete documentation and examples
metadata:
  type: project
---

# Adding 4 New Charts to react-d3-viz-ui

**Objective:** Add complete documentation, examples, and playground support for 4 new chart types from react-d3-viz v1.2.3: ButterflyChart, HeatmapChart, SunburstChart, and QuadrantChart.

**Timeline:** Approach 1 — sequential addition (one chart at a time for safer testing)

## Architecture & Integration

All 4 charts follow the existing pattern used by the 12 implemented charts:

1. **data.ts** — Export realistic sample datasets for each chart
2. **registry.tsx** — Add ChartDef entries with:
   - Component reference
   - 2-3 datasets with realistic business scenarios
   - Default props (merged with example overrides)
   - Controls (interactive sliders/toggles for live adjustment)
   - Examples (2-3 preset configurations)
3. **propDocs.ts** — Add PropDoc arrays documenting all props (type, default, description)

These automatically flow to three UI views:
- **Examples.tsx** — Shows all examples as cards
- **Docs.tsx** — Displays prop reference tables
- **Playground.tsx** — Deep-linkable interactive editor

## Chart 1: ButterflyChart

**Purpose:** Side-by-side back-to-back bar chart, typically used for population pyramids.

### Data & Scenarios

**Dataset 1: Population Pyramid**
```
ageGroup | male | female
---------|------|-------
0-10     | 45   | 42
10-20    | 52   | 50
...
```

**Dataset 2: Department Gender Distribution**
```
department | male | female
-----------|------|-------
Engineering| 28   | 12
Sales      | 15   | 18
...
```

### Props & Controls

**Default Props:**
- `height: 340`
- `animate: true`
- `showLegend: true`
- `leftLabel: 'Male'` / `rightLabel: 'Female'` (or similar)
- Bar width, padding, colors per side

**Controls:**
- height (160–480)
- showLegend (boolean)
- animate (boolean)
- Bar width/padding sliders

### Examples (3 presets)

1. **"Age pyramid"** — Classic population distribution, 10-year age groups
2. **"Department gender"** — HR analytics showing gender split by department
3. **"Custom labels"** — Demonstrating left/right label customization

### Prop Documentation

Covers all unique ButterflyChart props:
- `data`: Datum[] (required)
- `x`: accessor for category (required)
- `leftSeries`: SeriesConfig (required)
- `rightSeries`: SeriesConfig (required)
- `height`, `animate`, `showLegend`
- Margin, theme, tooltip options

---

## Chart 2: HeatmapChart

**Purpose:** Grid of colored cells, commonly used for correlations, temporal patterns, or multi-dimensional distributions.

### Data & Scenarios

**Dataset 1: Regional Sales by Product**
```
product  | Q1-NA | Q1-EU | Q1-APAC | Q2-NA | ...
---------|-------|-------|---------|-------|----
Product A| 450   | 320   | 280     | 520   | ...
Product B| 380   | 410   | 350     | 400   | ...
...
```

**Dataset 2: Team Utilization Heatmap**
```
team    | Mon | Tue | Wed | Thu | Fri
--------|-----|-----|-----|-----|----
Team A  | 85  | 92  | 78  | 88  | 95
Team B  | 70  | 75  | 82  | 80  | 73
...
```

### Props & Controls

**Default Props:**
- `height: 360`
- `cellSize: 'auto'` (responsive)
- `animate: true`
- `showLegend: true`
- Color scale (sequential or diverging)

**Controls:**
- height (200–500)
- Cell padding/gap
- animate (boolean)
- showLegend (boolean)

### Examples (3 presets)

1. **"Sales matrix"** — Product × Region heatmap with color intensity by revenue
2. **"Team schedule"** — Daily utilization by team (Mon–Fri), warm colors for high util
3. **"Custom scale"** — Demonstrate diverging color scale (e.g., red–white–blue for variance)

### Prop Documentation

Covers HeatmapChart-specific props:
- `data`: Datum[] (required)
- `x`, `y`: category accessors (required)
- `value`: numeric accessor (required)
- `cellSize`, `cellPadding`
- `colorScale`: (sequential/diverging/custom)
- Axis labels, tooltip, animation options

---

## Chart 3: SunburstChart

**Purpose:** Hierarchical radial pie chart, showing nested data as rings radiating outward.

### Data & Scenarios

**Dataset 1: Company Organization**
```
{
  name: 'Company',
  children: [
    {
      name: 'Engineering',
      children: [
        { name: 'Frontend', value: 8 },
        { name: 'Backend', value: 6 },
        { name: 'DevOps', value: 3 }
      ]
    },
    {
      name: 'Sales',
      children: [
        { name: 'Enterprise', value: 5 },
        { name: 'SMB', value: 4 }
      ]
    }
  ]
}
```

**Dataset 2: File System Hierarchy**
```
{
  name: 'project',
  children: [
    {
      name: 'src',
      children: [
        { name: 'components', value: 2500 },
        { name: 'utils', value: 1200 }
      ]
    },
    { name: 'dist', value: 5000 }
  ]
}
```

### Props & Controls

**Default Props:**
- `height: 400`
- `innerRadius: 60` (inner hole size, px or fraction)
- `animate: true`
- `showLabels: true`
- `showLegend: true`

**Controls:**
- height (250–500)
- innerRadius (0–0.6, fraction of radius)
- showLabels (boolean)
- showLegend (boolean)
- animate (boolean)

### Examples (3 presets)

1. **"Org chart"** — 3-level company hierarchy colored by top-level branch
2. **"File sizes"** — Nested folder structure, cell size by file count
3. **"Minimal"** — Hide labels for clean visual with legend only

### Prop Documentation

Covers SunburstChart-specific props:
- `data`: Nested object with `name`, `children`, `value` (required)
- `value`: accessor for leaf size (required)
- `label`: accessor for cell labels
- `childrenKey`: key for nested children (default 'children')
- `innerRadius`, colors, animation, tooltip options

---

## Chart 4: QuadrantChart

**Purpose:** Scatter plot divided into 4 quadrants by reference lines, useful for portfolio/priority matrices.

### Data & Scenarios

**Dataset 1: Project Portfolio Matrix**
```
project            | impact | effort | size
-------------------|--------|--------|------
Refactor auth      | 8      | 6      | 1200
Add dark mode      | 5      | 2      | 800
New payment system | 9      | 8      | 2000
...
```

**Dataset 2: Employee Performance Grid**
```
employee    | productivity | satisfaction | tenure
------------|--------------|--------------|-------
Alice       | 85           | 92           | 3
Bob         | 72           | 65           | 5
Carol       | 88           | 78           | 2
...
```

### Props & Controls

**Default Props:**
- `height: 360`
- `xThreshold: 50` (vertical divider, x-axis center or custom)
- `yThreshold: 50` (horizontal divider, y-axis center or custom)
- `animate: true`
- `showLegend: true`
- Quadrant labels (e.g., "Quick Wins", "Major Projects", "Fill-ins", "Low Priority")

**Controls:**
- height (250–500)
- xThreshold (0–100 or scaled to x domain)
- yThreshold (0–100 or scaled to y domain)
- animate (boolean)
- showLegend (boolean)

### Examples (3 presets)

1. **"Impact-effort matrix"** — Standard 2×2 project prioritization
2. **"Performance quadrants"** — Employee satisfaction vs productivity
3. **"Custom thresholds"** — Adjust dividing lines to match custom business logic

### Prop Documentation

Covers QuadrantChart-specific props:
- `data`: Datum[] (required)
- `x`, `y`: numeric accessors (required)
- `label`: accessor for data point labels
- `size`: optional accessor for bubble size (like scatter)
- `xThreshold`, `yThreshold`: dividing line positions
- `quadrantLabels`: `{ topLeft, topRight, bottomLeft, bottomRight }`
- Point radius, animation, colors per quadrant, tooltip options

---

## Implementation Sequence

**Order:** ButterflyChart → HeatmapChart → SunburstChart → QuadrantChart

**Why this order:**
1. **ButterflyChart** — Simplest (left/right series, similar to existing BarChart patterns)
2. **HeatmapChart** — Grid-based, independent data shape
3. **SunburstChart** — Most complex (hierarchical nesting), but independent
4. **QuadrantChart** — Scatter variant with threshold lines

Each chart is independent, so if issues arise with one, it doesn't block the others.

---

## Files to Modify (Per Chart)

For each of the 4 charts:

1. **src/data.ts**
   - Export 2–3 realistic datasets (e.g., `butterflyPopulation`, `butterflyDepartment`)
   - Sample data code strings for snippet display

2. **src/registry.tsx**
   - Import chart component from react-d3-viz
   - Add ChartDef with:
     - id, title, blurb, componentName, Component
     - datasets array (2–3 scenarios)
     - defaultProps (height, animate, showLegend, etc.)
     - controls (height slider, boolean toggles, select options)
     - examples (2–3 presets with descriptions)

3. **src/propDocs.ts**
   - Add PropDoc[] array for the chart's unique props
   - Include all required + optional props
   - Type, default value, concise description for each

**No changes needed to:**
- Examples.tsx, Docs.tsx, Playground.tsx (auto-render from registry/propDocs)
- App.tsx, other routing logic

---

## Testing & Verification

For each chart (after adding to registry + propDocs):

1. Start dev server: `npm run dev`
2. Navigate to **Examples** tab → Verify 3 example cards render correctly
3. Navigate to **Docs** tab → Verify prop table appears with all props
4. Navigate to **Playground** tab → Select chart from dropdown
   - Verify default dataset loads
   - Toggle controls (height, animate, etc.) → Verify chart updates
   - Switch datasets → Verify chart re-renders
   - Switch examples → Verify props apply correctly
   - Copy code snippet → Verify JSX is correct

---

## Success Criteria

✅ All 4 charts added to Examples page with 3 examples each (12 total new example cards)  
✅ All 4 charts have prop documentation tables in Docs page  
✅ All 4 charts support interactive controls in Playground  
✅ Code snippets generate valid, copy-pasteable React code  
✅ Deep linking works (examples open in playground with correct state)  
✅ No errors in browser console or TypeScript compilation  

---

## Notes

- Realistic business data is prioritized over synthetic test data
- Follow existing control/example patterns for consistency
- Prop descriptions should be concise but complete
- Color palettes and theming inherit from existing theme system
