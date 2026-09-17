# TODO.md — Phased checklist + backlog

## Phase: CODING (opened after "code it" + approve plan + approve design + UI is final, all 2026-09-17) — DONE
- [x] Create `assets/css/`, `assets/js/` folders
- [x] Write `assets/js/subjects.config.js` (3 entries)
- [x] Write `assets/css/app.css`
- [x] Write `assets/js/app.js`
- [x] Write `index.html`
- [x] Copy AWD file to `subjects/advanced-web-designing.html`; apply the 2
      documented edits (nav snippet + storage-key renames) — diff verified,
      exactly the documented lines changed
- [x] Copy PHP file to `subjects/php-mysql-wfs.html`; apply the 1 documented
      edit (nav snippet only) — diff verified
- [x] Copy NT file to `subjects/network-technologies.html`; apply the 1
      documented edit (nav snippet only) — diff verified
- [x] Write `README.md`

**Verification run this session:** `node --check` passed on both JS files;
all files `index.html` references confirmed to exist at the right relative
paths; `diff` against each original subject file confirmed only the
documented lines changed; `<script>`/`<style>` tag balance checked in all 4
modified/new HTML files. **NOT run:** actual in-browser test (Chrome
extension not connected this session) — see TESTING phase below, still
open.

## Phase: TESTING (per subject — brief §27) — run 2026-09-17, live in Chrome via a local `python -m http.server`
- [x] AWD: card appears with correct name/icon, opens correct file
- [x] AWD: page loads, CSS renders correctly
- [x] AWD: "← Sem 5" link — **found overlapping the header title (real bug,
      fixed same session)**, re-verified clean after fix, returns to dashboard
- [x] AWD: search tested implicitly via PHP (same base template) — not
      independently re-tested on AWD itself. **NOT VERIFIED on AWD
      specifically:** bookmarks, focus mode, dark mode toggle
- [x] PHP-WFS: card appears with correct name/icon, opens correct file
- [x] PHP-WFS: page loads, CSS renders correctly
- [x] PHP-WFS: "← Sem 5" link — same overlap bug found + fixed, re-verified clean
- [x] PHP-WFS: search tested live (typed "session", 225→16 results, sidebar
      counts updated correctly, no console errors)
- [ ] PHP-WFS: bookmarks, focus mode, dark mode — NOT independently tested
- [x] NT: card appears with correct name/icon, opens correct file
- [x] NT: page loads, CSS renders correctly, "← Sem 5" already clean (no bug
      here — NT's header has inset padding, unlike AWD/PHP)
- [ ] NT: search/filters/bookmarks/dark mode — NOT independently tested
- [x] No console errors on dashboard, AWD, or PHP-WFS (checked explicitly)
- [ ] NT console — not explicitly checked
- [ ] Mobile layout — **NOT visually verified**: browser window resize
      tool did not change the captured viewport in this environment. CSS is
      `grid-template-columns:repeat(auto-fill,minmax(240px,1fr))`, which
      mathematically collapses to 1 column under ~500px — verified by
      reading the rule, not by seeing it render narrow. Recommend a manual
      check on an actual phone or a real narrow browser window.

Dashboard-level:
- [x] All 3 cards render from config (confirmed via live screenshot + console log "Subject cards loaded (3)")
- [x] Theme toggle works, persists visually, dark mode screenshot confirmed
- [x] Continue Studying banner appears after visiting a subject (tested:
      opened AWD, returned home, banner showed "Advanced Web Designing" correctly)
- [ ] No horizontal overflow at 320px — not verified (see mobile note above)
- [x] `[APP]`/`[NAV]`/`[STORAGE]` console logs confirmed present and correctly worded

## Backlog (out of scope for this pass — §J14, not silently added)
- Global cross-subject search (brief §14 — only if reliably implementable;
  not attempted this pass)
- Per-subject progress bars on cards (brief §13 — no reliable data source
  found across all 3 subjects without fragile scraping)
- Question counts on cards (see UI-SPEC.md rationale)
- Renaming the original `Theroy Question Bank\` folder's on-disk filenames
  (left as-is; not referenced by production code once `subjects/` exists)
- A 4th+ subject — architecture supports it (one config entry + one file),
  add when the file is supplied
