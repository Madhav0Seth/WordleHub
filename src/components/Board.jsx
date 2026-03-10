import { MAX_GUESSES, WORD_LENGTH } from "../data/constants";

// ─────────────────────────────────────────────────────────────────────────────
// Board.jsx
// Renders the 6-row tile grid.
// Props:
//   guesses    — array of { word, result[] } for submitted rows
//   current    — string being typed on the active row
//   gameState  — "playing"|"won"|"lost"
//   shaking    — boolean, shake the current row
//   bouncing   — boolean, bounce the last submitted row
// ─────────────────────────────────────────────────────────────────────────────

function Tile({ letter, state, isShaking, isBouncing, delayMs }) {
  const cls = [
    "tile",
    letter && state === "empty" ? "has-letter" : "",
    state !== "empty"  ? state   : "",
    isShaking          ? "shake"  : "",
    isBouncing         ? "bounce" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={cls} style={{ animationDelay: delayMs }}>
      {letter}
    </div>
  );
}

function BoardRow({ cells, isShaking, isBouncing, isSubmitted }) {
  return (
    <div className="row">
      {cells.map((cell, ci) => (
        <Tile
          key={ci}
          letter={cell.letter}
          state={cell.state}
          isShaking={isShaking}
          isBouncing={isBouncing}
          delayMs={isSubmitted ? `${ci * 200 + 80}ms` : isBouncing ? `${ci * 80}ms` : "0ms"}
        />
      ))}
    </div>
  );
}

export default function Board({ guesses, current, gameState, shaking, bouncing }) {
  const rows = Array.from({ length: MAX_GUESSES }, (_, ri) => {
    // Submitted row
    if (ri < guesses.length) {
      return {
        type: "submitted",
        cells: guesses[ri].result,
      };
    }
    // Active (typing) row
    if (ri === guesses.length && gameState === "playing") {
      return {
        type: "current",
        cells: Array.from({ length: WORD_LENGTH }, (_, ci) => ({
          letter: current[ci] ?? "",
          state:  "empty",
        })),
      };
    }
    // Future empty row
    return {
      type: "empty",
      cells: Array.from({ length: WORD_LENGTH }, () => ({ letter: "", state: "empty" })),
    };
  });

  const lastSubmittedRow = guesses.length - 1;

  return (
    <div className="board">
      {rows.map((row, ri) => (
        <BoardRow
          key={ri}
          cells={row.cells}
          isSubmitted={row.type === "submitted"}
          isShaking={row.type === "current" && shaking}
          isBouncing={ri === lastSubmittedRow && bouncing}
        />
      ))}
    </div>
  );
}
