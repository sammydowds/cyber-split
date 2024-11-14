import { Prisma } from "@prisma/client";

export type DeepTemplateWorkout = Prisma.TemplateWorkoutGetPayload<{
  include: {
    profile: true;
    id: true;
    strengthGroups: {
      include: {
        sets: {
          include: {
            exercise: {
              include: {
                equipment: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export type TemplateWorkout = Prisma.TemplateWorkoutGetPayload<{
  include: {
    profile: true;
    preWorkoutGroups: true;
    strengthGroups: true;
    cardioGroups: true;
    postWorkoutGroups: true;
  };
}>;

export type SplitDeep = Prisma.SplitGetPayload<{
  include: {
    workouts: {
      include: {
        letterLabel: true;
        strengthGroups: {
          include: {
            sets: {
              include: {
                exercise: true;
              };
            };
          };
        };
      };
    };
    loggedWorkouts: {
      include: {
        letterLabel: true;
        strengthGroups: {
          include: {
            sets: {
              include: {
                exercise: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export type DiscoverSplitDeep = Prisma.SplitGetPayload<{
  include: {
    workouts: {
      include: {
        letterLabel: true;
        strengthGroups: {
          include: {
            sets: {
              include: {
                exercise: true;
              };
            };
          };
        };
      };
    };
    loggedWorkouts: {
      include: {
        letterLabel: true;
        strengthGroups: {
          include: {
            sets: {
              include: {
                exercise: true;
              };
            };
          };
        };
      };
    };
  };
}> & { muscles?: string };

export type ActiveSplitDeep = Prisma.ActiveSplitGetPayload<{
  include: {
    split: {
      include: {
        workouts: {
          include: {
            letterLabel: true;
            strengthGroups: {
              include: {
                sets: {
                  include: {
                    exercise: true;
                  };
                };
              };
            };
          };
        };
        loggedWorkouts: {
          include: {
            letterLabel: true;
            strengthGroups: {
              include: {
                sets: {
                  include: {
                    exercise: true;
                  };
                };
              };
            };
          };
        };
      };
    };
  };
}>;

export type LoggedWorkoutSplitResponse = Prisma.SplitGetPayload<{
  include: {
    loggedWorkouts: {
      include: {
        strengthGroups: {
          include: {
            sets: {
              include: {
                exercise: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export type DeepSet = Prisma.SetGetPayload<{
  include: {
    exercise: true;
  };
}>;

export type ExerciseWithEquipment = Prisma.ExerciseGetPayload<{
  include: {
    equipment: true;
  };
}>;

export type DeepLoggedWorkout = Prisma.LoggedWorkoutGetPayload<{
  include: {
    strengthGroups: {
      include: {
        sets: {
          include: {
            exercise: true;
          };
        };
      };
    };
    Split: true;
  };
}>;

export enum BodyPart {
  BICEPS = "BICEPS",
  TRICEPS = "TRICEPS",
  CHEST = "CHEST",
  HAMSTRINGS = "HAMSTRINGS",
  ABS = "ABS",
  BACK = "BACK",
  QUADS = "QUADS",
  GLUTES = "GLUTES",
  SHOULDERS = "SHOULDERS",
  TRAPS = "TRAPS",
  FOREARMS = "FOREARMS",
  ADDUCTORS = "ADDUCTORS",
  ABDUCTORS = "ABDUCTORS",
  CALVES = "CALVES",
  LOWERBACK = "LOWERBACK",
}

export const GROUPS = [
  BodyPart.ABS,
  BodyPart.BACK,
  BodyPart.BICEPS,
  BodyPart.TRAPS,
  BodyPart.TRICEPS,
  BodyPart.HAMSTRINGS,
  BodyPart.GLUTES,
  BodyPart.LOWERBACK,
  BodyPart.QUADS,
  BodyPart.SHOULDERS,
  BodyPart.FOREARMS,
  BodyPart.CALVES,
  BodyPart.CHEST,
  BodyPart.ABDUCTORS,
  BodyPart.ADDUCTORS,
];

export interface WorkoutVolumeDataPayload {
  dateLogged: number;
  volume: number;
}
export interface WorkoutVolumeData {
  data: WorkoutVolumeDataPayload[];
  workoutName: string;
  workoutLabel: string;
  trend?: string;
}

export interface WorkoutVolumeApiPayload {
  [workoutTemplateId: string]: WorkoutVolumeData;
}
