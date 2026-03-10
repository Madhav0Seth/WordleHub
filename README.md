# Wordle — Modular React Project

## Project Structure

```
src/
├── App.jsx                         ← Root: assembles all components, owns theme & modal visibility
│
├── data/
│   ├── words.js                    ← ANSWERS list + EXTRA_VALID list + ALL_VALID Set
│   └── constants.js                ← MAX_GUESSES, WORD_LENGTH, KEYBOARD_ROWS, WIN_MESSAGES, VOWELS
│
├── utils/
│   └── gameLogic.js                ← Pure functions: evaluateGuess, buildKeyStates, countVowels, pickRandomAnswer
│
├── hooks/
│   ├── useGameState.js             ← All game state: guesses, current input, game flow, keyboard listener
│   └── useSound.js                 ← Web Audio API wrapper: keyPress, invalid, reveal, win, lose
│
├── styles/
│   └── globalStyles.js             ← Full CSS string: :root dark vars, [data-theme="light"] vars, all animations
│
└── components/
    ├── Navbar.jsx                  ← Top bar: brand title, Stats button, theme toggle
    ├── HintCards.jsx               ← Two one-time reveal hints (vowel count, first letter)
    ├── Board.jsx                   ← 6×5 tile grid
    ├── Keyboard.jsx                ← On-screen keyboard with coloured key states
    ├── EndModal.jsx                ← Win/lose result overlay with stats
    └── StatsModal.jsx              ← Standalone stats panel (opened from navbar)
```

## What to edit where

| I want to…                            | Edit this file               |
|---------------------------------------|------------------------------|
| Add / remove answer words             | `data/words.js` → `ANSWERS`  |
| Add more valid guess words            | `data/words.js` → `EXTRA_VALID` |
| Change number of guesses / word length| `data/constants.js`          |
| Change win messages                   | `data/constants.js`          |
| Change keyboard layout                | `data/constants.js`          |
| Fix a scoring/evaluation bug          | `utils/gameLogic.js`         |
| Adjust sound effects                  | `hooks/useSound.js`          |
| Change game flow / animations         | `hooks/useGameState.js`      |
| Retheme colours (dark or light)       | `styles/globalStyles.js`     |
| Change tile / keyboard sizes          | `styles/globalStyles.js`     |
| Edit the navbar                       | `components/Navbar.jsx`      |
| Edit the hint cards                   | `components/HintCards.jsx`   |
| Edit how tiles render                 | `components/Board.jsx`       |
| Edit keyboard appearance              | `components/Keyboard.jsx`    |
| Edit the end-of-game modal            | `components/EndModal.jsx`    |
| Edit the stats modal                  | `components/StatsModal.jsx`  |
| Add new modals / rearrange layout     | `App.jsx`                    |

## Getting started

```bash
npm create vite@latest wordle-app -- --template react
cd wordle-app
# Replace src/ with the files in this package
npm install
npm run dev
```

No extra dependencies needed — only React + Vite.
