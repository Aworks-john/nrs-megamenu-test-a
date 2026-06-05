// MegaMenuBrands — horizontal dropdown for the "Our Brands" nav item.
// Mirrors MegaMenuHorizontal's frame: a left rail listing every brand,
// a wide middle area, and the image card on the far right. Hovering a
// brand swaps the right-hand image card (and the middle highlight).

const { useState: useStateB } = React;

// Grey single-colour wordmarks (supplied SVGs) are rendered via CSS mask so
// they can be painted #616261 by default and brand-teal on hover. `vb` is the
// SVG viewBox [w,h] so each logo keeps its true aspect ratio.
const BRAND_GREY  = "#616261";          // default logo colour
const BRAND_TEAL  = "#0e857a";          // hover logo colour (matches Atlas)
const BRAND_HOVER_BG = "#eef0fa";       // hover pill background

const NRS_BRANDS = [
  { name: "Sanctuary",  tag: "Pressure care",     greyLogo: "assets/brands/sanctuary-grey.svg", vb: [183.21, 17.49], w: 174, thumb: "assets/brands/sanctuary-thumb.svg", blurb: "Pressure-relieving mattresses and cushions trusted across the NHS." },
  { name: "Nuvo",       tag: "Seating",           greyLogo: "assets/brands/nuvo-grey.svg",      vb: [89.65, 17.74],  w: 86,  thumb: "assets/brands/nuvo-thumb.svg",      blurb: "Rise-and-recline and specialist seating built for everyday comfort." },
  { name: "NRS",        tag: "Daily living",      greyLogo: "assets/brands/nrs-grey.svg",       vb: [51.38, 19.54],  w: 58,  thumb: "assets/brands/nrs-thumb.svg",       blurb: "Our own-brand range of OT-approved daily-living aids." },
  { name: "Freestyle",  tag: "Mobility",          greyLogo: "assets/brands/freestyle-grey.svg", vb: [92.7, 20.89],   w: 92,  thumb: "assets/brands/freestyle-thumb.svg", blurb: "Lightweight walking aids and rollators for life on the move." },
  { name: "Kura Care",  tag: "Bathroom",          greyLogo: "assets/brands/kura-care-grey.svg", vb: [149.9, 15.16],  w: 148, thumb: "assets/brands/kura-care-thumb.svg", blurb: "Bathing and toileting solutions designed around dignity." },
  { name: "Easyfit",    tag: "Grab rails",        greyLogo: "assets/brands/easyfit-grey.svg",   vb: [74.41, 24.26],  w: 72,  thumb: "assets/brands/easyfit-thumb.svg",   blurb: "Quick-to-install support rails and washroom fittings." },
  { name: "SureSleep",  tag: "Beds",              greyLogo: "assets/brands/suresleep-grey.svg", vb: [99.51, 20.98],  w: 90,  thumb: "assets/brands/suresleep-thumb.svg", blurb: "Profiling beds and sleep systems for safer rest." },
  { name: "Atlas",      tag: "Moving & handling", greyLogo: "assets/brands/atlas-grey.svg",     vb: [85.47, 17.36],  w: 82,  thumb: "assets/brands/atlas-thumb.svg",     blurb: "Hoists, slings and transfer aids for confident handling." },
];

// CSS-mask logo: paints the supplied silhouette SVG in a single flat colour
// at an explicit width; height follows the SVG's true aspect ratio.
function MaskLogo({ src, vb, width, color }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "block", width,
        aspectRatio: `${vb[0]} / ${vb[1]}`,
        backgroundColor: color,
        WebkitMaskImage: `url("${src}")`, maskImage: `url("${src}")`,
        WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center", maskPosition: "left center",
        WebkitMaskSize: "contain", maskSize: "contain",
        transition: "background-color 120ms",
      }}
    />
  );
}

