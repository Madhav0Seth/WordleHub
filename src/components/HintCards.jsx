import { useState } from "react";
import { countVowels } from "../utils/gameLogic";

// ─────────────────────────────────────────────────────────────────────────────
// HintCards.jsx
// Two one-time reveal hints shown above the board.
// Props:
//   target    — the secret word string
//   disabled  — true when game is over (hides reveal buttons)
// ─────────────────────────────────────────────────────────────────────────────

function HintCard({ label, value, used, onReveal, disabled }) {
  return (
    <div className={`hint-card${used ? " revealed" : ""}`}>
      <div className="hint-label">{label}</div>
      <div className={`hint-value${used ? "" : " locked"}`}>
        {used ? value : "—"}
      </div>
      <button
        className="hint-action"
        disabled={used || disabled}
        onClick={onReveal}
      >
        {used ? "revealed ✓" : "reveal hint"}
      </button>
    </div>
  );
}

export default function HintCards({ target, disabled }) {
  const [vowelUsed, setVowelUsed]   = useState(false);
  const [firstUsed, setFirstUsed]   = useState(false);

  return (
    <div className="hints-row">
      <HintCard
        label="Vowels in word"
        value={countVowels(target)}
        used={vowelUsed}
        onReveal={() => setVowelUsed(true)}
        disabled={disabled}
      />
      <HintCard
        label="First letter"
        value={target[0]}
        used={firstUsed}
        onReveal={() => setFirstUsed(true)}
        disabled={disabled}
      />
    </div>
  );
}
