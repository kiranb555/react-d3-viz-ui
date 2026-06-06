# Multi-Language Support Design

**Date:** 2026-06-06  
**Languages:** English, French, Arabic, Kannada  
**Scope:** Full content translation (UI, chart metadata, documentation)

## Overview

Add comprehensive multi-language support to the react-d3-viz demo app using i18next with automatic browser language detection, localStorage persistence, and RTL support for Arabic.

## Architecture

### 1. Translation File Structure

```
src/locales/
├── en/
│   ├── common.json
│   ├── registry.json
│   ├── docs.json
│   └── propDocs.json
├── fr/
│   ├── common.json
│   ├── registry.json
│   ├── docs.json
│   └── propDocs.json
├── ar/
│   ├── common.json
│   ├── registry.json
│   ├── docs.json
│   └── propDocs.json
└── kn/
    ├── common.json
    ├── registry.json
    ├── docs.json
    └── propDocs.json
```

**File contents:**

- **common.json** — UI strings: navigation labels, button text, view titles
  ```json
  {
    "nav.gallery": "Gallery",
    "nav.examples": "Examples",
    "nav.docs": "Docs",
    "nav.playground": "Playground",
    "tagline": "Cross-platform SVG charts for React & React Native",
    "footer.text": "Built with <code>react-d3-viz</code> · install via <code>npm i react-d3-viz</code>"
  }
  ```

- **registry.json** — chart definitions (titles, descriptions, example titles/descriptions)
  ```json
  {
    "charts.line.title": "Line",
    "charts.line.blurb": "Multi-series line chart...",
    "charts.line.examples.smooth": "Smooth multi-series",
    ...
  }
  ```

- **docs.json** — documentation page content
  ```json
  {
    "docs.gettingStarted.title": "Getting started",
    "docs.gettingStarted.intro": "Install the package...",
    "docs.seriesConfig.title": "SeriesConfig",
    ...
  }
  ```

- **propDocs.json** — API documentation descriptions for chart props

### 2. i18next Configuration

Create `src/i18n.ts`:

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import commonEn from './locales/en/common.json';
import commonFr from './locales/fr/common.json';
// ... (all 16 JSON files)

const resources = {
  en: { common: commonEn, registry: registryEn, docs: docsEn, propDocs: propDocsEn },
  fr: { common: commonFr, registry: registryFr, docs: docsFr, propDocs: propDocsFr },
  ar: { common: commonAr, registry: registryAr, docs: docsAr, propDocs: propDocsAr },
  kn: { common: commonKn, registry: registryKn, docs: docsKn, propDocs: propDocsKn },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
```

### 3. RTL Support

Create `src/styles-rtl.css` with RTL overrides:
```css
html[dir="rtl"] .nav {
  flex-direction: row-reverse;
}

html[dir="rtl"] .app {
  direction: rtl;
  text-align: right;
}

html[dir="rtl"] .brand {
  flex-direction: row-reverse;
}

/* ... more RTL rules */
```

Add a `useRTL()` hook that:
- Sets `document.documentElement.dir = 'rtl'` when language is Arabic
- Sets `document.documentElement.dir = 'ltr'` for all other languages
- Runs on language change

### 4. Language Switcher Component

Create `src/LanguageSwitcher.tsx`:
- Dropdown or button group showing all 4 languages with native names
- Click handler updates i18next language and localStorage
- Positioned in the header next to nav buttons
- Displays current language with a flag or language code

### 5. Component Integration

**App.tsx:**
- Initialize i18next in `useEffect` on mount
- Import and render LanguageSwitcher in header
- Add RTL effect hook

**Gallery.tsx, Examples.tsx, Playground.tsx:**
- Use `useTranslation()` hook to access `t()` function
- Replace hardcoded strings with `t('key')` calls
- Update navigation labels and UI text

**registry.tsx:**
- Export translation keys instead of hardcoded English text
- Components read from i18next at render time
- Dynamically translate chart titles, descriptions, examples

**Docs.tsx:**
- Use `useTranslation('docs')` to access documentation namespace
- Replace hardcoded markdown/content with translated keys
- Translate table headers and section titles

### 6. Implementation Order

1. Install dependencies (i18next, react-i18next, i18next-browser-languagedetector)
2. Create `src/i18n.ts` configuration
3. Create all 16 translation JSON files with English content
4. Create `src/LanguageSwitcher.tsx` component
5. Create `src/useRTL.ts` hook
6. Update `App.tsx` to initialize i18next and render switcher
7. Update all UI components to use `useTranslation()`
8. Translate all content files to French, Arabic, Kannada
9. Add RTL CSS and integrate with useRTL hook
10. Test language switching and RTL layout

## Translation Keys Organization

Keys follow a hierarchical naming convention:
- `nav.*` — navigation and header items
- `charts.{chartId}.*` — chart-specific content
- `docs.*` — documentation pages
- `common.*` — generic UI strings
- `footer.*` — footer content

## Browser Language Detection

i18next-browser-languagedetector checks in order:
1. localStorage (previously selected language)
2. Browser language preferences
3. HTML lang attribute
Falls back to English if no match found.

## RTL Considerations

- Only Arabic uses RTL; French, English, Kannada use LTR
- Flexbox directions need reversal in RTL mode
- Text alignment and margins adjusted
- Dropdown menus position adjusted for RTL
- Overall layout direction set via `dir` attribute

## Files Created/Modified

**New files:**
- `src/i18n.ts` — i18next configuration
- `src/LanguageSwitcher.tsx` — language selection component
- `src/useRTL.ts` — RTL toggle hook
- `src/styles-rtl.css` — RTL overrides
- `src/locales/{en,fr,ar,kn}/*.json` — 16 translation files

**Modified files:**
- `package.json` — add dependencies
- `src/App.tsx` — initialize i18next, add language switcher
- `src/main.tsx` — initialize i18next
- `src/registry.tsx` — use translation keys
- `src/Gallery.tsx`, `src/Examples.tsx`, `src/Docs.tsx`, `src/Playground.tsx` — use `useTranslation()`
- `src/styles.css` — import RTL styles

## Success Criteria

✓ All 4 languages selectable and functional  
✓ Language choice persists across page reloads  
✓ Browser language automatically detected on first visit  
✓ Arabic displays in RTL with proper layout  
✓ All UI text, chart metadata, and documentation translated  
✓ No console warnings from i18next  
✓ Language switcher accessible and intuitive
