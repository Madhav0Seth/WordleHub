import { useState, useEffect, useCallback } from "react";
import { ANSWERS, ALL_VALID } from "../data/words";
import { MAX_GUESSES, WORD_LENGTH, WIN_MESSAGES } from "../data/constants";
import { evaluateGuess, buildKeyStates, pickRandomAnswer } from "../utils/gameLogic";
import { useSound } from "./useSound";

// ─────────────────────────────────────────────────────────────────────────────
// useGameState
// Now accepts `stats` and `onStatsUpdate` from the parent (App.jsx)
// so stats survive route changes.
// ─────────────────────────────────────────────────────────────────────────────
export function useGameState({ stats, onStatsUpdate }) {
  const [target,    setTarget]    = useState(() => pickRandomAnswer(ANSWERS));
  const [guesses,   setGuesses]   = useState([]);
  const [current,   setCurrent]   = useState("");
  const [gameState, setGameState] = useState("playing");
  const [message,   setMessage]   = useState("");
  const [shaking,   setShaking]   = useState(false);
  const [bouncing,  setBouncing]  = useState(false);

  const sounds = useSound();

  const showMsg = useCallback((msg, dur = 1800) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), dur);
  }, []);

  const triggerShake = useCallback(() => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  }, []);

  const submitGuess = useCallback(() => {
    if (current.length < WORD_LENGTH) {
      showMsg("NOT ENOUGH LETTERS"); triggerShake(); sounds.invalid(); return;
    }
    if (!ALL_VALID.has(current)) {
      showMsg("NOT IN WORD LIST"); triggerShake(); sounds.invalid(); return;
    }

    const result     = evaluateGuess(current, target);
    const newGuesses = [...guesses, { word: current, result }];
    setGuesses(newGuesses);
    setCurrent("");

    result.forEach(({ state }, i) => sounds.reveal(state, i));

    const won  = current === target;
    const lost = !won && newGuesses.length === MAX_GUESSES;

    if (won) {
      setBouncing(true);
      showMsg(WIN_MESSAGES[newGuesses.length - 1] ?? "NICE!", 2200);
      setTimeout(() => sounds.win(), 1100);
      setTimeout(() => {
        setBouncing(false);
        setGameState("won");
        onStatsUpdate(s => ({
          played: s.played + 1, won: s.won + 1,
          streak: s.streak + 1, best: Math.max(s.best, s.streak + 1),
        }));
      }, 2100);
    } else if (lost) {
      setTimeout(() => sounds.lose(), 500);
      showMsg(target, 3000);
      setTimeout(() => {
        setGameState("lost");
        onStatsUpdate(s => ({ ...s, played: s.played + 1, streak: 0 }));
      }, 2200);
    }
  }, [current, guesses, target, sounds, showMsg, triggerShake, onStatsUpdate]);

  const addLetter = useCallback((letter) => {
    if (gameState !== "playing") return;
    if (letter === "ENTER") { submitGuess(); return; }
    if (letter === "⌫")     { setCurrent(c => c.slice(0, -1)); return; }
    if (current.length < WORD_LENGTH) {
      sounds.keyPress();
      setCurrent(c => c + letter);
    }
  }, [current, gameState, submitGuess, sounds]);

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Enter")          addLetter("ENTER");
      else if (e.key === "Backspace") addLetter("⌫");
      else if (/^[a-zA-Z]$/.test(e.key)) addLetter(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [addLetter]);

  const keyStates = buildKeyStates(guesses);
  const winRate   = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  const restart = () => {
    setTarget(pickRandomAnswer(ANSWERS));
    setGuesses([]); setCurrent("");
    setGameState("playing"); setMessage("");
    setShaking(false); setBouncing(false);
  };

  return {
    target, guesses, current, gameState, message,
    shaking, bouncing, keyStates, winRate,
    addLetter, restart,
  };
}
