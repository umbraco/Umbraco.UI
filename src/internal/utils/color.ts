import { colord } from 'colord';
import { clamp } from './math.js';

/** Generates a hex string from HSLA values. Hue: 0-360, others: 0-100. */
export function hslaToHex(
  hue: number,
  saturation: number,
  lightness: number,
  alpha = 100,
): string {
  const color = colord(
    `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha / 100})`,
  );
  if (!color.isValid()) {
    return '';
  }
  return color.toHex();
}

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
