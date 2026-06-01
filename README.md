# react-d3-viz-ui

Interactive **showcase & playground** for [`react-d3-viz`](https://www.npmjs.com/package/react-d3-viz) — a cross-platform SVG chart library for React and React Native.

- **Gallery** — every chart at a glance.
- **Playground** — pick a chart, tweak its props live (toggles / sliders / selects), switch theme palettes, and copy the generated JSX.

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

A single `src/registry.tsx` describes each chart (component, sample data, default
props, and the list of interactive controls). The gallery, playground, controls
panel, and code-snippet generator all read from it — so adding or changing a chart
is a one-place edit.
