# IELTS Lexicon SRS — Implementation & Delivery Plan

## Overview
A personal single-user Spaced Repetition System (Anki-style) web application tailored for IELTS preparation (Academic Collocations, Phrasal Verbs, Idioms, Linking Words & Discourse Markers, Complex Grammar Structures, Topic Vocabulary, Writing Task 2, and Speaking Part 2 phrases).

Vanilla ES Modules, pure vanilla CSS, zero npm runtime dependencies, offline PWA ready, fully tested.

---

## Architecture & Module Structure

```
├── index.html                  # Main SPA entrypoint (HTML shell + nav + main view container)
├── manifest.webmanifest        # PWA Web App Manifest
├── sw.js                       # Service worker with offline asset caching
├── README.md                   # Instructions (how to run, backup/restore, shortcuts, card formats)
├── PLAN.md                     # Roadmap, decisions, progress tracking
├── styles/
│   ├── tokens.css              # Design tokens (colors, dark mode, typography, shadows, radii)
│   ├── base.css                # Reset, typography, layout container, buttons, badges
│   └── components.css          # Cards, study flip stage, diff view, charts, modals, browser table
├── src/
│   ├── config.js               # SRS parameters, defaults, constants
│   ├── strings.js              # All UI strings, labels, tooltips, error messages in one place
│   ├── model.js                # Factory functions for Card, Deck, ReviewLog, Note
│   ├── storage.js              # Centralized DAO for localStorage, quotas, migrations, error boundaries
│   ├── scheduler.js            # Pure SM-2 / Anki scheduler functions (immutable, no DOM, no storage)
│   ├── queue.js                # Daily study queue builder with 4:00 AM rollover & limits
│   ├── store.js                # Central state management + subscription pattern
│   ├── router.js               # Lightweight hash-based client router (#/decks, #/study/:id, etc.)
│   ├── seed.js                 # 150+ Band 5.5–8.0+ curated IELTS starter cards & decks
│   ├── utils.js                # escapeHtml, diff algorithms, cloze parser, speech synthesis, CSV parser
│   ├── main.js                 # App bootstrap, router initialization, global shortcuts
│   └── views/
│       ├── decks.js            # Deck list, hierarchy (Parent::Child), counts, custom study modal
│       ├── study.js            # Active card study, flip, 1-4 grading, typed diff, cloze, gestures, audio
│       ├── add.js              # Single card creation & Bulk add (text / CSV) with live preview
│       ├── browse.js           # Full card browser, search, filters, sorting, bulk actions, edit modal
│       ├── stats.js            # Pure Canvas/SVG analytics: heatmap, retention, forecast, review history
│       └── settings.js         # Preferences (limits, steps, voice accent, theme, keyboard shortcuts)
└── tests/
    ├── scheduler.test.js       # Scheduler pure unit tests (8 core + advanced edge cases)
    ├── queue.test.js           # Queue ordering, daily limits, rollover
    ├── cloze.test.js           # Cloze parsing ({{c1::...}}, hints, note generation)
    ├── diff.test.js            # Typed answer normalization & character-level diff
    ├── storage.test.js         # Backup export/import validation, merge & replace, migrations
    └── tests.html              # Browser-based test runner with green/red UI and console reporting
```

---

## Roadmap & Checklist

- [x] **Step 0: Understand baseline & Setup Plan**
  - [x] Read index.html fully and inspect foundation code
  - [x] Create PLAN.md and define modular architecture
- [x] **Step 1: Restructure into Vanilla ES Modules (Zero behavior change)**
  - [x] Extract styles (`styles/tokens.css`, `styles/base.css`, `styles/components.css`)
  - [x] Extract core logic:
    - [x] `src/config.js`
    - [x] `src/strings.js`
    - [x] `src/model.js`
    - [x] `src/storage.js`
    - [x] `src/scheduler.js`
    - [x] `src/queue.js`
    - [x] `src/store.js`
    - [x] `src/router.js`
    - [x] `src/seed.js`
    - [x] `src/utils.js`
    - [x] `src/main.js`
  - [x] Extract views (`decks.js`, `study.js`, `add.js`, `browse.js`, `stats.js`, `settings.js`)
  - [x] Create `tests/scheduler.test.js` and `tests.html`
  - [x] Write `README.md` with run instructions (Python http.server, VS Code Live Server, GitHub Pages)
  - [x] Verify baseline tests pass and baseline UI functions
