const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

function getTileState(guess, target, index) {
    const letter = guess[index];
    if (letter === target[index]) return "correct";
    if (target.includes(letter)) return "present";
    return "absent";
}

function getGuessResult(guess, target) {
    return Array.from({ length: WORD_LENGTH }, (_, i) => ({
        letter: guess[i],
        state: getTileState(guess, target, i),
    }));
}

export { MAX_GUESSES, WORD_LENGTH, getGuessResult };
