import {
  AUX_UTILITY,
  BACK_LAT,
  CHEST_GENERAL,
  CHEST_UPPER,
  EXCLUDE_ERECTOR_SPINAE,
  INCLUDE_ERECTOR_SPINAE,
  SHOULDER_FRONT,
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
      { target: "BACK", optional: false, filters: [EXCLUDE_ERECTOR_SPINAE] },
      { target: "CHEST", optional: false, filters: [CHEST_GENERAL] },
      { target: "CHEST", optional: true, filters: [CHEST_UPPER] },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_LATERAL] },
    ],
    [
      { target: "QUADS", optional: false, filters: [INCLUDE_ERECTOR_SPINAE] },
      {
        target: "QUADS",
        optional: true,
        filters: [EXCLUDE_ERECTOR_SPINAE, AUX_UTILITY],
      },
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE, AUX_UTILITY],
      },
      { target: "TRICEPS", optional: false },
      { target: "BICEPS", optional: false },
      { target: "CALVES", optional: false },
      { target: "ABS", optional: false },
    ],
  ],
  [TWO_DAY_MUSCLES.PP]: [
    [
      { target: "QUADS", optional: false, filters: [INCLUDE_ERECTOR_SPINAE] },
      {
        target: "QUADS",
        optional: true,
        filters: [INCLUDE_ERECTOR_SPINAE, AUX_UTILITY],
      },
      { target: "CHEST", optional: false, filters: [CHEST_GENERAL] },
      { target: "CHEST", optional: true, filters: [CHEST_UPPER] },
      { target: "TRICEPS", optional: true },
      { target: "CALVES", optional: false },
    ],
    [
      { target: "BACK", optional: false, filters: [BACK_LAT] },
      { target: "BACK", optional: false, filters: [EXCLUDE_ERECTOR_SPINAE] },
      { target: "SHOULDER", optional: false, filters: [SHOULDER_LATERAL] },
      { target: "BICEPS", optional: false },
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE],
      },
      { target: "ADDUCTORS", optional: true },
      { target: "ABDUCTORS", optional: true },
      { target: "ABS", optional: false },
    ],
  ],
  [TWO_DAY_MUSCLES.UL]: [
    [
      { target: "BACK", optional: false, filters: [BACK_LAT] },
      { target: "BACK", optional: false, filters: [EXCLUDE_ERECTOR_SPINAE] },
      { target: "CHEST", optional: false, filters: [CHEST_GENERAL] },
      { target: "SHOULDERS", optional: false, filters: [SHOULDER_LATERAL] },
      { target: "TRICEPS", optional: true },
      { target: "BICEPS", optional: true },
    ],
    [
      { target: "QUADS", optional: false, filters: [INCLUDE_ERECTOR_SPINAE] },
      {
        target: "QUADS",
        optional: true,
        filters: [EXCLUDE_ERECTOR_SPINAE, AUX_UTILITY],
      },
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
