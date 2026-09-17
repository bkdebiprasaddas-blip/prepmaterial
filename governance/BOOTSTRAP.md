# BOOTSTRAP.md — Current State Snapshot

> Authoritative, always-read-first snapshot per RULEBOOK §C.2 / §D. Kept short;
> details live in `ai-context\SESSION-*.md` and `work-log\LOG-*.md`.

## Current State (as of 2026-09-17, end of day)

- **Product:** TYBCA Sem 5 Exam Preparation Hub — a static dashboard linking
  to 3 existing subject study-system HTML files (Advanced Web Designing,
  PHP/MySQL & WFS, Network Technologies). Full spec: user's original 38-section
  brief + `governance\planning\DISCOVERY.md`.
- **Phase:** past CODING/TESTING, into normal iteration. All gates
  (DISCOVERY→PLANNING→DESIGN FIXED→UI DESIGN CONFIRMED→CODING) were passed
  today; site is built, pushed to GitHub, and live-tested (desktop + phone).
- **Live at:** `https://github.com/bkdebiprasaddas-blip/prepmaterial`
  (`origin/master`). Working tree currently has uncommitted local changes
  (see below) — check `git status` at session start rather than trusting
  this line to stay accurate between sessions.
- **Git:** initialized, identity configured by the user (`BK Debiprasad Das`
  / `bkdebiprasaddas@gmail.com`). Never commit without the user explicitly
  saying so (§A.9) — this project's pattern so far: user says "push", agent
  commits + pushes in one go.
- **Environment / stack:** Plain HTML/CSS/vanilla JS, no build tooling, no
  dependencies. Git 2.55.0.windows.3. Local IP for phone testing:
  `192.168.0.103` — a firewall rule ("TYBCA Sem5 Test Server", TCP 8791,
  all profiles) was added by the user (admin PowerShell) to allow this.
- **What's built:** `index.html` + `assets/` (dashboard, per-subject accent
  colors) + `subjects/{advanced-web-designing,php-mysql-wfs,network-technologies}.html`
  (each = original file + a small additive "← Sem 5" nav link; AWD
  additionally has its `nt503_*` storage keys renamed to `awd_*`, and a
  real pre-existing "More options" menu bug fixed — see TODO.md for full
  details of both). `Theroy Question Bank\` (original raw input files) is
  left in place, untouched, untracked — superseded by `subjects\`.
- **Verified live in Chrome:** dashboard cards/theme/Continue-Studying,
  PHP's search, AWD's "More options" menu (post-fix, both at narrow and
  normal viewport, via `document.elementFromPoint` + screenshots), phone
  access over LAN (user-confirmed working).
- **Known not independently verified:** AWD/NT's own bookmarks/focus-mode
  weren't individually clicked through beyond the More-menu fix; NT's
  console wasn't explicitly checked. Nothing known-broken — just not yet
  exercised.
- **Scratch:** `Scratch\<ProjectName>\` not created — not needed for a site
  this size; UI-SPEC.md + direct review served as the UI gate instead of a
  separate prototype step.

## Session history (newest first — see `ai-context\SESSION-2026-09-17-*.md` for full detail)
- Session 5: user asked for a site-wide issue check + subject pages to
  look "consistent" (both bug-parity AND a real shared visual design,
  confirmed explicitly). Audit found no new bugs (AWD's More-menu fix was
  the only real issue, already fixed). Applied a unified color palette to
  AWD/PHP (NT already matched) via CSS-variable remapping only — zero
  structural changes, all features re-verified working. This reverses the
  original "subjects keep their own themes" decision — see ARCH-DESIGN.md.
- Session 4: color pass (dashboard cards) + AWD "More options" bug found
  (user report), root-caused (two compounding CSS/stacking issues), fixed,
  verified.
- Session 3: git push setup (identity, remote, push), full live-testing
  pass, found+fixed the header-overlap nav badge bug.
- Session 2: planning docs (DISCOVERY→RELEASE-PLAN) written, gates approved,
  CODING executed.
- Session 1: RULEBOOK activation, scaffold built.

## Next step
No open gate — this is now ordinary maintenance/iteration. Check
`git status` first; if session 4's work (colors + AWD bug fix) isn't
committed yet, log it properly (SESSION file + LOG delta) before further
changes, per §D "logging is automatic, never wait to be asked."
