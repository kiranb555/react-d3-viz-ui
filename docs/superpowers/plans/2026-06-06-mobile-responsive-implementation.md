# Mobile-Responsive Header & Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add hamburger menu navigation for mobile (<640px) and optimize all pages for mobile viewing.

**Architecture:** Add React state to App.tsx for menu toggle, wire hamburger button with click handlers and outside-click listener, add CSS media queries for responsive layouts at 640px breakpoint.

**Tech Stack:** React, TypeScript, CSS media queries, vanilla DOM event listeners

---

## Task 1: Add Menu State & Handlers to App.tsx

**Files:**
- Modify: `src/App.tsx:1-73`

- [ ] **Step 1: Add imports and state to App component**

Replace the opening of the App component (lines 1-10) with:

```typescript
import './styles.css';
import { useHashRoute } from './useHashRoute';
import { Gallery } from './Gallery';
import { Examples } from './Examples';
import { Docs } from './Docs';
import { Playground } from './Playground';
import { charts } from './registry';
import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [route, navigate] = useHashRoute();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);
```

- [ ] **Step 2: Update header JSX with hamburger button and menu state**

Replace the `<header>` section (lines 14-51) with:

```typescript
      <header className="header" ref={menuRef} data-menu-open={isMenuOpen}>
        <div className="brand">
          <h1>react-d3-viz</h1>
          <span className="tagline">Cross-platform SVG charts for React &amp; React Native</span>
        </div>
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>
        <nav className="nav">
          <button
            className={route.view === 'gallery' ? 'nav-active' : ''}
            onClick={() => {
              navigate({ view: 'gallery' });
              closeMenu();
            }}
          >
            Gallery
          </button>
          <button
            className={route.view === 'examples' ? 'nav-active' : ''}
            onClick={() => {
              navigate({ view: 'examples' });
              closeMenu();
            }}
          >
            Examples
          </button>
          <button
            className={route.view === 'docs' ? 'nav-active' : ''}
            onClick={() => {
              navigate({ view: 'docs' });
              closeMenu();
            }}
          >
            Docs
          </button>
          <button
            className={route.view === 'playground' ? 'nav-active' : ''}
            onClick={() => {
              navigate({ view: 'playground', chartId: charts[0].id });
              closeMenu();
            }}
          >
            Playground
          </button>
          <a className="nav-ext" href="https://www.npmjs.com/package/react-d3-viz" target="_blank" rel="noreferrer">
            npm ↗
          </a>
          <a className="nav-ext" href="https://github.com/kiranb555/react-d3-viz" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </nav>
      </header>
```

- [ ] **Step 3: Verify App.tsx compiles**

Run: `npm run build`
Expected: No TypeScript errors, build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add hamburger menu state and handlers to App"
```

---

## Task 2: Add Mobile Styles to styles.css

**Files:**
- Modify: `src/styles.css:1-114`

- [ ] **Step 1: Add hamburger button styles (desktop hidden)**

Add before the `@media` query (after line 35, before line 37):

```css
.hamburger {
  display: none; /* hidden on desktop */
  background: transparent;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: var(--text);
  padding: 0;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
}
```

- [ ] **Step 2: Update header layout to accommodate hamburger**

Replace the `.header` rule (lines 20-24) with:

```css
.header {
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; padding: 16px 28px; background: var(--panel);
  border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 10;
  flex-wrap: wrap;
}
```

- [ ] **Step 3: Add mobile breakpoint for header (640px and below)**

Add at the end of the file (after line 114):

```css
@media (max-width: 640px) {
  /* Header adjustments */
  .header {
    padding: 12px 16px;
  }
  .brand h1 {
    font-size: 18px;
  }
  .brand .tagline {
    display: none;
  }
  .hamburger {
    display: flex;
  }

  /* Mobile nav menu */
  .nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--panel);
    border-bottom: 1px solid var(--border);
    padding: 8px;
    gap: 4px;
  }
  .header[data-menu-open="true"] .nav {
    display: flex;
  }
  .nav button,
  .nav a {
    text-align: left;
    padding: 10px 12px;
    border-radius: 6px;
    font-size: 14px;
  }
  .nav button:hover,
  .nav a:hover {
    background: #f3f4f6;
  }
  .nav-ext {
    margin-left: 0;
    display: block;
  }

  /* Gallery single column */
  .gallery {
    grid-template-columns: 1fr;
  }

  /* Examples full width */
  .example-group {
    margin-bottom: 24px;
  }

  /* Docs adjustments */
  .docs {
    max-width: 100%;
  }
  .props-table {
    font-size: 12px;
  }
  .props-table th,
  .props-table td {
    padding: 6px 8px;
  }

  /* Playground controls below chart */
  .play-grid {
    grid-template-columns: 1fr;
  }
  .panel {
    top: auto;
    position: relative;
  }

  /* Main content padding */
  .main {
    padding: 16px;
  }

  /* Card adjustments */
  .card {
    padding: 14px;
  }
  .card-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .btn-link {
    font-size: 11px;
  }

  /* Footer padding */
  .footer {
    padding: 16px;
    font-size: 12px;
  }
}
```

- [ ] **Step 4: Verify CSS is valid**

Run: `npm run build`
Expected: No CSS errors, build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/styles.css
git commit -m "feat: add mobile-responsive styles with 640px breakpoint"
```

