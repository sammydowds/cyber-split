import { ActiveSplit, Prisma, prisma } from "./client";
import {
  SPLIT_TYPE_PROGRAMMING_LABEL_MAP,
  SPLIT_TYPE_PROGRAMMING_MAP,
} from "./programming";
import { createActiveSplitWorkoutSchedule } from "./programming/createActiveSplitWorkoutSchedule";
import { SPLIT_TYPES } from "./programming/enums";
import { DeepLoggedWorkout, DeepTemplateWorkout, SplitDeep } from "./types";

export const WORKOUT_LABELS = ["A", "B", "C", "D"] as const;
const getWorkoutLetterFromIndex = (idx: number, count: number) => {
  if (count === 1) {
    return "W";
  }
  return WORKOUT_LABELS[idx];
};

export const getExercises = async (
  muscleGroups: string[],
  equipment: string[],
  type: "STRENGTH" | "CARDIO" = "STRENGTH",
  limit: number,
  excludeExercises: string[] = [],
  filters?: Prisma.ExerciseWhereInput[],
) => {
  const baseWhere: Prisma.ExerciseWhereInput = {
    ...(muscleGroups?.length
      ? {
          bodyPart: {
            in: muscleGroups,
          },
        }
      : {}),
    type,
    id: {
      notIn: excludeExercises,
    },
    ...(equipment.length
      ? {
          equipment: {
            some: {
              id: {
                in: equipment,
              },
            },
          },
        }
      : {}),
  };

  const combinedWhere: Prisma.ExerciseWhereInput = {
    AND: [baseWhere, ...(filters ?? [])],
  };

  return await prisma.exercise.findMany({
    where: combinedWhere,
    take: limit,
    include: {
      equipment: true,
    },
  });
};

export const buildSplitWorkouts = async (
  muscles: string,
  splitType: string,
) => {
  const program = SPLIT_TYPE_PROGRAMMING_MAP[splitType as SPLIT_TYPES][muscles];
  const labels =
    splitType === SPLIT_TYPES.FB
      ? ["Full Body"]
      : SPLIT_TYPE_PROGRAMMING_LABEL_MAP[
          splitType as
            | typeof SPLIT_TYPES.FOUR_DAY
            | SPLIT_TYPES.THREE_DAY
            | SPLIT_TYPES.TWO_DAY
        ][muscles];
  const workouts: any[] = [];
  const exerciseIds: string[] = [];
  for (let i = 0; i < program.length; i++) {
    const s = program[i];
    const name = labels[i]; // Use the index to get the name
    let strengthGroups: any[] = [];
    for (const exerciseSpec of s) {
      const exercises = await getExercises(
        [exerciseSpec.target],
        [],
        "STRENGTH",
        5,
        exerciseIds,
        exerciseSpec.filters,
      );
      if (exercises.length === 0) {
        console.info(
          `Unable to find exercises for: target - ${exerciseSpec.target}`,
        );
        continue;
      }
      const randomIndex = Math.floor(Math.random() * exercises.length);
      const exercise = exercises[randomIndex];
      const baseSet = {
        exercise,
        dateLogged: null,
        isInterval: false,
        interval: null,
        reps: 10,
        restPeriod: 90,
      };
      strengthGroups.push({
        sets: [baseSet, baseSet, baseSet],
        name: exercise.name,
      });
      exerciseIds.push(exercise.id);
    }
    workouts.push({
      strengthGroups,
      name,
      letterLabel: getWorkoutLetterFromIndex(i, program.length),
    });
  }

  return workouts;
};

export const getFirstOrLastLoggedWorkout = async (
  profileId: string,
  loggedBefore: Date,
  templateWorkoutId: string,
  type: "FIRST" | "LAST",
) => {
  return await prisma.loggedWorkout.findFirst({
    where: {
      profileId: profileId,
      templateWorkoutId,
      dateLogged: {
        lte: loggedBefore,
      },
    },
    include: {
      strengthGroups: {
        include: {
          sets: {
            include: {
              exercise: true,
            },
          },
        },
      },
      Split: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      dateLogged: type === "FIRST" ? "asc" : "desc",
    },
  });
};

