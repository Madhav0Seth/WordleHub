// ─────────────────────────────────────────────────────────────────────────────
// GAME CONSTANTS
// Tweak these to change core game rules.
// ─────────────────────────────────────────────────────────────────────────────

export const MAX_GUESSES = 6;   // Number of attempts allowed
export const WORD_LENGTH = 5;   // Letters per word

// Letters that count as vowels (used by the vowel-count hint)
export const VOWELS = new Set(["A", "E", "I", "O", "U"]);

// Keyboard layout rows
export const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["⌫", "Z", "X", "C", "V", "B", "N", "M", "ENTER"],
];

// Win messages indexed by guess number (0 = solved on 1st try)
export const WIN_MESSAGES = [
  "GENIUS!",
  "MAGNIFICENT!",
  "IMPRESSIVE!",
  "SPLENDID!",
  "GREAT!",
  "PHEW!",
];
