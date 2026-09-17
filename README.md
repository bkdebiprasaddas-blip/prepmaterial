# TYBCA Sem 5 — Exam Preparation Hub

A single dashboard that links to the existing per-subject exam-prep study
systems for TYBCA Semester 5. Each subject stays its own independent,
fully self-contained HTML app — this hub only routes you to it.

## How to run it

No install, no build step. Either:

- **Double-click `index.html`** — works directly, fully offline.
- Or serve it locally (optional): `npx serve .` / `python -m http.server`,
  then open the printed `localhost` URL.

## Where files live

```
index.html                      ← the dashboard (this is what you open)
assets/css/app.css               ← dashboard styling only
assets/js/app.js                 ← dashboard behavior only
assets/js/subjects.config.js     ← the list of subjects shown on the dashboard
subjects/                        ← the actual subject study systems
  advanced-web-designing.html
  php-mysql-wfs.html
  network-technologies.html
```

Each file in `subjects/` is untouched content-wise. The only edits made were:
- one small "← Sem 5" link+style injected right after `<body>` in each,
  so you can get back to the dashboard;
- (Advanced Web Designing only) its bookmark/theme `localStorage` keys were
  renamed from the mismatched `nt503_bookmarks`/`nt503_theme` to
  `awd_bookmarks`/`awd_theme`, so it can never collide with the real
  Network Technologies subject's own storage.

## How to add a new subject

1. Drop the subject's HTML file into `subjects/`.
2. Add one entry to `assets/js/subjects.config.js`:
   ```js
   {
     id: "unique-id",
     name: "Subject Name",
     shortName: "SHORT",
     icon: "📚",
     description: "One line describing what's inside.",
     file: "subjects/your-file.html"
   }
   ```
3. (Recommended, not required) add the same "← Sem 5" nav snippet used in
   the other 3 files right after that file's `<body>` tag — see any file in
   `subjects/` for the exact snippet to copy.
4. Reload `index.html` — the card appears automatically. No other file changes.

## How navigation works

The dashboard never loads subject content itself — clicking a card is a
normal link to `subjects/<file>.html`. Each subject page's own "← Sem 5"
link points back to `../index.html`. Browser back/forward works normally
throughout.

## How debugging works

Add `?debug=1` to the dashboard URL, or run
`localStorage.setItem('tybca_sem5_debug','1')` in the console, to see
`[DEBUG]` log lines in addition to the always-on `[APP]`/`[NAV]`/`[STORAGE]`/
`[ERROR]` lines. Subject pages keep whatever logging they already had.

## How to test

See `governance/planning/TODO.md` for the full checklist. Quick version:
open `index.html`, click each card, confirm the subject page loads with its
existing search/filters/bookmarks/dark-mode/focus-mode all still working,
and that "← Sem 5" returns you to the dashboard.
