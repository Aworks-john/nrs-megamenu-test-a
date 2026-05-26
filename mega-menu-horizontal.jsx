// MegaMenuHorizontal — wide panel showing ALL L2 sub-categories at once
// as multi-column cards (each L2 with its L3 children listed beneath).
// Left rail still drives which L1 is active, but no L3 hover-tiering.

const { useState: useStateH } = React;

function MegaMenuHorizontal({ open, theme, showFeatured = true, onClose }) {
  const cats = window.CATEGORIES;
  const [activeL1, setActiveL1] = useStateH(0);

  if (!open) return null;

  const l1 = cats[activeL1];
  const l2List = l1?.children || [];

  // Decide column count for the content area: 3 cols when featured is shown
  // (more breathing room) or 4 cols when it's hidden.
  const colCount = showFeatured ? 3 : 4;
  const railW = 240;
  const featuredW = 280;
  const contentW = 720;
  const totalW = railW + contentW + (showFeatured ? featuredW : 0);

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
        gridTemplateColumns: `${railW}px ${contentW}px ${showFeatured ? featuredW + "px" : "0px"}`,
        width: totalW,
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

      {/* ── Column 2: L2 cards in multi-column grid ───────────── */}
      <div style={{
        padding: "22px 26px 24px",
        maxHeight: theme.maxHeight, overflowY: "auto",
      }}>
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "space-between",
          marginBottom: 16,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
            color: theme.eyebrow,
          }}>
            {l1.name}
          </div>
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: theme.accentDark, fontSize: 12.5, fontWeight: 600,
            textDecoration: "none",
          }}>
            View all {l1.name}
            <Icon.Chevron size={10} stroke={theme.accentDark} />
          </a>
        </div>

        <FadeInKeyH k={l1.name}>
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${colCount}, 1fr)`,
            gap: "0 22px",
          }}>
            {chunkColumns(l2List, colCount).map((col, ci) => (
              <div key={ci} style={{ display: "flex", flexDirection: "column" }}>
                {col.map((l2) => (
                  <div key={l2.name} style={{ marginBottom: 18 }}>
                    <a href="#" style={{
                      display: "inline-block",
                      fontSize: 13.5, fontWeight: 700, color: theme.bodyText,
                      textDecoration: "none",
                      marginBottom: 8,
                      lineHeight: 1.25,
                    }}>
                      {l2.name}
                    </a>
                    {(l2.children?.length || 0) > 0 && (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0,
                        display: "grid", gap: 3 }}>
                        {l2.children.map((l3) => (
                          <li key={l3.name}>
                            <a href="#"
                              style={{
                                display: "block",
                                fontSize: 12.5, color: theme.muted,
                                textDecoration: "none", lineHeight: 1.35,
                                padding: "2px 0",
                                transition: "color 100ms",
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.color = theme.accentDark; }}
                              onMouseLeave={(e) => { e.currentTarget.style.color = theme.muted; }}
                            >
                              {l3.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </FadeInKeyH>
      </div>

      {/* ── Column 3: Featured promo ──────────────────────────── */}
      {showFeatured && (
        <div style={{
          padding: 0,
          background: theme.featuredBg,
          maxHeight: theme.maxHeight, overflowY: "auto",
        }}>
          <FeaturedPromo theme={theme} featured={l1.featured} catName={l1.name} />
        </div>
      )}
    </div>
  );
}

// Local fade-in wrapper for the L1 content swap
function FadeInKeyH({ k, children }) {
  return (
    <div key={k} style={{ animation: "nrsFadeSlide 220ms ease both" }}>
      {children}
    </div>
  );
}

// Greedy bin-packer — distributes L2s across N columns by estimated height
// (1 row for the title + N rows for L3 children). Keeps the columns visually
// balanced without depending on CSS multi-column (which some capture
// libraries can't render).
function chunkColumns(items, n) {
  const cols = Array.from({ length: n }, () => ({ items: [], h: 0 }));
  for (const item of items) {
    const childCount = item.children?.length || 0;
    const weight = 1 + childCount;
    // assign to currently shortest column
    let target = 0;
    for (let i = 1; i < n; i++) if (cols[i].h < cols[target].h) target = i;
    cols[target].items.push(item);
    cols[target].h += weight;
  }
  return cols.map(c => c.items);
}

Object.assign(window, { MegaMenuHorizontal });
