# Handoff: NRS Navigation — Mega Menu

## Overview

A new header + mega-menu navigation system for **nrs-uk.com**, covering the full product taxonomy (15 top-level categories, sub-categories to L4). Two dropdown layouts are provided so the team can pick the right interaction model:

- **Variant A — Tiered hover**: left rail of L1 categories → single L2 column → L3 column slides in when hovered. Featured promo replaces the L3 column when the hovered L2 has no children.
- **Variant A — Horizontal**: left rail of L1 categories → wide multi-column grid showing **all** L2 sub-categories at once with their L3 children listed beneath each. Featured promo pinned on the right.

The two variants share the same header chrome, brand tokens, type, and category data. Only the dropdown panel differs.

---

## About the Design Files

The files in this bundle are **design references created in HTML/React (Babel-in-browser)** — prototypes showing intended look and behaviour, not production code to copy directly.

Your task is to **recreate these designs in nrs-uk.com's existing codebase** using its established framework (React/Next/Vue/Magento template, etc.), component library, and styling conventions. If no design-system component matches, build new components following the existing patterns.

Do **not** ship the Babel-in-browser HTML to production. Do **not** copy the `<style>` block or inline-style objects wholesale — translate the visual decisions into proper components and tokens in your design system.

## Fidelity

**High-fidelity (hifi)** for the header and dropdown panels: pixel-perfect spacing, exact colours, exact typography, exact corner radii, exact interaction states.

The "stripped-down page beneath" the header (the four placeholder product cards / image strips) is **not** part of the deliverable — it's just there so the dropdown has visual context in the prototype. Ignore it.

## Screenshots

- `screenshots/variant-a-tiered.jpg` — Tiered hover variant, Bathroom active, no L2 hovered (featured promo visible on right)
- `screenshots/variant-a-horizontal.jpg` — Horizontal variant, Bathroom active, all L2 sub-categories laid out in 3 columns

Both captured at 1480×920. Open the live prototype (`NRS Mega Menu.html`) for the interactive version.

---

## Screens / Views

There is **one** screen — the site header with the mega menu open. Two interaction variants of the dropdown panel, but the surrounding chrome is identical.

### 1. Header (shared across both variants)

**Purpose**: site-wide navigation entry-point. Always visible at the top of every page.

**Layout**: two stacked rows, both with dark teal background `#183e4b`. Full viewport width, no horizontal margins. Bottom-left and bottom-right corners of the second row are rounded so the dark strip floats with a curved underside.

#### Row 1 — Logo / Search / Account
- Padding: `26px 36px`
- Grid: `auto 1fr auto`, `align-items: center`, `gap: 32px`
- **Logo (left)**: PNG image `assets/nrs-logo.png` — light/cyan colourway of the NRS Healthcare wordmark, designed for dark backgrounds. Rendered at height `42px`, width auto.
- **Search (centre)**: pill input, max-width `620px`, centered in the grid cell.
  - Background `#ffffff`, border `1px solid rgba(255,255,255,0.18)`, border-radius `100px`.
  - Left padding `22px`. Placeholder copy: *"Search products, brands or item codes…"* (placeholder colour `#93a1ad`).
  - On the right of the input sits a circular accent button (`38×38px`, border-radius `999px`, background `var(--nrs-accent)`) containing a magnifier icon. Icon stroke colour is **dynamically picked** based on accent luminance (dark text on bright accents, white on dark accents — see Design Tokens).
- **Account (right)**: pill link.
  - Padding `10px 18px`, border-radius `100px`, border `1px solid rgba(255,255,255,0.22)`.
  - White user icon (18px) + label `"Account"` (Goldplay 600, 13.5px, white).

#### Row 2 — Top-level navigation links
- Padding: `0 36px`
- Background `#183e4b`, border-top `1px solid rgba(255,255,255,0.08)` (subtle divider between rows).
- `border-bottom-left-radius: 24px`, `border-bottom-right-radius: 24px`
- `min-height: 52px`
- `<nav>` is `display: flex`, `align-items: stretch`, `gap: 8px`.
- Six top-level links, in order:
  1. **PRODUCTS** — opens mega menu on hover; has a small chevron after the label
  2. **OUR SERVICES**
  3. **FIND A RETAILER**
  4. **NEWS**
  5. **ABOUT US**
  6. **CONTACT US**
