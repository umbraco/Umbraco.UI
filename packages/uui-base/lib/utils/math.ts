//
// Ensures a number stays within a minimum and maximum value
//
export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Reverses a number within a range
 *
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @return {*}  {number}
 */
export const reverseNumberInRange = (
  num: number,
  min: number,
  max: number
): number => {
  return max + min - num;
};
