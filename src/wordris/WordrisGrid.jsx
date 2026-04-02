// ─────────────────────────────────────────────────────────────────────────────
// WordrisGrid.jsx — Renders the 8×8 game grid
// ─────────────────────────────────────────────────────────────────────────────
import { ROWS, COLS } from "./constants";

export default function WordrisGrid({ grid, piece, ghostRow, gameState, onTouchStart, onTouchEnd, gridRef }) {
  return (
    <div
      className="wordris-grid"
      ref={gridRef}
      tabIndex={0}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {Array.from({ length: ROWS }, (_, r) =>
        Array.from({ length: COLS }, (_, c) => {
          const cell = grid[r][c];
          const isPiece = piece && piece.row === r && piece.col === c;
          const isGhost = ghostRow !== null && piece &&
            ghostRow === r && piece.col === c && !isPiece;

          let className = "wordris-cell";
          let letter = "";

          if (isPiece) {
            className += " wordris-cell-active";
            letter = piece.letter;
          } else if (cell) {
            className += cell.clearing ? " wordris-cell-clearing" : " wordris-cell-placed";
            letter = cell.letter;
          } else if (isGhost) {
            className += " wordris-cell-ghost";
            letter = piece.letter;
          }

          return (
            <div key={`${r}-${c}`} className={className}>
              {letter}
            </div>
          );
        })
      )}
    </div>
  );
}
