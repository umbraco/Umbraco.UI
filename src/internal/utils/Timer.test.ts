import { UUITimer } from './Timer.js';

describe('UUITimer', () => {
  let callback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    callback = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('fires callback after duration', () => {
    const timer = new UUITimer(callback, 1000);
    timer.start();
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledOnce();
  });

  it('does not fire if not started', () => {
    new UUITimer(callback, 1000);
    vi.advanceTimersByTime(2000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('can be paused and resumed', () => {
    const timer = new UUITimer(callback, 1000);
    timer.start();
    vi.advanceTimersByTime(400);
    timer.pause();
    vi.advanceTimersByTime(2000);
    expect(callback).not.toHaveBeenCalled();

    timer.resume();
    vi.advanceTimersByTime(599);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledOnce();
  });

  it('restart resets remaining to full duration', () => {
    const timer = new UUITimer(callback, 1000);
    timer.start();
    vi.advanceTimersByTime(800);
    timer.restart();
    vi.advanceTimersByTime(999);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledOnce();
  });

  it('destroy stops the timer', () => {
    const timer = new UUITimer(callback, 1000);
    timer.start();
    vi.advanceTimersByTime(500);
    timer.destroy();
    vi.advanceTimersByTime(2000);
    expect(callback).not.toHaveBeenCalled();
  });

  describe('setDuration while running', () => {
    it('adjusts remaining proportionally', () => {
      const timer = new UUITimer(callback, 1000);
      timer.start();
      // 500ms elapsed = 50% done, 50% remaining
      vi.advanceTimersByTime(500);

      // Double the duration: 50% of 2000 = 1000ms remaining
      timer.setDuration(2000);
      vi.advanceTimersByTime(999);
      expect(callback).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledOnce();
    });

    it('fires immediately when new remaining rounds to zero', () => {
      const timer = new UUITimer(callback, 1000);
      timer.start();
      vi.advanceTimersByTime(999);

      // Shrink duration drastically — remaining ≈ 0
      timer.setDuration(1);
      // setTimeout(fn, 0) fires on next tick
      vi.advanceTimersByTime(0);
      expect(callback).toHaveBeenCalledOnce();
    });
  });

  describe('setDuration while paused', () => {
    it('adjusts remaining proportionally', () => {
      const timer = new UUITimer(callback, 1000);
      timer.start();
      vi.advanceTimersByTime(500);
      timer.pause();

      // Paused at 50%. Double duration: remaining = 50% of 2000 = 1000
      timer.setDuration(2000);
      timer.resume();
      vi.advanceTimersByTime(999);
      expect(callback).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledOnce();
    });
  });

  describe('setDuration before start', () => {
    it('uses new duration when started', () => {
      const timer = new UUITimer(callback, 1000);
      timer.setDuration(500);
      timer.start();
      vi.advanceTimersByTime(499);
      expect(callback).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledOnce();
    });
  });
});
