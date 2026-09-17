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

**Revised after live browser testing (2026-09-17) — original plan below was
wrong for 2 of 3 files, corrected same session, per §J12A.**

Original plan: identical fixed-position pill (`top:12px;left:12px`) injected
after `<body>` in all 3 files, reasoned to be collision-free by grepping
existing `position:fixed` rules. That grep only checked for *fixed-element*
collisions — it missed that AWD's and PHP's headers are full-bleed color
bands starting flush at the very top of the page with no padding, so a
fixed top-left badge sat directly on top of their header title text
("Advanced Web Designing" read as "dvanced Web Designing"). Caught by
actually opening the pages in a browser, not by static inspection alone —
this is exactly why §J13/the brief's own §27 require live testing before
calling a UI change done.

**Corrected, verified approach (screenshotted, confirmed clean):**
- **AWD and PHP-WFS:** the "← Sem 5" link is inserted *in-flow* as the first
  child of the header's own flex row (`.header-left` in AWD, `.brand` in
  PHP — both already `display:flex;align-items:center;gap:12px`), styled as
  a small translucent-white pill matching their purple header background.
  It becomes part of the existing row instead of floating over it — no
  overlap, verified by screenshot before and after.
- **NT:** kept the original fixed-position top-left pill — verified clean
  because NT's `.hero` header sits inside a padded `.app` wrapper (22px),
  so the viewport's top-left corner is genuinely empty there. Not changed,
  since it already worked (§J9 — don't touch what isn't broken).
- Same `tybca-sem5-home` class name across all 3 (checked: no pre-existing
  collision in any file), same `../index.html` target, same accessible
  `aria-label`/`title`. Visual styling differs slightly (in-flow pill vs.
  floating pill) because the injection method differs, not the intent.
- This is still pure addition — zero pre-existing lines removed or altered,
  other than the 2-line AWD key rename below.

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
