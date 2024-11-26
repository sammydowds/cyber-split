import {
  AUX_UTILITY,
  BACK_GENERAL,
  BACK_LAT,
  BASIC_UTILITY,
  CHEST_GENERAL,
  CHEST_UPPER,
  EXCLUDE_ERECTOR_SPINAE,
  INCLUDE_ERECTOR_SPINAE,
  SHOULDER_LATERAL,
} from "./constants";
import { TWO_DAY_MUSCLES } from "./enums";
import { SplitLabels, Splits } from "./types";

export const TWO_DAY_SPLIT_PROGRAMMING_LABELS: SplitLabels = {
  [TWO_DAY_MUSCLES.TLA]: ["Torso", "Legs & Arms"],
  [TWO_DAY_MUSCLES.PP]: ["Push", "Pull"],
  [TWO_DAY_MUSCLES.UL]: ["Upper", "Lower"],
};

export const TWO_DAY_SPLIT_PROGRAMMING: Splits = {
  [TWO_DAY_MUSCLES.TLA]: [
    [
      { target: "BACK", optional: false, filters: [BACK_LAT] },
      {
        target: "BACK",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE, BACK_GENERAL],
      },
      {
        target: "CHEST",
        optional: false,
        filters: [CHEST_GENERAL, BASIC_UTILITY],
      },
      { target: "CHEST", optional: true, filters: [CHEST_UPPER] },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_LATERAL] },
    ],
    [
      { target: "QUADS", optional: false, filters: [INCLUDE_ERECTOR_SPINAE] },
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE],
      },
      { target: "TRICEPS", optional: false, filters: [BASIC_UTILITY] },
      { target: "BICEPS", optional: false, filters: [BASIC_UTILITY] },
      { target: "CALVES", optional: false, filters: [BASIC_UTILITY] },
      { target: "ABS", optional: false, filters: [BASIC_UTILITY] },
    ],
  ],
  [TWO_DAY_MUSCLES.PP]: [
    [
      { target: "QUADS", optional: false, filters: [INCLUDE_ERECTOR_SPINAE] },
      {
        target: "CHEST",
        optional: false,
        filters: [CHEST_GENERAL, BASIC_UTILITY],
      },
      { target: "CHEST", optional: true, filters: [CHEST_UPPER] },
      { target: "TRICEPS", optional: true, filters: [BASIC_UTILITY] },
      { target: "CALVES", optional: false, filters: [BASIC_UTILITY] },
    ],
    [
      { target: "BACK", optional: false, filters: [BACK_LAT] },
      {
        target: "BACK",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE, BACK_GENERAL],
      },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_LATERAL] },
      { target: "BICEPS", optional: false },
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE],
      },
      { target: "ABS", optional: false },
    ],
  ],
  [TWO_DAY_MUSCLES.UL]: [
    [
      { target: "BACK", optional: false, filters: [BACK_LAT] },
      {
        target: "BACK",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE, BACK_GENERAL],
      },
      {
        target: "CHEST",
        optional: false,
        filters: [CHEST_GENERAL, BASIC_UTILITY],
      },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_LATERAL] },
      { target: "TRICEPS", optional: true, filters: [BASIC_UTILITY] },
      { target: "BICEPS", optional: true, filters: [BASIC_UTILITY] },
    ],
    [
      { target: "QUADS", optional: false, filters: [INCLUDE_ERECTOR_SPINAE] },
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE],
      },
      { target: "CALVES", optional: false },
      { target: "ABS", optional: false },
    ],
  ],
};
