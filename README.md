# react-d3-viz-ui

Interactive **showcase & playground** for [`react-d3-viz`](https://www.npmjs.com/package/react-d3-viz) — a cross-platform SVG chart library for React and React Native.

- **Gallery** — every chart at a glance.
- **Examples** — preset variants per chart (grouped vs stacked bars, pie vs donut, stepped vs smooth lines, …), each deep-linking into the playground.
- **Docs** — a props reference table for every chart, plus a usage snippet and getting-started notes.
- **Playground** — pick a chart, switch between sample datasets, tweak its props live (toggles / sliders / selects), switch theme palettes, and copy the generated JSX.

This app consumes the **published** `react-d3-viz` package from npm (it dogfoods the real release).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the build
```

## Deploy (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with the
correct base path (`GITHUB_PAGES=true` → `/react-d3-viz-ui/`) and deploys to Pages.

One-time setup: create the GitHub repo `react-d3-viz-ui`, push, then in the repo
**Settings → Pages → Source: GitHub Actions**.

## How it works

A single `src/registry.tsx` describes each chart: its component, a list of named
**datasets** (data + accessors + snippet code), default props, interactive
controls, and **example** presets. The gallery, examples, playground, controls
panel, and code-snippet generator all read from it — so adding or changing a
chart, dataset, or example is a one-place edit. Prop documentation lives next to
it in `src/propDocs.ts` (sourced from the library's own TypeScript types) and the
sample datasets in `src/data.ts`.
