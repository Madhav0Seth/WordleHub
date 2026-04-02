// ─────────────────────────────────────────────────────────────────────────────
// Wordris.jsx — Main page component (composes all Wordris sub-components)
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";
import { useWordrisState } from "./useWordrisState";
import WordrisGrid from "./WordrisGrid";
import WordrisScoreBar from "./WordrisScoreBar";
import WordrisSidebar from "./WordrisSidebar";
import WordrisMobileControls from "./WordrisMobileControls";
import WordrisGameOver from "./WordrisGameOver";
import { wordrisStyles } from "./wordrisStyles";

export default function Wordris({ theme, onToggleTheme, onOpenStats, Navbar, globalStyles }) {
  const game = useWordrisState();
  const gridRef = useRef(null);

  // Auto-focus grid for keyboard input
  useEffect(() => {
    if (gridRef.current) gridRef.current.focus();
  }, []);

  // ── Mobile swipe support ────────────────────────────────────
  const touchStart = useRef(null);

  const handleTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
      game.hardDrop();                         // tap → hard drop
    } else if (Math.abs(dx) > Math.abs(dy)) {
      game.movePiece(dx > 0 ? 1 : -1);        // horizontal swipe
    } else if (dy > 0) {
      game.dropOne();                          // swipe down
    }
    touchStart.current = null;
  };

  return (
    <>
      <style>{globalStyles}{wordrisStyles}</style>
      <div className="app">
        <Navbar
          title="WORDRIS"
          theme={theme}
          onToggleTheme={onToggleTheme}
          onOpenStats={onOpenStats}
          currentPath="/wordris"
        />

        <div className="header">
          <div className="subtitle">form words to clear • arrows to move • space to drop</div>
          <div className="divider" />
        </div>

        <WordrisScoreBar
          score={game.score}
          level={game.level}
          wordsCleared={game.wordsCleared}
          nextLetter={game.nextLetter}
        />

        <div className="message-bar">
          {game.message && <div className="message">{game.message}</div>}
        </div>

        <div className="wordris-game-area">
          <WordrisGrid
            grid={game.grid}
            piece={game.piece}
            ghostRow={game.ghostRow}
            gameState={game.gameState}
            gridRef={gridRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
          <WordrisSidebar clearedWords={game.clearedWords} />
        </div>

        <WordrisMobileControls
          movePiece={game.movePiece}
          dropOne={game.dropOne}
          hardDrop={game.hardDrop}
        />

        {game.gameState === "over" && (
          <WordrisGameOver
            score={game.score}
            level={game.level}
            wordsCleared={game.wordsCleared}
            clearedWords={game.clearedWords}
            onRestart={game.restart}
          />
        )}
      </div>
    </>
  );
}
