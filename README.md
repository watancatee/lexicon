# IELTS Lexicon — Spaced Repetition System (SRS)

An Anki-style Spaced Repetition flashcard web application tailored for IELTS Academic preparation (Collocations, Phrasal Verbs, Idioms, Linking Words & Cohesion, Complex Grammar Structures, Topic Vocabulary, Writing Task 2, and Speaking phrases).

Built with **Vanilla ES Modules**, standard HTML5, CSS3 design tokens, and zero npm runtime dependencies or bundlers. Fully functional offline as a Progressive Web App (PWA).

---

## 🚀 How to Run Locally

Because the application uses native **JavaScript ES Modules** (`import` / `export`), modern browsers enforce the Same-Origin Policy and will block module loading via the `file://` protocol. A local static web server is required.

### Option 1: Python 3 (Recommended)
Open a terminal (Command Prompt, PowerShell, or Bash) in this project directory and run:
```bash
python -m http.server 8000
```
Then navigate to: **`http://localhost:8000`** in your browser.

### Option 2: Node.js / npx
```bash
npx serve .
```
or:
```bash
npx http-server .
```

### Option 3: VS Code / IDE Live Server
If you use Visual Studio Code:
1. Install the **Live Server** extension (by Ritwick Dey).
2. Right-click `index.html` and choose **"Open with Live Server"**.

### Hosting on GitHub Pages
1. Push this folder directly to a GitHub repository (e.g., `main` branch).
2. Go to **Settings** > **Pages** in your repository.
3. Select **Source: Deploy from a branch** -> `main` branch -> `/ (root)`.
4. Click **Save**. Your IELTS SRS app will be live on `https://<your-username>.github.io/<repo-name>/`.

---

## 🧪 Automated Test Suite

A comprehensive automated assertion test suite is included to verify core invariants across:
1. **SM-2 Scheduler Engine** (immutability, graduation, lapse penalties, ease floors, interval previews).
2. **Study Day Rollover & Queue Logic** (4:00 AM day boundary, priority order, daily limits, sub-deck resolution).
3. **Cloze Deletion Engine** (parsing, hints, prompt masking, answers).
4. **Answer Normalization & Character-Level Diff** (Longest Common Subsequence diffing, whitespace & quote normalization).
5. **Storage DAO & Backup** (JSON backup export/import, merge without duplicates, replace mode, schema migration).

### Running Tests:
- Open **`http://localhost:8000/tests.html`** in your browser, or click the **🧪 Tests** button in the app header.
- You can also run `runSchedulerTests()` in the browser developer console at any time.

---

## ⌨️ Keyboard Shortcuts & Gestures

| Key / Action | Context | Action |
| :--- | :--- | :--- |
| **Space** | Study (Front) | Show Answer / Reveal Back |
| **1** | Study (Back) | Rate **Again** (forgotten, resets to 1m learning step) |
| **2** | Study (Back) | Rate **Hard** (effortful recall, interval × 1.2) |
| **3** | Study (Back) | Rate **Good** (normal recall, interval × ease) |
| **4** | Study (Back) | Rate **Easy** (instant recall, interval × ease × 1.3) |
| **E** | Study | Edit the currently displayed card inline |
| **S** | Study | Suspend / Unsuspend the current card |
| **B** | Study | Bury the card until tomorrow's study rollover (4:00 AM) |
| **Z** | Study | **Undo** previous rating in the current session |
| **Enter** | Typed Card | Submit answer & check character-level diff |

### 📱 Mobile Swipe Gestures
On smartphones and tablets, swipe directly across the flashcard:
- **Tap Card**: Flip card / reveal answer.
- **Swipe Left**: Grade **Again** (Rating 1).
- **Swipe Down**: Grade **Hard** (Rating 2).
- **Swipe Right**: Grade **Good** (Rating 3).
- **Swipe Up**: Grade **Easy** (Rating 4).

*(Swipe gestures and keyboard shortcuts can be toggled on/off in Settings).*

---

## 💾 Data Backup, Export & Restoration

All card progress and settings live in browser `localStorage`. To prevent data loss if your browser clears cache:

1. **Automatic Backup Reminder**: If you have not exported a backup in the last 7 days, a visible warning banner will appear offering a 1-click export.
2. **Manual JSON Export**: Navigate to **Settings** > **Data Backup & Restoration** > click **Export Backup (JSON)**. A dated file (`ielts-lexicon-backup-YYYY-MM-DD.json`) will download.
3. **Restoration Modes**:
   - **Merge Mode (Recommended)**: Adds new cards from the file and preserves existing review logs and progress without duplicate cards.
   - **Replace All Mode**: Completely resets and restores your database to the exact state saved in the backup file (requires confirmation).

---

## ➕ Adding Cards & Content Format

