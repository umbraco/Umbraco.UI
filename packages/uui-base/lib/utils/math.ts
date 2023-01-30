//
// Ensures a number stays within a minimum and maximum value
//
export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};
