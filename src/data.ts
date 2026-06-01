// Sample datasets shared by the gallery, playground and code snippets.

export const months = [
  { month: 'Jan', sales: 42, profit: 18 },
  { month: 'Feb', sales: 55, profit: 22 },
  { month: 'Mar', sales: 49, profit: 20 },
  { month: 'Apr', sales: 73, profit: 31 },
  { month: 'May', sales: 68, profit: 28 },
  { month: 'Jun', sales: 91, profit: 40 },
  { month: 'Jul', sales: 84, profit: 36 },
];

export const scatter = Array.from({ length: 60 }, () => ({
  x: Math.round(Math.random() * 100),
  y: Math.round(Math.random() * 100),
  size: Math.round(Math.random() * 100 + 5),
}));

export const pie = [
  { label: 'JavaScript', value: 38.7 },
  { label: 'Python', value: 24.5 },
  { label: 'TypeScript', value: 18.3 },
  { label: 'Rust', value: 9.1 },
  { label: 'Go', value: 6.2 },
  { label: 'Other', value: 3.2 },
];

export const histValues = Array.from({ length: 500 }, () => {
  let s = 0;
  for (let i = 0; i < 6; i++) s += Math.random();
  return Math.round((s / 6) * 100);
});

export const radar = [
  { axis: 'Speed', team: 80, rival: 60 },
  { axis: 'Power', team: 65, rival: 75 },
  { axis: 'Range', team: 90, rival: 55 },
  { axis: 'Defense', team: 70, rival: 80 },
  { axis: 'Agility', team: 85, rival: 65 },
  { axis: 'Stamina', team: 60, rival: 70 },
];

// Preset theme palettes for the global palette control.
export const palettes: { name: string; colors: string[] }[] = [
  { name: 'Default', colors: ['#4f46e5', '#06b6d4', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6'] },
  { name: 'Sunset', colors: ['#f97316', '#ef4444', '#ec4899', '#8b5cf6', '#facc15', '#fb7185'] },
  { name: 'Forest', colors: ['#16a34a', '#65a30d', '#0d9488', '#0891b2', '#4d7c0f', '#15803d'] },
  { name: 'Mono', colors: ['#0f172a', '#334155', '#64748b', '#94a3b8', '#cbd5e1', '#475569'] },
];
