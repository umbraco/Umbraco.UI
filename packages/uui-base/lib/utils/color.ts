import { colord } from 'colord';

/** Generates a hex string from HSL values. Hue must be 0-360. All other arguments must be 0-100. */
export const getHexString = (
  hue: number,
  saturation: number,
  lightness: number,
  alpha = 100,
) => {
  const color = colord(
    `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha / 100})`,
  );

  if (!color.isValid()) {
    return '';
  }

  return color.toHex();
};
