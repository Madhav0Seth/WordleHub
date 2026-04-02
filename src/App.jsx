import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { globalStyles } from "./styles/globalStyles";
import { useGameState } from "./hooks/useGameState";
import { useDuoGameState } from "./hooks/useDuoGameState";

import Navbar from "./components/Navbar";
import HintCards from "./components/HintCards";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import EndModal from "./components/EndModal";
import StatsModal from "./components/StatsModal";
import DuoHintCards from "./components/DuoHintCards";
import DuoEndModal from "./components/DuoEndModal";
import Wordris from "./wordris/Wordris";
import { MAX_GUESSES } from "./data/constants";

// ─────────────────────────────────────────────────────────────────────────────
// Shared initial values — read from localStorage on first load
// ─────────────────────────────────────────────────────────────────────────────
const STATS_KEY = "wordle_stats_v1";
const THEME_KEY = "wordle_theme_v1";

function loadStats() {
  try {
    const s = localStorage.getItem(STATS_KEY);
    return s ? JSON.parse(s) : { played: 0, won: 0, streak: 0, best: 0 };
  } catch { return { played: 0, won: 0, streak: 0, best: 0 }; }
}

function loadTheme() {
  try { return localStorage.getItem(THEME_KEY) || "dark"; }
  catch { return "dark"; }
}

