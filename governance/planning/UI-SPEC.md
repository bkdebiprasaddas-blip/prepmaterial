# UI-SPEC.md — Dashboard visual design (subject pages keep their own themes)

> Per brief §21: the hub has its own consistent look; the 3 subject pages
> are NOT restyled to match — they keep their existing, already-polished
> individual themes. This spec covers `index.html` only.

## Direction
Modern academic dashboard, card-based, "app launcher" feel (brief §32):
clean, restrained, no hero imagery, no marketing copy, fast to scan.

## Palette (light default, dark via toggle)
- Background: `#F8FAFC` (light) / `#0B1120` (dark)
- Surface (cards): `#FFFFFF` (light) / `#111827` (dark)
- Border: `#E2E8F0` (light) / `#334155` (dark)
- Text primary: `#0F172A` (light) / `#F8FAFC` (dark)
- Text muted: `#64748B` (light) / `#94A3B8` (dark)
- Accent (links/focus/active): `#4F46E5` (indigo) — one accent, used
  sparingly (hover border, focus ring, "Open Subject" affordance)
- Shadow: `0 2px 8px rgba(15,23,42,.06)` resting, `0 8px 20px rgba(15,23,42,.10)` hover

## Typography
System font stack (`ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`)
— matches what all 3 subject files already use, so nothing feels foreign
when navigating between hub and subject. H1 ~1.8rem, card title ~1.05rem,
body/description ~0.9rem.

## Layout
```
HEADER
  "TYBCA SEM 5"  (H1)
  "Exam Preparation Hub"  (subtitle)
  "Previous-Year Questions • Important Questions • Revision • Exam Practice"  (small line)
  [ theme toggle button, top-right ]

CONTINUE STUDYING  (only if a last-opened subject is recorded — else omitted)
  small banner: "Continue Studying: <Subject> →"

SUBJECT GRID
  responsive card grid (see ARCH-DESIGN.md CSS grid rule)

FOOTER
  "TYBCA Semester 5 Exam Preparation"
```
No extra sections (brief §30: don't clutter).

## Component: subject card
```
┌──────────────────────────────┐
│            🌐                 │   icon, ~2rem
│   Advanced Web Designing      │   name, bold
│   PYQs, important questions   │   description, muted, 2-line clamp
│   and revision material.      │
│                               │
│        Open Subject →         │   affordance, accent color
└──────────────────────────────┘
```
- Whole card is one `<a>` (keyboard/tap target = entire card, not just the
  "Open Subject" text) — satisfies brief §22 touch-friendly + accessible.
- Rounded corners (12px), subtle shadow, hover = lift + border accent,
  `:focus-visible` = visible accent outline.
- No question count on cards for MVP — brief says "optional... if reliably
  available"; question counts live inside each subject's own stats (AWD/PHP
  compute live; NT hard-codes `340` in its own header) and are not exposed
  in a uniform, reliably-parseable way across all 3 without fragile HTML
  scraping (brief §16 warns against fragile auto-parsing) — omitted per
  DISCOVERY.md non-goals, not invented.

## Interactions
- Hover/active states on cards and buttons.
- Theme toggle persists to `tybca_sem5_theme`, respects
  `prefers-color-scheme` on first visit (no stored preference yet).
- Reduced motion: transitions disabled under `prefers-reduced-motion: reduce`.

## Responsive checklist (checkbox-driven — tick during UI DESIGN / verify during TESTING)
- [ ] 320px — 1 column, no horizontal scroll, header wraps cleanly
- [ ] 375px — 1 column
- [ ] 390px — 1 column
- [ ] 430px — 1–2 columns
- [ ] 768px — 2–3 columns
- [ ] 1024px — 3–4 columns
- [ ] 1366px+ — 4–5 columns
- [ ] Cards remain tappable (min ~44px touch target) at all widths
- [ ] No tiny text (min 0.85rem body)

## Page-by-page checklist
- [ ] `index.html` — header, (optional) continue-studying banner, 3 cards, footer, theme toggle all present and functional
- [ ] Each subject page — "← Sem 5" link visible, doesn't overlap existing controls, returns to `index.html`

**UI gate note:** this is a small, low-ambiguity dashboard on top of 3
pages I do not restyle. Given the brief itself dictated most of these
choices (§30/§32/§21), this spec is presented for approval alongside
PLAN/ARCH — no separate prototype round is planned unless you want one.
