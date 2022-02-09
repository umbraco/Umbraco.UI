export class Timer {
  private _timerId: number | null = null;
  private _startTime!: number;
  private _duration!: number;
  private _remaining: number | null = null;

  constructor(private _callback: Function, duration: number) {
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
      window.clearTimeout(this._timerId);
      this._timerId = null;
      if (this._remaining !== null) {
        this._remaining -= Date.now() - this._startTime;
      }
    }
  }

  public resume() {
    if (this._timerId !== null) {
      window.clearTimeout(this._timerId);
    }
    if (this._remaining === null) {
      this._remaining = this._duration;
    }

    this._startTime = Date.now();
    this._timerId = window.setTimeout(this._onComplete, this._remaining);
  }

  private _onComplete = () => {
    this._remaining = null;
    this._callback();
  };

  public destroy() {
    this.pause();
  }
}