// Brand wordmark: SVG logo when available + logo mode is on; else the name.
// Logos flagged onDark (light artwork) sit on a teal chip so they stay legible.
function BrandMark({ brand, useLogos, active, theme }) {
  if (useLogos && brand.logo) {
    const img = (
      <img
        src={brand.logo}
        alt={brand.name}
        style={{
          height: 28, width: "auto", maxWidth: 165, display: "block",
          objectFit: "contain",
          opacity: brand.onDark ? 1 : (active ? 1 : 0.62),
          transition: "opacity 120ms",
        }}
      />
    );
    if (brand.onDark) {
      return (
        <span style={{
          display: "inline-flex", alignItems: "center",
          padding: "6px 12px", borderRadius: 6, background: theme.accentDark,
        }}>{img}</span>
      );
    }
    return img;
  }
  return (
    <span style={{
      fontSize: 14, fontWeight: 700,
      color: active ? theme.accentDark : theme.bodyText,
    }}>{brand.name}</span>
  );
}

function MegaMenuBrands({ open, theme, useLogos = false, onClose }) {
  const [active, setActive] = useStateB(0);
  const [hovered, setHovered] = useStateB(null);
  if (!open) return null;

  const railW = 240;
  const contentW = 720;
  const featuredW = 280;
  const totalW = railW + contentW + featuredW;
  const brand = NRS_BRANDS[active];

  // Split brands into two balanced columns for the middle grid.
  const mid = Math.ceil(NRS_BRANDS.length / 2);
  const cols = [NRS_BRANDS.slice(0, mid), NRS_BRANDS.slice(mid)];

  return (
    <div
      style={{
        position: "absolute", top: "100%", left: theme.menuLeft ?? 0,
        marginTop: theme.menuOffset ?? 8, zIndex: 60,
        background: theme.menuBg,
        borderRadius: theme.menuRadius,
        boxShadow: theme.menuShadow,
        border: theme.menuBorder,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: `${railW}px ${contentW}px ${featuredW}px`,
        width: totalW,
        fontFamily: theme.font,
      }}
      onMouseLeave={onClose}
    >
      {/* ── Column 1: brand rail ──────────────────────────────── */}
      <div style={{
        background: theme.railBg, borderRight: `1px solid ${theme.divider}`,
        padding: "12px 0", maxHeight: theme.maxHeight, overflowY: "auto",
      }}>
        {NRS_BRANDS.map((b, i) => {
          const on = i === active;
          return (
            <button
              key={b.name}
              onMouseEnter={() => { setActive(i); setHovered(i); }}
              onFocus={() => { setActive(i); setHovered(i); }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "11px 18px 11px 22px",
                background: on ? theme.railActiveBg : "transparent",
                borderLeft: `3px solid ${on ? theme.accentDark : "transparent"}`,
                color: on ? theme.railActiveText : theme.railText,
                fontSize: 14, fontWeight: on ? 600 : 500,
                fontFamily: theme.font, textAlign: "left", cursor: "pointer",
                border: "none", borderLeftWidth: 3, borderLeftStyle: "solid",
                borderLeftColor: on ? theme.accentDark : "transparent",
                transition: "background 120ms, color 120ms",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center" }}>{b.name}</span>
              <Icon.Chevron size={12} stroke={on ? theme.accentDark : theme.chevron} />
            </button>
          );
        })}
      </div>

      {/* ── Column 2: all brands, two columns ─────────────────── */}
      <div style={{ padding: "22px 26px 24px", maxHeight: theme.maxHeight, overflowY: "auto" }}>
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
            color: theme.eyebrow,
          }}>Our Brands</div>
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: theme.accentDark, fontSize: 12.5, fontWeight: 600, textDecoration: "none",
          }}>
            View all brands <Icon.Chevron size={10} stroke={theme.accentDark} />
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 22px" }}>
          {cols.map((col, ci) => (
            <div key={ci} style={{ display: "flex", flexDirection: "column" }}>
              {col.map((b) => {
                const globalIndex = NRS_BRANDS.indexOf(b);
                const isHover = globalIndex === hovered;
                return (
                  <a
                    key={b.name}
                    href="#"
                    onMouseEnter={() => { setActive(globalIndex); setHovered(globalIndex); }}
                    onMouseLeave={() => setHovered((h) => (h === globalIndex ? null : h))}
                    style={{
                      display: "flex", alignItems: "center", minHeight: 52,
                      textDecoration: "none",
                      padding: "0 20px", borderRadius: 10, marginBottom: 4,
                      background: (useLogos ? isHover : globalIndex === active) ? BRAND_HOVER_BG : "transparent",
                      transition: "background 120ms",
                    }}
                  >
                    {useLogos && b.greyLogo
                      ? <MaskLogo src={b.greyLogo} vb={b.vb} width={b.w} color={isHover ? BRAND_TEAL : BRAND_GREY} />
                      : <BrandMark brand={b} useLogos={useLogos} active={globalIndex === active} theme={theme} />}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── Column 3: promo card for the hovered brand ─────── */}
      <div style={{ background: theme.featuredBg, maxHeight: theme.maxHeight, overflowY: "auto" }}>
        <FadeInKeyB k={brand.name}>
          <div style={{ padding: 18 }}>
            {/* Thumbnail image — brand-supplied SVG */}
            <div style={{
              width: "100%", borderRadius: 12, overflow: "hidden",
              background: "#f0f4f6",
              aspectRatio: "4 / 3",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <img
                src={brand.thumb}
                alt={brand.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Brand name as text (no logo image) */}
            <div style={{
              fontSize: 20, fontWeight: 700, color: theme.featuredTitle,
              marginTop: 14, lineHeight: 1.2, letterSpacing: "-0.01em",
            }}>{brand.name}</div>

            {/* Blurb */}
            <div style={{ fontSize: 13, color: theme.muted, marginTop: 8, lineHeight: 1.5 }}>
              {brand.blurb}
            </div>

            {/* CTA */}
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16,
              padding: "10px 16px", borderRadius: 999,
              background: theme.accent, color: theme.accentText,
              fontSize: 12.5, fontWeight: 600, textDecoration: "none",
            }}>
              Explore {brand.name} <Icon.Chevron size={10} stroke={theme.accentText} />
            </a>
          </div>
        </FadeInKeyB>
      </div>
    </div>
  );
}

function FadeInKeyB({ k, children }) {
  return <div key={k} style={{ animation: "nrsFadeSlide 220ms ease both" }}>{children}</div>;
}

Object.assign(window, { MegaMenuBrands, NRS_BRANDS });

// ── NavDropdown — compact dropdown matching the mega-menu styling ───
// Used for short link lists (e.g. "Find us"). Anchors under its own
// nav button rather than spanning the full nav width.
function NavDropdown({ open, theme, items, onClose }) {
  if (!open) return null;
  return (
    <div
      onMouseLeave={onClose}
      style={{
        position: "absolute", top: "100%", left: 0,
        marginTop: theme.menuOffset ?? 8, zIndex: 60,
        minWidth: 260,
        background: theme.menuBg,
        borderRadius: theme.menuRadius,
        boxShadow: theme.menuShadow,
        border: theme.menuBorder,
        overflow: "hidden",
        padding: 8,
        fontFamily: theme.font,
        animation: "nrsFadeSlide 200ms ease both",
      }}
    >
      {items.map((it) => (
        <a
          key={it.label}
          href="#"
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 14, padding: "13px 14px", borderRadius: 8,
            textDecoration: "none", color: theme.bodyText,
            transition: "background 120ms, color 120ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.l2ActiveBg;
            e.currentTarget.style.color = theme.accentDark;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = theme.bodyText;
          }}
        >
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{it.label}</span>
            {it.sub && <span style={{ fontSize: 12, color: theme.muted }}>{it.sub}</span>}
          </span>
          <Icon.Chevron size={12} stroke={theme.accentDark} />
        </a>
      ))}
    </div>
  );
}

Object.assign(window, { NavDropdown });

