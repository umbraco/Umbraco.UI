//
// Ensures a number stays within a minimum and maximum value
//
export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Reverses a number within a range
 *
 * @param {number} num - number to reverse
 * @param {number} min
 * @param {number} max
 * @return {*}  {number}
 * @example
 * // returns 8
 * reverseNumberInRange (2, 0, 10)
 */
export const reverseNumberInRange = (
  num: number,
  min: number,
  max: number,
): number => {
  return max + min - num;
};

export const toHex = (value: number) => {
  const hex = Math.round(value).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};