### 1. Single Card Form
Navigate to **Add Cards** > **Single Card**:
- Choose **Basic** (Front & Back), **Typed Answer** (checks spelling with character-level diff), or **Cloze Deletion**.
- **Cloze Format**: Use `{{c1::word}}` or `{{c1::word::optional hint}}`. You can include multiple clozes in one note (e.g. `{{c1::first}}` and `{{c2::second}}`); the engine will automatically generate separate flashcards for each index.

### 2. Quick Paste (Bulk Add)
Navigate to **Add Cards** > **Quick Paste**:
Paste multiple lines using the pipe (`|`) delimiter:
```text
front | back | example | tags
```
Example:
```text
exacerbate a problem | To make a bad situation worse | Industrial emissions exacerbate urban smog. | writing-task-2, environment
mitigate the impact | To reduce harmful effects | Public transit mitigates traffic congestion. | solutions, academic
```
Click **Preview Cards** to inspect duplicate detection before clicking **Import Valid Cards**.

### 3. CSV Import & Export
- **Export to CSV**: Download all cards in standard RFC 4180 CSV format.
- **Import from CSV**: Upload a spreadsheet containing columns: `Front`, `Back`, `Example`, `IPA`, `POS`, `Band`, `Tags`, `Notes`, `DeckId`.

---

## 📚 Lexicon Sources & Academic Register

All included vocabulary and collocations strictly adhere to authentic British and international academic writing standards. No invented idioms or textbook clichés.
- **Authoritative Lexicography**: *Oxford Collocations Dictionary*, *Cambridge Advanced Learner's Dictionary*, Coxhead's *Academic Word List (AWL)*.
- **Journalistic Sources**: *The Guardian*, *The Economist*, *BBC News*, *Financial Times*, *New Scientist*, *Scientific American*.
- Examiner Standards: Official Cambridge IELTS Band 7.5–9.0 speaking descriptors and writing criteria.
- Every card includes part of speech, IPA phonetic pronunciation, target Band level, illustrative sentence, source attribution, and an examiner-vetted **Usage Guide** (`context`: Writing Task 1/2 or Speaking Parts 1-3, `tone`: Academic Formal/Natural Spoken/Neutral, and `common_mistake`: explicit anti-example explaining how NOT to use the phrase).

---

## 🗂 Project File Structure

```
├── index.html                  # SPA HTML Shell with semantic layout and navigation
├── manifest.webmanifest        # Progressive Web App manifest
├── sw.js                       # Service worker with offline Stale-While-Revalidate caching
├── README.md                   # Complete documentation and usage guide
├── PLAN.md                     # Roadmap and architectural decisions log
├── tests.html                  # Visual browser test runner
├── icons/
│   └── icon.svg                # Vector app icon
├── styles/
│   ├── tokens.css              # Design tokens, color palettes, dark mode, font sizing
│   ├── base.css                # Resets, typography, layout container, buttons, badges, modals
│   └── components.css          # Cards, 3D flip stage, diff view, browser table, SVG charts
├── src/
│   ├── config.js               # SRS parameters, defaults, constants
│   ├── strings.js              # Single source of truth for all UI text & copy
│   ├── model.js                # Factory functions for Card, Deck, and ReviewLog
│   ├── storage.js              # LocalStorage DAO, quotas, backup export/import, schema migrations
│   ├── scheduler.js            # Pure SM-2 Anki scheduling engine
│   ├── queue.js                # 4:00 AM rollover, sub-deck resolver, priority study queue
│   ├── store.js                # Central reactive store & subscription manager
│   ├── router.js               # Hash router with view lifecycle (render/destroy)
│   ├── utils.js                # Character diff, cloze parser, Web Speech TTS, CSV parser
│   ├── seed.js                 # 150+ authentic IELTS starter cards across 12 decks
│   ├── main.js                 # Application bootstrap & reminder monitor
│   └── views/
│       ├── decks.js            # Deck list, sub-decks, counts, custom study modal
│       ├── study.js            # Study flow, flip animation, typed diff, audio, undo
│       ├── browse.js           # Card browser, search, filters, sorting, bulk actions, edit
│       ├── add.js              # Single card, cloze generator, quick paste, CSV import/export
│       ├── stats.js            # Retention, streaks, 30d review chart, donut, heatmap
│       └── settings.js         # Preferences, voice accent, themes, JSON backup management
└── tests/
    ├── scheduler.test.js       # Pure scheduler assertions
    ├── queue.test.js           # Queue ordering, daily limits, rollover assertions
    ├── cloze.test.js           # Cloze parsing and masking assertions
    ├── diff.test.js            # Answer normalization & character diff assertions
    └── storage.test.js         # DAO, merge/replace backup, migration assertions
```