// ─────────────────────────────────────────────────────────────────────────────
// ClassicWordle — /wordle
// ─────────────────────────────────────────────────────────────────────────────
function ClassicWordle({ theme, onToggleTheme, stats, onStatsUpdate }) {
  const [showEnd, setShowEnd] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const game = useGameState({ stats, onStatsUpdate });

  useEffect(() => {
    if (game.gameState === "won" || game.gameState === "lost") {
      const t = setTimeout(() => setShowEnd(true), 300);
      return () => clearTimeout(t);
    }
  }, [game.gameState]);

  // Scroll to bottom on load/restart to show Board and Keyboard directly. 
  // Hints will be accessible by scrolling up.
  useEffect(() => {
    const t = setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    }, 50);
    return () => clearTimeout(t);
  }, [game.target]);

  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  return (
    <>
      <style>{globalStyles}</style>
      <div className="app">

        <Navbar
          title="WORDLE"
          theme={theme}
          onToggleTheme={onToggleTheme}
          onOpenStats={() => setShowStats(true)}
          currentPath="/wordle"
        />

        <div className="header">
          <div className="subtitle">guess the five-letter word</div>
          <div className="divider" />
        </div>

        <div className="classic-layout">
          <HintCards
            key={game.target}
            target={game.target}
            disabled={game.gameState !== "playing"}
          />

          <div className="message-bar">
            {game.message && <div className="message">{game.message}</div>}
          </div>

          <Board
            guesses={game.guesses}
            current={game.current}
            gameState={game.gameState}
            shaking={game.shaking}
            bouncing={game.bouncing}
          />

          <div className="legend">
            <div className="legend-item"><div className="legend-dot correct" />correct spot</div>
            <div className="legend-item"><div className="legend-dot present" />wrong spot</div>
            <div className="legend-item"><div className="legend-dot absent" />not in word</div>
          </div>

          <Keyboard keyStates={game.keyStates} onKey={game.addLetter} />
        </div>

        {showEnd && (
          <EndModal
            gameState={game.gameState}
            target={game.target}
            guesses={game.guesses}
            stats={stats}
            onRestart={() => { game.restart(); setShowEnd(false); }}
          />
        )}

        {showStats && (
          <StatsModal
            stats={stats}
            winRate={winRate}
            gameState={game.gameState}
            onClose={() => setShowStats(false)}
          />
        )}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DuoWordle — /duo-wordle
// ─────────────────────────────────────────────────────────────────────────────
function DuoWordle({ theme, onToggleTheme, stats, onStatsUpdate }) {
  const [showEnd, setShowEnd] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const game = useDuoGameState({ stats, onStatsUpdate });

  useEffect(() => {
    if (game.gameState === "won" || game.gameState === "lost") {
      const t = setTimeout(() => setShowEnd(true), 400);
      return () => clearTimeout(t);
    }
  }, [game.gameState]);

  // Scroll to bottom on load/restart to show Duo Boards and Keyboard directly.
  // Hints will be accessible by scrolling up.
  useEffect(() => {
    const t = setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    }, 50);
    return () => clearTimeout(t);
  }, [game.pair]);

  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
  const remaining = MAX_GUESSES - game.guessCount;

  return (
    <>
      <style>{globalStyles}</style>
      <div className="app">

        <Navbar
          title="DUO WORDLE"
          theme={theme}
          onToggleTheme={onToggleTheme}
          onOpenStats={() => setShowStats(true)}
          currentPath="/duo-wordle"
        />

        <div className="header">
          <div className="subtitle">solve both words in 6 shared guesses</div>
          <div className="divider" />
        </div>

        <DuoHintCards
          key={game.pair.wordA + game.pair.wordB}
          wordA={game.pair.wordA}
          wordB={game.pair.wordB}
          disabled={game.gameState !== "playing"}
        />

        <div className="message-bar">
          {game.message && <div className="message">{game.message}</div>}
        </div>

        <div className="duo-boards-row">
          <div className="duo-board-col">
            <div className={`duo-board-label${game.solvedA ? " solved" : ""}`}>
              {game.solvedA ? "SOLVED ✓" : "WORD 1"}
            </div>
            <div className="duo-board">
              <Board
                guesses={game.guessesA}
                current={game.solvedA ? "" : game.current}
                gameState={game.solvedA ? "won" : game.gameState}
                shaking={game.shaking && !game.solvedA}
                bouncing={game.bouncing && game.solvedA}
              />
            </div>
          </div>

          {/* Shared letter badge */}
          <div className="shared-letter-wrap">
            <span className="shared-letter-label">shared</span>
            <div className="shared-letter-tile">{game.pair.sharedLetter}</div>
            <span className="shared-letter-label">letter</span>
          </div>

          <div className="duo-board-col">
            <div className={`duo-board-label${game.solvedB ? " solved" : ""}`}>
              {game.solvedB ? "SOLVED ✓" : "WORD 2"}
            </div>
            <div className="duo-board">
              <Board
                guesses={game.guessesB}
                current={game.solvedB ? "" : game.current}
                gameState={game.solvedB ? "won" : game.gameState}
                shaking={game.shaking && !game.solvedB}
                bouncing={game.bouncing && game.solvedB}
              />
            </div>
          </div>
        </div>

        <div style={{
          fontSize: 14, fontWeight: 700, letterSpacing: 2, color: "var(--text2)",
          textTransform: "uppercase", marginBottom: 10,
          position: "relative", zIndex: 1,
        }}>
          {game.gameState === "playing"
            ? `${remaining} guess${remaining !== 1 ? "es" : ""} remaining`
            : game.gameState === "won" ? "both solved!" : "out of guesses"
          }
        </div>

        <div className="legend">
          <div className="legend-item"><div className="legend-dot correct" />correct spot</div>
          <div className="legend-item"><div className="legend-dot present" />wrong spot</div>
          <div className="legend-item"><div className="legend-dot absent" />not in word</div>
        </div>

        <Keyboard keyStates={game.keyStates} onKey={game.addLetter} />

        {showEnd && (
          <DuoEndModal
            gameState={game.gameState}
            pair={game.pair}
            solvedA={game.solvedA}
            solvedB={game.solvedB}
            guessCount={game.guessCount}
            stats={stats}
            onRestart={() => { game.restart(); setShowEnd(false); }}
          />
        )}

        {showStats && (
          <StatsModal
            stats={stats}
            winRate={winRate}
            gameState={game.gameState}
            onClose={() => setShowStats(false)}
          />
        )}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WordrisPage — /wordris
// ─────────────────────────────────────────────────────────────────────────────
function WordrisPage({ theme, onToggleTheme }) {
  const [showStats, setShowStats] = useState(false);

  return (
    <Wordris
      theme={theme}
      onToggleTheme={onToggleTheme}
      onOpenStats={() => setShowStats(true)}
      Navbar={Navbar}
      globalStyles={globalStyles}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// App — owns theme + stats, persists both to localStorage
// Both pages share the same stats pool and theme.
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState(loadTheme);
  const [stats, setStats] = useState(loadStats);

  // Persist theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch { }
  }, [theme]);

  // Persist stats whenever they change
  useEffect(() => {
    try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch { }
  }, [stats]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  // Stable callback so hooks don't re-create on every render
  const handleStatsUpdate = useCallback((updater) => {
    setStats(s => updater(s));
  }, []);

  const sharedProps = {
    theme,
    onToggleTheme: toggleTheme,
    stats,
    onStatsUpdate: handleStatsUpdate,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/wordle" replace />} />
        <Route path="/wordle" element={<ClassicWordle {...sharedProps} />} />
        <Route path="/duo-wordle" element={<DuoWordle    {...sharedProps} />} />
        <Route path="/wordris" element={<WordrisPage theme={sharedProps.theme} onToggleTheme={sharedProps.onToggleTheme} />} />
        <Route path="*" element={<Navigate to="/wordle" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
