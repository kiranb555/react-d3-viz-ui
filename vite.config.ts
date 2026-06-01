import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is set to the GitHub repo name for GitHub Pages (enabled in CI via
// the GITHUB_PAGES env var); locally it stays at '/'.
// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/react-d3-viz-ui/' : '/',
  plugins: [react()],
})