- Each link styling:
  - `padding: 0 26px`
  - Text: Goldplay 600, 13.5px, `color: #ffffff`, `text-transform: uppercase`, `letter-spacing: 0.14em`
  - Default: transparent background, no underline.
  - **Hover** (non-active): background `#22525f`.
  - **Active** (mega menu open for Products, or hovered for the others): background `#0f2c36`, plus a `3px` inset bottom border in the accent colour (`box-shadow: inset 0 -3px 0 var(--nrs-accent)`).
  - Transition: `background 140ms ease, box-shadow 140ms ease`.
- Chevron on Products: 11px, white stroke, rotates 0→90° between right (closed) and down (open).

### 2. Mega menu — Variant A · Tiered hover

**Purpose**: deep browsing — keep the panel narrow, only show what the user is interested in.

**Anchor**: position `absolute`, `top: 100%`, `left: 0` relative to the Products `<a>`. `margin-top: 0`. Drops directly from the bottom of the Products tab. `z-index: 60`.

**Panel container**:
- Background `#ffffff`, border `1px solid #e3e9ef`, border-radius `6px`.
- Shadow: `0 24px 50px -20px rgba(11, 58, 102, 0.25), 0 8px 20px -10px rgba(11, 58, 102, 0.15)`.
- `overflow: hidden`. Grid layout, 3 columns: `240px 280px 300px`. Total width `820px` (collapses to `520px` when neither L3 nor featured is showing).
- Closes on `mouseleave` of the whole panel.

**Column 1 — L1 rail** (`240px`):
- Background `#f5f8fb`, right border `1px solid #e3e9ef`.
- Vertical padding `12px`, `max-height: 720px`, `overflow-y: auto`.
- 15 buttons, one per top-level category (see Category data section).
- Each button: padding `11px 18px 11px 22px`, font 14px / weight 500.
- **Default**: text `#1f2e3d`, transparent left border `3px`.
- **Active (hovered or focused)**: background `#ffffff`, text `var(--nrs-accent-dark)` (the darkened accent — see tokens), left border `3px solid var(--nrs-accent-dark)`, font-weight 600. Chevron stroke matches.
- Chevron: `›` 12px on the right.

**Column 2 — L2 list** (`280px`):
- Padding `20px 22px 22px`. `max-height: 720px`, `overflow-y: auto`.
- Eyebrow at the top: name of the active L1, 11px / weight 600 / `letter-spacing: 0.12em` / uppercase / colour `#637688`. Margin-bottom `14px`.
- List of L2 items as pill rows (`<ul>` no bullets, `gap: 2px`):
  - Each: padding `8px 14px`, border-radius `100px`, font 14px / weight 500.
  - **Default**: text `#1f2e3d`, transparent background.
  - **Active (hovered)**: background `#eef4fa`, text `var(--nrs-accent-dark)`, font-weight 600.
  - If the L2 has L3 children, show a right chevron (11px).
- "View all {L1 name}" link beneath the list, separated by a `1px` top border `#e3e9ef`, padding-top `14px`, margin-top `18px`. Text colour `var(--nrs-accent-dark)`, 13px / weight 600.

**Column 3 — L3 list OR Featured promo** (`300px`):

When the hovered L2 has children:
- Padding `20px 22px 22px`. `max-height: 720px`, `overflow-y: auto`.
- Eyebrow: name of the hovered L2, same styling as the L2 eyebrow.
- L3 list as pill rows:
  - Each: padding `7px 14px`, border-radius `100px`, font 13.5px / weight 500, colour `#1f2e3d`.
  - **Hover**: background `#eef4fa`, text `var(--nrs-accent-dark)`.
  - If the L3 has L4 children, show the child count in muted grey on the right (`fontSize: 11`, colour `#a3afb9`).
- **Fade-in animation** when the hovered L2 changes — opacity 0→1, translateY +2→0, 220ms ease.

When the hovered L2 has no children (or none is hovered):
- Background `#f5f8fb`. Shows the **Featured promo** for the active L1 (see below).

