// Sample datasets shared by the gallery, examples, playground and code snippets.
// Grouped by data *shape* so a chart can be swapped between any dataset of the
// same shape (the playground's dataset switcher relies on this).

// --- series shape: a category key + one or more numeric series ---------------
export const months = [
  { month: 'Jan', sales: 42, profit: 18 },
  { month: 'Feb', sales: 55, profit: 22 },
  { month: 'Mar', sales: 49, profit: 20 },
  { month: 'Apr', sales: 73, profit: 31 },
  { month: 'May', sales: 68, profit: 28 },
  { month: 'Jun', sales: 91, profit: 40 },
  { month: 'Jul', sales: 84, profit: 36 },
];

export const weather = [
  { month: 'Jan', temp: 4, rainfall: 78 },
  { month: 'Feb', temp: 6, rainfall: 62 },
  { month: 'Mar', temp: 10, rainfall: 55 },
  { month: 'Apr', temp: 14, rainfall: 48 },
  { month: 'May', temp: 19, rainfall: 41 },
  { month: 'Jun', temp: 23, rainfall: 33 },
  { month: 'Jul', temp: 26, rainfall: 29 },
];

export const traffic = [
  { week: 'W1', visitors: 1200, signups: 180 },
  { week: 'W2', visitors: 1480, signups: 240 },
  { week: 'W3', visitors: 1390, signups: 210 },
  { week: 'W4', visitors: 1760, signups: 320 },
  { week: 'W5', visitors: 2050, signups: 410 },
  { week: 'W6', visitors: 1980, signups: 380 },
];

// --- xy shape: numeric x / y (+ optional size) -------------------------------
export const scatter = Array.from({ length: 60 }, () => ({
  x: Math.round(Math.random() * 100),
  y: Math.round(Math.random() * 100),
  size: Math.round(Math.random() * 100 + 5),
}));

// A clearly positively-correlated cloud (y tracks x with noise), so scatter /
// bubble charts show a real trend rather than uniform noise.
export const correlation = Array.from({ length: 60 }, () => {
  const x = Math.round(Math.random() * 100);
  const y = Math.round(Math.min(100, Math.max(0, x * 0.8 + (Math.random() - 0.5) * 35)));
  return { x, y, size: Math.round(Math.random() * 80 + 10) };
});

// --- pie shape: label + value ------------------------------------------------
export const pie = [
  { label: 'JavaScript', value: 38.7 },
  { label: 'Python', value: 24.5 },
  { label: 'TypeScript', value: 18.3 },
  { label: 'Rust', value: 9.1 },
  { label: 'Go', value: 6.2 },
  { label: 'Other', value: 3.2 },
];

export const marketShare = [
  { label: 'Chrome', value: 63.4 },
  { label: 'Safari', value: 19.8 },
  { label: 'Edge', value: 5.2 },
  { label: 'Firefox', value: 3.1 },
  { label: 'Other', value: 8.5 },
];

export const budget = [
  { label: 'Engineering', value: 420 },
  { label: 'Sales', value: 280 },
  { label: 'Marketing', value: 190 },
  { label: 'Support', value: 120 },
  { label: 'Admin', value: 90 },
];

// --- values shape: raw numbers for the histogram -----------------------------
export const histValues = Array.from({ length: 500 }, () => {
  let s = 0;
  for (let i = 0; i < 6; i++) s += Math.random();
  return Math.round((s / 6) * 100);
});

// A right-skewed distribution (e.g. household incomes in $k) — shows off bins
// and formatBin far better than a symmetric bell curve.
export const incomes = Array.from({ length: 500 }, () => {
  const u = Math.random();
  // exponential-ish tail, clamped to a sensible range
  return Math.round(20 + -Math.log(1 - u) * 35);
});

// --- radar shape: one record per axis, a value per series --------------------
export const radar = [
  { axis: 'Speed', team: 80, rival: 60 },
  { axis: 'Power', team: 65, rival: 75 },
  { axis: 'Range', team: 90, rival: 55 },
  { axis: 'Defense', team: 70, rival: 80 },
  { axis: 'Agility', team: 85, rival: 65 },
  { axis: 'Stamina', team: 60, rival: 70 },
];

export const skills = [
  { axis: 'React', frontend: 90, backend: 40 },
  { axis: 'CSS', frontend: 85, backend: 30 },
  { axis: 'APIs', frontend: 55, backend: 90 },
  { axis: 'Databases', frontend: 35, backend: 88 },
  { axis: 'DevOps', frontend: 40, backend: 75 },
  { axis: 'Testing', frontend: 70, backend: 80 },
];

// --- treemap shapes: flat (value/label), grouped (+group), nested (children) -
export const treemapLanguages = [
  { name: 'JavaScript', value: 38.7 },
  { name: 'Python', value: 24.5 },
  { name: 'TypeScript', value: 18.3 },
  { name: 'Rust', value: 9.1 },
  { name: 'Go', value: 6.2 },
  { name: 'Other', value: 3.2 },
];

export const treemapBrowsers = [
  { name: 'Chrome', platform: 'Desktop', share: 45 },
  { name: 'Edge', platform: 'Desktop', share: 12 },
  { name: 'Firefox', platform: 'Desktop', share: 8 },
  { name: 'Safari', platform: 'Desktop', share: 10 },
  { name: 'Chrome Mobile', platform: 'Mobile', share: 38 },
  { name: 'Safari Mobile', platform: 'Mobile', share: 25 },
  { name: 'Samsung', platform: 'Mobile', share: 6 },
];

