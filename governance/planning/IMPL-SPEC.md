# IMPL-SPEC.md — per-file behavior (mechanical; no improvisation once "code it" is confirmed)

## Conventions
- No inline `<script>`/`<style>` in `index.html` beyond what's necessary;
  split into `assets/css/app.css`, `assets/js/app.js`, `assets/js/subjects.config.js`.
- Console logging prefixes exactly as the brief specifies: `[APP]`, `[SUBJECT]`,
  `[NAV]`, `[STORAGE]`, `[ERROR]`, `[DEBUG]` (REQ-006). Dev mode toggled by
  `?debug=1` in the URL or `localStorage.tybca_sem5_debug === "1"`; `[DEBUG]`
  lines only print in dev mode, the rest always print (errors must never be
  silent).
- No secrets, no network calls, no analytics.

## `index.html`
- Semantic structure: `<header>` (title + subtitle + theme toggle),
  `<main>` (subject grid, built by JS from `subjects.config.js`), `<footer>`.
- Loads `assets/css/app.css`, then `assets/js/subjects.config.js`, then
  `assets/js/app.js` (defer).
- No subject content embedded here — cards only (REQ-001).

## `assets/js/subjects.config.js`
- Defines `window.TYBCA_SEM5_SUBJECTS` exactly as in ARCH-DESIGN.md.
- Pure data — no DOM access, no logic.

## `assets/js/app.js`
Responsibilities (each wrapped in try/catch so one failure can't blank the page):
1. `renderCards()` — builds one card per config entry: icon, name, description,
   "Open Subject" link `href=config.file`. Logs `[APP] Subject cards loaded (n)`.
2. `initTheme()` — dashboard's own light/dark toggle, stored at
   `tybca_sem5_theme` (separate namespace from every subject — REQ-004). Logs
   `[APP] Theme changed`.
3. `trackLastOpened(subjectId)` — on card click, before navigating, write
   `tybca_sem5_last_subject = subjectId`. Logs `[NAV] Opening subject: <name>`
   and `[NAV] Navigation target: <file>`.
4. `renderContinueStudying()` — if `tybca_sem5_last_subject` exists and
   matches a known subject id, show a "Continue Studying" banner linking to
   it; otherwise omit the section entirely (never fabricate a default —
   DISCOVERY.md non-goals).
5. `onLinkError` — if a subject `<a>` fails to resolve at runtime (checked via
   a lightweight existence probe is NOT done — static `<a href>` needs no
   JS check; a broken link just 404s in-browser). Instead, provide a static
   fallback message block, hidden by default, shown only if a subject file is
   later removed and the user edits config incorrectly — out of scope for
   MVP; note in TODO backlog rather than build now (§J14).
6. All functions log `[APP] Homepage initialized` once, on `DOMContentLoaded`.

## `assets/css/app.css`
- Design tokens per UI-SPEC.md (palette, spacing, radius).
- CSS Grid for the card list:
  `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;`
  — naturally yields 4–5 cols desktop, 2–3 tablet, 1–2 mobile without
  hand-written breakpoints (satisfies brief §9 responsive table).
- `:focus-visible` outlines, `prefers-reduced-motion` guard on hover/transition.

## `subjects/advanced-web-designing.html`
Copied from `Theroy Question Bank\Advanced_Web_Designing_Master_Question_Bank.html`
with exactly 3 changes:
1. Right after `<body>`, insert the "← Sem 5" nav snippet (ARCH-DESIGN.md).
2. `__lsGet('nt503_bookmarks')` / `__lsSet('nt503_bookmarks', ...)` →
   `'awd_bookmarks'` (2 occurrences: lines ~3830, ~4060, plus read at ~4544).
3. `__lsGet('nt503_theme')` / `__lsSet('nt503_theme', ...)` → `'awd_theme'`
   (occurrences ~3831, ~3835).
No other byte of this file changes. Acceptance: diff shows only these lines.

## `subjects/php-mysql-wfs.html`
Copied from
`Theroy Question Bank\PHP_MYSQL_WFS_Master_Question_Bank_By_Marks_Modern_Question_Bank.html`
with exactly 1 change: the "← Sem 5" nav snippet after `<body>`. No storage
keys touched (already namespaced). Acceptance: diff shows only the inserted
snippet.

## `subjects/network-technologies.html`
Copied from
`Theroy Question Bank\Network_Technologies_503_Question_Bank_Final_Exam_Study_System.html`
with exactly 1 change: the "← Sem 5" nav snippet after `<body>`. No storage
keys touched (already namespaced). Acceptance: diff shows only the inserted
snippet.

## `README.md`
Sections: Run it, Add a subject, Where files live, Debugging (`?debug=1`),
Testing (the checklist from TODO.md §27/§28), How navigation works.

## Acceptance tests (traced to REQ IDs, run manually — see TODO.md for the
full per-subject checklist)
- REQ-001: `index.html` shows exactly 3 cards, generated (not hard-coded) —
  verified by temporarily adding a 4th config entry and confirming a 4th
  card appears without any HTML edit, then removing it again.
- REQ-002: each `subjects/*.html` diffed against its source — only the
  documented lines differ.
- REQ-003: from each subject page, "← Sem 5" click returns to `index.html`.
- REQ-004: `localStorage` inspected in devtools after visiting all 3 subjects
  — no key exists twice with different owners.
- REQ-005: manual resize/devtools responsive check at the 7 breakpoints in
  TODO.md §28.
- REQ-006: devtools console shows the expected `[APP]`/`[NAV]` lines during
  normal use, `[DEBUG]` lines only with `?debug=1`.
- REQ-007: `README.md` steps followed literally on a clean checkout work.
