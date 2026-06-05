# NRS Mega Menu — 2605-28

Standalone deployment of the NRS horizontal mega menu (brands with logos).

## Deploy to GitHub Pages

1. Push the contents of this folder to a GitHub repo (so `index.html` is at the root).
2. Go to **Settings → Pages → Build and deployment → Source**.
3. Choose **Deploy from a branch**, select your branch and `/` (root).
4. Save — live at `https://<user>.github.io/<repo>/` within a minute.

## Interactions

- Hover **Products** — opens the horizontal mega menu (all sub-categories visible)
- Hover **Our Brands** — opens the brands dropdown (grey logos → teal on hover)
- Hover **Find us** — opens the compact two-option dropdown

## File structure

```
index.html              ← Entry point
categories.js           ← Product category data
primitives.jsx          ← Icons & UI primitives
mega-menu.jsx           ← Tiered mega menu (used by Products)
mega-menu-horizontal.jsx← Horizontal mega menu
mega-menu-brands.jsx    ← Our Brands dropdown + Find us NavDropdown
variants.jsx            ← Header layout + nav config
assets/
  nrs-logo.png
  brands/
    *-grey.svg          ← CSS-masked wordmarks (grid, grey/teal)
    *-thumb.svg         ← Brand thumbnail images (promo cards)
    *.svg               ← Colour brand logos
fonts/
  Goldplay-*.otf
```