export const getAllWorkoutsForUser = async (profileId: string) => {
  return await prisma.loggedWorkout.findMany({
    where: {
      profileId: profileId,
    },
    include: {
      strengthGroups: {
        include: {
          sets: {
            include: {
              exercise: true,
            },
          },
        },
      },
      Split: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      dateLogged: "desc",
    },
  });
};

export const createActiveSplit = async (
  splitId: string,
  profileId: string,
  start: Date = new Date(),
  end: Date = new Date(new Date().setDate(new Date().getDate() + 30)),
  schedule: any,
) => {
  // create schedule
  const baseSplit = await prisma.split.findUnique({
    where: {
      id: splitId,
    },
    select: {
      cadence: true,
      skipDays: true,
      workouts: true,
    },
  });

  return await prisma.activeSplit.create({
    data: {
      splitId,
      profileId,
      schedule,
      start,
      end,
    },
  });
};

export const getProfile = async (email: string) => {
  return await prisma.profile.findUnique({
    where: {
      email: email,
    },
  });
};

export const createProfile = async (email: string) => {
  return await prisma.profile.create({
    data: {
      email: email,
    },
  });
};

export const deactivateActiveSplit = async (id: string) => {
  return await prisma.activeSplit.update({
    where: {
      id,
    },
    data: {
      end: new Date(),
    },
  });
};