### 3. Mega menu — Variant A · Horizontal

**Purpose**: scannability — every sub-category visible at once.

Anchor & panel container are the same as the tiered variant, EXCEPT:
- Grid columns: `240px 720px 280px` → total width `1240px` (drops to `960px` with the featured column hidden).

**Column 1 — L1 rail**: identical to the tiered variant. (Same dimensions, same hover behaviour.)

**Column 2 — L2 multi-column grid** (`720px`):
- Padding `22px 26px 24px`. `max-height: 720px`, `overflow-y: auto`.
- Top row, baseline-aligned, space-between:
  - Eyebrow with the active L1 name.
  - "View all {L1 name} ›" link aligned right, 12.5px / weight 600, colour `var(--nrs-accent-dark)`.
- Below: CSS multi-column layout — `column-count: 3` (when featured is shown) or `4` (when hidden), `column-gap: 22px`.
- Each L2 is a "card" item:
  - `break-inside: avoid`, `display: inline-block`, `width: 100%`, `margin-bottom: 18px`.
  - L2 title link: 13.5px / weight 700 / colour `#1f2e3d`. `margin-bottom: 8px`.
  - Beneath, if it has children, an `<ul>` of L3 links:
    - Each L3: `display: block`, 12.5px, colour `#5b6b7a`, `line-height: 1.35`, padding `2px 0`.
    - **Hover**: colour shifts to `var(--nrs-accent-dark)`, `transition: color 100ms`.
- Fade-in animation on L1 change (same 220ms easing as Variant A tiered).

**Column 3 — Featured promo** (`280px`): identical to the tiered featured block.

### 4. Featured promo (shared)

Used by both variants for the right-hand column.

- Padding `22px`. `display: flex; flex-direction: column;`.
- **Tag pill**: padding `4px 10px`, border-radius `999px`, background `#e3edf6`, text `var(--nrs-accent-dark)`, 11px / weight 600. Contains a `6×6px` dot in `var(--nrs-accent)` to its left, then the tag label (e.g. *"Most viewed"*, *"Editor's pick"*).
- **Image placeholder**: aspect-ratio `4/3`, border-radius `10px`. In production this should be a real product photo, full-bleed.
- **Eyebrow**: same eyebrow style — L1 name in uppercase 11px.
- **Title** (`<h3>`): 18px / weight 700, colour `#0d1f2f`, `letter-spacing: -0.01em`, `line-height: 1.2`.
- **Body paragraph**: 13px, colour `#5b6b7a`, `line-height: 1.45`. Currently *"Shop our most-requested range with free UK delivery on orders over £40."* (replace with OT-led copy).
- **CTA**: pill link, padding `10px 18px`, border-radius `100px`, background `var(--nrs-accent)`, text `var(--nrs-accent-text)` (dynamic — see tokens). Label `"Shop {featured.title}"` with a 11px chevron after. 13px / weight 600.

Each L1 has its own featured `{title, tag, placeholder}` content — defined in `categories.js`.

---

## Interactions & Behavior

- **Open**: mega menu opens on `mouseenter` of the Products link, or on focus. (Click should also open for keyboard/touch — the prototype only wires hover.)
- **Close**: `mouseleave` of the entire mega menu panel. Also implicit-close when another top-level link is hovered (set `open=false` in that handler).
- **L1 active**: changes on `mouseenter` / `focus` of an L1 rail item. Resets L2 hover (tiered variant) and triggers a 220ms fade-in on the content area (horizontal variant).
- **L2 active (tiered only)**: changes on `mouseenter` / `focus` of an L2 pill. Triggers a 220ms fade-in on the L3 column.
- **Animations**:
  - `nrsFadeSlide`: `opacity 0→1`, `translateY 2px→0`, `220ms ease`, runs whenever the content key changes.
  - Nav-link background transitions: `140ms ease`.
  - L2/L3 hover transitions: `100ms` colour, `120ms` background.
- **Search**: input is functional (controlled string state). The accent magnifier button submits — in production, route to `/search?q=...`.
- **Account**: link target in production.

