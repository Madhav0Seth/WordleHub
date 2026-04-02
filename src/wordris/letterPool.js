// ─────────────────────────────────────────────────────────────────────────────
// letterPool.js — Modular weighted letter distribution
//
// Uses a "Tetris-style Bag Randomizer" to guarantee perfect distribution!
// ─────────────────────────────────────────────────────────────────────────────

export const LETTER_WEIGHTS = {
  // Vowels — 3×
  A: 3, E: 3, I: 3, O: 3, U: 3,

  // Common consonants — 2×
  R: 2, T: 2, P: 2, S: 2, D: 2,
  F: 2, H: 2, K: 2, L: 2, B: 2,
  C: 2, N: 2, M: 2, G: 2, W: 2,

  // Uncommon — 1×
  Q: 1, Y: 1, X: 1, Z: 1, J: 1, V: 1,
};

const POOL = [];
for (const [letter, weight] of Object.entries(LETTER_WEIGHTS)) {
  for (let i = 0; i < weight; i++) POOL.push(letter);
}

// Fisher-Yates shuffle
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let currentBag = [];

/** Pull a random letter from the shuffled bag */
export function randomLetter() {
  if (currentBag.length === 0) {
    currentBag = shuffle(POOL);
  }
  return currentBag.pop();
}
