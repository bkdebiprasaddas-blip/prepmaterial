# RELEASE-PLAN.md

> Per RULEBOOK §E.8. "Release" here means the site is finished and
> verified for the student's own use — there is no server deploy in scope
> unless you ask for one (e.g. GitHub Pages) later.

## Environments
- **Local (only environment in scope):** opened via `file://` or an optional
  local static server. No staging/production servers exist.

## Build
None — static files, no compilation.

## Migrations
N/A — no database.

## Secrets/config
None exist in this project.

## Monitoring
N/A for a local static site with a single user.

## Backups
The student's own bookmarks/theme live only in that browser's `localStorage`
— not backed up anywhere (same as the subject files' pre-existing behavior;
not a regression introduced here). If you later want export/import of
bookmarks, that's a backlog item, not part of this MVP.

## Rollback
Git provides rollback (once commits exist): `git revert` / `git checkout` to
a prior commit restores any file. No other rollback mechanism needed for a
static site.

## Smoke tests before calling this "released"
See TODO.md TESTING phase checklist — all boxes checked for all 3 subjects
plus the dashboard-level checks.

## Deployment steps (only if/when you choose to host it online — not planned now)
Not applicable to this pass. If requested later: identify a static host
(e.g. GitHub Pages), confirm relative paths still resolve, re-run the full
TESTING checklist against the hosted URL.

## Release criteria
All TODO.md TESTING boxes checked, no console errors on any of the 4 pages,
responsive checklist passed, README.md accurate.
