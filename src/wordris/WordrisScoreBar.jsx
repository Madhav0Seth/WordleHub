// ─────────────────────────────────────────────────────────────────────────────
// WordrisScoreBar.jsx — Score, level, words cleared, next letter
// ─────────────────────────────────────────────────────────────────────────────

export default function WordrisScoreBar({ score, level, wordsCleared, nextLetter }) {
  return (
    <div className="wordris-score-bar">
      <div className="wordris-stat">
        <span className="wordris-stat-label">SCORE</span>
        <span className="wordris-stat-value">{score.toLocaleString()}</span>
      </div>
      <div className="wordris-stat">
        <span className="wordris-stat-label">LEVEL</span>
        <span className="wordris-stat-value">{level}</span>
      </div>
      <div className="wordris-stat">
        <span className="wordris-stat-label">WORDS</span>
        <span className="wordris-stat-value">{wordsCleared}</span>
      </div>
      <div className="wordris-stat">
        <span className="wordris-stat-label">NEXT</span>
        <span className="wordris-stat-value wordris-next">{nextLetter}</span>
      </div>
    </div>
  );
}