### Keyboard / accessibility (TO-DO in production)
The prototype doesn't fully wire this — implement properly:
- `<nav>` should be wrapped in semantic landmarks.
- Products should be a `<button aria-haspopup="true" aria-expanded={open} aria-controls="mega-menu">`.
- L1 rail items focusable in order, arrow-keys move focus between L1s.
- `Escape` closes the menu and returns focus to Products.
- Active descendants exposed via `aria-activedescendant` or roving tabindex on the L2 / L3 lists.
- Focus-visible outlines.
- Reduced-motion: respect `prefers-reduced-motion` and disable the 220ms fades.

### Responsive (NOT in this prototype)
The prototype is desktop-only. For tablet/mobile, the typical pattern is:
- Collapse the nav into a hamburger menu.
- Mega menu becomes a drill-down stack (L1 list → tap → L2 list → tap → L3 list), full-viewport.
- Keep the same brand chrome.

---

## State Management

Header-local state only — no app/global state.

```ts
// On the header component:
const [open, setOpen] = useState(false);             // mega menu open
const [hoverKey, setHoverKey] = useState(null);      // which non-Products link is hovered

// Inside the tiered mega menu:
const [activeL1, setActiveL1] = useState(0);
const [activeL2, setActiveL2] = useState(null);
useEffect(() => { setActiveL2(null); }, [activeL1]); // reset L2 when L1 changes

// Inside the horizontal mega menu:
const [activeL1, setActiveL1] = useState(0);
```

No data fetching at render time — the category tree is static and ships with the bundle (see `categories.js`). When you integrate it into the live site, source the tree from your CMS / catalogue API and cache it; render structure stays the same.

---

## Design Tokens

### Colours

| Token | Hex | Use |
|---|---|---|
| `--nrs-nav-bg` | `#183e4b` | Header dark teal background (both rows) |
| `--nrs-nav-hover` | `#22525f` | Top-nav link hover |
| `--nrs-nav-active` | `#0f2c36` | Top-nav link active |
| `--nrs-accent` | `#62ffef` | Brand accent — search button, Products underline, featured CTA. **Tweakable.** |
| `--nrs-accent-dark` | computed: `shade(--nrs-accent, -0.45)` | Darker accent for use as text/icon stroke on light backgrounds. For `#62ffef` this resolves to `#009d8d`-ish. |
| `--nrs-accent-text` | computed by luminance | Dark text on bright accents, white on dark — see snippet below |
| `--nrs-text-body` | `#1f2e3d` | Default body text on light surfaces |
| `--nrs-text-muted` | `#5b6b7a` | L3 list items, paragraphs |
| `--nrs-text-eyebrow` | `#637688` | Eyebrow labels |
| `--nrs-text-chevron` | `#a3afb9` | Inactive chevrons |
| `--nrs-panel-bg` | `#ffffff` | Mega menu panel background |
| `--nrs-rail-bg` | `#f5f8fb` | L1 rail + featured column background |
| `--nrs-row-hover` | `#eef4fa` | L2 / L3 hover background |
| `--nrs-divider` | `#e3e9ef` | All thin dividers |
| `--nrs-featured-tag-bg` | `#e3edf6` | Featured tag pill background |

#### Dynamic accent helpers (vanilla JS reference)

```js
function shade(hex, amt) {
  const n = parseInt(hex.replace("#",""), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.max(0, Math.min(255, Math.round(r + 255 * amt)));
  g = Math.max(0, Math.min(255, Math.round(g + 255 * amt)));
  b = Math.max(0, Math.min(255, Math.round(b + 255 * amt)));
  return "#" + ((1<<24) + (r<<16) + (g<<8) + b).toString(16).slice(1);
}

function pickAccentText(hex) {
  // Perceived luminance (Rec. 601). Returns dark navy or white.
  const n = parseInt(hex.replace("#",""), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#0d2540" : "#ffffff";
}
```

> If the brand team standardises on a fixed `--nrs-accent-dark`, prefer that over the computed value. The `shade()` helper is a fallback for accent experimentation.

### Typography

- **Family**: `Goldplay`, fallback `system-ui, sans-serif`. Three weights ship in `/fonts`: Regular (400), Medium (500), SemiBold (600). 700 and 800 map to SemiBold via `@font-face`.
- **Body family fallback**: `system-ui, sans-serif`.
- **Mono family** (used only for prototype placeholders): `'JetBrains Mono', ui-monospace, monospace`. Not used in the deliverable header.

