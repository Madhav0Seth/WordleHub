import { useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// useSound
// Encapsulates the Web Audio API. Returns a stable `sounds` object with
// named methods. AudioContext is lazy-created on first use (browser policy).
//
// To adjust volumes, frequencies or disable sounds entirely, edit here only.
// ─────────────────────────────────────────────────────────────────────────────
export function useSound() {
  const ctxRef = useRef(null);

  function getCtx() {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  }

  /**
   * Play a single oscillator tone.
   * @param {number} freq    - Frequency in Hz
   * @param {OscillatorType} type  - "sine" | "square" | "triangle" | "sawtooth"
   * @param {number} dur     - Duration in seconds
   * @param {number} vol     - Peak gain (0–1)
   * @param {number} delay   - Seconds from now to start
   */
  function tone(freq, type, dur, vol = 0.12, delay = 0) {
    try {
      const ac = getCtx();
      const osc  = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = type;
      osc.frequency.value = freq;
      const t = ac.currentTime + delay;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    } catch {
      // Silently ignore — audio may not be available in all environments
    }
  }

  const sounds = {
    /** Subtle click when a letter key is pressed */
    keyPress() {
      tone(700, "sine", 0.05, 0.07);
    },

    /** Harsh buzz for invalid word / not enough letters */
    invalid() {
      [200, 175, 155].forEach((f, i) => tone(f, "square", 0.10, 0.09, i * 0.07));
    },

    /**
     * Tile reveal sound, called once per tile.
     * @param {"correct"|"present"|"absent"} state
     * @param {number} tileIndex  - 0–4, used to stagger timing
     */
    reveal(state, tileIndex) {
      const delay = tileIndex * 0.2;
      if (state === "correct") {
        tone(523, "sine", 0.22, 0.12, delay);
        tone(659, "sine", 0.18, 0.10, delay + 0.06);
      } else if (state === "present") {
        tone(440, "triangle", 0.14, 0.09, delay);
      } else {
        tone(220, "sine",     0.10, 0.07, delay);
      }
    },

    /** Victory chord on winning the game */
    win() {
      [523, 659, 784, 1047].forEach((f, i) =>
        tone(f, "sine", 0.30, 0.14, i * 0.13)
      );
    },

    /** Descending swell on losing the game */
    lose() {
      [300, 250, 200].forEach((f, i) =>
        tone(f, "sawtooth", 0.22, 0.10, i * 0.16)
      );
    },
  };

  return sounds;
}
