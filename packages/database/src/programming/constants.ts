import { Prisma } from "@prisma/client";
import {
  FB_CADENCE,
  FB_MUSCLES,
  FOUR_DAY_CADENCE,
  FOUR_DAY_MUSCLES,
  SPLIT_TYPES,
  THREE_DAY_CADENCE,
  THREE_DAY_MUSCLES,
  TWO_DAY_CADENCE,
  TWO_DAY_MUSCLES,
} from "./enums";

export const SHOULDER_FRONT: Prisma.ExerciseWhereInput = {
  target: "DELTOID_ANTERIOR",
};

export const SHOULDER_REAR: Prisma.ExerciseWhereInput = {
  target: "DELTOID_POSTERIOR",
};

export const SHOULDER_LATERAL: Prisma.ExerciseWhereInput = {
  target: "DELTOID_LATERAL",
};

export const INCLUDE_ERECTOR_SPINAE: Prisma.ExerciseWhereInput = {
  OR: [
    {
      stabilizers: {
        has: "ERECTOR_SPINAE",
      },
    },
    {
      synergists: {
        has: "ERECTOR_SPINAE",
      },
    },
  ],
};

export const EXCLUDE_ERECTOR_SPINAE: Prisma.ExerciseWhereInput = {
  NOT: {
    OR: [
      {
        stabilizers: {
          has: "ERECTOR_SPINAE",
        },
      },
      {
        synergists: {
          has: "ERECTOR_SPINAE",
        },
      },
      {
        target: "ERECTOR_SPINAE",
      },
    ],
  },
};

export const AUX_UTILITY: Prisma.ExerciseWhereInput = {
  classification: "AUXILIARY",
};

export const BASIC_UTILITY: Prisma.ExerciseWhereInput = {
  classification: "BASIC",
};

export const NEUTRAL_UTILITY: Prisma.ExerciseWhereInput = {
  classification: "NEUTRAL",
};

export const CHEST_UPPER: Prisma.ExerciseWhereInput = {
  target: "PECTORALIS_MAJOR_CLAVICULAR",
};

export const CHEST_GENERAL: Prisma.ExerciseWhereInput = {
  target: "PECTORALIS_MAJOR_STERNAL",
};

export const BACK_LAT: Prisma.ExerciseWhereInput = {
  target: "LATISSIMUS_DORSI",
};

export const BACK_GENERAL: Prisma.ExerciseWhereInput = {
  target: "BACK_GENERAL",
};

export const SPLIT_TYPE_TO_CADENCE_MAP = {
  [SPLIT_TYPES.FB]: Object.values(FB_CADENCE),
  [SPLIT_TYPES.TWO_DAY]: Object.values(TWO_DAY_CADENCE),
  [SPLIT_TYPES.THREE_DAY]: Object.values(THREE_DAY_CADENCE),
  [SPLIT_TYPES.FOUR_DAY]: Object.values(FOUR_DAY_CADENCE),
};

export const SPLIT_TYPE_TO_MUSCLES_MAP = {
  [SPLIT_TYPES.FB]: Object.values(FB_MUSCLES),
  [SPLIT_TYPES.TWO_DAY]: Object.values(TWO_DAY_MUSCLES),
  [SPLIT_TYPES.THREE_DAY]: Object.values(THREE_DAY_MUSCLES),
  [SPLIT_TYPES.FOUR_DAY]: Object.values(FOUR_DAY_MUSCLES),
};

export const THREE_DAY_MUSCLES_DESCRIPTION = {
  [THREE_DAY_MUSCLES.PPL]: "Workout A: Push, Workout B: Pull, Workout C: Lower",
  [THREE_DAY_MUSCLES.CBLSA]:
    "Workout A: Chest & Back, Workout B: Legs, Workout C: Shoulder & Arms",
};
export const TWO_DAY_MUSCLES_DESCRIPTION = {
  [TWO_DAY_MUSCLES.TLA]: "Workout A: Torso, Workout B: Legs & Arms",
  [TWO_DAY_MUSCLES.PP]: "Workout A: Push, Workout B: Pull",
  [TWO_DAY_MUSCLES.UL]: "Workout A: Upper, Workout B: Lower",
};
export const FOUR_DAY_MUSCLES_DESCRIPTION = {
  [FOUR_DAY_MUSCLES.BBCTTSCA]:
    "Workout A: Back & Biceps, Workout B: Chest & Triceps, Workout C: Thighs, Workout D: Shoulders, Calves, Abs",
  [FOUR_DAY_MUSCLES.TPTPLAPLAP]:
    "Workout A: Torso Pull, Workout B: Torso Push, Workout C: Leg & Arms Pull, Workout D: Leg & Arms Push",
};
export const FB_MUSCLES_DESCRIPTION = {
  [FB_MUSCLES.LTA]: "Lower, Torso, Arms",
  [FB_MUSCLES.LPP]: "Lower, Push, Pull",
  [FB_MUSCLES.PP]: "Push, Pull",
  [FB_MUSCLES.UL]: "Upper, Lower",
};

