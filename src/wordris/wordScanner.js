// ─────────────────────────────────────────────────────────────────────────────
// wordScanner.js — Word detection, gravity, and grid utilities
// ─────────────────────────────────────────────────────────────────────────────
import { WORDRIS_DICT } from "../data/wordrisDictionary";
import { ROWS, COLS, MIN_WORD_LEN } from "./constants";

/** Create a fresh empty grid */
export function emptyGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

/**
 * Scan the entire grid for valid words (horizontal and vertical).
 * Returns an array of { cells: [{r,c}], word: string } matches.
 * Uses greedy longest-match-first to avoid overlapping matches.
 */
export function scanForWords(grid) {
  const matches = [];

  // Horizontal: each row left → right
  for (let r = 0; r < ROWS; r++) {
    const letters = grid[r].map(cell => (cell ? cell.letter : null));
    findWordsInLine(letters, (start, len, matchedWord) => {
      const cells = [];
      for (let i = 0; i < len; i++) cells.push({ r, c: start + i });
      matches.push({ cells, word: matchedWord });
    });
  }

  // Vertical: each column top → bottom
  for (let c = 0; c < COLS; c++) {
    const letters = [];
    for (let r = 0; r < ROWS; r++) {
      letters.push(grid[r][c] ? grid[r][c].letter : null);
    }
    findWordsInLine(letters, (start, len, matchedWord) => {
      const cells = [];
      for (let i = 0; i < len; i++) cells.push({ r: start + i, c });
      matches.push({ cells, word: matchedWord });
    });
  }

  return matches.filter(m => m.word.length >= MIN_WORD_LEN);
}

/**
 * Find the longest valid words in a 1D array of letters.
 * Greedy: tries longest substrings first, marks used positions.
 */
function findValidStarWord(template) {
  if (!template.includes('⭐')) {
    return WORDRIS_DICT.has(template) ? template : null;
  }
  const idx = template.indexOf('⭐');
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    const newTemplate = template.substring(0, idx) + letter + template.substring(idx + 1);
    const match = findValidStarWord(newTemplate);
    if (match) return match;
  }
  return null;
}

function findWordsInLine(letters, onMatch) {
  const n = letters.length;
  const used = new Array(n).fill(false);

  for (let len = n; len >= MIN_WORD_LEN; len--) {
    for (let start = 0; start <= n - len; start++) {
      // Skip if any cell is already claimed or empty
      let valid = true;
      for (let i = start; i < start + len; i++) {
        if (used[i] || letters[i] === null || letters[i] === '💣') { valid = false; break; }
      }
      if (!valid) continue;

      const template = letters.slice(start, start + len).join("");
      const matchedWord = findValidStarWord(template);
      if (matchedWord) {
        onMatch(start, len, matchedWord);
        for (let i = start; i < start + len; i++) used[i] = true;
      }
    }
  }
}

/**
 * Apply gravity — shift all cells down to fill empty gaps.
 * Returns a new grid.
 */
export function applyGravity(grid) {
  const newGrid = emptyGrid();
  for (let c = 0; c < COLS; c++) {
    let writeRow = ROWS - 1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (grid[r][c] !== null) {
        newGrid[writeRow][c] = { ...grid[r][c], clearing: false };
        writeRow--;
      }
    }
  }
  return newGrid;
}
