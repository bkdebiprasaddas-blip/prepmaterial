# PLAN.md — TYBCA Sem 5 Exam Preparation Hub

## Scope
Build `index.html` (semester dashboard) plus a `subjects/` folder holding the
3 existing subject study systems, relocated and given a small return-to-hub
link, with zero changes to their questions/answers/features. See
`DISCOVERY.md` for REQ-001..REQ-007.

## Stack + rationale
Plain HTML + CSS + vanilla JavaScript, one `subjects.config.js` for metadata.
No framework, no build step, no backend, no CDN — matches the brief (§23/§24)
and matches what the 3 existing subject files already are (self-contained,
zero external dependencies, confirmed by inspection).

## Modules / features
1. **Dashboard (`index.html` + `assets/js/app.js` + `assets/css/app.css`)**
   — header, subject card grid generated from config, dev-mode logging,
   optional "Continue Studying" (localStorage-based, only if reliable).
2. **Subject config (`assets/js/subjects.config.js`)** — single array of
   `{id, name, shortName, icon, description, file}` (REQ-001).
3. **Subject pages (`subjects/*.html`)** — the 3 existing files, moved
   as-is except for one injected "← Sem 5" nav snippet each (REQ-002, REQ-003).
4. **README.md** — run / add-subject / debug / test instructions (REQ-007).

## Workflow
File-copy (not destructive move-then-delete-original) from
`Theroy Question Bank\` → `subjects\`, verified byte-identical except for the
one nav injection (and the AWD storage-key rename, both scoped and disclosed
in DISCOVERY.md), then the original `Theroy Question Bank\` folder is left in
place untouched (input material, not production — user may delete it later).

## File map
```
PrepMaterial/                          (ROOT — production)
├── AGENTS.md
├── .gitignore
├── README.md
├── index.html
├── assets/
│   ├── css/app.css
│   └── js/
│       ├── app.js
│       └── subjects.config.js
├── subjects/
│   ├── advanced-web-designing.html
│   ├── php-mysql-wfs.html
│   └── network-technologies.html
├── governance/                        (continuity — unchanged by this)
└── Theroy Question Bank/              (left as-is; superseded by subjects/)
```

## Progress rules
Single CODING pass (small site, 3 subjects) — see TODO.md for the ordered
checklist and per-subject verification table (§27/§28 of the user's brief).

## Sample output
`index.html` shows a header ("TYBCA SEM 5 — Exam Preparation Hub") and a
responsive grid of 3 cards (AWD 🌐, PHP/MySQL & WFS 🐘, Network Technologies
📡), each opening its `subjects/*.html` via a normal `<a href>`.
