// ─────────────────────────────────────────────────────────────────────────────
// EndModal.jsx
// Shown after the game ends (win or loss).
// Props:
//   gameState — "won" | "lost"
//   target    — the secret word
//   guesses   — submitted guesses array (used to show guess count on win)
//   stats     — { played, won, streak, best }
//   onClose   — () => void  (dismiss modal without restarting)
//   onRestart — () => void  (play again)
// ─────────────────────────────────────────────────────────────────────────────

export default function EndModal({ gameState, target, guesses, stats, onRestart }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <div className={`modal-result ${gameState}`}>
          {gameState === "won" ? "YOU WON" : "GAME OVER"}
        </div>

        <div className="modal-word">the word was</div>
        <div className="modal-answer">{target}</div>

        <div className="stats-grid">
          <div className="stat">
            <div className="stat-num">{stats.played}</div>
            <div className="stat-label">Played</div>
          </div>
          <div className="stat">
            <div className="stat-num">{stats.won}</div>
            <div className="stat-label">Won</div>
          </div>
          <div className="stat">
            <div className="stat-num">{stats.streak}</div>
            <div className="stat-label">Streak</div>
          </div>
          {gameState === "won" && (
            <div className="stat">
              <div className="stat-num">{guesses.length}</div>
              <div className="stat-label">Guesses</div>
            </div>
          )}
        </div>

        <button className="play-again-btn" onClick={onRestart}>
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}