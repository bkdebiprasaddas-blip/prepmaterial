# DISCOVERY.md — TYBCA Sem 5 Exam Preparation Hub

> Per RULEBOOK §C0/§E.0. This idea was NOT vague — the user supplied a
> complete 38-section brief up front. This document exists for traceability
> (requirement IDs, MVP boundary) rather than to resolve ambiguity.

## Problem statement
A TYBCA (Sem 5) student has several already-built, self-contained HTML exam-prep
study systems (one per subject — question banks with search, filters,
bookmarks, focus mode, etc.), but no single entry point that lets them pick a
subject and jump straight into studying it.

## Target users
- Primary: the user themself, a TYBCA Sem 5 student, studying for exams.
- Secondary (possible, not required): classmates the user might share the
  site/files with.

## Core user journeys
1. Open `index.html` → see all Sem 5 subjects as cards → click a subject →
   that subject's existing study system opens and behaves exactly as before.
2. While inside a subject → click "← Semester Home" → return to the dashboard.
3. (Optional/stretch) Return to the dashboard → see "Continue Studying: <last
   subject opened>" → jump back in.

## Alternatives/competitors
N/A — this is a personal academic tool, not a market product. No competitor
research applies.

## Value proposition
One dashboard replaces "which HTML file do I open" with a single click,
without touching or degrading the subject systems that already work.

## MVP scope
- `index.html` dashboard listing the 3 confirmed subjects as clickable cards,
  generated from one JS config array (REQ-001).
- Each subject file relocated to `subjects/` and reachable via normal
  relative-link navigation, unmodified in content (REQ-002).
- A small "← Semester Home" link added to each subject page's existing header,
  without altering its layout/functionality (REQ-003).
- Per-subject localStorage keys checked for cross-subject collisions before
  integration; any found are reported, not silently fixed (REQ-004).
- Responsive layout: works at 320px–1366px+ (REQ-005).
- Dev-mode console logging with `[APP]`/`[NAV]`/`[ERROR]` prefixes (REQ-006).
- `README.md` explaining run/add-subject/debug/test steps (REQ-007).

## Non-goals (this pass)
- No merging of subject HTML into one DOM/page (explicitly forbidden by the brief).
- No global cross-subject search (only if it can be done reliably — default:
  omit, per the brief's own §14).
- No backend, accounts, or database — fully static/offline.
- No changes to subject content (questions/answers/wording).
- No rewriting subject CSS/JS beyond the minimal semester-home nav addition.

## Monetization hypothesis
N/A — not a commercial product.

## Success metrics
- All 3 subjects open correctly from the dashboard, on desktop and mobile.
- Zero regressions in existing subject features (search, filters, bookmarks,
  focus mode, dark mode — verified per subject, see TODO.md checklist).
- No console errors on any page in normal use.

## Risks
- **Confirmed, not hypothetical:** `Advanced_Web_Designing_Master_Question_Bank.html`
  stores its bookmarks/theme under `nt503_bookmarks` / `nt503_theme` — an
  NT-branded key name, almost certainly left over from being adapted off the
  Network Technologies codebase. It does not currently collide with NT's own
  keys (`nt503.theme` / `nt503.saved` — different literal strings), but it is
  a latent landmine if either file's keys are edited without knowing about
  the other. Recorded as a decision item in TODO.md; not fixed without your
  go-ahead (§J9/§J14 — out-of-scope find, don't silently patch).
- Files are large (up to ~1.3 MB), fully self-contained (no external CSS/JS,
  no CDN dependencies) — confirmed by inspection, so offline-first is already
  true; risk is only that moving them must not break their internal relative
  assumptions (none found — no relative asset paths inside any of the three).
- "PHP & MySQL" file's `<title>` implies it may also cover a "Web Framework
  and Services" module — flagged as an open question below, not assumed.

## Open questions — RESOLVED
- Subject card name for the PHP file: **"PHP, MySQL & Web Framework Services"**
  (shortName `PHP/WFS`) — user wants "Web Framework & Services" reflected,
  not just "PHP & MySQL". Editable later in the one-line subject config.
- AWD's `nt503_bookmarks` / `nt503_theme` localStorage keys: **rename to
  AWD-specific keys** (`awd_bookmarks` / `awd_theme`) as part of this
  integration. One-time reset of any bookmarks/theme already saved under the
  old keys is accepted.

## Facts / assumptions / unknowns
- **Facts (verified by direct inspection):** 4 files supplied, 2 are
  duplicate Network Technologies drafts (resolved: use the "Final Exam Study
  System" one); all 3 chosen files are single self-contained HTML documents,
  no external dependencies; each has its own `<header>`/`<nav>`; storage keys
  as listed above.
- **Assumptions:** the site will be opened locally (double-clicked or via a
  simple static server) rather than deployed to a public host, based on the
  brief's "offline-first" emphasis; no assumption made about a specific
  server tool.
- **Unknowns:** whether the user will ever host this online (affects nothing
  in MVP, everything stays relative-path/offline-safe regardless).

## Requirement IDs
REQ-001 through REQ-007 above are the traceable MVP requirements; each will
be referenced from IMPL-SPEC.md / TODO.md acceptance criteria.
