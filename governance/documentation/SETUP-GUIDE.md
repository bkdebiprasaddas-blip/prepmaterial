# SETUP-GUIDE.md

## Install
Nothing to install. No dependencies, no package manager, no build step.

## Run
Two supported ways:
1. **Double-click `index.html`** — works directly via `file://`. Every
   subject file is fully self-contained (verified: zero external CDN/asset
   dependencies), so this is reliable offline.
2. **Local static server** (optional, e.g. `npx serve .` or Python's
   `python -m http.server`) — only needed if you want to test as you would
   a real deployment, or to avoid any browser's `file://` localStorage quirks.

## Configure
Edit `assets/js/subjects.config.js` to add/remove/reorder subjects. No other
file needs to change.

## Test
See `governance\planning\TODO.md` for the full per-subject checklist. Quick
smoke test: open `index.html`, click each of the 3 cards, confirm each
subject page loads and its "← Sem 5" link returns you to the dashboard.

## Harden
Not applicable — static, offline, no backend, no user data leaves the
browser, no secrets anywhere in this project. See
`governance\planning\SECURITY-THREAT-MODEL.md`.

## Environment versions (recorded per §A.8)
- Git: 2.55.0.windows.3 (verified 2026-09-17)
- No language runtime/package manager/DB server applicable — stack is plain
  HTML/CSS/JS with no build tooling.