- [x] **Step 2.1: JSON Backup & Auto-Reminder**
  - [x] Full export to dated JSON (`ielts-backup-YYYY-MM-DD.json`)
  - [x] Import with schema validation
  - [x] Merge-without-duplicates mode vs Replace-all mode (with modal confirmation)
  - [x] 7-day backup reminder banner
- [x] **Step 2.2: Card Browser & Editor**
  - [x] Table/list with fast search (front, back, example, tags)
  - [x] Multi-filter: deck, tag, state (new/learning/review/relearning), band (5.5-8.5), suspended
  - [x] Sortable columns: due date, created date, ease factor, lapses, reps
  - [x] Bulk selection: bulk delete, bulk move deck, bulk suspend/unsuspend, bulk tag edit
  - [x] Full card edit modal with instant validation and save
- [x] **Step 2.3: Typed-Answer Cards**
  - [x] Normalized comparison (case-insensitive, trims, punctuation normalization)
  - [x] Character-level diff highlighting: correct (green), missing (yellow/underline), wrong (red/strike)
  - [x] Integrated with flip animation and 1-4 grading
- [x] **Step 2.4: Cloze Cards Engine**
  - [x] Note format: `{{c1::target}}`, `{{c2::target}}`, with hints `{{c1::target::hint}}`
  - [x] Multi-cloze note expansion into individual cards per cloze index
  - [x] Hidden cloze prompt `[...]` or `[hint]`, answer reveal on flip
- [x] **Step 2.5: Settings Screen**
  - [x] Daily new cards limit, max reviews per day
  - [x] Learning steps & relearning steps parser and validator
  - [x] Graduating interval, easy interval, easy bonus, hard multiplier
  - [x] Web Speech API UK vs US accent selector
  - [x] Theme switcher: Light / Dark / Auto (system)
  - [x] Font size selector: Small / Medium / Large
  - [x] Keyboard shortcuts toggle (enabled/disabled)
  - [x] Day rollover hour (default 4:00 AM)
- [x] **Step 2.6: Statistics Screen (Canvas & SVG, zero libraries)**
  - [x] KPI cards: studied today, retention rate (% Good + Easy), current streak, max streak
  - [x] Card state distribution donut/pie chart (new, learning, young, mature)
  - [x] 30-day reviews per day bar chart
  - [x] 14-day upcoming due forecast bar chart
  - [x] 52-week GitHub-style study activity calendar heatmap
  - [x] Total study time tracked
- [x] **Step 2.7: Bulk Add & CSV Import/Export**
  - [x] Quick paste format: `front | back | example | tags`
  - [x] Real-time parsing table preview with duplicate detection
  - [x] CSV import (RFC 4180 standard) and CSV export of selected/all cards
- [x] **Step 2.8: Deck Improvements & Sub-decks**
  - [x] "Parent::Child" hierarchical deck grouping with expand/collapse
  - [x] Per-deck daily limits override
  - [x] Deck counts: New, Learn, Due, Total
  - [x] "Custom Study" modal: study ahead by N days, add extra new cards for today
- [x] **Step 2.9: Study Screen Enhancements**
  - [x] Shortcut keys: Space (flip), 1-4 (grade), E (edit), S (suspend), B (bury), Z (multi-step undo)
  - [x] Undo stack for reviews in current session
  - [x] Card info drawer: ease, lapses, reps, next intervals, review log history
  - [x] Text-to-speech button and auto-speak setting
  - [x] Visual progress bar for session
- [x] **Step 2.10: Mobile Ergonomics & Swipe Gestures**
  - [x] Touch swipe on flashcard: swipe left (Again), swipe down (Hard), swipe right (Good), swipe up (Easy)
  - [x] Minimum 44px touch targets
  - [x] Safe-area-insets support for iOS/Android notches
