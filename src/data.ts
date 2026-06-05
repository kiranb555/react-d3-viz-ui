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

// --- waterfall shape: sequentially introduced values with optional totals -----
export const waterfallRevenueData = [
  { label: 'Starting Revenue', value: 420, isTotal: false },
  { label: 'Product Sales', value: 220, isTotal: false },
  { label: 'Service Revenue', value: 150, isTotal: false },
  { label: 'Operating Costs', value: -180, isTotal: false },
  { label: 'Marketing', value: -80, isTotal: false },
  { label: 'Net Income', value: 530, isTotal: true },
];

export const waterfallProjectData = [
  { label: 'Q1', value: 100 },
  { label: 'Q2', value: 150 },
  { label: 'Q3', value: -50 },
  { label: 'Q4', value: 200 },
  { label: 'Year Total', value: 400, isTotal: true },
];

// --- mekko shape: categories with stacked series ---------------------------------
export const mekkoSalesData = {
  categories: [
    { label: 'North America', value: 320 },
    { label: 'Europe', value: 280 },
    { label: 'Asia', value: 420 },
  ],
  series: [
    {
      id: 'online',
      label: 'Online',
      data: [
        { categoryId: 'northAmerica', value: 200 },
        { categoryId: 'europe', value: 160 },
        { categoryId: 'asia', value: 280 },
      ],
    },
    {
      id: 'retail',
      label: 'Retail',
      data: [
        { categoryId: 'northAmerica', value: 120 },
        { categoryId: 'europe', value: 120 },
        { categoryId: 'asia', value: 140 },
      ],
    },
  ],
};

export const mekkoProductData = {
  categories: [
    { label: 'Starter', value: 200 },
    { label: 'Pro', value: 350 },
    { label: 'Enterprise', value: 450 },
  ],
  series: [
    {
      id: 'features',
      label: 'Features',
      data: [
        { categoryId: 'starter', value: 80 },
        { categoryId: 'pro', value: 200 },
        { categoryId: 'enterprise', value: 350 },
      ],
    },
    {
      id: 'support',
      label: 'Support',
      data: [
        { categoryId: 'starter', value: 50 },
        { categoryId: 'pro', value: 100 },
        { categoryId: 'enterprise', value: 80 },
      ],
    },
    {
      id: 'services',
      label: 'Services',
      data: [
        { categoryId: 'starter', value: 70 },
        { categoryId: 'pro', value: 50 },
        { categoryId: 'enterprise', value: 20 },
      ],
    },
  ],
};

// --- sankey shape: nodes and directed links with flow values --------------------
export const sankeySampleData = {
  nodes: [
    { id: 'browser', label: 'Browser' },
    { id: 'device', label: 'Device' },
    { id: 'os', label: 'OS' },
    { id: 'chrome', label: 'Chrome' },
    { id: 'safari', label: 'Safari' },
    { id: 'firefox', label: 'Firefox' },
    { id: 'windows', label: 'Windows' },
    { id: 'macos', label: 'macOS' },
    { id: 'linux', label: 'Linux' },
  ],
  links: [
    { source: 'browser', target: 'chrome', value: 500 },
    { source: 'browser', target: 'safari', value: 350 },
    { source: 'browser', target: 'firefox', value: 200 },
    { source: 'chrome', target: 'windows', value: 300 },
    { source: 'chrome', target: 'macos', value: 150 },
    { source: 'chrome', target: 'linux', value: 50 },
    { source: 'safari', target: 'macos', value: 300 },
    { source: 'safari', target: 'windows', value: 50 },
    { source: 'firefox', target: 'windows', value: 120 },
    { source: 'firefox', target: 'linux', value: 80 },
  ],
};

export const sankeySupplyData = {
  nodes: [
    { id: 'supplier1', label: 'Supplier A' },
    { id: 'supplier2', label: 'Supplier B' },
    { id: 'warehouse', label: 'Warehouse' },
    { id: 'retail', label: 'Retail' },
    { id: 'online', label: 'Online' },
    { id: 'customer', label: 'Customer' },
  ],
  links: [
    { source: 'supplier1', target: 'warehouse', value: 600 },
    { source: 'supplier2', target: 'warehouse', value: 400 },
    { source: 'warehouse', target: 'retail', value: 500 },
    { source: 'warehouse', target: 'online', value: 500 },
    { source: 'retail', target: 'customer', value: 500 },
    { source: 'online', target: 'customer', value: 500 },
  ],
};

// Preset theme palettes for the global palette control.
export const palettes: { name: string; colors: string[] }[] = [
  { name: 'Default', colors: ['#4f46e5', '#06b6d4', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6'] },
  { name: 'Sunset', colors: ['#f97316', '#ef4444', '#ec4899', '#8b5cf6', '#facc15', '#fb7185'] },
  { name: 'Forest', colors: ['#16a34a', '#65a30d', '#0d9488', '#0891b2', '#4d7c0f', '#15803d'] },
  { name: 'Mono', colors: ['#0f172a', '#334155', '#64748b', '#94a3b8', '#cbd5e1', '#475569'] },
];
