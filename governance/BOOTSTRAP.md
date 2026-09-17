# BOOTSTRAP.md — Current State Snapshot

> Authoritative, always-read-first snapshot per RULEBOOK §C.2 / §D. Kept short;
> details live in `ai-context\SESSION-*.md` and `work-log\LOG-*.md`.

## Current State (as of 2026-09-17)

- **Product:** TYBCA Sem 5 Exam Preparation Hub — a static dashboard linking
  to 3 existing subject study-system HTML files (Advanced Web Designing,
  PHP/MySQL & WFS, Network Technologies). Full spec: user's original 38-section
  brief + `governance\planning\DISCOVERY.md`.
- **Phase:** PLANNING deliverables written (DISCOVERY, PLAN, ARCH-DESIGN,
  IMPL-SPEC, UI-SPEC, TODO, SETUP-GUIDE, SECURITY-THREAT-MODEL, RELEASE-PLAN
  — all in `governance\planning\` / `governance\documentation\`). User said
  "code it" before PLANNING/DESIGN/UI were approved — flagged per §A.5/§H.2,
  planning set produced immediately after so approval can be given in one
  bundled round rather than blocking on a lecture.
- **Approvals given:** PLANNING ("approve plan"), DESIGN FIXED ("approve
  design"), UI DESIGN CONFIRMED ("UI is final") — all 2026-09-17. "code it"
  was given earlier in the same session. All gates satisfied — CODING is open.
- **Approvals pending:** none — proceeding to build per TODO.md CODING phase.
- **Git:** initialized (`git init` run 2026-09-17, on explicit user request).
  `AGENTS.md`, `.gitignore`, and `governance\` are staged, NOT committed —
  user must trigger the commit (§A.9). `Theroy Question Bank\` (raw input
  subject files) deliberately left untracked; superseded by `subjects\` once
  built, original left in place, not deleted.
- **Environment / stack:** Plain HTML/CSS/vanilla JS, no build tooling, no
  dependencies. Git 2.55.0.windows.3 verified 2026-09-17.
- **Code status:** CODING phase complete (2026-09-17): `index.html`,
  `assets/css/app.css`, `assets/js/app.js`, `assets/js/subjects.config.js`,
  `subjects/{advanced-web-designing,php-mysql-wfs,network-technologies}.html`,
  `README.md` all written. Level-1 checks passed (JS syntax, file-existence,
  diff-vs-original, tag balance). **In-browser testing NOT YET DONE**
  (Chrome extension unavailable this session) — TESTING phase in TODO.md is
  still open, pending either the user's own check or a later session with
  browser access.
- **Scratch:** `Scratch\<ProjectName>\` not created — not needed; there is no
  UI prototyping step separate from the real files here (site is simple
  enough that UI-SPEC.md + direct review serves as the UI gate).

## Scaffold status (this session)

Created per RULEBOOK §0.0 activation (first time `RULEBOOK.md` was found in
this repo):
- `governance\RULEBOOK.md` (moved here from ROOT — canonical location per §B)
- `governance\BOOTSTRAP.md` (this file)
- `governance\ai-context\` (+ `archive\`)
- `governance\work-log\`
- `governance\planning\` (empty — deliverables blocked on DISCOVERY)
- `governance\documentation\` (empty — SETUP-GUIDE.md blocked on stack choice)
- `AGENTS.md` at ROOT (§A/§D/§F/§H/§J verbatim + short project section)
- `.gitignore` at ROOT (Scratch\, .env patterns, common build/dependency folders)

Not created: `Scratch\<ProjectName>\` (needs confirmed project name),
`planning\PLAN.md`/`DISCOVERY.md`/etc. (needs product definition), git repo
(needs explicit "yes git").

## Next step

Waiting on the user's answers to the bundled clarifying-question round (product
idea, project name, stack, auth/roles, hosting, git) before DISCOVERY can start.

**Next trigger phrase:** none yet — no gate is open to advance. First need
clarifying answers, then DISCOVERY deliverables, then **"approve discovery"**.
