export const calcOneRepMax = (weight: number, reps: number) => {
  // Brzycki formula
  return Math.round(weight / (1.0278 - 0.0278 * reps));
};
