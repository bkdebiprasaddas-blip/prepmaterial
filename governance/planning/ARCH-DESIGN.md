# ARCH-DESIGN.md — Architecture (no DB; static multi-page site)

## Architecture pattern
"App launcher" — `index.html` is a lightweight launcher; each subject is an
independent HTML document reached by normal navigation (`<a href="subjects/...">`),
never an iframe, never DOM-merged (per the brief §18/§19 — deliberately avoids
CSS/JS/ID collisions by construction, since each navigation loads a fresh
document context).

## Data model
No database. One in-memory JS config array is the only "data model":

```js
// assets/js/subjects.config.js
window.TYBCA_SEM5_SUBJECTS = [
  { id: "awd", name: "Advanced Web Designing", shortName: "AWD", icon: "🌐",
    description: "PYQs, important questions and revision material.",
    file: "subjects/advanced-web-designing.html" },
  { id: "php-wfs", name: "PHP, MySQL & Web Framework Services", shortName: "PHP/WFS", icon: "🐘",
    description: "Question bank by marks, previous-year papers, exam-focused prep.",
    file: "subjects/php-mysql-wfs.html" },
  { id: "nt", name: "Network Technologies (503)", shortName: "NT", icon: "📡",
    description: "340 PYQs across 7 sections, exam-ready answers.",
    file: "subjects/network-technologies.html" }
];
```
Adding a subject = append one object here + drop the file in `subjects/`
(REQ-001, satisfies brief §15/§31).

## Storage namespacing (cross-subject collision audit — REQ-004)

| Subject | Keys found | Action |
|---|---|---|
| AWD | `nt503_bookmarks`, `nt503_theme` (bug: NT-branded names) | **Rename** → `awd_bookmarks`, `awd_theme` (2 literal-string edits inside AWD's own inline `<script>`; approved by user) |
| PHP/WFS | `phpwfs_bookmarks_v1`, `phpwfs_theme_v1` | Already namespaced — no change |
| NT | `nt503.theme`, `nt503.saved`, `nt503.guideClosed`, `nt503.sidebarCollapsed` | Already namespaced — no change |

After the AWD rename, no two subjects share a literal storage key. Dashboard
adds its own separate keys (`tybca_sem5_theme`, `tybca_sem5_last_subject`) per
the brief's §12 example — namespaced, cannot collide with any subject key.

**Risk accepted (recorded per §J0E, low severity):** renaming AWD's keys
resets any bookmarks/theme choice a user already saved under the old
`nt503_*` names in their browser. Acceptable — no production users yet.

## Navigation integration (REQ-003)
All 3 subject headers are structurally different (`.site-header` w/
`.header-left`/`.header-right` in AWD; `.site-header` w/ `.brand` in PHP;
`.hero` w/ `.hero-top` in NT) — weaving into each one's specific layout is
unnecessary risk for a one-line requirement. Instead: identical, minimal,
additive approach for all 3 (Option A from the brief, §10):

- Inject one small fixed-position pill link right after `<body>`:
  `<a href="../index.html" class="tybca-sem5-home">← Sem 5</a>` + a scoped
  `<style>` block using a `tybca-sem5-home` class name (checked: does not
  exist in any of the 3 files — no collision).
- Fixed top-left corner (`top:12px;left:12px;z-index:999999`). Verified by
  grep against all `position:fixed` rules in all 3 files: AWD/PHP have thin
  (3–4px) top progress strips only (no overlap below 12px), NT's only
  fixed corner element is bottom-right (no overlap). No existing element
  occupies top-left in any of the 3 files.
- This is pure addition — zero existing lines removed or altered, other than
  the 2-line AWD key rename above.

## Security baseline
Static site, no backend, no accounts, no user-submitted data leaves the
browser, no external network calls (confirmed: zero CDN/external refs in any
of the 3 subject files). XSS surface: subject config values are static,
developer-authored strings (not user input) — no sanitization gap. See
SECURITY-THREAT-MODEL.md for the full (short) writeup.

## Non-functional notes
- Performance: `index.html` loads only the config + its own CSS/JS; subject
  HTML (up to 1.3MB) loads only on click (REQ per brief §23).
- Accessibility: cards are real `<a>` elements (native keyboard focus/Enter
  activation), visible focus outline, `aria-label` on icons-only elements.
- Responsive: CSS grid, `auto-fill`/`minmax`, tested breakpoints per
  TODO.md §28 list (320/375/390/430/768/1024/1366px).
