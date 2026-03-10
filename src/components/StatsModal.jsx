// ─────────────────────────────────────────────────────────────────────────────
// StatsModal.jsx
// Standalone stats panel accessible from the navbar at any time.
// Props:
//   stats     — { played, won, streak, best }
//   winRate   — pre-computed win percentage (0–100)
//   gameState — "playing"|"won"|"lost"  (shows "game in progress" note if playing)
//   onClose   — () => void
// ─────────────────────────────────────────────────────────────────────────────

export default function StatsModal({ stats, winRate, gameState, onClose }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Title */}
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:6, color:"var(--text)", marginBottom:4 }}>
          STATISTICS
        </div>
        <div style={{ fontSize:9, letterSpacing:2, color:"var(--text3)", textTransform:"uppercase", marginBottom:22 }}>
          your performance
        </div>

        {/* Numbers */}
        <div className="stats-grid">
          <div className="stat">
            <div className="stat-num">{stats.played}</div>
            <div className="stat-label">Played</div>
          </div>
          <div className="stat">
            <div className="stat-num">{winRate}%</div>
            <div className="stat-label">Win Rate</div>
          </div>
          <div className="stat">
            <div className="stat-num">{stats.streak}</div>
            <div className="stat-label">Streak</div>
          </div>
          <div className="stat">
            <div className="stat-num">{stats.best}</div>
            <div className="stat-label">Best</div>
          </div>
        </div>

        <div className="stats-divider" />

        {/* Win rate bar */}
        <div className="win-bar-wrap">
          <div className="win-bar-title">Win Rate</div>
          <div className="win-bar">
            <div className="win-bar-fill" style={{ width: `${winRate}%` }} />
          </div>
          <div className="win-bar-labels">
            <span>0%</span>
            <span>{winRate}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* In-progress note */}
        {gameState === "playing" && (
          <>
            <div className="stats-divider" />
            <div style={{ fontSize:9, letterSpacing:2, color:"var(--text3)", textTransform:"uppercase" }}>
              game in progress
            </div>
          </>
        )}
      </div>
    </div>
  );
}
