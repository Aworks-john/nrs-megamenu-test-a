# NRS Mega Menu — Deploy Package

Static deployment of the NRS Horizontal Mega Menu design canvas.

## Deploy to GitHub Pages

1. Push the contents of this folder to a GitHub repo (so `index.html` is at the root).
2. Go to **Settings → Pages → Build and deployment → Source**.
3. Choose **Deploy from a branch**, select your branch and root `/`.
4. Save — live at `https://<user>.github.io/<repo>/` within a minute.

## File structure

```
index.html                  ← Entry point (design canvas)
categories.js               ← Product category data
design-canvas.jsx           ← Design canvas shell
tweaks-panel.jsx            ← Tweaks panel
primitives.jsx              ← Shared icons & UI primitives
mega-menu.jsx               ← Tiered mega menu
mega-menu-horizontal.jsx    ← Horizontal (all sub-cats) mega menu
mega-menu-brands.jsx        ← Our Brands dropdown + NavDropdown
variants.jsx                ← Header variants A & B + nav config
assets/
  nrs-logo.png              ← NRS logo (white, for dark nav)
  brands/
    *-grey.svg              ← Grey wordmark logos (CSS-masked in grid)
    *-thumb.svg             ← Brand thumbnail images (promo cards)
    *.svg                   ← Colour brand logos
fonts/
  Goldplay-*.otf            ← Brand typeface
```

## Notes

- React + Babel are loaded from CDN — no build step needed.
- CSS mask renders the grey/teal brand logos in the grid; some screenshot tools show these as solid blocks (a renderer limitation — they display correctly in-browser).
- Hover **Products** or **Our Brands** in the nav to open the respective mega-menu.
- The Tweaks panel (bottom-right) lets you swap accent colour and toggle brand logos on/off.
