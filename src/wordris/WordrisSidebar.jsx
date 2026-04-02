// ─────────────────────────────────────────────────────────────────────────────
// WordrisSidebar.jsx — Recently cleared words list
// ─────────────────────────────────────────────────────────────────────────────

export default function WordrisSidebar({ clearedWords }) {
  return (
    <div className="wordris-sidebar">
      <div className="wordris-sidebar-title">CLEARED</div>
      {clearedWords.length === 0 && (
        <div className="wordris-sidebar-empty">no words yet</div>
      )}
      {clearedWords.map((word, i) => (
        <div
          key={`${word}-${i}`}
          className={`wordris-word-chip${i === 0 ? " wordris-word-new" : ""}`}
        >
          {word}
        </div>
      ))}
    </div>
  );
}
