export class UUITimer {
  private _timerId: number | null = null;
  private _startTime!: number;
  private _duration!: number;
  private _remaining: number | null = null;

  constructor(
    private readonly _callback: (...args: unknown[]) => void,
    duration: number,
  ) {
    this.setDuration(duration);
  }

  public setDuration(duration: number) {
    const oldDuration = this._duration;
    this._duration = duration;

    if (this._timerId !== null) {
      // Adjust remaining proportionally: if 40% elapsed at old duration,
      // keep 60% remaining at new duration
      const elapsed = Date.now() - this._startTime;
      const oldRemaining = (this._remaining ?? oldDuration) - elapsed;
      const ratio = oldDuration > 0 ? oldRemaining / oldDuration : 1;
      this._remaining = Math.max(0, ratio * duration);
      this.resume();
    } else if (this._remaining !== null) {
      // Paused: adjust remaining proportionally
      const ratio = oldDuration > 0 ? this._remaining / oldDuration : 1;
      this._remaining = Math.max(0, ratio * duration);
    }
  }

  /** starts the timer */
  public start() {
    if (this._timerId === null) {
      this.resume();
    }
  }

  /** restarts the timer by setting remaining time to duration. */
  public restart() {
    this._remaining = this._duration;
    this.resume();
  }

  public pause() {
    if (this._timerId !== null) {
      globalThis.clearTimeout(this._timerId);
      this._timerId = null;
      if (this._remaining !== null) {
        this._remaining -= Date.now() - this._startTime;
      }
    }
  }

  public resume() {
    if (this._timerId !== null) {
      globalThis.clearTimeout(this._timerId);
    }
    this._remaining ??= this._duration;

    this._startTime = Date.now();
    this._timerId = globalThis.setTimeout(this._onComplete, this._remaining);
  }

  private readonly _onComplete = () => {
    this._remaining = null;
    this._callback();
  };

  public destroy() {
    this.pause();
  }
}
