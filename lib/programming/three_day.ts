import {
  AUX_UTILITY,
  BACK_GENERAL,
  BACK_LAT,
  BASIC_UTILITY,
  CHEST_GENERAL,
  CHEST_UPPER,
  EXCLUDE_ERECTOR_SPINAE,
  INCLUDE_ERECTOR_SPINAE,
  SHOULDER_FRONT,
  SHOULDER_LATERAL,
  SHOULDER_REAR,
} from "./constants";
import { THREE_DAY_MUSCLES } from "./enums";
import { SplitLabels, Splits } from "./types";

export const THREE_DAY_SPLIT_PROGRAMMING_LABELS: SplitLabels = {
  [THREE_DAY_MUSCLES.PPL]: ["Push", "Pull", "Legs"],
  [THREE_DAY_MUSCLES.CBLSA]: ["Chest & Biceps", "Legs", "Shoulders & Arms"],
};

export const THREE_DAY_SPLIT_PROGRAMMING: Splits = {
  [THREE_DAY_MUSCLES.CBLSA]: [
    [
      { target: "CHEST", optional: false, filters: [CHEST_GENERAL, BASIC_UTILITY] },
      { target: "CHEST", optional: false, filters: [CHEST_UPPER] },
      {
        target: "CHEST",
        optional: true,
        filters: [CHEST_GENERAL, AUX_UTILITY],
      },
      { target: "BACK", optional: false, filters: [BACK_LAT] },
      {
        target: "BACK",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE, BACK_GENERAL],
      },
      { target: "TRAPS", optional: true },
      { target: "ABS", optional: false },
      { target: "ABS", optional: true },
    ],
    [
      { target: "GLUTES", optional: false },
      { target: "QUADS", optional: false },
      { target: "QUADS", optional: true },
      { target: "GLUTES", optional: true },
      { target: "HAMSTRINGS", optional: false },
      { target: "CALVES", optional: false },
    ],
    [
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_FRONT] },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_LATERAL] },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_REAR] },
      { target: "TRICEPS", optional: false },
      { target: "TRICEPS", optional: true },
      { target: "BICEPS", optional: false },
      { target: "FOREARMS", optional: true },
    ],
  ],
  [THREE_DAY_MUSCLES.PPL]: [
    [
      { target: "CHEST", optional: false, filters: [CHEST_GENERAL, BASIC_UTILITY] },
      { target: "CHEST", optional: false, filters: [CHEST_UPPER] },
      {
        target: "CHEST",
        optional: true,
        filters: [CHEST_GENERAL, AUX_UTILITY],
      },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_LATERAL] },
      { target: "TRICEPS", optional: false },
    ],
    [
      {
        target: "BACK",
        optional: false,
        filters: [BACK_LAT, EXCLUDE_ERECTOR_SPINAE],
      },
      { target: "BACK", optional: false, filters: [BACK_GENERAL, BASIC_UTILITY] },
      {
        target: "BACK",
        optional: true,
        filters: [BACK_LAT, EXCLUDE_ERECTOR_SPINAE],
      },
      { target: "SHOULDERS", optional: true, filters: [SHOULDER_REAR] },
      { target: "TRAPS", optional: true },
      { target: "BICEPS", optional: false },
      { target: "FOREARMS", optional: true },
    ],
    [
      { target: "QUADS", optional: false, filters: [INCLUDE_ERECTOR_SPINAE] },
      {
        target: "QUADS",
        optional: true,
        filters: [EXCLUDE_ERECTOR_SPINAE, AUX_UTILITY],
      },
      { target: "GLUTES", optional: true, filters: [EXCLUDE_ERECTOR_SPINAE] },
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE],
      },
      { target: "CALVES", optional: false },
      { target: "ABS", optional: false },
      { target: "ABS", optional: false },
    ],
  ],
};
