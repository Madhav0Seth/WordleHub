// ─────────────────────────────────────────────────────────────────────────────
// globalStyles.js — full CSS for both themes, all breakpoints
// ─────────────────────────────────────────────────────────────────────────────

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');

  /* ── DARK THEME (default) ─────────────────────────────────── */
  :root {
    --bg:           #0a0a0a;
    --surface:      #111;
    --surface2:     #1a1a1a;
    --border:       #2a2a2a;
    --border2:      #3a3a3a;
    --text:         #f0ebe0;
    --text2:        #888;
    --text3:        #555;
    --text4:        #333;

    --correct:      #7eb8a0;
    --present:      #f5c518;
    --absent-bg:    #1e1e1e;
    --absent-border:#1e1e1e;
    --absent-text:  #555;

    --key-bg:            #2a2a2a;
    --key-border:        #3a3a3a;
    --key-text:          #f0ebe0;
    --key-absent-bg:     #0f0f0f;
    --key-absent-border: #0f0f0f;
    --key-absent-text:   #2a2a2a;

    --modal-bg:      #111;
    --modal-overlay: rgba(0,0,0,0.88);
    --hint-bg:       #0f0f0f;
    --hint-border:   #252525;
    --toast-bg:      #f5c518;
    --toast-text:    #0a0a0a;
    --nav-bg:        #090909;
    --nav-border:    #1e1e1e;
    --tile-bg:       #111;
    --tile-border:   #222;
    --tile-filled:   #444;
    --divider:       linear-gradient(90deg,transparent,#2a2a2a 20%,#f5c518 50%,#2a2a2a 80%,transparent);
    --glow1:         rgba(255,200,50,0.07);
    --glow2:         rgba(255,80,50,0.04);
  }

  /* ── LIGHT THEME ──────────────────────────────────────────── */
  [data-theme="light"] {
    --bg:           #f4ede0;
    --surface:      #fffcf5;
    --surface2:     #ede6d8;
    --border:       #d6cbb8;
    --border2:      #c4b8a2;
    --text:         #1c1710;
    --text2:        #6e5f4e;
    --text3:        #9c8a76;
    --text4:        #c0ae98;

    --correct:      #4d9e78;
    --present:      #c9a000;
    --absent-bg:    #d9d0bf;
    --absent-border:#ccc4b2;
    --absent-text:  #9c8a76;

    --key-bg:            #e2d9c8;
    --key-border:        #ccc4b2;
    --key-text:          #1c1710;
    --key-absent-bg:     #b8b0a0;
    --key-absent-border: #a8a090;
    --key-absent-text:   #6a6055;

    --modal-bg:      #fffcf5;
    --modal-overlay: rgba(30,20,10,0.5);
    --hint-bg:       #ede6d8;
    --hint-border:   #d6cbb8;
    --toast-bg:      #1c1710;
    --toast-text:    #f4ede0;
    --nav-bg:        #ede6d8;
    --nav-border:    #d6cbb8;
    --tile-bg:       #fffcf5;
    --tile-border:   #d6cbb8;
    --tile-filled:   #9c8a76;
    --divider:       linear-gradient(90deg,transparent,#d6cbb8 20%,#c9a000 50%,#d6cbb8 80%,transparent);
    --glow1:         rgba(160,130,60,0.07);
    --glow2:         rgba(180,90,40,0.04);
  }

  /* ── RESET & BASE ─────────────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { height: 100%; }

  body {
    background: var(--bg); color: var(--text);
    font-family: 'Space Mono', monospace;
    min-height: 100%; overflow-x: hidden;
    transition: background .3s, color .3s;
  }

  /* ── APP SHELL ────────────────────────────────────────────── */
  .app {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; background: var(--bg);
    position: relative; transition: background .3s;
  }
  .app::before {
    content: ''; position: fixed; inset: 0;
    pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% -10%, var(--glow1) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 0%  100%, var(--glow2) 0%, transparent 50%);
    transition: background .3s;
  }

  /* ── NAVBAR ───────────────────────────────────────────────── */
  .navbar {
    width: 100%; background: var(--nav-bg);
    border-bottom: 1px solid var(--nav-border);
    position: sticky; top: 0; z-index: 50;
    transition: background .3s, border-color .3s;
  }
  .navbar-inner {
    width: 100%; max-width: 1100px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 64px;
  }
  .nav-side       { width: 160px; display: flex; align-items: center; }
  .nav-side.right { justify-content: flex-end; gap: 8px; }
  .nav-brand {
    font-family: 'Bebas Neue', sans-serif; font-size: 32px;
    letter-spacing: 8px; color: var(--text); line-height: 1; transition: color .3s;
  }
  .nav-pills { display: flex; gap: 4px; margin-top: 3px; }
  .nav-pill {
    font-family: 'Space Mono', monospace; font-size: 13px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none;
    color: var(--text3); border: 1px solid transparent;
    padding: 3px 10px; transition: all .15s; border-radius: 2px;
  }
  .nav-pill:hover  { color: var(--present); border-color: var(--present); }
  .nav-pill.active { color: var(--present); border-color: var(--present); }
  .nav-btn {
    background: none; border: 1px solid var(--border); color: var(--text2);
    font-family: 'Space Mono', monospace; font-size: 13px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    padding: 6px 12px; cursor: pointer; height: 32px;
    transition: all .15s; display: flex; align-items: center; gap: 5px;
  }
  .nav-btn:hover { border-color: var(--present); color: var(--present); }
  .nav-btn svg   { width: 12px; height: 12px; fill: currentColor; flex-shrink: 0; }
  .theme-btn {
    background: none; border: 1px solid var(--border); color: var(--text2);
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all .15s; flex-shrink: 0;
  }
  .theme-btn:hover { border-color: var(--present); color: var(--present); }
  .theme-btn svg   { width: 14px; height: 14px; fill: currentColor; }

  /* ── PAGE HEADER ──────────────────────────────────────────── */
  .header {
    width: 100%; max-width: 1100px; padding: 24px 32px 0;
    position: relative; z-index: 1;
    display: flex; flex-direction: column; align-items: center;
  }
  .subtitle {
    font-size: 14px; letter-spacing: 4px; color: var(--text2); font-weight: 700;
    text-transform: uppercase; margin-bottom: 16px; transition: color .3s;
  }
  .divider {
    width: 100%; height: 1px; background: var(--divider);
    margin-bottom: 20px; transition: background .3s;
  }

  /* ── CLASSIC LAYOUT: board + keyboard centred, max readable width */
  .classic-layout {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ── HINTS ────────────────────────────────────────────────── */
  .hints-row {
    display: flex; gap: 14px; margin-bottom: 16px;
    position: relative; z-index: 1;
    width: 100%; max-width: 480px; justify-content: center;
    padding: 0 16px;
  }
  .hint-card {
    flex: 1; background: var(--hint-bg); border: 1px solid var(--hint-border);
    padding: 14px 18px; display: flex; flex-direction: column; gap: 5px;
    transition: background .3s, border-color .3s; position: relative; overflow: hidden;
    min-width: 0;
  }
  .hint-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: var(--present); transform: scaleX(0); transform-origin: left;
    transition: transform .5s cubic-bezier(.4,0,.2,1);
  }
  .hint-card.revealed::after { transform: scaleX(1); }
  .hint-label {
    font-size: 14px; letter-spacing: 1.5px; color: var(--text);
    text-transform: uppercase; transition: color .3s; font-weight: 700;
    white-space: nowrap;
  }
  .hint-value {
    font-family: 'Bebas Neue', sans-serif; font-size: 38px;
    letter-spacing: 3px; color: var(--text); line-height: 1;
    min-height: 40px; transition: color .3s;
  }
  .hint-value.locked { color: var(--text4); font-size: 28px; }
  .hint-action {
    background: none; border: none; color: var(--present);
    font-family: 'Space Mono', monospace; font-size: 13px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    cursor: pointer; padding: 0; opacity: .85; transition: opacity .15s; margin-top: 2px;
  }
  .hint-action:hover:not(:disabled) { opacity: 1; }
  .hint-action:disabled { opacity: .35; cursor: default; }

  /* ── TOAST ────────────────────────────────────────────────── */
  .message-bar {
    height: 30px; display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px; position: relative; z-index: 1;
  }
  .message {
    background: var(--toast-bg); color: var(--toast-text);
    font-size: 12px; font-weight: 700; letter-spacing: 2px;
    padding: 5px 18px; animation: slideDown .2s ease;
    transition: background .3s, color .3s;
  }
  @keyframes slideDown {
    from { opacity:0; transform:translateY(-6px); }
    to   { opacity:1; transform:translateY(0);    }
  }

  /* ── BOARD ────────────────────────────────────────────────── */
  .board {
    display: flex; flex-direction: column; gap: 7px;
    margin-bottom: 20px; position: relative; z-index: 1;
  }
  .row { display: flex; gap: 7px; }

  /* Tile size driven by CSS vars — override in .duo-board */
  .tile {
    width:  var(--tile-size, 72px);
    height: var(--tile-size, 72px);
    border: 2px solid var(--tile-border);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif;
    font-size: var(--tile-font, 38px);
    letter-spacing: 1px; color: var(--text); background: var(--tile-bg);
    transition: border-color .1s, background .3s, color .3s;
    user-select: none;
  }
  .tile.has-letter { border-color: var(--tile-filled); animation: pop .1s ease; }
  @keyframes pop {
    0%  { transform: scale(1);    }
    50% { transform: scale(1.10); }
    100%{ transform: scale(1);    }
  }
  .tile.correct { background:var(--correct);    border-color:var(--correct);        color:#fff;              animation:flipReveal .5s ease forwards; }
  .tile.present { background:var(--present);    border-color:var(--present);        color:#0a0a0a;           animation:flipReveal .5s ease forwards; }
  .tile.absent  { background:var(--absent-bg);  border-color:var(--absent-border);  color:var(--absent-text);animation:flipReveal .5s ease forwards; }
  @keyframes flipReveal {
    0%  { transform: rotateX(0);      }
    50% { transform: rotateX(-90deg); }
    100%{ transform: rotateX(0);      }
  }
  .tile.shake  { animation: shake .4s ease; }
  @keyframes shake {
    0%,100%{ transform:translateX(0);   }
    20%    { transform:translateX(-6px); }
    40%    { transform:translateX( 6px); }
    60%    { transform:translateX(-4px); }
    80%    { transform:translateX( 4px); }
  }
  .tile.bounce { animation: bounce .5s ease; }
  @keyframes bounce {
    0%,100%{ transform:translateY(0);    }
    50%    { transform:translateY(-16px); }
  }

  /* ── LEGEND ───────────────────────────────────────────────── */
  .legend {
    display: flex; gap: 22px; margin-bottom: 16px;
    position: relative; z-index: 1;
  }
  .legend-item {
    display: flex; align-items: center; gap: 7px;
    font-size: 13px; letter-spacing: 1.5px; color: var(--text2); font-weight: 700;
    text-transform: uppercase; transition: color .3s;
  }
  .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
  .legend-dot.correct { background: var(--correct); }
  .legend-dot.present { background: var(--present); }
  .legend-dot.absent  { background: var(--absent-bg); border: 1px solid var(--border2); }

  /* ── KEYBOARD ─────────────────────────────────────────────── */
  .keyboard {
    display: flex; flex-direction: column; gap: 8px; align-items: center;
    position: relative; z-index: 1; padding: 0 16px 36px;
    width: 100%; max-width: 640px;
  }
  .keyboard-row { display: flex; gap: 6px; }
  .key {
    background: var(--key-bg); border: 1.5px solid var(--key-border);
    color: var(--key-text); font-family: 'Space Mono', monospace;
    font-size: 14px; font-weight: 700; letter-spacing: .3px;
    width: 52px; height: 62px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all .15s; user-select: none;
    -webkit-tap-highlight-color: transparent;
    border-radius: 4px;
  }
  .key:active  { transform: scale(0.93); }
  .key.wide    { width: 76px; font-size: 11px; }
  .key.correct { background:var(--correct);       border-color:var(--correct);        color:#fff;    }
  .key.present { background:var(--present);       border-color:var(--present);        color:#0a0a0a; }
  .key.absent  { background:var(--key-absent-bg); border-color:var(--key-absent-border); color:var(--key-absent-text); }

  /* ── MODALS ───────────────────────────────────────────────── */
  .modal-overlay {
    position: fixed; inset: 0; background: var(--modal-overlay);
    display: flex; align-items: center; justify-content: center;
    z-index: 100; animation: fadeIn .3s ease;
  }
  @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
  .modal-box {
    background: var(--modal-bg); border: 1px solid var(--border);
    padding: 44px 56px; text-align: center;
    max-width: 420px; width: 92%; position: relative;
    animation: slideUp .35s cubic-bezier(.34,1.56,.64,1);
    transition: background .3s, border-color .3s;
  }
  @keyframes slideUp {
    from{ opacity:0; transform:translateY(28px) scale(.95); }
    to  { opacity:1; transform:translateY(0) scale(1);      }
  }
  .modal-box::before {
    content: ''; position: absolute; top:0; left:0; right:0; height: 3px;
    background: linear-gradient(90deg, var(--correct), var(--present));
  }
  .modal-close {
    position: absolute; top: 12px; right: 16px;
    background: none; border: none; color: var(--text2);
    font-size: 20px; cursor: pointer; line-height: 1; transition: color .15s;
  }
  .modal-close:hover { color: var(--text); }
  .modal-result {
    font-family: 'Bebas Neue', sans-serif; font-size: 52px;
    letter-spacing: 4px; margin-bottom: 10px; line-height: 1;
  }
  .modal-result.won  { color: var(--correct); }
  .modal-result.lost { color: #e05a4e; }
  .modal-word   { font-size: 14px; letter-spacing: 3px; color: var(--text); margin-bottom: 6px; text-transform: uppercase; transition: color .3s; font-weight: 700; }
  .modal-answer { font-family: 'Bebas Neue', sans-serif; font-size: 42px; letter-spacing: 8px; color: var(--present); margin-bottom: 26px; }

  .stats-grid  { display:flex; justify-content:center; gap:28px; margin-bottom:26px; flex-wrap: wrap; }
  .stat        { display:flex; flex-direction:column; align-items:center; gap:4px; }
  .stat-num    { font-family:'Bebas Neue',sans-serif; font-size:40px; color:var(--text); line-height:1; transition:color .3s; }
  .stat-label  { font-size:12px; font-weight: 700; letter-spacing:2px; color:var(--text2); text-transform:uppercase; transition:color .3s; }

  .stats-divider  { height:1px; background:var(--border); margin:18px 0; }
  .win-bar-wrap   { text-align:left; }
  .win-bar-title  { font-size:12px; font-weight: 700; letter-spacing:2px; color:var(--text2); text-transform:uppercase; margin-bottom:7px; transition:color .3s; }
  .win-bar        { width:100%; background:var(--border); height:5px; }
  .win-bar-fill   { height:100%; background:var(--correct); transition:width .8s ease; }
  .win-bar-labels { display:flex; justify-content:space-between; font-size:11px; font-weight: 700; letter-spacing:1px; color:var(--text2); margin-top:4px; transition:color .3s; }

  .play-again-btn {
    background: var(--present); color: #0a0a0a; border: none;
    font-family: 'Bebas Neue', sans-serif; font-size: 22px;
    letter-spacing: 4px; padding: 15px 40px; cursor: pointer;
    transition: all .2s; width: 100%; margin-top: 6px;
  }
  .play-again-btn:hover { opacity:.85; transform:translateY(-2px); }

  /* ── DUO WORDLE ────────────────────────────────────────────── */
  .shared-letter-wrap {
    display: flex; flex-direction: column; align-items: center;
    gap: 8px; margin: 0 20px; position: relative; z-index: 1;
    justify-content: center; flex-shrink: 0;
  }
  .shared-letter-label {
    font-size: 12px; font-weight: 700; letter-spacing: 2px; color: var(--text2);
    text-transform: uppercase; writing-mode: vertical-rl;
    text-orientation: mixed; transition: color .3s;
  }
  .shared-letter-tile {
    width: 62px; height: 62px; background: var(--present); border: none;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif; font-size: 40px;
    color: #0a0a0a; letter-spacing: 1px;
    box-shadow: 0 0 28px rgba(245,197,24,0.35);
    animation: sharedPulse 3s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes sharedPulse {
    0%,100% { box-shadow: 0 0 20px rgba(245,197,24,0.3); }
    50%     { box-shadow: 0 0 44px rgba(245,197,24,0.7); }
  }
  .duo-board-label {
    font-size: 16px; letter-spacing: 4px; color: var(--text);
    text-transform: uppercase; margin-bottom: 10px;
    text-align: center; font-weight: 700; transition: color .3s;
  }
  .duo-board-label.solved { color: var(--correct); }
  .duo-board-label.failed { color: #e05a4e; }

  /* Duo boards row: fills full width on desktop, centred */
  .duo-boards-row {
    display: flex; align-items: flex-start; justify-content: center;
    position: relative; z-index: 1; margin-bottom: 16px;
    padding: 0 24px; width: 100%; max-width: 1100px;
  }
  .duo-board-col {
    display: flex; flex-direction: column; align-items: center;
    flex: 1; max-width: 420px;
  }

  /* Duo tile size — smaller than classic to fit two side by side */
  .duo-board { --tile-size: 62px; --tile-font: 33px; }
  .duo-board .row  { gap: 6px; }
  .duo-board.board { gap: 6px; }

  .duo-words-row {
    display: flex; align-items: center; justify-content: center;
    gap: 14px; margin-bottom: 24px;
  }
  .duo-word-chip { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 5px; }
  .duo-word-sep  { font-size: 14px; font-weight: 700; letter-spacing: 2px; color: var(--text2); text-transform: uppercase; }

  .duo-hints-row {
    display: flex; gap: 10px; margin-bottom: 14px;
    position: relative; z-index: 1;
    width: 100%; max-width: 760px; justify-content: center; padding: 0 16px;
  }
  .duo-hints-row .hint-card { min-width: 0; }

  /* ── RESPONSIVE: tablet 768–1024px ───────────────────────── */
  @media (max-width: 1024px) {
    .navbar-inner { padding: 0 24px; }
    .header       { padding: 20px 24px 0; }

    /* Duo tiles slightly smaller */
    .duo-board { --tile-size: 58px; --tile-font: 30px; }
  }

  @media (max-width: 768px) {
    .navbar-inner { padding: 0 16px; }
    .nav-side     { width: 110px; }

    /* Classic tiles */
    .tile { --tile-size: 64px; --tile-font: 34px; }

    /* Keys */
    .key      { width: 44px; height: 56px; font-size: 13px; }
    .key.wide { width: 64px; }
    .keyboard { max-width: 100%; padding: 0 12px 28px; }

    /* Duo tiles */
    .duo-board { --tile-size: 52px; --tile-font: 27px; }
    .shared-letter-tile { width: 54px; height: 54px; font-size: 34px; }
    .shared-letter-wrap { margin: 0 12px; }
    .duo-boards-row     { padding: 0 12px; }
  }

  /* ── RESPONSIVE: mobile <520px ────────────────────────────── */
  @media (max-width: 520px) {
    .navbar-inner { padding: 0 12px; height: 58px; }
    .nav-brand    { font-size: 26px; letter-spacing: 5px; }
    .nav-side     { width: 80px; }
    .nav-btn      { padding: 5px 8px; font-size: 8px; }
    .header       { padding: 14px 12px 0; }

    /* Classic tiles — fluid, fill viewport minus gutters */
    .tile { --tile-size: calc((100vw - 76px) / 5); --tile-font: calc((100vw - 76px) / 5 * 0.52); }
    .row  { gap: 5px; }
    .board{ gap: 5px; }

    /* Keyboard — fill full width */
    .keyboard     { padding: 0 4px 20px; max-width: 100%; }
    .keyboard-row { gap: 4px; }
    .key          { width: calc((100vw - 56px) / 10); height: 52px; font-size: 12px; min-width: 26px; }
    .key.wide     { width: calc((100vw - 56px) / 10 * 1.5); }

    /* Hints */
    .hints-row        { max-width: 100%; padding: 0 12px; gap: 8px; }
    .hint-value       { font-size: 30px; }
    .hint-value.locked{ font-size: 22px; }

    /* Modal */
    .modal-box { padding: 28px 20px; }
    .stat-num  { font-size: 32px; }

    /* Duo — stack vertically */
    .duo-boards-row  { flex-direction: column; align-items: center; gap: 12px; padding: 0 10px; }
    .duo-board-col   { max-width: 100%; width: 100%; }
    .duo-board       { --tile-size: calc((100vw - 76px) / 5); --tile-font: calc((100vw - 76px) / 5 * 0.52); }
    .duo-board .row  { gap: 5px; }
    .duo-board.board { gap: 5px; }
    .shared-letter-wrap  { flex-direction: row; margin: 0; gap: 12px; }
    .shared-letter-label { writing-mode: horizontal-tb; }
    .shared-letter-tile  { width: 50px; height: 50px; font-size: 30px; }
    .duo-hints-row       { flex-wrap: wrap; padding: 0 10px; gap: 8px; }
    .duo-hints-row .hint-card { min-width: calc(50% - 6px); flex: none; }
  }

  /* ── RESPONSIVE: very small phones <360px ─────────────────── */
  @media (max-width: 360px) {
    .key   { height: 48px; font-size: 11px; }
    .tile  { --tile-size: calc((100vw - 60px) / 5); }
  }
`;
