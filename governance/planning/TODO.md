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

## Bug fix: AWD "More options" (⋮) menu not working on mobile — 2026-09-17
User-reported ("web development mobile view more options are not working
check" → confirmed: "three dot menu in top right"). Reproduced and fixed;
**pre-existing bug in the original file, not caused by the integration**
(confirmed via diff against `Theroy Question Bank\Advanced_Web_Designing_Master_Question_Bank.html`
before any of today's edits).

Two distinct, compounding causes, both in AWD only:
1. `.dropdown{position:absolute;...}` lived inside `.control-bar{overflow-x:auto}`
   — per the CSS overflow spec, `overflow-x:auto` also computes `overflow-y`
   to `auto`, clipping the dropdown wherever it extended past the control
   bar's own box. Fixed: `.dropdown` switched to `position:fixed`, with its
   `top`/`left` computed in JS from the button's live
   `getBoundingClientRect()` on each open (also repositions on resize).
2. After fix #1, found a second issue via DOM inspection
   (`document.elementFromPoint`): `.site-header{position:sticky;z-index:100}`
   outranked `.control-bar{position:sticky;z-index:90}`, and since the
   dropdown was a DOM descendant of `.control-bar`, its own `z-index:250`
   only competed within control-bar's local stacking context — capped below
   the header regardless. Fixed: dropdown reparented to `document.body` on
   init (standard "portal" pattern), so its z-index compares directly
   against page-level siblings instead of being trapped inside a lower
   nested stacking context.

**Checked PHP and NT for the same bug class** (both have a similarly-ranked
sticky header vs. control-bar/controls z-index) — empirically tested via
`document.elementFromPoint` after opening their own "more" menus: **neither
is actually affected** (their dropdowns render on top correctly). No changes
made to those two files — nothing to fix.

Verified: diff against original AWD file is now nav-snippet + key-rename +
these 2 targeted JS/CSS changes only, nothing else. Live-tested: menu opens,
is visible, unclipped, click-outside-closes still works, no console errors,
confirmed via `document.elementFromPoint` (topmost element at the dropdown's
center is inside the dropdown itself, not the header).

## Site-wide audit + unified palette — 2026-09-17
User asked to check for issues anywhere and make the subject pages look
consistent. Actions taken:
- **Audit:** checked console errors on all 4 pages (clean), systematically
  scanned all 3 subject files for the same popup-clipping/stacking-context
  bug class found in AWD's More menu (searched every `position:absolute`
  popup-style element + its ancestor chain) — no other instances found;
  the two other high-z-index overlays (PHP's focus mode, AWD's drawer
  backdrop) are correctly placed as body-level siblings, not nested inside
  a capped stacking context. Functionally tested search/bookmarks/theme-
  toggle/filters on all 3 subjects via dispatched click/input events — all
  work, no errors. Verified all 8 localStorage keys across dashboard + 3
  subjects are distinct (no collisions) by inspecting live storage state
  after exercising every page.
- **Unified palette (MAJOR change, see ARCH-DESIGN.md):** remapped AWD's
  and PHP's CSS color variables to the dashboard's exact palette; NT
  already matched. Re-verified all functionality afterward (search,
  bookmarks, theme, More menu) — no regressions, no console errors, diffs
  confirmed additive/variable-value-only against originals.

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
