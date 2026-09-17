// ============================================================================
// Tactile Acoustic & Haptic Feedback Engine
// Synthesizes a crisp, subdued mechanical click using native Web Audio API.
// Zero external audio files, zero network latency, ~0.2KB memory footprint.
// Paired with navigator.vibrate for mobile haptic pulses.
// ============================================================================

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public click(type: "soft" | "crisp" | "pop" = "crisp") {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      if (type === "crisp") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(1100, now);
        osc.frequency.exponentialRampToValueAtTime(380, now + 0.019);

        gain.gain.setValueAtTime(0.018, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.019);
      } else if (type === "soft") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.018);

        gain.gain.setValueAtTime(0.012, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
      } else if (type === "pop") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.020);

        gain.gain.setValueAtTime(0.016, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.020);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.022);

      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(6);
      }
    } catch {}
  }

  public toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  public isMuted() {
    return this.muted;
  }
}

export const sound = new SoundEngine();
