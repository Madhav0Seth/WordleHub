// ─────────────────────────────────────────────────────────────────────────────
// Navbar.jsx  (updated)
// Props:
//   title         — "WORDLE" | "DUO WORDLE" etc
//   theme         — "dark" | "light"
//   onToggleTheme — () => void
//   onOpenStats   — () => void
//   currentPath   — "/wordle" | "/duo-wordle"
// ─────────────────────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: "currentColor" }}>
    <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1zM4.22 5.64a1 1 0 0 1 1.42-1.42l.7.71a1 1 0 1 1-1.41 1.41l-.71-.7zm13.44 12.72a1 1 0 0 1 1.41-1.41l.71.7a1 1 0 1 1-1.41 1.42l-.71-.71zM3 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm17 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zM4.93 18.36l.7-.71a1 1 0 1 1 1.42 1.41l-.71.71a1 1 0 0 1-1.41-1.41zm13.43-12.72l.71-.71a1 1 0 1 1 1.41 1.42l-.7.7a1 1 0 0 1-1.42-1.41z"/>
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: "currentColor" }}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
  </svg>
);

const StatsIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 12, height: 12, fill: "currentColor" }}>
    <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 10h2v7H7v-7zm4-3h2v10h-2V7zm4 6h2v4h-2v-4z"/>
  </svg>
);

export default function Navbar({ title = "WORDLE", theme, onToggleTheme, onOpenStats, currentPath }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <div className="nav-side">
          <button className="nav-btn" onClick={onOpenStats}>
            <StatsIcon />
            Stats
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div className="nav-brand">{title}</div>
          <div className="nav-pills">
            <a href="/wordle"     className={"nav-pill" + (currentPath === "/wordle"     ? " active" : "")}>Classic</a>
            <a href="/duo-wordle" className={"nav-pill" + (currentPath === "/duo-wordle" ? " active" : "")}>Duo</a>
          </div>
        </div>

        <div className="nav-side right">
          <button className="theme-btn" onClick={onToggleTheme} title="Toggle theme">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

      </div>
    </nav>
  );
}
