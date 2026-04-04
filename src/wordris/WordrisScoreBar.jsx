// ─────────────────────────────────────────────────────────────────────────────
// WordrisScoreBar.jsx — Score, level, words cleared, next letter
import { WORDS_PER_LEVEL } from "./constants";
// ─────────────────────────────────────────────────────────────────────────────

export default function WordrisScoreBar({ score, level, wordsCleared, nextLetter }) {
  const wordsToNext = WORDS_PER_LEVEL - (wordsCleared % WORDS_PER_LEVEL);

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
      <div className="wordris-stat" style={{ minWidth: "100px" }}>
        <span className="wordris-stat-label">TO NEXT LVL</span>
        <span className="wordris-stat-value">{wordsToNext}</span>
      </div>
      <div className="wordris-stat">
        <span className="wordris-stat-label">NEXT</span>
        <span className="wordris-stat-value wordris-next">{nextLetter}</span>
      </div>
    </div>
  );
}
