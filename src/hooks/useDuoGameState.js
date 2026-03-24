import { useState, useEffect, useCallback } from "react";
import { ANSWERS, ALL_VALID } from "../data/words";
import { MAX_GUESSES, WORD_LENGTH, WIN_MESSAGES } from "../data/constants";
import { evaluateGuess, buildKeyStates, pickRandomAnswer } from "../utils/gameLogic";
import { useSound } from "./useSound";

function pickDuoPair(answers) {
  const shuffled = [...answers].sort(() => Math.random() - 0.5);
  for (let i = 0; i < shuffled.length; i++) {
    const wordA = shuffled[i];
    for (let j = i + 1; j < Math.min(i + 80, shuffled.length); j++) {
      const wordB = shuffled[j];
      for (let pa = 0; pa < WORD_LENGTH; pa++) {
        for (let pb = 0; pb < WORD_LENGTH; pb++) {
          if (wordA[pa] === wordB[pb]) {
            return { wordA, wordB, sharedLetter: wordA[pa], posA: pa, posB: pb };
          }
        }
      }
    }
  }
  return { wordA: "CRANE", wordB: "CRAFT", sharedLetter: "C", posA: 0, posB: 0 };
}

// Accepts stats + onStatsUpdate from App so stats persist across route changes
export function useDuoGameState({ stats, onStatsUpdate }) {
  const [pair,       setPair]       = useState(() => pickDuoPair(ANSWERS));
  const [guessesA,   setGuessesA]   = useState([]);
  const [solvedA,    setSolvedA]    = useState(false);
  const [guessesB,   setGuessesB]   = useState([]);
  const [solvedB,    setSolvedB]    = useState(false);
  const [current,    setCurrent]    = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [gameState,  setGameState]  = useState("playing");
  const [message,    setMessage]    = useState("");
  const [shaking,    setShaking]    = useState(false);
  const [bouncing,   setBouncing]   = useState(false);

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

    const newCount = guessCount + 1;
    setGuessCount(newCount);

    const resultA = evaluateGuess(current, pair.wordA);
    const resultB = evaluateGuess(current, pair.wordB);
    const nowSolvedA = solvedA || current === pair.wordA;
    const nowSolvedB = solvedB || current === pair.wordB;

    if (!solvedA) { setGuessesA(g => [...g, { word: current, result: resultA }]); if (nowSolvedA) setSolvedA(true); }
    if (!solvedB) { setGuessesB(g => [...g, { word: current, result: resultB }]); if (nowSolvedB) setSolvedB(true); }

    setCurrent("");
    resultA.forEach(({ state }, i) => sounds.reveal(state, i));

    const bothSolved    = nowSolvedA && nowSolvedB;
    const outOfGuesses  = newCount >= MAX_GUESSES;

    if (bothSolved) {
      setBouncing(true);
      showMsg(WIN_MESSAGES[newCount - 1] ?? "INCREDIBLE!", 2400);
      setTimeout(() => sounds.win(), 1100);
      setTimeout(() => {
        setBouncing(false);
        setGameState("won");
        onStatsUpdate(s => ({
          played: s.played + 1, won: s.won + 1,
          streak: s.streak + 1, best: Math.max(s.best, s.streak + 1),
        }));
      }, 2200);
    } else if (outOfGuesses) {
      setTimeout(() => sounds.lose(), 500);
      const missed = [!nowSolvedA && pair.wordA, !nowSolvedB && pair.wordB].filter(Boolean).join(" & ");
      showMsg(missed, 3200);
      setTimeout(() => {
        setGameState("lost");
        onStatsUpdate(s => ({ ...s, played: s.played + 1, streak: 0 }));
      }, 2400);
    } else if (nowSolvedA && !solvedA) {
      showMsg("WORD 1 SOLVED! 🎯", 1600);
    } else if (nowSolvedB && !solvedB) {
      showMsg("WORD 2 SOLVED! 🎯", 1600);
    }
  }, [current, guessCount, solvedA, solvedB, pair, sounds, showMsg, triggerShake, onStatsUpdate]);

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

  const keyStates = (() => {
    const merged = buildKeyStates(guessesA);
    const fromB  = buildKeyStates(guessesB);
    Object.entries(fromB).forEach(([letter, state]) => {
      const cur = merged[letter];
      if (state === "correct")                           merged[letter] = "correct";
      else if (state === "present" && cur !== "correct") merged[letter] = "present";
      else if (!cur)                                     merged[letter] = state;
    });
    return merged;
  })();

  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  const restart = () => {
    setPair(pickDuoPair(ANSWERS));
    setGuessesA([]); setGuessesB([]);
    setSolvedA(false); setSolvedB(false);
    setCurrent(""); setGuessCount(0);
    setGameState("playing"); setMessage("");
    setShaking(false); setBouncing(false);
  };

  return {
    pair, guessesA, guessesB, solvedA, solvedB, guessCount,
    current, gameState, message, shaking, bouncing,
    keyStates, winRate,
    addLetter, restart,
  };
}
