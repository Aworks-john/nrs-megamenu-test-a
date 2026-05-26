// Two header variants — A: "Trust" (deeper navy, utility strip)
//                       B: "Airy"  (teal, single-row, softer)

// Build a theme palette from a base accent colour.
function buildTheme({ accent, accentDark, variant }) {
  const isA = variant === "A";
  return {
    accent,
    accentDark,
    accentText: pickAccentText(accent),
    font: "'Goldplay', system-ui, sans-serif",
    menuBg: "#ffffff",
    menuRadius: isA ? 6 : 14,
    menuShadow: isA
      ? "0 24px 50px -20px rgba(11, 58, 102, 0.25), 0 8px 20px -10px rgba(11, 58, 102, 0.15)"
      : "0 40px 80px -30px rgba(15, 70, 80, 0.25), 0 12px 30px -12px rgba(15, 70, 80, 0.12)",
    menuBorder: isA ? "1px solid #e3e9ef" : "1px solid #e4eced",
    menuOffset: isA ? 0 : 12,
    col1: 240, col2: 280, col3: 300,
    maxHeight: 720,
    railBg: isA ? "#f5f8fb" : "#f3f8f8",
    railText: "#1f2e3d",
    railActiveBg: isA ? "#ffffff" : "#ffffff",
    railActiveText: accentDark,
    divider: isA ? "#e3e9ef" : "#e4eced",
    chevron: "#a3afb9",
    eyebrow: isA ? "#637688" : "#5c787c",
    bodyText: "#1f2e3d",
    muted: "#5b6b7a",
    l2ActiveBg: isA ? "#eef4fa" : "#e9f3f3",
    l3HoverBg: isA ? "#eef4fa" : "#e9f3f3",
    featuredBg: isA ? "#f5f8fb" : "#f3f8f8",
    featuredTagBg: isA ? "#e3edf6" : "#dcecec",
    featuredTagText: accentDark,
    featuredTitle: "#0d1f2f",
    imageTone: isA ? "blue" : "teal",
  };
}

// ── Variant A — "Trust" ────────────────────────────────────────────
// Updated: dark teal #183e4b nav bar carrying the light NRS logo,
// six top-level links (Products → mega menu), search + account only.
const NAV_BG = "#183e4b";
const NAV_HOVER = "#22525f";
const NAV_ACTIVE = "#0f2c36";

const NAV_LINKS = [
  { label: "Products",       key: "products",   hasMenu: true },
  { label: "Our Services",   key: "services" },
  { label: "Find a retailer",key: "retailer" },
  { label: "News",           key: "news" },
  { label: "About Us",       key: "about" },
  { label: "Contact Us",     key: "contact" },
];