export const findUniqueTemplate = async (id: string) => {
  return await prisma.templateWorkout.findUnique({
    where: {
      id,
    },
    include: {
      strengthGroups: {
        include: {
          sets: {
            include: {
              exercise: {
                include: {
                  equipment: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const lastLoggedWorkout = async (
  profileId: string,
  templateWorkoutId: string,
) => {
  const lastLogged = await prisma.loggedWorkout.findFirst({
    where: {
      profileId,
      templateWorkoutId,
    },
    include: {
      strengthGroups: {
        include: {
          sets: {
            include: {
              exercise: {
                include: {
                  equipment: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      dateLogged: "desc",
    },
  });

  return lastLogged;
};

/**
 * Prefills a workout template with data from a previously logged workout.
 * If the template was updated after the logged workout's date, the original template is returned unchanged.
 *
 * @param template - The workout template to be prefilled (without profile data)
 * @param loggedWorkout - The previously logged workout to use as a source (without Split data)
 * @returns The prefilled template with exercise data from the logged workout, or the original template if it was updated more recently
 */
export const prefillTemplate = (
  template?: Omit<DeepTemplateWorkout, "profile"> | null,
  loggedWorkout?: Omit<DeepLoggedWorkout, "Split"> | null,
) => {
  if (!template) {
    return null;
  }
  if (!loggedWorkout?.dateLogged) {
    return template;
  }

  // ensure the template was not updated after date logged
  const { updated } = template;
  const { dateLogged } = loggedWorkout;
  if (updated && dateLogged && updated.getTime() > dateLogged.getTime()) {
    return template;
  }

  // fill with previously logged groups
  let tempGroups: any = [];
  loggedWorkout.strengthGroups.map((group) => {
    let volume = 0;
    tempGroups.push({
      ...group,
      sets: group.sets.map((set) => {
        if (set.dateLogged && set.reps && set.weight) {
          volume = volume + set.reps * set.weight;
        }
        return {
          ...set,
          exercise: {
            ...set.exercise,
          },
          dateLogged: null,
        };
      }),
      previousVolume: volume,
    });
  });

  return { ...template, strengthGroups: tempGroups };
};

export const deleteSplit = async (id: string, profileId: string) => {
  return await prisma.split.delete({
    where: {
      profileId,
      id,
    },
  });
};

export const findSplit = async (id: string) => {
  return await prisma.split.findUnique({
    where: {
      id,
    },
    include: {
      workouts: {
        include: {
          strengthGroups: {
            include: {
              sets: {
                include: {
                  exercise: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const getAllSplits = async (profileId: string) => {
  return await prisma.split.findMany({
    where: {
      profileId,
    },
    orderBy: [
      {
        created: "desc",
      },
    ],
    include: {
      workouts: {
        include: {
          strengthGroups: {
            include: {
              sets: {
                include: {
                  exercise: true,
                },
              },
            },
          },
        },
      },
      loggedWorkouts: {
        include: {
          strengthGroups: {
            include: {
              sets: {
                include: {
                  exercise: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

interface Args {
  exercise: any;
  limit: number;
  ignoreExercises: string[];
}
export const getSimilarExercises = async ({
  exercise,
  limit = 3,
  ignoreExercises = [],
}: Args) => {
  const results = await prisma.exercise.findMany({
    where: {
      target: exercise.target,
      bodyPart: exercise.bodyPart,
      stabilizers: {
        equals: exercise.stabilizers,
      },
      synergists: {
        equals: exercise.synergists,
      },
      dynamicStabilizers: {
        equals: exercise.dynamicStabilizers,
      },
      id: {
        notIn: ignoreExercises,
      },
    },
    take: limit,
  });

  return results;
};

export const createLoggedWorkout = async (
  data: Omit<
    DeepLoggedWorkout,
    "id" | "created" | "units" | "dateLogged" | "updated" | "Split"
  >,
) => {
  const {
    name,
    profileId,
    splitId,
    letterLabel,
    strengthGroups,
    templateWorkoutId,
  } = data;
  const now = new Date();
  return await prisma.loggedWorkout.create({
    data: {
      name: name,
      profileId: profileId as string,
      splitId: splitId,
      letterLabel: letterLabel,
      templateWorkoutId,
      dateLogged: now,
      units: "IMPERIAL",
      strengthGroups: {
        create: strengthGroups?.map((group: any) => ({
          name: group.name,
          sets: {
            create: group.sets.map((set: any) => ({
              ...{ ...set, previousWeight: undefined, previousReps: undefined },
              created: now,
              exercise: {
                connect: { id: set.exercise.id },
              },
            })),
          },
        })),
      },
    },
    include: {
      strengthGroups: {
        include: {
          sets: {
            include: {
              exercise: {
                include: {
                  equipment: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const createSplit = async (
  data: Omit<
    SplitDeep,
    "id" | "loggedWorkouts" | "created" | "rating" | "Split"
  >,
) => {
  const { cadence, type, active, name, workouts, skipDays, profileId } = data;
  return await prisma.split.create({
    data: {
      profileId,
      cadence,
      type,
      active,
      name,
      workouts: {
        create: workouts.map((w: any) => ({
          name: w.name,
          letterLabel: w.letterLabel,
          profileId,
          units: "IMPERIAL",
          strengthGroups: {
            create: w.strengthGroups.map((g: any) => ({
              ...g,
              sets: {
                create: g.sets.map((s: any) => ({
                  ...s,
                  exercise: {
                    connect: { id: s.exercise.id },
                  },
                })),
              },
            })),
          },
        })),
      },
      ActiveSplit: active
        ? {
            create: [
              {
                start: new Date(),
                end: new Date(new Date().setDate(new Date().getDate() + 30)),
                profileId,
              },
            ],
          }
        : undefined,
      skipDays: skipDays,
    },
    include: {
      workouts: {
        include: {
          strengthGroups: {
            include: {
              sets: true,
            },
          },
        },
      },
    },
  });
};

export const getActiveSchedule = async (profileId: string) => {
  const split = await prisma.activeSplit.findFirst({
    where: {
      profileId,
      end: {
        gt: new Date(),
      },
    },
    orderBy: [
      {
        start: "desc",
      },
    ],
    include: {
      split: {
        include: {
          workouts: {
            include: {
              strengthGroups: {
                include: {
                  sets: {
                    include: {
                      exercise: true,
                    },
                  },
                },
              },
            },
          },
          loggedWorkouts: {
            include: {
              strengthGroups: {
                include: {
                  sets: {
                    include: {
                      exercise: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              dateLogged: "desc",
            },
          },
        },
      },
    },
  });

  return split;
};
