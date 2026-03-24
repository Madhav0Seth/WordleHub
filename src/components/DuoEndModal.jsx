// ─────────────────────────────────────────────────────────────────────────────
// DuoEndModal.jsx
// End screen for Duo Wordle showing both words and solve status.
// Props:
//   gameState — "won" | "lost"
//   pair      — { wordA, wordB, sharedLetter }
//   solvedA, solvedB — boolean
//   guessCount — number of guesses used
//   stats     — { played, won, streak, best }
//   onRestart — () => void
// ─────────────────────────────────────────────────────────────────────────────

export default function DuoEndModal({ gameState, pair, solvedA, solvedB, guessCount, stats, onRestart }) {
  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <div className={`modal-result ${gameState}`} style={{ fontSize: 38 }}>
          {gameState === "won" ? "BOTH SOLVED!" : "GAME OVER"}
        </div>

        <div className="modal-word" style={{ marginBottom: 14 }}>the words were</div>

        {/* Both words with solve indicators */}
        <div className="duo-words-row">
          <div style={{ textAlign: "center" }}>
            <div className="duo-word-chip" style={{ color: solvedA ? "var(--correct)" : "#e05a4e" }}>
              {pair.wordA}
            </div>
            <div style={{ fontSize: 8, letterSpacing: 2, color: solvedA ? "var(--correct)" : "#e05a4e", textTransform: "uppercase" }}>
              {solvedA ? "solved ✓" : "missed ✗"}
            </div>
          </div>
          <div className="duo-word-sep">+</div>
          <div style={{ textAlign: "center" }}>
            <div className="duo-word-chip" style={{ color: solvedB ? "var(--correct)" : "#e05a4e" }}>
              {pair.wordB}
            </div>
            <div style={{ fontSize: 8, letterSpacing: 2, color: solvedB ? "var(--correct)" : "#e05a4e", textTransform: "uppercase" }}>
              {solvedB ? "solved ✓" : "missed ✗"}
            </div>
          </div>
        </div>

        {/* Shared letter reminder */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 8, marginBottom: 20, fontSize: 9, letterSpacing: 2,
          color: "var(--text3)", textTransform: "uppercase",
        }}>
          <span>shared letter</span>
          <span style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: 22,
            color: "var(--present)", letterSpacing: 2,
          }}>{pair.sharedLetter}</span>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat">
            <div className="stat-num">{stats.played}</div>
            <div className="stat-label">Played</div>
          </div>
          <div className="stat">
            <div className="stat-num">{winRate}%</div>
            <div className="stat-label">Win %</div>
          </div>
          <div className="stat">
            <div className="stat-num">{stats.streak}</div>
            <div className="stat-label">Streak</div>
          </div>
          <div className="stat">
            <div className="stat-num">{guessCount}</div>
            <div className="stat-label">Guesses</div>
          </div>
        </div>

        <button className="play-again-btn" onClick={onRestart}>
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
