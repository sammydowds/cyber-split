import {
  FB_CADENCE,
  SPLIT_TYPES,
  SplitDeep,
  THREE_DAY_CADENCE,
  TWO_DAY_CADENCE,
} from "@repo/database";

interface GetDifficultyArgs {
  split: SplitDeep;
}
export const getSplitDifficultyLevel = ({ split }: GetDifficultyArgs) => {
  if (
    split.type === SPLIT_TYPES.FB &&
    split.cadence === FB_CADENCE.TWO_DAYS_PER_WEEK
  ) {
    return 0;
  }

  if (
    split.type === SPLIT_TYPES.TWO_DAY &&
    (split.cadence === TWO_DAY_CADENCE.TWO_DAYS_PER_WEEK ||
      split.cadence === TWO_DAY_CADENCE.THREE_DAYS_PER_WEEK)
  ) {
    return 0;
  }

  if (
    (split.type === SPLIT_TYPES.THREE_DAY &&
      (split.cadence === THREE_DAY_CADENCE.FIVE_DAYS_PER_WEEK ||
        split.cadence === THREE_DAY_CADENCE.SIX_DAYS_PER_WEEK ||
        split.cadence === THREE_DAY_CADENCE.THREE_ON_ONE_OFF)) ||
    split.type === SPLIT_TYPES.FOUR_DAY
  ) {
    return 2;
  }
  return 1;
};
