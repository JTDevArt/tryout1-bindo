let soundEnabled = true;

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  if (!soundEnabled && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (!soundEnabled && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

export function speak(text: string): void {
  if (!soundEnabled || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 1.05;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  } catch {
    // speech synthesis fallback
  }
}

export function playTone(freq: number, dur: number, type: OscillatorType = 'sine'): void {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur);
  } catch {
    // audio fallback
  }
}

export function playCorrect(): void {
  playTone(523, 0.15, 'sine');
  setTimeout(() => playTone(659, 0.15, 'sine'), 100);
  setTimeout(() => playTone(784, 0.25, 'sine'), 200);
  setTimeout(() => speak('Benar sekali! Bagus!'), 350);
}

export function playWrong(): void {
  playTone(400, 0.18, 'square');
  setTimeout(() => playTone(300, 0.25, 'square'), 140);
  setTimeout(() => speak('Kurang tepat. Coba perhatikan lagi!'), 380);
}

export function isSoundMuted(): boolean {
  return !soundEnabled;
}

export function setSoundMuted(muted: boolean): void {
  setSoundEnabled(!muted);
}

export function initAudio(): void {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    }
  } catch {
    // audio context init fallback
  }
}

export function playChime(): void {
  playTone(587.33, 0.2, 'sine');
  setTimeout(() => playTone(880, 0.35, 'sine'), 150);
}

export function playSuccess(): void {
  playTone(523.25, 0.12, 'sine');
  setTimeout(() => playTone(659.25, 0.12, 'sine'), 100);
  setTimeout(() => playTone(783.99, 0.15, 'sine'), 200);
  setTimeout(() => playTone(1046.5, 0.3, 'sine'), 320);
}
