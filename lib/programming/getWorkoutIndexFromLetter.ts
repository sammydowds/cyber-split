export const getWorkoutIndexFromLetter = (letter?: string | null) => {
  switch (letter) {
    case "A":
      return 0;
    case "W":
      return 0;
    case "B":
      return 1;
    case "C":
      return 2;
    case "D":
      return 3;
    default:
      return null;
  }
};
