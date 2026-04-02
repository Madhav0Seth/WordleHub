# WordleHub — Modular Word Games Collection

A central hub for word games built entirely with React and Vite. It features **Classic Wordle**, a split-screen **Duo Wordle**, and **Wordris** — an arcade-style Tetris word game.

## Project Structure

```
src/
├── App.jsx                         ← Root: Routing across games, theme, modal state
│
├── wordris/                        ← WORDRIS (Tetris Word Game)
│   ├── Wordris.jsx                 ← Main Wordris page component
│   ├── useWordrisState.js          ← Core game hook (timers, physics, chains)
│   ├── wordScanner.js              ← Bidirectional dictionary scanning + gravity
│   ├── letterPool.js               ← Tetris "Bag" Randomizer (Vowels: 3x, Common: 2x, Uncommon: 1x)
│   ├── constants.js                ← Grid size (12x12), speeds, scoring
│   ├── wordrisStyles.js            ← Wordris-specific CSS (theme integrated)
│   └── (UI Components)             ← WordrisGrid, WordrisScoreBar, WordrisSidebar, etc.
│
├── data/
│   ├── words.js                    ← Wordle ANSWERS + EXTRA_VALID lists
│   ├── wordrisDictionary.js        ← ~3000 valid 3-8 letter words for Wordris
│   └── constants.js                ← Global constants (MAX_GUESSES, KEYBOARD_ROWS)
│
├── utils/
│   └── gameLogic.js                ← Pure Wordle logic (evaluateGuess, buildKeyStates, etc.)
│
├── hooks/
│   ├── useGameState.js             ← Classic/Duo Wordle logic and keyboard listeners
│   └── useSound.js                 ← Web Audio API wrapper
│
├── styles/
│   └── globalStyles.js             ← Base CSS, dark/light mode root variables, animations
│
└── components/                     ← SHARED WORDLE UI
    ├── Navbar.jsx                  ← Top nav with routing pills
    ├── Board.jsx                   ← Wordle tile grid
    ├── Keyboard.jsx                ← On-screen keyboard with visual key states
    ├── HintCards.jsx               ← Game hints
    └── (Modals)                    ← EndModal, StatsModal
```

## Game Modes

| Mode | Route | Description |
|------|-------|-------------|
| **Classic** | `/` | Standard 6x5 Wordle with hints, statistics, and sound effects. |
| **Duo Wordle** | `/duo-wordle` | Double the boards! Type once to guess on two side-by-side boards simultaneously. |
| **Wordris** | `/wordris` | Single letters drop into a 12x12 grid. Form 3+ letter words horizontally/vertically to match them, score points, and trigger gravity chains. |

## What to Edit Where

| I want to…                            | Edit this file               |
|---------------------------------------|------------------------------|
| **Wordris**                           | |
| Change Wordris letter frequencies     | `wordris/letterPool.js`      |
| Adjust Wordris drop speed/grid size   | `wordris/constants.js`       |
| Add custom Wordris words              | `data/wordrisDictionary.js`  |
| Fix Wordris chain/gravity bugs        | `wordris/wordScanner.js`     |
| Change Wordris UI styles              | `wordris/wordrisStyles.js`   |
| **Wordle / Duo**                      | |
| Add / remove Wordle answers           | `data/words.js`              |
| Change Number of Guesses / Length     | `data/constants.js`          |
| Adjust Wordle evaluation algorithms   | `utils/gameLogic.js`         |
| Change tile / keyboard sizes          | `styles/globalStyles.js`     |
| Retheme overall colours               | `styles/globalStyles.js`     |

## Getting Started

```bash
npm install
npm run dev
```

No heavy UI libraries or physics engines needed — just React + Vite.
