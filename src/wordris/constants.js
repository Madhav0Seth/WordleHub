// ─────────────────────────────────────────────────────────────────────────────
// constants.js — Wordris grid dimensions, speeds, and scoring rules
// ─────────────────────────────────────────────────────────────────────────────

export const COLS = 10;
export const ROWS = 10;
export const MIN_WORD_LEN = 3;

// Drop speed
export const BASE_SPEED = 800;     // ms per tick at level 1
export const SPEED_FACTOR = 50;    // ms faster per level
export const MIN_SPEED = 150;      // fastest possible speed

// Scoring
export const SCORE_FORMULA = (wordLength) => wordLength * wordLength * 10;
export const WORDS_PER_LEVEL = 1;  // words cleared to advance a level

// Animation timings (ms)
export const CLEAR_ANIMATION_MS = 400;
export const CHAIN_CHECK_DELAY = 200;
export const LOCK_DELAY = 50;
