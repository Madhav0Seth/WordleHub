// ─────────────────────────────────────────────────────────────────────────────
// WordrisMobileControls.jsx — Touch-friendly buttons for mobile play
// ─────────────────────────────────────────────────────────────────────────────

export default function WordrisMobileControls({ movePiece, dropOne, hardDrop }) {
  return (
    <div className="wordris-mobile-controls">
      <button className="wordris-ctrl-btn" onClick={() => movePiece(-1)}>◀</button>
      <button className="wordris-ctrl-btn" onClick={() => dropOne()}>▼</button>
      <button className="wordris-ctrl-btn wordris-ctrl-drop" onClick={() => hardDrop()}>⏬</button>
      <button className="wordris-ctrl-btn" onClick={() => movePiece(1)}>▶</button>
    </div>
  );
}
