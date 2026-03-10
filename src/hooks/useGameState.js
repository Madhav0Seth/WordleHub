import { useState, useEffect, useCallback } from "react";
import { ANSWERS, ALL_VALID } from "../data/words";
import { MAX_GUESSES, WORD_LENGTH, WIN_MESSAGES } from "../data/constants";
import { evaluateGuess, buildKeyStates, pickRandomAnswer } from "../utils/gameLogic";
import { useSound } from "./useSound";

// ─────────────────────────────────────────────────────────────────────────────
// useGameState
// Single hook that owns all game logic and state.
// Components read from the returned object; they write via the returned actions.
// ─────────────────────────────────────────────────────────────────────────────
export function useGameState() {
  const [target, setTarget] = useState(() => pickRandomAnswer(ANSWERS));
  const [guesses, setGuesses] = useState([]);   // [{ word, result[] }]
  const [current, setCurrent] = useState("");    // letters typed so far
  const [gameState, setGameState] = useState("playing"); // "playing"|"won"|"lost"
  const [message, setMessage] = useState("");
  const [shaking, setShaking] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const [stats, setStats] = useState({ played: 0, won: 0, streak: 0, best: 0 });

  const sounds = useSound();

  // ── helpers ────────────────────────────────────────────────────────────────
  const showMsg = useCallback((msg, dur = 1800) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), dur);
  }, []);

  const triggerShake = useCallback(() => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  }, []);

  // ── submitGuess ────────────────────────────────────────────────────────────
  const submitGuess = useCallback(() => {
    if (current.length < WORD_LENGTH) {
      showMsg("NOT ENOUGH LETTERS");
      triggerShake();
      sounds.invalid();
      return;
    }
    if (!ALL_VALID.has(current)) {
      showMsg("NOT IN WORD LIST");
      triggerShake();
      sounds.invalid();
      return;
    }

    const result = evaluateGuess(current, target);
    const newGuesses = [...guesses, { word: current, result }];
    setGuesses(newGuesses);
    setCurrent("");

    // Play per-tile reveal sounds
    result.forEach(({ state }, i) => sounds.reveal(state, i));

    const won = current === target;
    const lost = !won && newGuesses.length === MAX_GUESSES;

    if (won) {
      setBouncing(true);
      showMsg(WIN_MESSAGES[newGuesses.length - 1] ?? "NICE!", 2200);
      setTimeout(() => sounds.win(), 1100);
      setTimeout(() => {
        setBouncing(false);
        setGameState("won");
        setStats(s => ({
          played: s.played + 1,
          won: s.won + 1,
          streak: s.streak + 1,
          best: Math.max(s.best, s.streak + 1),
        }));
      }, 2100);
    } else if (lost) {
      setTimeout(() => sounds.lose(), 500);
      showMsg(target, 3000);
      setTimeout(() => {
        setGameState("lost");
        setStats(s => ({ ...s, played: s.played + 1, streak: 0 }));
      }, 2200);
    }
  }, [current, guesses, target, sounds, showMsg, triggerShake]);

  // ── addLetter — handles single letter, backspace, or enter ────────────────
  const addLetter = useCallback((letter) => {
    if (gameState !== "playing") return;
    if (letter === "ENTER") { submitGuess(); return; }
    if (letter === "⌫") { setCurrent(c => c.slice(0, -1)); return; }
    if (current.length < WORD_LENGTH) {
      sounds.keyPress();
      setCurrent(c => c + letter);
    }
  }, [current, gameState, submitGuess, sounds]);

  // ── physical keyboard listener ─────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Enter") addLetter("ENTER");
      else if (e.key === "Backspace") addLetter("⌫");
      else if (/^[a-zA-Z]$/.test(e.key)) addLetter(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [addLetter]);

  // ── derived values ─────────────────────────────────────────────────────────
  const keyStates = buildKeyStates(guesses);
  const currentRow = guesses.length; // index of the row being typed
  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  return {
    // State
    target, guesses, current, gameState, message,
    shaking, bouncing, stats, keyStates, currentRow, winRate,
    // Actions
    addLetter,
    restart: () => {
      setTarget(pickRandomAnswer(ANSWERS));
      setGuesses([]);
      setCurrent("");
      setGameState("playing");
      setMessage("");
      setShaking(false);
      setBouncing(false);
    },
  };
}