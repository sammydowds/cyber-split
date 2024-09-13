export const convertSecondsToMinsSecsText = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins && !secs) {
    return `${mins}min`;
  }
  if (!mins && secs) {
    return `${secs}s`;
  }
  if (!mins && !secs) {
    return "0s";
  }
  return `${mins}:${secs}`;
};
