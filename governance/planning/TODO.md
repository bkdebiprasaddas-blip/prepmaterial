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

## Phase: TESTING (per subject — brief §27)
For each of AWD / PHP-WFS / NT:
- [ ] Card appears on dashboard with correct name/icon
- [ ] Card opens the correct file
- [ ] Page loads, CSS renders correctly
- [ ] Existing JS features still work: search, filters, bookmarks, focus
      mode, dark mode (subject's own, not the hub's)
- [ ] "← Sem 5" link visible, doesn't overlap existing controls, returns home
- [ ] Browser back button works normally
- [ ] No new console errors
- [ ] Mobile layout intact (see UI-SPEC.md responsive checklist)

Dashboard-level:
- [ ] All 3 cards render from config (no hard-coded card HTML)
- [ ] Theme toggle works, persists, respects system preference on first load
- [ ] Continue Studying banner appears after visiting a subject, links correctly
- [ ] No horizontal overflow at 320px
- [ ] `[APP]`/`[NAV]` console logs appear as specified; `[DEBUG]` only with `?debug=1`

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
