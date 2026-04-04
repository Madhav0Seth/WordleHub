// ─────────────────────────────────────────────────────────────────────────────
// useWordrisState.js — Main game state hook
//
// DESIGN RULE: NO side effects (setTimeout, spawn calls, scoring) inside
// any setState updater function. All reads go through refs, all writes
// update refs immediately + call setState for React rendering.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback, useRef } from "react";
import { ROWS, COLS, BASE_SPEED, SPEED_FACTOR, MIN_SPEED, SCORE_FORMULA, WORDS_PER_LEVEL, CLEAR_ANIMATION_MS, CHAIN_CHECK_DELAY, LOCK_DELAY } from "./constants";
import { randomLetter } from "./letterPool";
import { emptyGrid, scanForWords, applyGravity } from "./wordScanner";

export function useWordrisState() {
  const [grid, setGrid]               = useState(emptyGrid);
  const [piece, setPiece]             = useState(null);
  const [nextLetter, setNextLetter]   = useState(randomLetter);
  const [score, setScore]             = useState(0);
  const [level, setLevel]             = useState(1);
  const [wordsCleared, setWordsCleared] = useState(0);
  const [gameState, setGameState]     = useState("playing");
  const [clearedWords, setClearedWords] = useState([]);
  const [message, setMessage]         = useState("");

  // ── Refs — single source of truth for all timer / callback reads ──
  const gridRef       = useRef(grid);
  const pieceRef      = useRef(piece);
  const stateRef      = useRef(gameState);
  const nextLetterRef = useRef(nextLetter);
  const isLockedRef   = useRef(false);     // prevents double-lock
  gridRef.current       = grid;
  pieceRef.current      = piece;
  stateRef.current      = gameState;
  nextLetterRef.current = nextLetter;

  // ── Helpers ──────────────────────────────────────────────────
  const showMsg = useCallback((msg, ms = 1500) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), ms);
  }, []);

  // ── Spawn — always reads nextLetter from ref ────────────────
  const spawnPiece = useCallback(() => {
    const col = Math.floor(COLS / 2);
    const letter = nextLetterRef.current;
    const newNext = randomLetter();

    nextLetterRef.current = newNext;
    setNextLetter(newNext);

    if (gridRef.current[0][col] !== null) {
      setGameState("over");
      return;
    }

    const p = { letter, col, row: 0 };
    pieceRef.current = p;
    setPiece(p);
  }, []);

  const spawnPieceRef = useRef(spawnPiece);
  spawnPieceRef.current = spawnPiece;

  // ── Word detection + clearing + gravity chains ──────────────
  const checkAndClear = useCallback((chainDepth) => {
    const currentGrid = gridRef.current;
    const matches = scanForWords(currentGrid);

    if (matches.length === 0) {
      setTimeout(() => {
        if (stateRef.current !== "over") {
          setGameState("playing");
          spawnPieceRef.current();
        }
      }, 100);
      return;
    }

    const g = currentGrid.map(row => row.map(c => c ? { ...c } : null));
    const cellKeys = new Set();
    const wordsFound = [];

    matches.forEach(m => {
      wordsFound.push(m.word);
      m.cells.forEach(({ r, c }) => {
        cellKeys.add(`${r},${c}`);
        if (g[r][c]) g[r][c].clearing = true;
      });
    });

    gridRef.current = g;
    setGrid(g);

    const multiplier = chainDepth + 1;
    let pts = 0;
    wordsFound.forEach(w => { pts += SCORE_FORMULA(w.length); });
    pts *= multiplier;

    setScore(s => s + pts);
    setWordsCleared(wc => {
      const next = wc + wordsFound.length;
      setLevel(Math.floor(next / WORDS_PER_LEVEL) + 1);
      return next;
    });

    if (multiplier > 1) {
      showMsg(`${multiplier}× COMBO! +${pts}`, 1800);
    } else {
      showMsg(`${wordsFound.join(", ")} +${pts}`, 1500);
    }

    setClearedWords(cw => [...wordsFound, ...cw].slice(0, 15));
    setGameState("clearing");

    setTimeout(() => {
      const cleared = gridRef.current.map(row => row.map(c => c ? { ...c } : null));
      cellKeys.forEach(key => {
        const [r, c] = key.split(",").map(Number);
        cleared[r][c] = null;
      });
      const afterGravity = applyGravity(cleared);
      gridRef.current = afterGravity;
      setGrid(afterGravity);
      setTimeout(() => checkAndClearRef.current(chainDepth + 1), CHAIN_CHECK_DELAY);
    }, CLEAR_ANIMATION_MS);
  }, [showMsg]);

  const checkAndClearRef = useRef(checkAndClear);
  checkAndClearRef.current = checkAndClear;

  // ── Lock piece into grid ────────────────────────────────────
  // Guard prevents double-lock from Strict Mode or rapid calls
  const lockPiece = useCallback(() => {
    if (isLockedRef.current) return;
    const p = pieceRef.current;
    if (!p) return;
    isLockedRef.current = true;

    const g = gridRef.current.map(row => row.map(c => c ? { ...c } : null));
    g[p.row][p.col] = { letter: p.letter, clearing: false };

    // --- BOMB EXPLOSION LOGIC ---
    if (p.letter === '💣') {
      const cellKeys = new Set();
      let tilesDestroyed = 0;

      for (let r = Math.max(0, p.row - 1); r <= Math.min(ROWS - 1, p.row + 1); r++) {
        for (let c = Math.max(0, p.col - 1); c <= Math.min(COLS - 1, p.col + 1); c++) {
          cellKeys.add(`${r},${c}`);
          if (g[r][c] && (r !== p.row || c !== p.col)) {
            tilesDestroyed++;
          }
          if (g[r][c]) {
            g[r][c].clearing = true;
          }
        }
      }

      gridRef.current = g;
      setGrid(g);
      pieceRef.current = null;
      setPiece(null);
      setGameState("clearing");

      const pts = tilesDestroyed * 10;
      if (tilesDestroyed > 0) {
        showMsg(`BOMB! +${pts}`, 1500);
        setScore(s => s + pts);
      } else {
        showMsg(`BOMB!`, 1500);
      }

      setTimeout(() => {
        const cleared = gridRef.current.map(row => row.map(c => c ? { ...c } : null));
        cellKeys.forEach(key => {
          const [r, c] = key.split(",").map(Number);
          cleared[r][c] = null;
        });
        const afterGravity = applyGravity(cleared);
        gridRef.current = afterGravity;
        setGrid(afterGravity);

        isLockedRef.current = false;
        setTimeout(() => checkAndClearRef.current(0), CHAIN_CHECK_DELAY);
      }, CLEAR_ANIMATION_MS);

      return;
    }
    // --- END BOMB EXPLOSION LOGIC ---

    gridRef.current = g;
    setGrid(g);

    pieceRef.current = null;
    setPiece(null);

    setTimeout(() => {
      isLockedRef.current = false;
      checkAndClearRef.current(0);
    }, LOCK_DELAY);
  }, [showMsg]);

  // ── Movement — NO side effects in any updater ───────────────
  const movePiece = useCallback((dir) => {
    const p = pieceRef.current;
    if (!p || stateRef.current !== "playing") return;
    const nc = p.col + dir;
    if (nc < 0 || nc >= COLS) return;
    if (gridRef.current[p.row][nc] !== null) return;
    const np = { ...p, col: nc };
    pieceRef.current = np;
    setPiece(np);
  }, []);

  const dropOne = useCallback(() => {
    const p = pieceRef.current;
    if (!p || stateRef.current !== "playing") return;
    const nr = p.row + 1;
    if (nr >= ROWS || gridRef.current[nr][p.col] !== null) {
      lockPiece();
      return;
    }
    const np = { ...p, row: nr };
    pieceRef.current = np;
    setPiece(np);
  }, [lockPiece]);

  const hardDrop = useCallback(() => {
    const p = pieceRef.current;
    if (!p || stateRef.current !== "playing") return;
    let nr = p.row;
    while (nr + 1 < ROWS && gridRef.current[nr + 1][p.col] === null) nr++;
    const np = { ...p, row: nr };
    pieceRef.current = np;
    setPiece(np);
    lockPiece();
  }, [lockPiece]);

  // ── Auto-drop tick ──────────────────────────────────────────
  useEffect(() => {
    if (gameState !== "playing") return;
    const speed = Math.max(MIN_SPEED, BASE_SPEED - (level - 1) * SPEED_FACTOR);
    const id = setInterval(dropOne, speed);
    return () => clearInterval(id);
  }, [gameState, level, dropOne]);

  // ── Keyboard ────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (stateRef.current !== "playing") return;
      switch (e.key) {
        case "ArrowLeft":  e.preventDefault(); movePiece(-1); break;
        case "ArrowRight": e.preventDefault(); movePiece(1);  break;
        case "ArrowDown":  e.preventDefault(); dropOne();     break;
        case " ":          e.preventDefault(); hardDrop();    break;
        default: break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [movePiece, dropOne, hardDrop]);

  // ── Initial spawn ──────────────────────────────────────────
  useEffect(() => {
    spawnPieceRef.current();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Restart ────────────────────────────────────────────────
  const restart = useCallback(() => {
    isLockedRef.current = false;
    const previewLetter = randomLetter();
    nextLetterRef.current = previewLetter;
    gridRef.current = emptyGrid();

    setGrid(emptyGrid());
    setPiece(null);
    setNextLetter(previewLetter);
    setScore(0);
    setLevel(1);
    setWordsCleared(0);
    setGameState("playing");
    setClearedWords([]);
    setMessage("");

    setTimeout(() => {
      spawnPieceRef.current();
    }, 100);
  }, []);

  // ── Ghost piece (landing preview) ──────────────────────────
  let ghostRow = null;
  if (piece && gameState === "playing") {
    ghostRow = piece.row;
    while (ghostRow + 1 < ROWS && grid[ghostRow + 1][piece.col] === null) ghostRow++;
  }

  return {
    grid, piece, nextLetter, ghostRow,
    score, level, wordsCleared, gameState,
    clearedWords, message,
    movePiece, dropOne, hardDrop, restart,
  };
}
