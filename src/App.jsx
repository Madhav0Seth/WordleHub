import { useState, useEffect } from "react";

// Styles
import { globalStyles } from "./styles/globalStyles";

// Hooks
import { useGameState } from "./hooks/useGameState";

// Components
import Navbar from "./components/Navbar";
import HintCards from "./components/HintCards";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import EndModal from "./components/EndModal";
import StatsModal from "./components/StatsModal";

// ─────────────────────────────────────────────────────────────────────────────
// App.jsx
// Root component. Owns only UI-layer state (theme, modal visibility).
// All game logic lives in useGameState().
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState("dark");
  const [showEnd, setShowEnd] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const game = useGameState();

  // Apply theme to <html> element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Auto-show end modal when game finishes
  useEffect(() => {
    if (game.gameState === "won" || game.gameState === "lost") {
      // Small delay so the last tile animation completes
      const t = setTimeout(() => setShowEnd(true), 300);
      return () => clearTimeout(t);
    }
  }, [game.gameState]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <>
      {/* Inject global CSS (both themes, all animations) */}
      <style>{globalStyles}</style>

      <div className="app">

        {/* ── Navigation bar ─────────────────────────────────── */}
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenStats={() => setShowStats(true)}
        />

        {/* ── Page header ────────────────────────────────────── */}
        <div className="header">
          <div className="subtitle">guess the five-letter word</div>
          <div className="divider" />
        </div>

        {/* ── Hint cards ─────────────────────────────────────── */}
        <HintCards
          key={game.target}
          target={game.target}
          disabled={game.gameState !== "playing"}
        />

        {/* ── Toast message ──────────────────────────────────── */}
        <div className="message-bar">
          {game.message && <div className="message">{game.message}</div>}
        </div>

        {/* ── Tile board ─────────────────────────────────────── */}
        <Board
          guesses={game.guesses}
          current={game.current}
          gameState={game.gameState}
          shaking={game.shaking}
          bouncing={game.bouncing}
        />

        {/* ── Colour legend ──────────────────────────────────── */}
        <div className="legend">
          <div className="legend-item"><div className="legend-dot correct" />correct spot</div>
          <div className="legend-item"><div className="legend-dot present" />wrong spot</div>
          <div className="legend-item"><div className="legend-dot absent" />not in word</div>
        </div>

        {/* ── On-screen keyboard ─────────────────────────────── */}
        <Keyboard
          keyStates={game.keyStates}
          onKey={game.addLetter}
        />

        {/* ── End modal (win / loss) ──────────────────────────── */}
        {showEnd && (
          <EndModal
            gameState={game.gameState}
            target={game.target}
            guesses={game.guesses}
            stats={game.stats}
            onRestart={() => { game.restart(); setShowEnd(false); }}
          />
        )}

        {/* ── Stats modal ─────────────────────────────────────── */}
        {showStats && (
          <StatsModal
            stats={game.stats}
            winRate={game.winRate}
            gameState={game.gameState}
            onClose={() => setShowStats(false)}
          />
        )}

      </div>
    </>
  );
}