// ─────────────────────────────────────────────────────────────────────────────
// wordrisStyles.js — All CSS specific to the Wordris game mode
// Uses the same CSS custom properties as the rest of the app for theme support.
// ─────────────────────────────────────────────────────────────────────────────

export const wordrisStyles = `

  /* ── GAME AREA (grid + sidebar side by side) ─────────────── */
  .wordris-game-area {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 24px;
    position: relative;
    z-index: 1;
    padding: 0 16px;
    margin-bottom: 16px;
  }

  /* ── 12×12 GRID ──────────────────────────────────────────── */
  .wordris-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 4px;
    width: 100%;
    max-width: 650px;
    aspect-ratio: 1;
    outline: none;
    background: var(--surface);
    border: 2px solid var(--border);
    padding: 6px;
    transition: background .3s, border-color .3s;
  }

  /* ── CELLS ───────────────────────────────────────────────── */
  .wordris-cell {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(18px, 4vw, 32px);
    letter-spacing: 1px;
    color: var(--text4);
    background: var(--tile-bg);
    border: 1.5px solid var(--tile-border);
    user-select: none;
    transition: background .15s, border-color .15s, color .15s;
  }

  .wordris-cell-placed {
    color: var(--text);
    background: var(--surface2);
    border-color: var(--border2);
  }

  .wordris-cell-active {
    color: #0a0a0a;
    background: var(--present);
    border-color: var(--present);
    animation: wordrisPop .12s ease;
    box-shadow: 0 0 12px rgba(245, 197, 24, 0.4);
  }

  .wordris-cell-ghost {
    color: var(--text4);
    border-color: var(--present);
    border-style: dashed;
    opacity: 0.4;
  }

  .wordris-cell-clearing {
    color: #fff;
    background: var(--correct);
    border-color: var(--correct);
    animation: wordrisClear .4s ease forwards;
  }

  @keyframes wordrisPop {
    0%   { transform: scale(1);   }
    50%  { transform: scale(1.15); }
    100% { transform: scale(1);   }
  }

  @keyframes wordrisClear {
    0%   { transform: scale(1);   opacity: 1; }
    50%  { transform: scale(1.2); opacity: 0.8; }
    100% { transform: scale(0);   opacity: 0; }
  }

  /* ── SCORE BAR ───────────────────────────────────────────── */
  .wordris-score-bar {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
    margin-bottom: 10px;
    padding: 0 16px;
  }

  .wordris-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    min-width: 64px;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 8px 16px;
    transition: background .3s, border-color .3s;
  }

  .wordris-stat-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--text2);
    text-transform: uppercase;
  }

  .wordris-stat-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    line-height: 1;
    color: var(--text);
    letter-spacing: 2px;
  }

  .wordris-next {
    color: var(--present);
  }

  /* ── SIDEBAR (cleared words) ─────────────────────────────── */
  .wordris-sidebar {
    width: 140px;
    flex-shrink: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 12px;
    max-height: 500px;
    overflow-y: auto;
    transition: background .3s, border-color .3s;
  }

  .wordris-sidebar-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    color: var(--text2);
    text-transform: uppercase;
    margin-bottom: 10px;
    text-align: center;
  }

  .wordris-sidebar-empty {
    font-size: 10px;
    letter-spacing: 1px;
    color: var(--text4);
    text-align: center;
    text-transform: uppercase;
  }

  .wordris-word-chip {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--text);
    background: var(--surface2);
    border: 1px solid var(--border);
    padding: 4px 8px;
    margin-bottom: 4px;
    text-align: center;
    text-transform: uppercase;
    transition: background .3s;
  }

  .wordris-word-new {
    color: var(--correct);
    border-color: var(--correct);
    animation: wordrisWordFlash .6s ease;
  }

  @keyframes wordrisWordFlash {
    0%   { background: var(--correct); color: #fff; }
    100% { background: var(--surface2); }
  }

  /* ── MOBILE CONTROLS ─────────────────────────────────────── */
  .wordris-mobile-controls {
    display: none;         /* hidden on desktop */
    gap: 10px;
    justify-content: center;
    padding: 0 16px 24px;
    position: relative;
    z-index: 1;
  }

  .wordris-ctrl-btn {
    width: 60px;
    height: 52px;
    background: var(--key-bg);
    border: 1.5px solid var(--key-border);
    color: var(--key-text);
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    transition: all .15s;
    -webkit-tap-highlight-color: transparent;
  }

  .wordris-ctrl-btn:active {
    transform: scale(0.92);
  }

  .wordris-ctrl-drop {
    background: var(--present);
    border-color: var(--present);
    color: #0a0a0a;
  }

  /* ── GAME OVER — final words list ────────────────────────── */
  .wordris-final-words {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .wordris-final-chip {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    padding: 3px 8px;
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text);
    text-transform: uppercase;
  }

  /* ── RESPONSIVE: tablet ──────────────────────────────────── */
  @media (max-width: 768px) {
    .wordris-grid { max-width: 440px; }
    .wordris-sidebar { width: 120px; }
    .wordris-cell { font-size: clamp(14px, 3vw, 24px); }
  }

  /* ── RESPONSIVE: mobile ──────────────────────────────────── */
  @media (max-width: 520px) {
    .wordris-game-area {
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .wordris-grid {
      max-width: 100%;
      width: calc(100vw - 32px);
    }
    .wordris-sidebar {
      width: 100%;
      max-height: 120px;
      flex-direction: row;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 8px;
      justify-content: center;
    }
    .wordris-sidebar-title {
      width: 100%;
    }
    .wordris-mobile-controls {
      display: flex;       /* show on mobile */
    }
    .wordris-stat {
      padding: 6px 12px;
    }
    .wordris-stat-value {
      font-size: 22px;
    }
  }
`;
