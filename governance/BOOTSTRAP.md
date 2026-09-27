# BOOTSTRAP.md — Current State Snapshot

> Authoritative, always-read-first snapshot per RULEBOOK §C.2 / §D. Kept short;
> details live in `ai-context\SESSION-*.md` and `work-log\LOG-*.md`.

## Current State (as of 2026-09-27)

- **Product:** TYBCA Sem 5 Exam Preparation Hub — a static dashboard linking
  to 5 subject study-system HTML files (Advanced Web Designing,
  PHP/MySQL & WFS, Network Technologies, UNIX & Shell, ASP.NET/.NET). Full
  spec: user's original 38-section brief + `governance\planning\DISCOVERY.md`.
- **Phase:** past CODING/TESTING, into normal iteration. All gates
  (DISCOVERY→PLANNING→DESIGN FIXED→UI DESIGN CONFIRMED→CODING) were passed on
  2026-09-17; site is built, pushed to GitHub, and live-tested (desktop +
  phone). Now ordinary content/structure maintenance.
- **Live at:** `https://github.com/bkdebiprasaddas-blip/prepmaterial`
  (`origin/master`). Working tree currently has uncommitted local changes
  (see below) — check `git status` at session start rather than trusting
  this line to stay accurate between sessions.
- **Git:** initialized, identity configured by the user (`BK Debiprasad Das`
  / `bkdebiprasaddas@gmail.com`). Never commit without the user explicitly
  saying so (§A.9) — this project's pattern so far: user says "push", agent
  commits + pushes in one go.
- **Environment / stack:** Plain HTML/CSS/vanilla JS, no build tooling, no
  dependencies. Git 2.55.0.windows.3. Node v24.18.0 available (used only for
  `node --check` JS validation, not part of the site). Local IP for phone
  testing: `192.168.0.103` — a firewall rule ("TYBCA Sem5 Test Server", TCP
  8791, all profiles) was added by the user (admin PowerShell) to allow this.
- **What's built:** `index.html` + `assets/` (dashboard, per-subject accent
  colors) + `subjects/{advanced-web-designing,php-mysql-wfs,network-technologies,unix-shell-programming,asp-net-dotnet}.html`.
  AWD additionally has its `nt503_*` storage keys renamed to `awd_*` and a
  real pre-existing "More options" menu bug fixed (see TODO.md).
- **AWD paper format (changed 2026-09-27):** now **1-Mark MCQ (55) → 1-Mark
  (5) → 4-Mark (8) → 5-Mark (178) → Reference (15)**. Total still 261
  questions. The former 6/8/9/10/14-mark sections were folded into the
  5-mark section as a single flat list, per the user's stated paper format.
  Sections are now A–E. See `SESSION-2026-09-27-1.md`.
- **Verified:** all tags balanced, 261/261 question IDs preserved with
  byte-identical question text, all 6 inline `<script>` blocks pass
  `node --check`, all 261 answer entries load with valid blocks, every
  sidebar `data-target` resolves to a real `id`.
- **NOT verified:** live browser/visual check of the new AWD layout (filter
  chips, focus-mode overlay on a merged card, nav anchor scroll) has not been
  done in a real Chrome session.
- **Scratch:** `Scratch\<ProjectName>\` not created — not needed for a site
  this size; UI-SPEC.md + direct review served as the UI gate instead of a
  separate prototype step.

## Session history (newest first — see `ai-context\SESSION-*.md` for full detail)
- Session 2026-09-27-1: AWD paper restructured to the user's 1/4/5 format —
  6/8/9/10/14-mark sections merged into 5-mark (178 cards, one flat list),
  sections renumbered A–E, nav + marks filter collapsed to 4 buckets, exam
  writing guide retiled 10→8, stale cross-references cleaned. Heavy
  assertion-based verification; three script-authoring gotchas hit and fixed
  (write-after-validate, here-string trailing newline, cascading renumber).
- Session 5: NT header made compact/consistent with AWD/PHP; site-wide
  unified color palette (reverses the original "subjects keep their own
  themes" decision — see ARCH-DESIGN.md).
- Session 4: color pass (dashboard cards) + AWD "More options" bug found,
  root-caused, fixed, verified.
- Session 3: git push setup, full live-testing pass, header-overlap nav badge
  bug fixed.
- Session 2: planning docs (DISCOVERY→RELEASE-PANET) written, gates approved,
  CODING executed.
- Session 1: RULEBOOK activation, scaffold built.

## Next step
No open gate. Suggested: a live browser pass over the new AWD layout, then
commit (currently staged, not committed) if the user confirms.

