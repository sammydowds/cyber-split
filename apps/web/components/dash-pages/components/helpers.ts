export const convertMsToText = (ms: number) => {
  return `${ms > 60000 ? Math.round((ms / (1000 * 60)) % 120) : 0}:${Math.round(
    (ms / 1000) % 60,
  )
    .toString()
    .padStart(2, "0")}`;
};
