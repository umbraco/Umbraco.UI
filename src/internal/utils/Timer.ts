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
    this._duration = duration;
    // TODO: Should calculate true offset of _remaining
    if (this._timerId !== null) {
      this.restart();
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
