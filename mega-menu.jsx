// MegaMenu — tiered hover (L1 rail → L2 column → L3 column / Featured promo)
// Used by both variants; styled via the `theme` prop.

const { useState, useRef, useEffect } = React;

function MegaMenu({ open, theme, showFeatured = true, onClose }) {
  const cats = window.CATEGORIES;
  const [activeL1, setActiveL1] = useState(0);
  const [activeL2, setActiveL2] = useState(null);

  // Reset L2 hover whenever the active L1 changes
  useEffect(() => { setActiveL2(null); }, [activeL1]);

  if (!open) return null;

  const l1 = cats[activeL1];
  const l2List = l1?.children || [];
  const hoveredL2 = activeL2 != null ? l2List[activeL2] : null;
  const l3List = hoveredL2?.children || [];
  const showL3 = l3List.length > 0;

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
        gridTemplateColumns: `${theme.col1}px ${theme.col2}px ${showL3 || showFeatured ? theme.col3 + "px" : "0px"}`,
        width: theme.col1 + theme.col2 + (showL3 || showFeatured ? theme.col3 : 0),
        transition: "width 220ms ease",
        fontFamily: theme.font,
      }}
      onMouseLeave={onClose}
    >
      {/* ── Column 1: L1 rail ─────────────────────────────────── */}
      <div style={{
        background: theme.railBg, borderRight: `1px solid ${theme.divider}`,
        padding: "12px 0", maxHeight: theme.maxHeight, overflowY: "auto",
      }}>
        {cats.map((c, i) => {
          const active = i === activeL1;
          return (
            <button
              key={c.name}
              onMouseEnter={() => setActiveL1(i)}
              onFocus={() => setActiveL1(i)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "11px 18px 11px 22px",
                background: active ? theme.railActiveBg : "transparent",
                borderLeft: `3px solid ${active ? theme.accentDark : "transparent"}`,
                color: active ? theme.railActiveText : theme.railText,
                fontSize: 14, fontWeight: active ? 600 : 500,
                fontFamily: theme.font, textAlign: "left", cursor: "pointer",
                border: "none", borderLeftWidth: 3, borderLeftStyle: "solid",
                borderLeftColor: active ? theme.accentDark : "transparent",
                transition: "background 120ms, color 120ms",
              }}
            >
              <span>{c.name}</span>
              <Icon.Chevron size={12} stroke={active ? theme.accentDark : theme.chevron} />
            </button>
          );
        })}
      </div>

      {/* ── Column 2: L2 list ─────────────────────────────────── */}
      <div style={{
        padding: "20px 22px 22px",
        maxHeight: theme.maxHeight, overflowY: "auto",
      }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
          color: theme.eyebrow, marginBottom: 14,
        }}>
          {l1.name}
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 2 }}>
          {l2List.map((c, i) => {
            const active = i === activeL2;
            const hasChildren = (c.children?.length || 0) > 0;
            return (
              <li key={c.name}>
                <a
                  href="#"
                  onMouseEnter={() => setActiveL2(i)}
                  onFocus={() => setActiveL2(i)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "8px 14px", borderRadius: 100,
                    background: active ? theme.l2ActiveBg : "transparent",
                    color: active ? theme.accentDark : theme.bodyText,
                    fontSize: 14, fontWeight: active ? 600 : 500,
                    textDecoration: "none",
                    transition: "background 100ms, color 100ms",
                  }}
                >
                  <span>{c.name}</span>
                  {hasChildren && (
                    <Icon.Chevron size={11} stroke={active ? theme.accentDark : theme.chevron} />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <a href="#" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          marginTop: 18, paddingTop: 14,
          borderTop: `1px solid ${theme.divider}`,
          color: theme.accentDark, fontSize: 13, fontWeight: 600,
          textDecoration: "none",
        }}>
          View all {l1.name}
          <Icon.Chevron size={11} stroke={theme.accentDark} />
        </a>
      </div>

      {/* ── Column 3: L3 list OR Featured promo ──────────────── */}
      {(showL3 || showFeatured) && (
        <div style={{
          padding: showL3 ? "20px 22px 22px" : "0",
          background: showL3 ? "transparent" : theme.featuredBg,
          maxHeight: theme.maxHeight, overflowY: "auto",
          position: "relative",
        }}>
          {showL3 ? (
            <FadeInKey k={hoveredL2?.name}>
              <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
                color: theme.eyebrow, marginBottom: 14,
              }}>
                {hoveredL2.name}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 2 }}>
                {l3List.map((c) => (
                  <li key={c.name}>
                    <a href="#" style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "7px 14px", borderRadius: 100,
                      color: theme.bodyText, fontSize: 13.5, fontWeight: 500,
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = theme.l3HoverBg;
                      e.currentTarget.style.color = theme.accentDark;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = theme.bodyText;
                    }}>
                      <span>{c.name}</span>
                      {(c.children?.length || 0) > 0 && (
                        <span style={{ fontSize: 11, color: theme.chevron, fontWeight: 400 }}>
                          {c.children.length}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </FadeInKey>
          ) : (
            <FeaturedPromo theme={theme} featured={l1.featured} catName={l1.name} />
          )}
        </div>
      )}
    </div>
  );
}

// Tiny wrapper that fades-in its children whenever `k` changes.
function FadeInKey({ k, children }) {
  return (
    <div key={k} style={{ animation: "nrsFadeSlide 220ms ease both" }}>
      {children}
    </div>
  );
}

function FeaturedPromo({ theme, featured, catName }) {
  if (!featured) return null;
  return (
    <div style={{ padding: 22, display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        alignSelf: "flex-start",
        padding: "4px 10px", borderRadius: 999,
        background: theme.featuredTagBg, color: theme.featuredTagText,
        fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
        marginBottom: 14,
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: 999, background: theme.accent,
        }} />
        {featured.tag}
      </div>

      <ImagePlaceholder
        label={featured.placeholder}
        tone={theme.imageTone}
        aspect="4 / 3"
        radius={10}
      />

      <div style={{ marginTop: 14 }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
          color: theme.eyebrow, marginBottom: 6,
        }}>{catName}</div>
        <h3 style={{
          fontSize: 18, fontWeight: 700, margin: 0,
          color: theme.featuredTitle, lineHeight: 1.2,
          letterSpacing: "-0.01em",
        }}>{featured.title}</h3>
        <p style={{
          margin: "8px 0 0", fontSize: 13, color: theme.muted, lineHeight: 1.45,
        }}>
          Shop our most-requested range with free UK delivery on orders over £40.
        </p>
      </div>

      <a href="#" style={{
        marginTop: 14, alignSelf: "flex-start",
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "10px 18px", borderRadius: 100,
        background: theme.accent, color: theme.accentText,
        fontSize: 13, fontWeight: 600, textDecoration: "none",
      }}>
        Shop {featured.title}
        <Icon.Chevron size={11} stroke={theme.accentText} />
      </a>
    </div>
  );
}

Object.assign(window, { MegaMenu });