export const FB_CADENCE_DESCRIPTION = {
  [FB_CADENCE.TWO_DAYS_PER_WEEK]: "Two days per week",
  [FB_CADENCE.THREE_DAYS_PER_WEEK]: "Three days per week",
  [FB_CADENCE.EVERY_OTHER_DAY]: "Every other day",
};
export const TWO_DAY_CADENCE_DESCRIPTION = {
  [TWO_DAY_CADENCE.TWO_DAYS_PER_WEEK]: "Two days per week",
  [TWO_DAY_CADENCE.FOUR_DAYS_PER_WEEK]: "Four days per week",
  [TWO_DAY_CADENCE.TWO_ON_ONE_OFF]: "Two on, one off",
  [TWO_DAY_CADENCE.EVERY_OTHER_DAY]: "Every other day",
  [TWO_DAY_CADENCE.THREE_DAYS_PER_WEEK]: "Three days per week",
};
export const THREE_DAY_CADENCE_DESCRIPTION = {
  [THREE_DAY_CADENCE.THREE_DAYS_PER_WEEK_GROUPED]:
    "Three days per week, grouped",
  [THREE_DAY_CADENCE.THREE_DAYS_PER_WEEK_STAGGERED]:
    "Three days per week, staggered",
  [THREE_DAY_CADENCE.THREE_ON_ONE_OFF]: "Three on, one off",
  [THREE_DAY_CADENCE.FIVE_DAYS_PER_WEEK]: "Five days per week",
  [THREE_DAY_CADENCE.SIX_DAYS_PER_WEEK]: "Six days per week",
};
export const FOUR_DAY_CADENCE_DESCRIPTION = {
  [FOUR_DAY_CADENCE.FOUR_DAYS_PER_WEEK]: "Four days per week",
  [FOUR_DAY_CADENCE.FOUR_ON_ONE_OFF]: "Four on, one off",
  [FOUR_DAY_CADENCE.SIX_DAYS_PER_WEEK]: "Six days per week",
};

export const SPLIT_TYPE_TO_DESCRIPTION = {
  [SPLIT_TYPES.FB]: "Full Body Split",
  [SPLIT_TYPES.TWO_DAY]: "Two Day Split",
  [SPLIT_TYPES.THREE_DAY]: "Three Day Split",
  [SPLIT_TYPES.FOUR_DAY]: "Four Day Split",
};
export const SPLIT_TYPE_TO_META_DESCRIPTION = {
  [SPLIT_TYPES.FB]: "1 workout",
  [SPLIT_TYPES.TWO_DAY]: "2 workouts",
  [SPLIT_TYPES.THREE_DAY]: "3 workouts",
  [SPLIT_TYPES.FOUR_DAY]: "4 workouts",
};

export const CADENCE_TO_DESCRIPTION_MAP: { [k: string]: any } = {
  [SPLIT_TYPES.FB]: FB_CADENCE_DESCRIPTION,
  [SPLIT_TYPES.TWO_DAY]: TWO_DAY_CADENCE_DESCRIPTION,
  [SPLIT_TYPES.THREE_DAY]: THREE_DAY_CADENCE_DESCRIPTION,
  [SPLIT_TYPES.FOUR_DAY]: FOUR_DAY_CADENCE_DESCRIPTION,
};

export const MUSCLES_TO_DESCRIPTION_MAP: { [k: string]: any } = {
  [SPLIT_TYPES.FB]: FB_MUSCLES_DESCRIPTION,
  [SPLIT_TYPES.TWO_DAY]: TWO_DAY_MUSCLES_DESCRIPTION,
  [SPLIT_TYPES.THREE_DAY]: THREE_DAY_MUSCLES_DESCRIPTION,
  [SPLIT_TYPES.FOUR_DAY]: FOUR_DAY_MUSCLES_DESCRIPTION,
};
