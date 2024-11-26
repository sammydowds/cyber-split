import {
  BASIC_UTILITY,
  CHEST_GENERAL,
  EXCLUDE_ERECTOR_SPINAE,
  INCLUDE_ERECTOR_SPINAE,
  NEUTRAL_UTILITY,
  SHOULDER_LATERAL,
} from "./constants";
import { FB_MUSCLES } from "./enums";
import { Splits } from "./types";

export const FB_SPLIT_PROGRAMMING: Splits = {
  [FB_MUSCLES.PP]: [
    [
      {
        target: "QUADS",
        optional: false,
        filters: [INCLUDE_ERECTOR_SPINAE, BASIC_UTILITY],
      },
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [INCLUDE_ERECTOR_SPINAE, BASIC_UTILITY],
      },
      {
        target: "CHEST",
        optional: false,
        filters: [CHEST_GENERAL, BASIC_UTILITY],
      },
      {
        target: "SHOULDERS",
        optional: false,
        filters: [SHOULDER_LATERAL, NEUTRAL_UTILITY],
      },
      { target: "CALVES", optional: true, filters: [BASIC_UTILITY] },
      {
        target: "BACK",
        optional: false,
        filters: [INCLUDE_ERECTOR_SPINAE, BASIC_UTILITY],
      },

      { target: "TRICEPS", optional: true, filters: [BASIC_UTILITY] },
      { target: "BICEPS", optional: true, filters: [BASIC_UTILITY] },
      { target: "ABS", optional: false, filters: [BASIC_UTILITY] },
    ],
  ],
  [FB_MUSCLES.LPP]: [
    [
      {
        target: "QUADS",
        optional: false,
        filters: [INCLUDE_ERECTOR_SPINAE, BASIC_UTILITY],
      },
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE, BASIC_UTILITY],
      },
      { target: "CALVES", optional: true, filters: [BASIC_UTILITY] },
      {
        target: "BACK",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE, BASIC_UTILITY],
      },
      {
        target: "SHOULDERS",
        optional: false,
        filters: [SHOULDER_LATERAL, NEUTRAL_UTILITY],
      },
      { target: "BICEPS", optional: true, filters: [BASIC_UTILITY] },
      {
        target: "CHEST",
        optional: false,
        filters: [CHEST_GENERAL, BASIC_UTILITY],
      },
      { target: "TRICEPS", optional: true, filters: [BASIC_UTILITY] },
      { target: "ABS", optional: false, filters: [BASIC_UTILITY] },
    ],
  ],
  [FB_MUSCLES.LTA]: [
    [
      {
        target: "QUADS",
        optional: false,
        filters: [INCLUDE_ERECTOR_SPINAE, BASIC_UTILITY],
      },
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE, BASIC_UTILITY],
      },
      { target: "CALVES", optional: true, filters: [BASIC_UTILITY] },
      {
        target: "BACK",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE, BASIC_UTILITY],
      },
      {
        target: "SHOULDERS",
        optional: false,
        filters: [SHOULDER_LATERAL, NEUTRAL_UTILITY],
      },
      {
        target: "CHEST",
        optional: false,
        filters: [CHEST_GENERAL, BASIC_UTILITY],
      },
      { target: "BICEPS", optional: true, filters: [BASIC_UTILITY] },
      { target: "TRICEPS", optional: true, filters: [BASIC_UTILITY] },
      { target: "ABS", optional: false, filters: [BASIC_UTILITY] },
    ],
  ],
  [FB_MUSCLES.UL]: [
    [
      {
        target: "BACK",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE, BASIC_UTILITY],
      },
      {
        target: "QUADS",
        optional: false,
        filters: [INCLUDE_ERECTOR_SPINAE, BASIC_UTILITY],
      },
      {
        target: "CHEST",
        optional: false,
        filters: [CHEST_GENERAL, BASIC_UTILITY],
      },
      {
        target: "HAMSTRINGS",
        optional: false,
        filters: [EXCLUDE_ERECTOR_SPINAE, BASIC_UTILITY],
      },
      {
        target: "SHOULDERS",
        optional: true,
        filters: [SHOULDER_LATERAL, NEUTRAL_UTILITY],
      },
      { target: "CALVES", optional: true, filters: [BASIC_UTILITY] },
      { target: "BICEPS", optional: true, filters: [BASIC_UTILITY] },
      { target: "ABS", optional: false, filters: [BASIC_UTILITY] },
      { target: "TRICEPS", optional: true, filters: [BASIC_UTILITY] },
    ],
  ],
};
