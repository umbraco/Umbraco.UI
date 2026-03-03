import { describe, it, expect } from 'vitest';
import {
  parseColor,
  hslaToRgb,
  hslaToHex,
  hslaToRgbString,
  hslaToHslString,
  hslaToHsv,
  type HslaColor,
} from './color.js';

describe('parseColor', () => {
  describe('hex strings', () => {
    it('parses 6-digit hex', () => {
      expect(parseColor('#ff0000')).toEqual({ h: 0, s: 100, l: 50, a: 1 });
    });
    it('parses 3-digit hex shorthand', () => {
      expect(parseColor('#f00')).toEqual({ h: 0, s: 100, l: 50, a: 1 });
    });
    it('parses 8-digit hex with alpha', () => {
      const result = parseColor('#ff000080');
      expect(result?.h).toBe(0);
      expect(result?.s).toBe(100);
      expect(result?.l).toBe(50);
      expect(result?.a).toBeCloseTo(0.5, 1);
    });
  });

  describe('rgb strings', () => {
    it('parses rgb()', () => {
      expect(parseColor('rgb(255, 0, 0)')).toEqual({ h: 0, s: 100, l: 50, a: 1 });
    });
    it('parses rgba() with alpha', () => {
      expect(parseColor('rgba(255, 0, 0, 0.5)')).toEqual({ h: 0, s: 100, l: 50, a: 0.5 });
    });
    it('parses black', () => {
      expect(parseColor('rgb(0, 0, 0)')).toEqual({ h: 0, s: 0, l: 0, a: 1 });
    });
    it('parses white', () => {
      expect(parseColor('rgb(255, 255, 255)')).toEqual({ h: 0, s: 0, l: 100, a: 1 });
    });
  });

  describe('hsl strings', () => {
    it('parses hsl()', () => {
      expect(parseColor('hsl(0, 100%, 50%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 });
    });
    it('parses hsla() with alpha', () => {
      expect(parseColor('hsla(120, 50%, 60%, 0.8)')).toEqual({ h: 120, s: 50, l: 60, a: 0.8 });
    });
  });

  describe('hsv strings', () => {
    it('parses hsv() and converts to HSL', () => {
      // hsv(0, 100%, 100%) = fully saturated red = hsl(0, 100%, 50%)
      expect(parseColor('hsv(0, 100%, 100%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 });
    });
    it('parses hsv(0, 0%, 0%) as black', () => {
      expect(parseColor('hsv(0, 0%, 0%)')).toEqual({ h: 0, s: 0, l: 0, a: 1 });
    });
  });

  describe('CSS named colors', () => {
    it('parses "red"', () => {
      expect(parseColor('red')).toEqual({ h: 0, s: 100, l: 50, a: 1 });
    });
    it('parses "white"', () => {
      expect(parseColor('white')).toEqual({ h: 0, s: 0, l: 100, a: 1 });
    });
    it('parses "black"', () => {
      expect(parseColor('black')).toEqual({ h: 0, s: 0, l: 0, a: 1 });
    });
    it('parses "transparent"', () => {
      expect(parseColor('transparent')).toEqual({ h: 0, s: 0, l: 0, a: 0 });
    });
    it('returns null for unknown names', () => {
      expect(parseColor('notacolor')).toBeNull();
    });
  });

  describe('HslaColor object passthrough', () => {
    it('returns the object as-is', () => {
      const color: HslaColor = { h: 120, s: 50, l: 60, a: 0.8 };
      expect(parseColor(color)).toBe(color);
    });
  });

  describe('invalid input', () => {
    it('returns null for empty string', () => {
      expect(parseColor('')).toBeNull();
    });
    it('returns null for garbage', () => {
      expect(parseColor('not a color')).toBeNull();
    });
  });
});

describe('hslaToRgb', () => {
  it('converts red', () => {
    expect(hslaToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('converts black', () => {
    expect(hslaToRgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });
  });
  it('converts white', () => {
    expect(hslaToRgb(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });
  });
});

describe('hslaToHex', () => {
  it('converts red to #ff0000', () => {
    expect(hslaToHex(0, 100, 50)).toBe('#ff0000');
  });
  it('converts black to #000000', () => {
    expect(hslaToHex(0, 0, 0)).toBe('#000000');
  });
  it('includes alpha when < 100', () => {
    expect(hslaToHex(0, 100, 50, 50)).toBe('#ff000080');
  });
  it('omits alpha when 100 (default)', () => {
    expect(hslaToHex(0, 100, 50, 100)).toBe('#ff0000');
    expect(hslaToHex(0, 100, 50)).toBe('#ff0000');
  });
  it('returns empty string for invalid input', () => {
    expect(hslaToHex(NaN, 100, 50)).toBe('');
  });
  it('returns empty string when alpha is NaN', () => {
    expect(hslaToHex(0, 100, 50, NaN)).toBe('');
  });
});

describe('hslaToRgbString', () => {
  it('returns rgb() without alpha when alpha is 1', () => {
    expect(hslaToRgbString(0, 100, 50, 1)).toBe('rgb(255 0 0)');
  });
  it('returns rgb() with slash alpha when alpha < 1', () => {
    expect(hslaToRgbString(0, 100, 50, 0.5)).toBe('rgb(255 0 0 / 0.5)');
  });
});

describe('hslaToHslString', () => {
  it('returns hsl() without alpha when alpha is 1', () => {
    expect(hslaToHslString(0, 100, 50, 1)).toBe('hsl(0 100% 50%)');
  });
  it('returns hsl() with slash alpha when alpha < 1', () => {
    expect(hslaToHslString(120, 50, 60, 0.8)).toBe('hsl(120 50% 60% / 0.8)');
  });
});

describe('hslaToHsv', () => {
  it('converts fully saturated red: hsl(0,100,50) → hsv(0,100,100)', () => {
    expect(hslaToHsv(0, 100, 50)).toEqual({ h: 0, s: 100, v: 100 });
  });
  it('converts black', () => {
    expect(hslaToHsv(0, 0, 0)).toEqual({ h: 0, s: 0, v: 0 });
  });
  it('converts white', () => {
    expect(hslaToHsv(0, 0, 100)).toEqual({ h: 0, s: 0, v: 100 });
  });
  it('preserves hue', () => {
    expect(hslaToHsv(240, 100, 50).h).toBe(240);
  });
});
