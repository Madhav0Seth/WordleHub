// ─────────────────────────────────────────────────────────────────────────────
// WordrisGameOver.jsx — Game-over overlay with final stats
// Reuses existing modal-overlay / modal-box / stats-grid styles.
// ─────────────────────────────────────────────────────────────────────────────

export default function WordrisGameOver({ score, level, wordsCleared, clearedWords, onRestart }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onRestart()}>
      <div className="modal-box">
        <div className="modal-result lost">GAME OVER</div>
        <div className="modal-word">final score</div>
        <div className="modal-answer" style={{ color: "var(--present)" }}>
          {score.toLocaleString()}
        </div>

        <div className="stats-grid">
          <div className="stat">
            <div className="stat-num">{level}</div>
            <div className="stat-label">Level</div>
          </div>
          <div className="stat">
            <div className="stat-num">{wordsCleared}</div>
            <div className="stat-label">Words</div>
          </div>
        </div>

        {clearedWords.length > 0 && (
          <>
            <div className="stats-divider" />
            <div style={{
              fontSize: 12, letterSpacing: 2, color: "var(--text2)",
              textTransform: "uppercase", marginBottom: 8, fontWeight: 700,
            }}>
              words found
            </div>
            <div className="wordris-final-words">
              {[...new Set(clearedWords)].slice(0, 20).map((w, i) => (
                <span key={i} className="wordris-final-chip">{w}</span>
              ))}
            </div>
          </>
        )}

        <button className="play-again-btn" onClick={onRestart}>PLAY AGAIN</button>
      </div>
    </div>
  );
}
