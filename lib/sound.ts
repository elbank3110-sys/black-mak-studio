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
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);

        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      } else if (type === "soft") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.04);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      } else if (type === "pop") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.05);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);

      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(10);
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