---

## Task 3: Test Mobile Responsiveness

**Files:**
- Manual testing only (no code changes)

- [ ] **Step 1: Start development server**

Run: `npm run dev`
Expected: App starts on `http://localhost:5173`

- [ ] **Step 2: Test desktop view (≥640px)**

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Set viewport to 800px width
4. Verify:
   - Brand visible with tagline
   - Nav buttons visible inline (Gallery, Examples, Docs, Playground)
   - External links (npm, GitHub) visible on the right
   - Hamburger icon hidden
   - Gallery shows multi-column grid
   - Playground shows side-by-side layout

- [ ] **Step 3: Test mobile view (<640px)**

1. In DevTools, set viewport to 375px (iPhone SE)
2. Verify:
   - Brand visible, tagline hidden
   - Hamburger icon visible on the right
   - Nav buttons hidden
   - Click hamburger → nav menu appears with all items (Gallery, Examples, Docs, Playground, npm, GitHub)
   - External links appear in menu
   - Click a nav item → menu closes and navigation happens
   - Click outside menu → menu closes
   - Gallery shows single-column grid
   - Playground shows full-width chart with controls below

- [ ] **Step 4: Test at breakpoint (exactly 640px)**

1. Set viewport width to 640px
2. Verify smooth transition between layouts (hamburger appears, nav hides)

- [ ] **Step 5: Test tablet view (768px)**

1. Set viewport to 768px
2. Verify desktop layout shows (nav buttons visible, hamburger hidden)

- [ ] **Step 6: Test keyboard accessibility**

1. Press Tab through header elements
2. Verify hamburger button is focusable
3. On mobile, press Enter on hamburger → menu opens
4. Tab through menu items → all nav links/buttons focusable
5. Press Escape or click outside → menu closes

- [ ] **Step 7: Test on multiple pages**

1. Navigate to Gallery → verify single-column layout on mobile
2. Navigate to Examples → verify full-width layout
3. Navigate to Docs → verify table is readable, no horizontal scroll
4. Navigate to Playground → verify controls below chart
5. Toggle between pages on mobile → hamburger menu closes after each click

- [ ] **Step 8: Verify no regressions**

1. On desktop (800px+), verify all original functionality works
2. Click nav buttons → pages load correctly
3. External links open in new tabs
4. Sticky header works (scroll page, header stays)
5. All charts render correctly

---

## Task 4: Final Verification & Commit

**Files:**
- Review: `src/App.tsx`, `src/styles.css`

- [ ] **Step 1: Run linter**

Run: `npm run lint`
Expected: No errors or warnings

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds, no errors

- [ ] **Step 3: Verify all changes**

Run: `git status`
Expected: Only `src/App.tsx` and `src/styles.css` modified

- [ ] **Step 4: Review changes**

Run: `git diff src/App.tsx src/styles.css`
Expected: Changes match the plan (menu state, hamburger button, mobile styles)

- [ ] **Step 5: Create final commit if needed**

If all changes are already committed, skip. Otherwise:

```bash
git add src/App.tsx src/styles.css
git commit -m "feat: complete mobile-responsive header and pages implementation"
```

---

## Success Criteria Checklist

- ✅ Hamburger menu appears only on mobile (<640px)
- ✅ All nav items accessible in hamburger menu
- ✅ Menu closes on nav click or outside click
- ✅ Tagline hidden on mobile, visible on desktop
- ✅ External links in menu on mobile
- ✅ Gallery single-column on mobile
- ✅ Playground controls below chart on mobile
- ✅ No TypeScript errors
- ✅ No lint errors
- ✅ Build succeeds
- ✅ All pages work on mobile
- ✅ No regressions on desktop
