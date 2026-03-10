import { WORD_LENGTH, VOWELS } from "../data/constants";

// ─────────────────────────────────────────────────────────────────────────────
// evaluateGuess
// Returns an array of { letter, state } objects for a submitted guess.
// state is one of: "correct" | "present" | "absent"
//
// Handles duplicate letters correctly — a letter is only marked "present"
// as many times as it genuinely appears in the target.
// ─────────────────────────────────────────────────────────────────────────────
export function evaluateGuess(guess, target) {
  const result = Array(WORD_LENGTH).fill("absent");
  const targetArr = target.split("");
  const guessArr  = guess.split("");
  const used = Array(WORD_LENGTH).fill(false);

  // Pass 1 — mark exact matches
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] === targetArr[i]) {
      result[i] = "correct";
      used[i]   = true;
    }
  }

  // Pass 2 — mark letters present elsewhere
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!used[j] && guessArr[i] === targetArr[j]) {
        result[i] = "present";
        used[j]   = true;
        break;
      }
    }
  }

  return guessArr.map((letter, i) => ({ letter, state: result[i] }));
}

// ─────────────────────────────────────────────────────────────────────────────
// countVowels — used by the vowel-count hint card
// ─────────────────────────────────────────────────────────────────────────────
export function countVowels(word) {
  return word.split("").filter(l => VOWELS.has(l)).length;
}

// ─────────────────────────────────────────────────────────────────────────────
// buildKeyStates
// Derives the best-known state for every letter from all submitted guesses.
// Priority: correct > present > absent
// ─────────────────────────────────────────────────────────────────────────────
export function buildKeyStates(guesses) {
  const states = {};
  guesses.forEach(({ result }) => {
    result.forEach(({ letter, state }) => {
      const cur = states[letter];
      if (state === "correct")                          states[letter] = "correct";
      else if (state === "present" && cur !== "correct") states[letter] = "present";
      else if (!cur)                                    states[letter] = "absent";
    });
  });
  return states;
}

// ─────────────────────────────────────────────────────────────────────────────
// pickRandomAnswer — pick a random word from the answer list
// ─────────────────────────────────────────────────────────────────────────────
export function pickRandomAnswer(answers) {
  return answers[Math.floor(Math.random() * answers.length)];
}
