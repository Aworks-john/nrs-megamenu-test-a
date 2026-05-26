// Shared UI primitives for the NRS mega menu
// Icons are intentionally simple geometric shapes / monoline strokes.

const Icon = {
  Search: ({ size = 18, stroke = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  ),
  User: ({ size = 20, stroke = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.5 3.6-7 8-7s8 2.5 8 7" />
    </svg>
  ),
  Bag: ({ size = 20, stroke = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1 12H6L5 8z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  ),
  Menu: ({ size = 18, stroke = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Chevron: ({ size = 14, stroke = "currentColor", dir = "right" }) => {
    const rot = { right: 0, down: 90, left: 180, up: 270 }[dir];
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: `rotate(${rot}deg)` }}>
        <path d="M9 6l6 6-6 6" />
      </svg>
    );
  },
  Phone: ({ size = 14, stroke = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
  Truck: ({ size = 14, stroke = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="12" height="9" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
  Shield: ({ size = 14, stroke = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Check: ({ size = 14, stroke = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
};

// Striped placeholder for product imagery. Keeps it obvious that real
// product photography goes here.
function ImagePlaceholder({ label = "image", tone = "neutral", aspect = "4 / 3", radius = 8 }) {
  const palettes = {
    neutral: { bg: "#eef2f5", stripe: "#e2e8ec", text: "#7a8794" },
    blue:    { bg: "#e6eef6", stripe: "#d6e2ee", text: "#456380" },
    teal:    { bg: "#e3f0f0", stripe: "#cfe4e4", text: "#3e6f72" },
    warm:    { bg: "#f3eee7", stripe: "#e7ddcd", text: "#7d6a4f" },
  };
  const p = palettes[tone] || palettes.neutral;
  return (
    <div style={{
      aspectRatio: aspect, borderRadius: radius, overflow: "hidden",
      background: `repeating-linear-gradient(135deg, ${p.bg} 0 14px, ${p.stripe} 14px 28px)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 11, color: p.text, letterSpacing: "0.04em", textAlign: "center", padding: 8,
    }}>
      <span>{label}</span>
    </div>
  );
}

// Generic NRS placeholder wordmark. Using neutral type — NOT the real
// brand mark. Designed to be obviously replaceable.
function LogoMark({ color = "#0b3a66", subColor = "#5a7080", variant = "stack" }) {
  if (variant === "stack") {
    return (
      <div style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{
          fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 26,
          letterSpacing: "-0.02em", color,
        }}>NRS</span>
        <span style={{
          fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: 9,
          letterSpacing: "0.22em", color: subColor, marginTop: 3, textTransform: "uppercase",
        }}>Healthcare · placeholder</span>
      </div>
    );
  }
  return (
    <div style={{ display: "inline-flex", alignItems: "baseline", gap: 8, lineHeight: 1 }}>
      <span style={{
        fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 28,
        letterSpacing: "-0.025em", color,
      }}>NRS</span>
      <span style={{
        fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: 10,
        letterSpacing: "0.18em", color: subColor, textTransform: "uppercase",
      }}>· placeholder</span>
    </div>
  );
}

Object.assign(window, { Icon, ImagePlaceholder, LogoMark });
