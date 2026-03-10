// ─────────────────────────────────────────────────────────────────────────────
// globalStyles.js
// Contains the full CSS string injected via <style>.
// Edit CSS variables in :root (dark) and [data-theme="light"] to retheme.
// Animations and component styles are below the variable blocks.
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

    --key-bg:       #2a2a2a;
    --key-border:   #3a3a3a;
    --key-text:     #f0ebe0;

    /* Absent — near-black bg, barely visible text. Unmistakably dead. */
    --key-absent-bg:     #0f0f0f;
    --key-absent-border: #0f0f0f;
    --key-absent-text:   #2a2a2a;

    --modal-bg:     #111;
    --modal-overlay:rgba(0,0,0,0.88);

    --hint-bg:      #0f0f0f;
    --hint-border:  #252525;

    --toast-bg:     #f5c518;
    --toast-text:   #0a0a0a;

    --nav-bg:       #090909;
    --nav-border:   #1e1e1e;

    --tile-bg:      #111;
    --tile-border:  #222;
    --tile-filled:  #444;

    --divider:      linear-gradient(90deg,transparent,#2a2a2a 20%,#f5c518 50%,#2a2a2a 80%,transparent);
    --glow1:        rgba(255,200,50,0.07);
    --glow2:        rgba(255,80,50,0.04);
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

    --key-bg:       #e2d9c8;
    --key-border:   #ccc4b2;
    --key-text:     #1c1710;

    /* Absent keys — washed out so they read as eliminated */
    --key-absent-bg:     #b8b0a0;
    --key-absent-border: #a8a090;
    --key-absent-text:   #6a6055;

    --modal-bg:     #fffcf5;
    --modal-overlay:rgba(30,20,10,0.5);

    --hint-bg:      #ede6d8;
    --hint-border:  #d6cbb8;

    --toast-bg:     #1c1710;
    --toast-text:   #f4ede0;

    --nav-bg:       #ede6d8;
    --nav-border:   #d6cbb8;

    --tile-bg:      #fffcf5;
    --tile-border:  #d6cbb8;
    --tile-filled:  #9c8a76;

    --divider:      linear-gradient(90deg,transparent,#d6cbb8 20%,#c9a000 50%,#d6cbb8 80%,transparent);
    --glow1:        rgba(160,130,60,0.07);
    --glow2:        rgba(180,90,40,0.04);
  }

  /* ── RESET & BASE ─────────────────────────────────────────── */
  * { box-sizing:border-box; margin:0; padding:0; }

  body {
    background: var(--bg);
    color:       var(--text);
    font-family: 'Space Mono', monospace;
    min-height:  100vh;
    overflow-x:  hidden;
    transition:  background .3s, color .3s;
  }

  /* ── LAYOUT WRAPPER ───────────────────────────────────────── */
  .app {
    min-height: 100vh;
    display:    flex;
    flex-direction: column;
    align-items: center;
    background: var(--bg);
    position:   relative;
    transition: background .3s;
  }

  .app::before {
    content: '';
    position: fixed; inset: 0;
    pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% -10%, var(--glow1) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 0%   100%, var(--glow2) 0%, transparent 50%);
    transition: background .3s;
  }

  /* ── NAVBAR ───────────────────────────────────────────────── */
  .navbar {
    width: 100%;
    background: var(--nav-bg);
    border-bottom: 1px solid var(--nav-border);
    position: sticky; top: 0; z-index: 50;
    transition: background .3s, border-color .3s;
  }
  .navbar-inner {
    max-width: 520px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 16px; height: 52px;
  }
  .nav-side  { width: 110px; display: flex; align-items: center; }
  .nav-side.right { justify-content: flex-end; gap: 6px; }
  .nav-brand {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px; letter-spacing: 7px;
    color: var(--text); line-height: 1; transition: color .3s;
  }
  .nav-btn {
    background: none; border: 1px solid var(--border);
    color: var(--text2); font-family: 'Space Mono', monospace;
    font-size: 9px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; padding: 5px 9px; cursor: pointer;
    transition: all .15s; display: flex; align-items: center; gap: 5px; height: 30px;
  }
  .nav-btn:hover  { border-color: var(--present); color: var(--present); }
  .nav-btn svg    { width: 12px; height: 12px; fill: currentColor; flex-shrink: 0; }
  .theme-btn {
    background: none; border: 1px solid var(--border); color: var(--text2);
    width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all .15s; flex-shrink: 0;
  }
  .theme-btn:hover  { border-color: var(--present); color: var(--present); }
  .theme-btn svg    { width: 13px; height: 13px; fill: currentColor; }

  /* ── PAGE HEADER ──────────────────────────────────────────── */
  .header {
    width: 100%; max-width: 520px; padding: 16px 20px 0;
    position: relative; z-index: 1;
    display: flex; flex-direction: column; align-items: center;
  }
  .subtitle {
    font-size: 9px; letter-spacing: 4px; color: var(--text3);
    text-transform: uppercase; margin-bottom: 14px; transition: color .3s;
  }
  .divider {
    width: 100%; height: 1px;
    background: var(--divider); margin-bottom: 14px; transition: background .3s;
  }

  /* ── HINTS ────────────────────────────────────────────────── */
  .hints-row {
    display: flex; gap: 10px; margin-bottom: 12px;
    position: relative; z-index: 1;
    width: 100%; max-width: 370px; justify-content: center;
  }
  .hint-card {
    flex: 1; background: var(--hint-bg); border: 1px solid var(--hint-border);
    padding: 10px 14px; display: flex; flex-direction: column; gap: 4px;
    transition: background .3s, border-color .3s; position: relative; overflow: hidden;
  }
  .hint-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: var(--present); transform: scaleX(0); transform-origin: left;
    transition: transform .5s cubic-bezier(.4,0,.2,1);
  }
  .hint-card.revealed::after { transform: scaleX(1); }
  .hint-label {
    font-size: 10px; letter-spacing: 1.5px; color: var(--text2);
    text-transform: uppercase; transition: color .3s; font-weight: 700;
  }
  .hint-value {
    font-family: 'Bebas Neue', sans-serif; font-size: 36px;
    letter-spacing: 3px; color: var(--text); line-height: 1;
    min-height: 38px; transition: color .3s;
  }
  .hint-value.locked { color: var(--text4); font-size: 28px; }
  .hint-action {
    background: none; border: none; color: var(--present);
    font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    cursor: pointer; padding: 0; opacity: .85; transition: opacity .15s; margin-top: 2px;
  }
  .hint-action:hover:not(:disabled) { opacity: 1; }
  .hint-action:disabled { opacity: .35; cursor: default; }

  /* ── TOAST ────────────────────────────────────────────────── */
  .message-bar {
    height: 26px; display: flex; align-items: center; justify-content: center;
    margin-bottom: 8px; position: relative; z-index: 1;
  }
  .message {
    background: var(--toast-bg); color: var(--toast-text);
    font-size: 11px; font-weight: 700; letter-spacing: 2px;
    padding: 4px 14px; animation: slideDown .2s ease;
    transition: background .3s, color .3s;
  }
  @keyframes slideDown {
    from { opacity:0; transform:translateY(-6px); }
    to   { opacity:1; transform:translateY(0);    }
  }

  /* ── BOARD ────────────────────────────────────────────────── */
  .board {
    display: flex; flex-direction: column; gap: 6px;
    margin-bottom: 16px; position: relative; z-index: 1;
  }
  .row { display: flex; gap: 6px; }

  .tile {
    width: 62px; height: 62px; border: 2px solid var(--tile-border);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 1px;
    color: var(--text); background: var(--tile-bg);
    transition: border-color .1s, background .3s, color .3s;
    user-select: none;
  }
  .tile.has-letter { border-color: var(--tile-filled); animation: pop .1s ease; }
  @keyframes pop {
    0%  { transform: scale(1); }
    50% { transform: scale(1.10); }
    100%{ transform: scale(1); }
  }
  .tile.correct { background:var(--correct); border-color:var(--correct); color:#fff; animation:flipReveal .5s ease forwards; }
  .tile.present { background:var(--present); border-color:var(--present); color:#0a0a0a; animation:flipReveal .5s ease forwards; }
  .tile.absent  { background:var(--absent-bg); border-color:var(--absent-border); color:var(--absent-text); animation:flipReveal .5s ease forwards; }
  @keyframes flipReveal {
    0%  { transform: rotateX(0);     }
    50% { transform: rotateX(-90deg);}
    100%{ transform: rotateX(0);     }
  }
  .tile.shake { animation: shake .4s ease; }
  @keyframes shake {
    0%,100%{ transform:translateX(0);  }
    20%    { transform:translateX(-6px);}
    40%    { transform:translateX( 6px);}
    60%    { transform:translateX(-4px);}
    80%    { transform:translateX( 4px);}
  }
  .tile.bounce { animation: bounce .5s ease; }
  @keyframes bounce {
    0%,100%{ transform:translateY(0);   }
    50%    { transform:translateY(-14px);}
  }

  /* ── LEGEND ───────────────────────────────────────────────── */
  .legend {
    display: flex; gap: 18px; margin-bottom: 12px;
    position: relative; z-index: 1;
  }
  .legend-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 9px; letter-spacing: 1.5px; color: var(--text3);
    text-transform: uppercase; transition: color .3s;
  }
  .legend-dot { width: 9px; height: 9px; border-radius: 50%; }
  .legend-dot.correct { background: var(--correct); }
  .legend-dot.present { background: var(--present); }
  .legend-dot.absent  { background: var(--absent-bg); border: 1px solid var(--border2); }

  /* ── KEYBOARD ─────────────────────────────────────────────── */
  .keyboard {
    display: flex; flex-direction: column; gap: 7px; align-items: center;
    position: relative; z-index: 1; padding: 0 12px 28px;
    width: 100%; max-width: 520px;
  }
  .keyboard-row { display: flex; gap: 5px; }
  .key {
    background: var(--key-bg); border: 1.5px solid var(--key-border);
    color: var(--key-text); font-family: 'Space Mono', monospace;
    font-size: 13px; font-weight: 700; letter-spacing: .3px;
    width: 40px; height: 54px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all .15s; user-select: none;
    -webkit-tap-highlight-color: transparent;
    border-radius: 4px;
  }
  .key:active { transform: scale(0.93); }
  .key.wide   { width: 58px; font-size: 11px; }

  /* Correct — green, white text */
  .key.correct {
    background: var(--correct);
    border-color: var(--correct);
    color: #fff;
  }

  /* Present — gold, dark text */
  .key.present {
    background: var(--present);
    border-color: var(--present);
    color: #0a0a0a;
  }

  /* Absent — strongly muted so it's unmistakably "dead" vs unused */
  .key.absent {
    background: var(--key-absent-bg);
    border-color: var(--key-absent-border);
    color: var(--key-absent-text);
  }

  /* ── MODALS (shared base) ─────────────────────────────────── */
  .modal-overlay {
    position: fixed; inset: 0; background: var(--modal-overlay);
    display: flex; align-items: center; justify-content: center;
    z-index: 100; animation: fadeIn .3s ease;
  }
  @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }

  .modal-box {
    background: var(--modal-bg); border: 1px solid var(--border);
    padding: 36px 44px; text-align: center;
    max-width: 360px; width: 90%; position: relative;
    animation: slideUp .35s cubic-bezier(.34,1.56,.64,1);
    transition: background .3s, border-color .3s;
  }
  @keyframes slideUp {
    from{ opacity:0; transform:translateY(28px) scale(.95); }
    to  { opacity:1; transform:translateY(0)     scale(1);  }
  }
  .modal-box::before {
    content: ''; position: absolute; top:0; left:0; right:0; height:3px;
    background: linear-gradient(90deg, var(--correct), var(--present));
  }
  .modal-close {
    position: absolute; top:11px; right:14px;
    background: none; border: none; color: var(--text2);
    font-size: 18px; cursor: pointer; line-height:1; transition: color .15s;
  }
  .modal-close:hover { color: var(--text); }

  /* Stats grid shared between end modal and stats modal */
  .stats-grid { display:flex; justify-content:center; gap:22px; margin-bottom:22px; }
  .stat       { display:flex; flex-direction:column; align-items:center; gap:3px; }
  .stat-num   { font-family:'Bebas Neue',sans-serif; font-size:34px; color:var(--text); line-height:1; transition:color .3s; }
  .stat-label { font-size:8px; letter-spacing:2px; color:var(--text3); text-transform:uppercase; transition:color .3s; }

  .stats-divider { height:1px; background:var(--border); margin:16px 0; }

  .win-bar-wrap  { text-align:left; }
  .win-bar-title { font-size:8px; letter-spacing:2px; color:var(--text3); text-transform:uppercase; margin-bottom:6px; transition:color .3s; }
  .win-bar       { width:100%; background:var(--border); height:5px; }
  .win-bar-fill  { height:100%; background:var(--correct); transition:width .8s ease; }
  .win-bar-labels{ display:flex; justify-content:space-between; font-size:8px; letter-spacing:1px; color:var(--text3); margin-top:4px; transition:color .3s; }

  .play-again-btn {
    background: var(--present); color: #0a0a0a; border: none;
    font-family: 'Bebas Neue', sans-serif; font-size: 20px;
    letter-spacing: 4px; padding: 13px 40px; cursor: pointer;
    transition: all .2s; width: 100%; margin-top: 4px;
  }
  .play-again-btn:hover { opacity:.85; transform:translateY(-2px); }

  /* ── RESPONSIVE ───────────────────────────────────────────── */
  @media(max-width:400px){
    .tile       { width:54px; height:54px; font-size:27px; }
    .key        { width:34px; height:46px; font-size:10px; }
    .key.wide   { width:52px; }
    .modal-box  { padding:28px 24px; }
  }
`;