function HeaderVariantA({ accent, showFeatured, menuLayout = "tiered" }) {
  const [open, setOpen] = useState(true); // Pre-open for the design canvas demo
  const [hoverKey, setHoverKey] = useState(null);
  const theme = buildTheme({
    accent,
    accentDark: shade(accent, -0.45),
    variant: "A",
  });
  theme.menuLeft = 0; // anchored to the "Products" button

  return (
    <div style={{
      width: "100%", height: "100%", background: "#ffffff",
      fontFamily: theme.font, color: "#1f2e3d",
      display: "flex", flexDirection: "column",
    }}>
      {/* Row 1: logo + search + account */}
      <div style={{
        background: NAV_BG,
        padding: "26px 36px",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center", gap: 32,
      }}>
        {/* Logo */}
        <a href="#" style={{ display: "inline-flex", alignItems: "center" }}>
          <img
            src="assets/nrs-logo.png"
            alt="NRS Healthcare"
            style={{ height: 42, width: "auto", display: "block" }}
          />
        </a>

        {/* Search — pill, icon on the right, no button */}
        <div style={{
          display: "flex", alignItems: "center",
          maxWidth: 620, width: "100%", justifySelf: "center",
          background: "#ffffff", borderRadius: 100,
          border: "1px solid rgba(255,255,255,0.18)",
          padding: "0 6px 0 22px",
        }}>
          <input
            placeholder="Search products, brands or item codes…"
            style={{
              flex: 1, border: "none", background: "transparent",
              padding: "13px 8px", outline: "none",
              fontFamily: theme.font, fontSize: 14, color: "#1f2e3d",
            }}
          />
          <button
            aria-label="Search"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 38, height: 38, margin: "3px 3px 3px 0",
              border: "none", borderRadius: 999,
              background: theme.accent, cursor: "pointer",
            }}>
            <Icon.Search size={17} stroke={theme.accentText} />
          </button>
        </div>

        {/* Account — pill */}
        <a href="#" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "10px 18px", borderRadius: 100,
          color: "#ffffff", textDecoration: "none",
          fontSize: 13.5, fontWeight: 600,
          border: "1px solid rgba(255,255,255,0.22)",
        }}>
          <Icon.User size={18} stroke="#ffffff" />
          Account
        </a>
      </div>

      {/* Row 2: nav links */}
      <div style={{
        background: NAV_BG,
        padding: "0 36px",
        display: "flex", alignItems: "stretch",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        position: "relative",
        minHeight: 52,
      }}>
        <nav style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
          {NAV_LINKS.map((item) => {
            const isProducts = item.hasMenu;
            const active = isProducts ? open : hoverKey === item.key;
            return (
              <div
                key={item.key}
                style={{ position: "relative", display: "flex" }}
                onMouseEnter={() => {
                  if (isProducts) setOpen(true);
                  else { setOpen(false); setHoverKey(item.key); }
                }}
                onMouseLeave={() => {
                  if (!isProducts) setHoverKey(null);
                }}
              >
                <a
                  href="#"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "0 26px",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: 13.5, fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    background: active ? NAV_ACTIVE : "transparent",
                    boxShadow: active ? `inset 0 -3px 0 ${theme.accent}` : "inset 0 -3px 0 transparent",
                    transition: "background 140ms ease, box-shadow 140ms ease",
                  }}
                  onMouseOver={(e) => {
                    if (!active) e.currentTarget.style.background = NAV_HOVER;
                  }}
                  onMouseOut={(e) => {
                    if (!active) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {item.label}
                  {item.hasMenu && (
                    <Icon.Chevron size={11} stroke="#ffffff" dir={open ? "down" : "right"} />
                  )}
                </a>

                {/* Mega menu anchored to the Products tab */}
                {isProducts && (
                  menuLayout === "horizontal" ? (
                    <MegaMenuHorizontal
                      open={open}
                      theme={theme}
                      showFeatured={showFeatured}
                      onClose={() => setOpen(false)}
                    />
                  ) : (
                    <MegaMenu
                      open={open}
                      theme={theme}
                      showFeatured={showFeatured}
                      onClose={() => setOpen(false)}
                    />
                  )
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Stripped-down "page" beneath header so the menu has visual context */}
      <div style={{ padding: "40px 36px", color: "#7a8794", fontSize: 13, flex: 1 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
        }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              borderRadius: 8, border: "1px solid #eef2f5",
              background: "#fafcfd", padding: 14,
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              <ImagePlaceholder label="product shot" tone="neutral" aspect="1 / 1" radius={6} />
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#9fb1c0",
                letterSpacing: "0.06em",
              }}>page content</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Variant B — "Airy" ─────────────────────────────────────────────
function HeaderVariantB({ accent, showFeatured }) {
  const [open, setOpen] = useState(true);
  const theme = buildTheme({
    accent,
    accentDark: shade(accent, -0.25),
    variant: "B",
  });
  theme.menuLeft = 0;

  return (
    <div style={{
      width: "100%", height: "100%", background: "#f6faf9",
      fontFamily: theme.font, color: "#0d1f2f",
      display: "flex", flexDirection: "column",
    }}>
      {/* Thin promo bar */}
      <div style={{
        background: "#0e2e30", color: "#cfdedf",
        fontSize: 12, padding: "9px 40px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 28,
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Icon.Truck size={13} stroke="#a7c4c4" />
          Free UK delivery over £40
        </span>
        <span style={{ width: 3, height: 3, borderRadius: 999, background: "#3f6062" }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Icon.Shield size={13} stroke="#a7c4c4" />
          VAT relief available
        </span>
        <span style={{ width: 3, height: 3, borderRadius: 999, background: "#3f6062" }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Icon.Phone size={13} stroke="#a7c4c4" />
          Speak to an OT: 0345 121 8111
        </span>
      </div>

      {/* Single main row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "auto auto 1fr auto",
        alignItems: "center", gap: 18,
        padding: "20px 40px",
        background: "#ffffff",
        borderBottom: "1px solid #e4eced",
        position: "relative",
      }}>
        <LogoMark color={theme.accentDark} subColor="#7a8f91" variant="stack" />

        <div style={{ position: "relative" }}>
          <button
            onMouseEnter={() => setOpen(true)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "12px 18px", borderRadius: 999,
              background: open ? theme.accent : "#ffffff",
              color: open ? "#fff" : theme.accentDark,
              border: `1.5px solid ${open ? theme.accent : "#cfe0e0"}`,
              fontFamily: theme.font, fontWeight: 600, fontSize: 14,
              cursor: "pointer",
              transition: "all 160ms ease",
            }}
          >
            <Icon.Menu size={16} stroke={open ? "#fff" : theme.accentDark} />
            Shop by Category
            <Icon.Chevron size={11} stroke={open ? "#fff" : theme.accentDark} dir={open ? "down" : "right"} />
          </button>
          <MegaMenu open={open} theme={theme} showFeatured={showFeatured} onClose={() => setOpen(false)} />
        </div>

        <div style={{
          display: "flex", alignItems: "center",
          maxWidth: 480, width: "100%", justifySelf: "stretch",
          background: "#f3f8f8", borderRadius: 999,
          paddingLeft: 18, marginLeft: 8,
          border: "1px solid #e4eced",
        }}>
          <Icon.Search size={16} stroke="#5a7375" />
          <input
            placeholder="What can we help you find today?"
            style={{
              flex: 1, border: "none", background: "transparent",
              padding: "11px 12px", outline: "none",
              fontFamily: theme.font, fontSize: 14, color: "#0d1f2f",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 14px", borderRadius: 999,
            color: "#0d1f2f", textDecoration: "none",
            fontSize: 13.5, fontWeight: 500,
          }}>
            <Icon.User size={18} stroke="#0d1f2f" />
            Account
          </a>
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "10px 16px", borderRadius: 999,
            background: theme.accentDark, color: "#fff", textDecoration: "none",
            fontSize: 13.5, fontWeight: 600,
          }}>
            <Icon.Bag size={17} stroke="#fff" />
            Basket
            <span style={{
              background: "#fff", color: theme.accentDark,
              fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 999,
            }}>2</span>
          </a>
        </div>
      </div>

      {/* Sub-nav row of curated links */}
      <div style={{
        padding: "10px 40px",
        background: "#ffffff",
        borderBottom: "1px solid #e4eced",
        display: "flex", alignItems: "center", gap: 4,
        fontSize: 13.5,
      }}>
        {[
          { l: "Bath Lifts" }, { l: "Rise & Recliners" }, { l: "Rollators" },
          { l: "Wheelchairs" }, { l: "Powerchairs" }, { l: "Pressure Care" },
          { l: "Servicing", icon: true },
        ].map((x) => (
          <a key={x.l} href="#" style={{
            padding: "8px 14px", borderRadius: 6,
            color: "#0d1f2f", textDecoration: "none", fontWeight: 500,
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            {x.l}
          </a>
        ))}
        <div style={{ marginLeft: "auto", color: "#5b6b7a", fontSize: 12.5,
          display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "#3aa18a" }} />
          NHS & local authority framework supplier
        </div>
      </div>

      {/* Stripped page context */}
      <div style={{ padding: "36px 40px", flex: 1 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 16,
        }}>
          <ImagePlaceholder label="hero campaign — full bleed" tone="teal" aspect="16/7" radius={14} />
          <ImagePlaceholder label="seasonal promo" tone="warm" aspect="16/7" radius={14} />
          <ImagePlaceholder label="advice / OT" tone="neutral" aspect="16/7" radius={14} />
        </div>
      </div>
    </div>
  );
}

function HeaderIconButton({ icon, label, sub, badge, badgeBg }) {
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "8px 14px", borderRadius: 6, border: "none",
      background: "transparent", cursor: "pointer", position: "relative",
      fontFamily: "Manrope, sans-serif",
    }}>
      <span style={{ position: "relative" }}>
        {icon}
        {badge && (
          <span style={{
            position: "absolute", top: -6, right: -10,
            background: badgeBg, color: "#fff",
            fontSize: 10, fontWeight: 700,
            padding: "1px 5px", borderRadius: 999,
            minWidth: 16, textAlign: "center",
          }}>{badge}</span>
        )}
      </span>
      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.1 }}>
        <span style={{ fontSize: 11, color: "#5b6b7a" }}>{sub}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1f2e3d" }}>{label}</span>
      </span>
    </button>
  );
}

// Pick legible foreground for a given accent — bright accents need dark text.
function pickAccentText(hex) {
  const n = parseInt(hex.replace("#",""), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  // Perceived luminance (Rec. 601). Threshold tuned for our palette range.
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#0d2540" : "#ffffff";
}

// Lighten/darken an oklch-friendly hex by adjusting L.
// Simple HSL-based shade for our limited needs.
function shade(hex, amt) {
  const n = parseInt(hex.replace("#",""), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.max(0, Math.min(255, Math.round(r + 255 * amt)));
  g = Math.max(0, Math.min(255, Math.round(g + 255 * amt)));
  b = Math.max(0, Math.min(255, Math.round(b + 255 * amt)));
  return "#" + ((1<<24) + (r<<16) + (g<<8) + b).toString(16).slice(1);
}

Object.assign(window, { HeaderVariantA, HeaderVariantB });
