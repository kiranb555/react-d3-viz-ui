# Mobile-Responsive Header & Pages Design

**Date:** 2026-06-06  
**Status:** Design Phase  
**Scope:** Header responsiveness + full-page mobile optimization

---

## Overview

The app currently has minimal mobile responsiveness. The header (brand + nav) doesn't adapt to small screens, and pages lack proper mobile breakpoints. This spec defines how to add comprehensive mobile support across the entire app with a 640px breakpoint and hamburger menu navigation.

---

## Requirements

### Header (Mobile-First)
- **Desktop (≥640px):** Brand (h1 + tagline) + horizontal nav buttons + external links (as-is)
- **Mobile (<640px):** Brand only + hamburger icon; nav collapses into an overlay/dropdown menu
  - Tagline hidden on mobile
  - External links (npm, GitHub) move into the hamburger menu
  - Menu toggles on hamburger click
  - Menu closes when nav item is clicked or user clicks outside

### Page-Level Responsive
- **Gallery:** Grid adapts from multi-column to single column at 640px
- **Examples:** Full-width layout with adjusted spacing
- **Docs:** Table layout becomes readable on mobile (may need horizontal scroll or condensed view)
- **Playground:** Controls panel moves below chart at 640px (already has 860px breakpoint)

### Accessibility & UX
- Menu has proper focus management
- Hamburger icon is clearly visible and clickable
- Menu items are keyboard-accessible
- Tagline remains visible on desktop for context

---

## Architecture

### State Management
Add one React state to `App.tsx`:
- `isMenuOpen: boolean` — tracks hamburger menu visibility
- Toggle on hamburger click
- Close on nav item click or outside click

### Components Modified
1. **App.tsx**
   - Add `useState` for menu state
   - Add click handlers for toggle and close
   - Pass menu state + handlers to header
   - Add outside-click listener (useEffect)

2. **styles.css**
   - Add `@media (max-width: 640px)` rules
   - Header layout: flex-direction shift (if needed)
   - Nav menu: hidden by default on mobile, shown when `data-menu-open="true"`
   - Gallery, Examples, Docs, Playground: responsive tweaks
   - Add hamburger icon styles

### Data Flow
```
App.tsx (state)
  ↓
Header JSX (receives isMenuOpen, onToggle, onClose)
  ↓
Rendered DOM (header + nav styles respond to state)
```

---

## Implementation Details

### Header Structure (App.tsx)
```jsx
<header className="header" data-menu-open={isMenuOpen}>
  <div className="brand">
    <h1>react-d3-viz</h1>
    <span className="tagline">...</span>
  </div>
  <button 
    className="hamburger" 
    onClick={toggleMenu}
    aria-label="Toggle menu"
  >
    ☰
  </button>
  <nav className="nav">
    {/* 4 nav buttons */}
    {/* 2 external links */}
  </nav>
</header>
```

### CSS Strategy

**Mobile-first media query:**
```css
@media (max-width: 640px) {
  .header {
    /* adjust layout if needed */
  }
  .brand .tagline {
    display: none;
  }
  .hamburger {
    display: block; /* visible on mobile */
  }
  .nav {
    display: none; /* hidden by default */
  }
  .header[data-menu-open="true"] .nav {
    display: flex; /* shown when menu is open */
    flex-direction: column; /* stack vertically */
    position: absolute; /* or fixed for overlay effect */
    top: 60px; /* below header */
    left: 0;
    right: 0;
    background: var(--panel);
    border-bottom: 1px solid var(--border);
    padding: 8px;
    z-index: 9;
  }
}

@media (min-width: 641px) {
  .hamburger {
    display: none; /* hidden on desktop */
  }
}
```

**Gallery:**
```css
@media (max-width: 640px) {
  .gallery {
    grid-template-columns: 1fr; /* single column */
  }
}
```

**Playground:**
```css
@media (max-width: 640px) {
  .play-grid {
    grid-template-columns: 1fr; /* controls below chart */
  }
}
```

### Menu Close Logic
Menu closes when:
1. User clicks a nav button
2. User clicks outside the header (outside-click listener on document)
3. Menu can be toggled on/off with hamburger click

---

## Testing Approach

1. **Desktop (≥640px):** All nav items visible inline, tagline shows, hamburger hidden
2. **Mobile (<640px):** 
   - Hamburger visible, nav hidden
   - Click hamburger → menu appears
   - Click nav item → menu closes, navigation happens
   - Click outside menu → menu closes
   - Tagline hidden
3. **Gallery:** Single-column grid on mobile
4. **Playground:** Controls below chart on mobile
5. **Keyboard:** Tab through menu items, Enter to activate

---

## Success Criteria

- ✅ Header is fully functional and styled on all screen sizes
- ✅ Hamburger menu appears only on mobile
- ✅ All nav items accessible on mobile
- ✅ Pages render correctly at 640px breakpoint
- ✅ No layout shifts or horizontal scrolling on mobile
- ✅ Menu closes automatically on nav click or outside click
- ✅ No new dependencies added

---

## Out of Scope

- Dark mode media query (`prefers-color-scheme`)
- Animation/transition polish (can be added later)
- Mobile-specific fonts or typography changes
- Tablet-specific optimizations (640px breakpoint serves both phone and tablet)

---

## Files to Modify

1. `src/App.tsx` — Add state + handlers
2. `src/styles.css` — Add mobile breakpoints + hamburger styles
