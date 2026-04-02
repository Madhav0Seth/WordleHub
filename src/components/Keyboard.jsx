import { KEYBOARD_ROWS } from "../data/constants";

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard.jsx
// On-screen keyboard. Each key reflects the best known state for that letter.
// Props:
//   keyStates — { [letter]: "correct"|"present"|"absent" }
//   onKey     — (key: string) => void
// ─────────────────────────────────────────────────────────────────────────────

function Key({ label, state, onKey }) {
  const isWide = label.length > 1; // ENTER and ⌫
  const cls = ["key", isWide ? "wide" : "", state ?? ""].filter(Boolean).join(" ");

  return (
    <div className={cls} onClick={() => onKey(label)}>
      {label}
    </div>
  );
}

export default function Keyboard({ keyStates, onKey }) {
  return (
    <div className="keyboard">
      {KEYBOARD_ROWS.map((row, ri) => (
        <div className="keyboard-row" key={ri}>
          {row.map((key) => (
            <Key
              key={key}
              label={key}
              state={keyStates[key]}
              onKey={onKey}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
