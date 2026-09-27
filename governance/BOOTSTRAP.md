# BOOTSTRAP.md — Current State Snapshot

> Authoritative, always-read-first snapshot per RULEBOOK §C.2 / §D. Kept short;
> details live in `ai-context\SESSION-*.md` and `work-log\LOG-*.md`.

## Current State (as of 2026-09-27, session 2)

- **Product:** TYBCA Sem 5 Exam Preparation Hub — a static dashboard linking
  to 5 subject study-system HTML files (Advanced Web Designing,
  PHP/MySQL & WFS, Network Technologies, UNIX & Shell, ASP.NET/.NET). Full
  spec: user's original 38-section brief + `governance\planning\DISCOVERY.md`.
- **Phase:** past CODING/TESTING, into normal iteration. All gates
  (DISCOVERY→PLANNING→DESIGN FIXED→UI DESIGN CONFIRMED→CODING) were passed on
  2026-09-17; site is built, pushed to GitHub, and live-tested (desktop +
  phone). Now ordinary content/structure maintenance.
- **Live at:** `https://github.com/bkdebiprasaddas-blip/prepmaterial`
  (`origin/master`). Working tree has uncommitted local changes — check
  `git status` at session start rather than trusting this line between sessions.
- **Git:** initialized, identity configured by the user (`BK Debiprasad Das`
  / `bkdebiprasaddas@gmail.com`). Never commit without the user explicitly
  saying so (§A.9) — this project's pattern so far: user says "push", agent
  commits + pushes in one go.
- **Environment / stack:** Plain HTML/CSS/vanilla JS, no build tooling, no
  dependencies. Git 2.55.0.windows.3. Node v24.18.0 (build/validate only).
  Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe` is used
  headless (`--dump-dom`) for real browser verification. Local IP for phone
  testing: `192.168.0.103` — a firewall rule ("TYBCA Sem5 Test Server", TCP
  8791, all profiles) was added by the user (admin PowerShell) to allow this.
- **What's built:** `index.html` + `assets/` (dashboard, per-subject accent
  colors) + `subjects/{advanced-web-designing,php-mysql-wfs,network-technologies,unix-shell-programming,asp-net-dotnet}.html`.
  AWD additionally has its `nt503_*` storage keys renamed to `awd_*` and a
  real pre-existing "More options" menu bug fixed (see TODO.md).
- **AWD content (rebuilt 2026-09-27, session 2): now 312 question cards / 312
  answers**, matching `Advanced_Web_Designing_Clean_Question_Bank.md`. Marks:
  **1-Mark MCQ 94 → 1-Mark 3 → 4-Mark 8 → 5-Mark 192 → Reference 15**.
  Organised as **4 unit sections + `sec-ref`**, split into 22 topic groups
  (`topic-1-1` … `topic-4-6`, plus `topic-ref`). Per unit: **U1 99, U2 104,
  U3 36, U4 58, ref 15**. Every card carries `data-unit`, `data-topic`,
  `data-source`. Nav + filters are unit/topic-driven (not marks buckets).
  57 questions added with full answers, 6 broken ones removed, 6 flawed MCQs
  rewritten. See `SESSION-2026-09-27-2.md`.
  - Earlier the same day (session 1) the 6/8/9/10/14-mark sections had been
    folded into one 5-mark list; session 2 superseded that bucketing.
- **Verified (263 automated checks, 0 failures, re-run against the saved
  production file):** 312 cards / 312 answers; 6 removals absent; 57 additions
  present; exact unit distribution; all 23 topic groups present and non-empty;
  all 7 inline scripts pass `node --check`; the answer blob re-parses to a
  byte-identical value set; independent quote-aware re-parse returns all 312
  cards; the shipped render functions produce clean HTML for all 312 answers
  (highlighter lossless across 662 code samples); **47 headless-Chrome
  assertions pass with 0 JS errors** (filters, search, nav, focus mode, new
  MCQ explanation expansion, theme toggle, removed cards absent).
- **NOT verified:** **visual/screenshot review** — a screenshot was captured but
  this model cannot read images, so nobody has confirmed how the page *looks*.
  DOM-level browser assertions stand in for it.
- **Scratch:** `Scratch\<ProjectName>\` not created — not needed for a site
  this size; UI-SPEC.md + direct review served as the UI gate instead of a
  separate prototype step. AWD rebuild/verify scripts live in
  `%TEMP%\opencode\awd-align\` (disposable, not part of the repo).

## Session history (newest first — see `ai-context\SESSION-*.md` for full detail)
- Session 2026-09-27-2: AWD rebuilt from 261 → **312 cards** to match the MD
  source. Unit/topic taxonomy with 22 topic groups and per-card
  unit/topic/source metadata; unit + topic filters and nav replace marks
  buckets; 57 new questions with full answers; 6 unanswerable questions
  removed; 6 flawed MCQs corrected. Six real page bugs found and fixed
  (notably a raw `</script>` in the answer blob that was silently killing the
  page's JavaScript). 263 automated checks incl. 47 headless-Chrome
  assertions, 0 failures.
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
- Session 2: planning docs (DISCOVERY→RELEASE-PLANET) written, gates approved,
  CODING executed.
- Session 1: RULEBOOK activation, scaffold built.

## Next step
No open gate. The AWD rebuild is saved but **not committed** — awaiting the
user's word. Optional follow-ups recorded in `SESSION-2026-09-27-2.md`:
de-duplicate `form-5`/`form-13`, add `typescript` to the page's highlighter
tables, and a human visual pass over the new layout.

