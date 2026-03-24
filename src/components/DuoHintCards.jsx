import { useState } from "react";
import { countVowels } from "../utils/gameLogic";

// ─────────────────────────────────────────────────────────────────────────────
// DuoHintCards.jsx
// Four hint cards: vowel count + first letter for each of the two words.
// Reuses the same hint-card CSS from globalStyles.
// Props:
//   wordA, wordB — the two target words
//   disabled     — true when game is over
// ─────────────────────────────────────────────────────────────────────────────

function HintCard({ label, value, used, onReveal, disabled }) {
  return (
    <div className={`hint-card${used ? " revealed" : ""}`}>
      <div className="hint-label">{label}</div>
      <div className={`hint-value${used ? "" : " locked"}`} style={{ fontSize: used ? 28 : 22 }}>
        {used ? value : "—"}
      </div>
      <button
        className="hint-action"
        disabled={used || disabled}
        onClick={onReveal}
      >
        {used ? "✓" : "reveal"}
      </button>
    </div>
  );
}

export default function DuoHintCards({ wordA, wordB, disabled }) {
  const [a1, setA1] = useState(false); // word A vowels
  const [a2, setA2] = useState(false); // word A first letter
  const [b1, setB1] = useState(false); // word B vowels
  const [b2, setB2] = useState(false); // word B first letter

  return (
    <div className="duo-hints-row">
      <HintCard label="W1 Vowels"  value={countVowels(wordA)} used={a1} onReveal={() => setA1(true)} disabled={disabled} />
      <HintCard label="W1 First"   value={wordA[0]}           used={a2} onReveal={() => setA2(true)} disabled={disabled} />
      <HintCard label="W2 Vowels"  value={countVowels(wordB)} used={b1} onReveal={() => setB1(true)} disabled={disabled} />
      <HintCard label="W2 First"   value={wordB[0]}           used={b2} onReveal={() => setB2(true)} disabled={disabled} />
    </div>
  );
}
