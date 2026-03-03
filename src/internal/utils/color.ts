import { parse, converter, formatHex, formatHex8 } from 'culori';
import { clamp } from './math.js';

// ─── Culori converters (created once, reused) ─────────────────────────────────

const toHsl = converter('hsl');
const toRgb = converter('rgb');
const toHsv = converter('hsv');

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Color expressed as hue (0–360), saturation (0–100), lightness (0–100),
 * alpha (0–1). Matches the convention used throughout the UUI color components.
 */
export type HslaColor = { h: number; s: number; l: number; a: number };

// ─── Parsing ──────────────────────────────────────────────────────────────────

/**
 * Parse any supported color value into an HslaColor.
 *
 * Accepts: hex (#rgb, #rgba, #rrggbb, #rrggbbaa), rgb(), rgba(), hsl(), hsla(),
 * hsv(), hsva(), all CSS named colors (including 'transparent'), and HslaColor
 * objects (passed through unchanged).
 *
 * Returns null for unrecognised input.
 */
export function parseColor(input: string | HslaColor): HslaColor | null {
  if (typeof input !== 'string') return input;

  const value = input.trim();
  if (!value) return null;

  // culori understands hex, rgb, hsl, and all CSS named colors natively.
  // It does not understand hsv/hsva — handle those separately.
  if (/^hsva?/i.test(value)) return parseHsv(value);

  const parsed = parse(value);
  if (!parsed) return null;

  const hsl = toHsl(parsed);
  if (!hsl) return null;

  return {
    h: Math.round(hsl.h ?? 0),
    s: Math.round((hsl.s ?? 0) * 100),
    l: Math.round((hsl.l ?? 0) * 100),
    a: hsl.alpha ?? 1,
  };
}

/** Parse hsv(h, s%, v%) and hsva(h, s%, v%, a) strings. */
function parseHsv(value: string): HslaColor | null {
  const m =
    /^hsva?\(\s*([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*([\d.]+))?\s*\)$/i.exec(
      value,
    );
  if (!m) return null;

  // Convert HSV → HSL via culori
  const hsvColor = {
    mode: 'hsv' as const,
    h: Number.parseFloat(m[1]),
    s: Number.parseFloat(m[2]) / 100,
    v: Number.parseFloat(m[3]) / 100,
    alpha: m[4] === undefined ? 1 : Number.parseFloat(m[4]),
  };

  const hsl = toHsl(hsvColor);
  if (!hsl) return null;

  return {
    h: Math.round(hsl.h ?? 0),
    s: Math.round((hsl.s ?? 0) * 100),
    l: Math.round((hsl.l ?? 0) * 100),
    a: hsl.alpha ?? 1,
  };
}

// ─── Conversions ──────────────────────────────────────────────────────────────

/**
 * Convert HSL (h: 0–360, s: 0–100, l: 0–100) to RGB (r, g, b: 0–255).
 */
export function hslaToRgb(
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } {
  const rgb = toRgb({ mode: 'hsl', h, s: s / 100, l: l / 100 });
  return {
    r: Math.round((rgb?.r ?? 0) * 255),
    g: Math.round((rgb?.g ?? 0) * 255),
    b: Math.round((rgb?.b ?? 0) * 255),
  };
}

/**
 * Convert HSL (h: 0–360, s: 0–100, l: 0–100) to HSV.
 * Returns h (0–360), s (0–100), v (0–100).
 */
export function hslaToHsv(
  h: number,
  s: number,
  l: number,
): { h: number; s: number; v: number } {
  const hsv = toHsv({ mode: 'hsl', h, s: s / 100, l: l / 100 });
  return {
    h,
    s: Math.round((hsv?.s ?? 0) * 100),
    v: Math.round((hsv?.v ?? 0) * 100),
  };
}

// ─── Formatting ───────────────────────────────────────────────────────────────

/**
 * Generate a hex string from HSLA values.
 * Hue: 0–360, saturation/lightness: 0–100, alpha: 0–100 (default 100).
 * Note: alpha uses 0–100 scale (matching the component's `alpha` property)
 * unlike `hslaToRgbString` which uses 0–1.
 * Returns 6-digit hex when fully opaque, 8-digit when alpha < 100.
 * Returns empty string on invalid input.
 */
export function hslaToHex(
  hue: number,
  saturation: number,
  lightness: number,
  alpha = 100,
): string {
  if (
    Number.isNaN(hue) ||
    Number.isNaN(saturation) ||
    Number.isNaN(lightness) ||
    Number.isNaN(alpha)
  )
    return '';
  const color = {
    mode: 'hsl' as const,
    h: hue,
    s: saturation / 100,
    l: lightness / 100,
    alpha: alpha / 100,
  };
  if (alpha >= 100) return formatHex(color) ?? '';
  return formatHex8(color) ?? '';
}

/**
 * Format HSLA as a CSS rgb() string (modern space-separated syntax).
 */
export function hslaToRgbString(
  h: number,
  s: number,
  l: number,
  a: number,
): string {
  const { r, g, b } = hslaToRgb(h, s, l);
  return `rgb(${r} ${g} ${b} / ${a})`;
}

// ─── HSL/HSV math helpers ─────────────────────────────────────────────────────

/** Converts HSL lightness to HSB brightness given a saturation value. */
export function brightnessFromLightness(
  saturation: number,
  lightness: number,
): number {
  return clamp(-1 * ((200 * lightness) / (saturation - 200)), 0, 100);
}

/** Converts HSB brightness to HSL lightness given a saturation value. */
export function lightnessFromBrightness(
  saturation: number,
  brightness: number,
): number {
  return clamp(((((200 - saturation) * brightness) / 100) * 5) / 10, 0, 100);
}
