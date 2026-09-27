# BOOTSTRAP.md — Current State Snapshot

> Authoritative, always-read-first snapshot per RULEBOOK §C.2 / §D. Kept short;
> details live in `ai-context\SESSION-*.md` and `work-log\LOG-*.md`.

## Current State (as of 2026-09-28, session 1)

- **Product:** TYBCA Sem 5 Exam Preparation Hub — a static dashboard linking
  to 5 subject study-system HTML files (Advanced Web Designing,
  PHP/MySQL & WFS, Network Technologies, UNIX & Shell, ASP.NET/.NET). Full
  spec: user's original 38-section brief + `governance\planning\DISCOVERY.md`.
- **Phase:** past CODING/TESTING, into normal iteration. All gates
  (DISCOVERY→PLANNING→DESIGN FIXED→UI DESIGN CONFIRMED→CODING) were passed on
  2026-09-17. Now ordinary content/structure maintenance.
- **Live at:** `https://github.com/bkdebiprasaddas-blip/prepmaterial`
  (`origin/master`). Working tree has **uncommitted work** — see below. Run
  `git status` at session start rather than trusting this line.
- **Git:** initialized, identity configured by the user (`BK Debiprasad Das`
  / `bkdebiprasaddas@gmail.com`). Never commit without the user explicitly
  saying so (§A.9) — this project's pattern so far: user says "push", agent
  commits + pushes in one go.
- **Environment / stack:** Plain HTML/CSS/vanilla JS, no build tooling, no
  dependencies. Git 2.55.0.windows.3. Node v24.18.0 (build/validate only).
  Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe` is used
  headless (`--dump-dom`, plus `--enable-logging=stderr` to capture console
  errors) for real browser verification. Local IP for phone testing:
  `192.168.0.103` — a firewall rule ("TYBCA Sem5 Test Server", TCP 8791, all
  profiles) was added by the user (admin PowerShell) to allow this.
- **What's built:** `index.html` + `assets/` (dashboard, per-subject accent
  colors) + `subjects/{advanced-web-designing,php-mysql-wfs,network-technologies,unix-shell-programming,asp-net-dotnet}.html`.
  AWD additionally has its `nt503_*` storage keys renamed to `awd_*` and a
  real pre-existing "More options" menu bug fixed (see TODO.md).
- **UNIX page — FIXED 2026-09-28 (uncommitted).** Commit `0fd1c8c` had
  rebuilt the question data from the MD but also deleted the page's helper
  functions (`$`, `$$`, `esc`, `stripHTML`, `hi`, `LS_BM`, `LS_TH`), so the
  script died with `$ is not defined` and **#list / #stats / #sidebar rendered
  empty — the page was completely dead.** Restored the helpers verbatim from
  the pre-rebuild file and restored all answer content while keeping the new
  MD syllabus structure untouched.
  - **214 / 214 questions now have answers:** 53 MCQ (`ans` + `why`), 120
    short, 41 long. Marked **Important = 63** (7 + 30 + 26), exactly matching
    `Unix_Question_Bank_Organized.md`.
  - Three answer pools, all defined before `QB`: `MA` (15 long answers),
    `MB` (31 long answers), `SB` (**34 new short answers authored this
    session** — the "write a command" / definition questions that had no
    answer in the old version either).
  - Structure unchanged: 12 unit sections, A/B/C × Units 1–4, ids
    `sec-a-*` / `sec-b-*` / `sec-c-*`. Searches, ⭐ filter, marks filter,
    Focus Mode, bookmarks, theme toggle all untouched.
- **Verified (all 3 script blocks parse; 0 failures):**
  - **Static data integrity** — 12 sections, unique ids, exact per-unit
    counts `6/26/12/9 · 11/45/20/44 · 11/9/14/7`; 53/53 MCQ answers valid and
    in range; 120/120 short answers non-empty; 41/41 long answers substantial;
    63 important markers; 0 `undefined` / `[object Object]` / `TBD`; every
    `<pre>` balanced.
  - **Rendered DOM (headless Chrome) — 27 assertions, 0 failures.** 214 unique
    cards; 53 correct-answer lines; 53 highlighted options; 53 collapsed
    explanation panels; 120 inline short answers; 41 Focus-Mode long cards;
    count row "Showing 214 of 214"; empty state hidden; 0 console errors.
  - **Interactive (27 in-page assertions, 0 failures).** Search "awk" → 23
    then restored to 214; ⭐ filter → exactly 63; explanation expand/collapse;
    bookmark toggle + `localStorage` persistence; Focus Mode opens a real
    3367-char answer with total 41; next/prev; Escape closes; theme toggle;
    marks filter; exam guide.
  - **Site-wide:** all 7 pages dumped, 0 JS errors, 0 `undefined` in any
    rendered body. (`asp-net-vb-notes.html` correctly has no question cards —
    it is a static notes page, not a question bank.)
- **NOT verified:** **visual/screenshot review** — this model cannot read
  images, so nobody has confirmed how the page *looks*. DOM-level browser
  assertions stand in for it.
- **Scratch:** `Scratch\<ProjectName>\` not created — not needed for a site
  this size; UI-SPEC.md + direct review served as the UI gate instead of a
  separate prototype step. Rebuild/verify scripts live in `%TEMP%\opencode\`
  (disposable, not part of the repo).

## Session history (newest first — see `ai-context\SESSION-*.md` for full detail)
- Session 2026-09-28-1: **UNIX page repaired.** Root cause of the "broken"
  report: `0fd1c8c` deleted the page's helper functions, not just the answers,
  so the page rendered nothing at all. Restored helpers + all 214 answers
  (53 MCQ, 120 short, 41 long) while keeping the new MD syllabus structure.
  Added 34 new short answers (`SB`). 63 important markers match the MD.
  Verified: 3/3 script blocks parse, 0 static failures, 27 DOM assertions,
  27 interactive assertions, 0 console errors, all 7 site pages clean.
  **Uncommitted.** See `SESSION-2026-09-28-1.md`.
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
- Older sessions (1–5 on 2026-09-17) archived to `ai-context\archive\`.

## Next step
The UNIX fix is **complete and verified but NOT committed**. Open
`subjects/unix-shell-programming.html` for a human visual pass, then say
**"push"** to commit and push.

Other open items, recorded in `TODO.md`: de-duplicate AWD `form-5`/`form-13`,
add `typescript` to the AWD highlighter tables, and a human visual pass over
the AWD layout. Three untracked source files (the UNIX question-bank MD, the
ChatGPT ASP.NET notes MD, and `PHP_Syllabus_Wise_Bifurcated.md`) are the only
other pending decisions.