- [x] **Step 2.11: Progressive Web App (PWA)**
  - [x] `manifest.webmanifest` with icons and theme colors
  - [x] Standalone service worker `sw.js` for full offline caching
  - [x] App install banner / button
  - [x] Crisp SVG icons and high-res PNG icons
- [x] **Step 2.12: High-Quality IELTS Lexicon Seed Data (150+ cards)**
  - [x] Academic Collocations (Band 7.0–8.5)
  - [x] Phrasal Verbs in Academic / Formal context
  - [x] High-Scoring Idioms & Colloquialisms for Speaking Part 2/3
  - [x] Discourse Markers & Linking Words for Cohesion (Writing Task 2)
  - [x] Complex Grammar Structures (Inversion, Conditionals 3 & Mixed, Participles, Cleft Sentences)
  - [x] Topic Vocabulary across 8 core IELTS themes:
    - Environment & Climate Change
    - Education & Academic Systems
    - Technology & Artificial Intelligence
    - Public Health & Healthcare
    - Modern Society & Urbanization
    - Work, Employment & Automation
    - Crime, Law & Justice
    - Mass Media & Digital Information
  - [x] Writing Task 2 Task Response & Cohesion Phrases
  - [x] Speaking Part 2 & Part 3 Fluency & Discursive Phrases
  - [x] Complete fields: front, back, example, IPA, part of speech, band level, tags, notes
- [x] **Step 2.13: Performance & Robustness**
  - [x] Indexed lookups and lightweight rendering
  - [x] QuotaExceededError graceful fallback with auto-export prompt
  - [x] Day rollover calculation (4:00 AM)
  - [x] Schema versioning & data migration system in `storage.js`
- [x] **Step 2.14: Accessibility & Visual Polish**
  - [x] High contrast ratios (WCAG AA compliant) in light and dark modes
  - [x] ARIA live regions for card flips, modal focus traps, keyboard navigation
  - [x] Reduced motion media query (`prefers-reduced-motion`)

## Source Rule (Strict Authentic IELTS Corpus & Journalism)
All vocabulary, collocations, phrases, and grammar structures MUST be based on authentic, high-quality English journalism and academic writing:
- **Preferred sources**: *The Guardian*, *BBC News*, *The Economist*, *Financial Times*, *New Scientist*, *Scientific American*, *Oxford Collocations Dictionary*, *Cambridge Advanced Learner's Dictionary*, Coxhead's *Academic Word List (AWL)*, and official Cambridge IELTS / British Council / IDP sample material.
- **Verification**: Every collocation must be verified against at least one authoritative dictionary or corpus before inclusion. Zero invented collocations.
- **Attribution**: Every card must include its source in `notes` or `tags` (e.g. `source: Oxford Collocations`, `source: The Economist`, `source: Cambridge Dictionary`).
- **Sentences**: Write original illustrative sentences matching authentic journalistic / academic register (or use short quotes <15 words with source and year).
- **Recency**: Prefer modern usage from the last 5–10 years; avoid archaic or overly obscure literary expressions.

---

## Architectural Decisions & Invariants
1. **Zero External Runtime Dependencies**: Standard HTML5, CSS3, ES2022 JavaScript. Runs in any modern browser.
2. **Pure Scheduler**: `src/scheduler.js` has zero side effects, no DOM references, no localStorage calls. It takes `(card, rating, now, settings)` and returns `{ card, log }`.
3. **Isolated Persistence**: ALL `localStorage` access goes through `src/storage.js`. No view or component touches `localStorage` directly.
4. **Single Source of Strings**: Every UI text label, button caption, tooltip, and alert is defined in `src/strings.js`.
5. **View Lifecycle**: Every view module in `src/views/` exports `render(container, params)` and `destroy()`.
6. **Data Immutability**: All scheduler calculations return fresh object copies.
7. **Schema Versioning**: Version stored in `ielts_meta.schemaVersion`. Any change in model structure runs an automated migration chain.
