# SECURITY-THREAT-MODEL.md

> Per RULEBOOK §E.7, required for apps handling accounts/payments/private
> data/files/external integrations/AI. This project has NONE of those — kept
> brief and explicit about why, rather than padded with inapplicable content.

## Assets
- The static HTML/CSS/JS files themselves (no monetary or personal-data value).
- Browser `localStorage` on the student's own device: theme preference,
  bookmarked questions, last-opened subject. Not sensitive (no PII, no
  credentials), not transmitted anywhere.

## Trust boundaries
None crossed. Single origin, single device, no server, no network calls, no
third-party scripts (confirmed by inspection: zero external `src`/`href`
across all 3 subject files and the new dashboard files).

## Threats considered / N/A
- **XSS:** subject config values are static strings written by the
  developer, not user input — no injection surface. Subject pages' own
  internal question-rendering logic is unmodified (out of scope of this
  integration; those files pre-date this project).
- **Data exfiltration:** no network calls exist to exfiltrate to.
- **Auth/authorization/IDOR:** N/A — no accounts, no server-side resources.
- **Supply chain:** N/A — zero dependencies, zero CDNs.
- **File upload:** N/A — no upload feature anywhere in scope.

## Mitigations in place
- Offline-first by construction (no attack surface requiring a network).
- `.gitignore` blocks any `.env`-shaped file from ever being tracked, as a
  standing safeguard even though none is used today.

## Residual risk
None identified beyond the known AWD storage-key rename (data-loss risk to
the student's own previously-saved bookmarks only — recorded and accepted in
DISCOVERY.md / ARCH-DESIGN.md, not a security issue).