| Token | Size | Weight | Notes |
|---|---|---|---|
| Nav link | 13.5px | 600 | `uppercase`, `letter-spacing: 0.14em` |
| L1 rail item | 14px | 500 (600 active) | |
| L2 pill | 14px | 500 (600 active) | |
| L3 item | 13.5px | 500 | |
| Eyebrow | 11px | 600 | `uppercase`, `letter-spacing: 0.12em` |
| Featured title | 18px | 700 | `letter-spacing: -0.01em`, `line-height: 1.2` |
| Featured body | 13px | 400 | `line-height: 1.45` |
| Account / search input | 13.5–14px | 500/600 | |
| Featured CTA | 13px | 600 | |

### Spacing & corners

- Header row 1 padding: `26px 36px`
- Header row 2 padding: `0 36px`, min-height `52px`
- Mega menu maxHeight: `720px` (must fit all 15 L1 items without scrolling — 15 items × ~42px ≈ 630 + 24px container padding)
- Border-radii: pill = `100px` (search input, account, L2/L3 pills, featured CTA); circle = `999px` (search button); panel = `6px`; nav-bar bottom corners = `24px`; featured tag = `999px`.

### Shadows

- Mega menu panel:
  `0 24px 50px -20px rgba(11, 58, 102, 0.25), 0 8px 20px -10px rgba(11, 58, 102, 0.15)`

---

## Category data

The full category tree (15 L1 → up to L4) is in `categories.js` as a single exported array of `{ name, icon, featured, children }` nodes. Each L1 also carries a `featured` block with `{ title, tag, placeholder }` used by the promo column.

In production, source this from your catalogue / CMS. The structure used here is a faithful rendering of the supplied **NRS Master list.xlsx**. JSON form is at `data/category-tree.json` for convenience.

---

## Assets

- `assets/nrs-logo.png` — supplied by client. Light/cyan logotype designed for dark backgrounds (3271×927). Rendered at 42px tall in the header. Keep aspect ratio.
- `fonts/Goldplay-Regular.otf`, `Goldplay-Medium.otf`, `Goldplay-SemiBold.otf` — supplied by client.

Icons in the prototype are simple inline SVGs (search, user, chevron, menu). Use your existing icon library equivalents — these are easy to replicate.

---

## Files in this bundle

| File | Purpose |
|---|---|
| `NRS Mega Menu.html` | Top-level prototype — loads everything and renders both variants on a design canvas |
| `categories.js` | Full category tree as JS object |
| `data/category-tree.json` | Same data as JSON for easy ingestion |
| `variants.jsx` | `HeaderVariantA` (the deliverable) — header chrome + nav links + selects between mega-menu layouts |
| `mega-menu.jsx` | `MegaMenu` (tiered hover variant) |
| `mega-menu-horizontal.jsx` | `MegaMenuHorizontal` (horizontal variant) |
| `primitives.jsx` | Inline SVG icons + striped image placeholder + legacy LogoMark (unused in deliverable) |
| `assets/nrs-logo.png` | Client logo |
| `fonts/Goldplay-*.otf` | Client typeface, 3 weights |

**Not part of the deliverable** (presentation scaffolding only — ignore in production):
- `design-canvas.jsx` — the side-by-side artboard canvas used to present both variants
- `tweaks-panel.jsx` — the in-page live-tweaks panel
- The `<ImagePlaceholder>` cards rendered beneath the header in each artboard

---

## What's still on the placeholder list (for product team)

1. **Final accent / CTA colour** — currently `#62ffef`. Confirm with brand.
2. **OT-led copy** for the featured promo blocks (currently a generic blurb).
3. **Real product imagery** to replace the striped image placeholders in each featured block.
4. **Responsive / mobile** treatment (see Interactions section).
5. **Full a11y wiring** — keyboard navigation, ARIA, focus management, reduced motion.
6. **L1 priority** — confirm Spare Parts / Service & Misc / Specialist deserve top-level peer status, or consider grouping them into a "More" pop-out.