export const treemapTech = {
  name: 'tech',
  children: [
    {
      name: 'Frontend',
      children: [
        { name: 'React', value: 40 },
        { name: 'Vue', value: 18 },
        { name: 'Svelte', value: 9 },
        { name: 'Angular', value: 14 },
      ],
    },
    {
      name: 'Backend',
      children: [
        { name: 'Node', value: 30 },
        { name: 'Go', value: 16 },
        { name: 'Rust', value: 11 },
        { name: 'Python', value: 26 },
      ],
    },
    {
      name: 'Data',
      children: [
        { name: 'Postgres', value: 22 },
        { name: 'Redis', value: 10 },
        { name: 'Kafka', value: 8 },
      ],
    },
  ],
};

// --- waterfall shape: label + value (with optional isTotal) -------------------
export const waterfallRevenue = [
  { label: 'Start', value: 100 },
  { label: 'Revenue', value: 50 },
  { label: 'Costs', value: -20 },
  { label: 'Net Income', value: 130, isTotal: true },
];

export const waterfallQuarters = [
  { label: 'Q1 Revenue', value: 100 },
  { label: 'Q2 Revenue', value: 120 },
  { label: 'H1 Total', value: 220, isTotal: true },
  { label: 'Costs', value: -50 },
  { label: 'H1 Net', value: 170, isTotal: true },
];

// --- sankey shape: nodes and links (flow diagram) ----------------------------
export const sankeyBasic = {
  nodes: [
    { id: 'a', label: 'Source A' },
    { id: 'b', label: 'Source B' },
    { id: 'x', label: 'Sink X' },
    { id: 'y', label: 'Sink Y' },
  ],
  links: [
    { source: 'a', target: 'x', value: 30 },
    { source: 'a', target: 'y', value: 20 },
    { source: 'b', target: 'x', value: 40 },
    { source: 'b', target: 'y', value: 60 },
  ],
};

export const sankeyComplex = {
  nodes: [
    { id: 'sales', label: 'Sales' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'support', label: 'Support' },
    { id: 'product-a', label: 'Product A' },
    { id: 'product-b', label: 'Product B' },
    { id: 'product-c', label: 'Product C' },
    { id: 'retained', label: 'Retained Revenue' },
    { id: 'churn', label: 'Churn' },
  ],
  links: [
    { source: 'sales', target: 'product-a', value: 50 },
    { source: 'sales', target: 'product-b', value: 40 },
    { source: 'marketing', target: 'product-a', value: 30 },
    { source: 'marketing', target: 'product-c', value: 50 },
    { source: 'support', target: 'product-b', value: 20 },
    { source: 'support', target: 'product-c', value: 30 },
    { source: 'product-a', target: 'retained', value: 70 },
    { source: 'product-a', target: 'churn', value: 10 },
    { source: 'product-b', target: 'retained', value: 55 },
    { source: 'product-b', target: 'churn', value: 5 },
    { source: 'product-c', target: 'retained', value: 75 },
    { source: 'product-c', target: 'churn', value: 5 },
  ],
};

// --- mekko shape: categories with series breakdown ---------------------------
export const mekkoBasic = {
  categories: [
    { label: 'Q1', value: 100 },
    { label: 'Q2', value: 150 },
    { label: 'Q3', value: 120 },
  ],
  series: [
    {
      id: 'product-a',
      label: 'Product A',
      data: [
        { categoryId: 'Q1', value: 40 },
        { categoryId: 'Q2', value: 60 },
        { categoryId: 'Q3', value: 50 },
      ],
    },
    {
      id: 'product-b',
      label: 'Product B',
      data: [
        { categoryId: 'Q1', value: 60 },
        { categoryId: 'Q2', value: 90 },
        { categoryId: 'Q3', value: 70 },
      ],
    },
  ],
};

export const mekkoMarket = {
  categories: [
    { label: 'North America', value: 500 },
    { label: 'Europe', value: 350 },
    { label: 'Asia', value: 600 },
    { label: 'Other', value: 150 },
  ],
  series: [
    {
      id: 'premium',
      label: 'Premium',
      data: [
        { categoryId: 'North America', value: 250 },
        { categoryId: 'Europe', value: 200 },
        { categoryId: 'Asia', value: 300 },
        { categoryId: 'Other', value: 50 },
      ],
    },
    {
      id: 'standard',
      label: 'Standard',
      data: [
        { categoryId: 'North America', value: 200 },
        { categoryId: 'Europe', value: 120 },
        { categoryId: 'Asia', value: 250 },
        { categoryId: 'Other', value: 80 },
      ],
    },
    {
      id: 'budget',
      label: 'Budget',
      data: [
        { categoryId: 'North America', value: 50 },
        { categoryId: 'Europe', value: 30 },
        { categoryId: 'Asia', value: 50 },
        { categoryId: 'Other', value: 20 },
      ],
    },
  ],
};

// Preset theme palettes for the global palette control.
export const palettes: { name: string; colors: string[] }[] = [
  { name: 'Default', colors: ['#4f46e5', '#06b6d4', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6'] },
  { name: 'Sunset', colors: ['#f97316', '#ef4444', '#ec4899', '#8b5cf6', '#facc15', '#fb7185'] },
  { name: 'Forest', colors: ['#16a34a', '#65a30d', '#0d9488', '#0891b2', '#4d7c0f', '#15803d'] },
  { name: 'Mono', colors: ['#0f172a', '#334155', '#64748b', '#94a3b8', '#cbd5e1', '#475569'] },
];
