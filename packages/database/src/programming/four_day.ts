import {
  BACK_GENERAL,
  BACK_LAT,
  CHEST_GENERAL,
  CHEST_UPPER,
  EXCLUDE_ERECTOR_SPINAE,
  INCLUDE_ERECTOR_SPINAE,
  SHOULDER_FRONT,
  SHOULDER_LATERAL,
  SHOULDER_REAR,
} from "./constants";
import { FOUR_DAY_MUSCLES } from "./enums";
import { SplitLabels, Splits } from "./types";

export const FOUR_DAY_SPLIT_PROGRAMMING_LABELS: SplitLabels = {
  [FOUR_DAY_MUSCLES.BBCTTSCA]: [
    "Back & Biceps",
    "Chest & Triceps",
    "Thighs",
    "Shoulders, Calves, Arms",
  ],
  [FOUR_DAY_MUSCLES.TPTPLAPLAP]: [
    "Torso Pull",
    "Torso Push",
    "Leg & Arm Push",
    "Leg & Arm Pull",
  ],
};

export const FOUR_DAY_SPLIT_PROGRAMMING: Splits = {
  [FOUR_DAY_MUSCLES.BBCTTSCA]: [
    [
      { target: "BACK", optional: false, filters: [BACK_LAT] },
      {
        target: "BACK",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE, BACK_GENERAL],
      },
      { target: "BICEPS", optional: false },
      { target: "FOREARMS", optional: false },
    ],
    [
      { target: "CHEST", optional: false, filters: [CHEST_GENERAL] },
      { target: "CHEST", optional: false, filters: [CHEST_UPPER] },
      { target: "TRICEPS", optional: false },
    ],
    [
      { target: "QUADS", optional: false, filters: [INCLUDE_ERECTOR_SPINAE] },
      { target: "GLUTES", optional: false, filters: [EXCLUDE_ERECTOR_SPINAE] },
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE],
      },
    ],
    [
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_FRONT] },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_LATERAL] },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_REAR] },
      { target: "TRAPS", optional: true },
      { target: "CALVES", optional: false },
      { target: "ABS", optional: false },
    ],
  ],
  [FOUR_DAY_MUSCLES.TPTPLAPLAP]: [
    [
      { target: "BACK", optional: false, filters: [BACK_LAT] },
      { target: "BACK", optional: false, filters: [BACK_GENERAL] },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_REAR] },
      { target: "TRAPS", optional: true },
    ],
    [
      { target: "CHEST", optional: false, filters: [CHEST_GENERAL] },
      { target: "CHEST", optional: false, filters: [CHEST_UPPER] },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_FRONT] },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_LATERAL] },
    ],
    [
      {
        target: "GLUTES",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE],
      },
      { target: "QUADS", optional: false, filters: [INCLUDE_ERECTOR_SPINAE] },
      { target: "GLUTES", optional: true, filters: [EXCLUDE_ERECTOR_SPINAE] },
      { target: "TRICEPS", optional: false },
      { target: "TRICEPS", optional: false },
      { target: "CALVES", optional: false },
    ],
    [
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE],
      },
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE],
      },
      { target: "BICEPS", optional: false },
      { target: "FOREARMS", optional: true },
      { target: "ABS", optional: false },
      { target: "ABS", optional: true },
    ],
  ],
};
