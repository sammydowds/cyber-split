import { ActiveSplit, Prisma, prisma } from "./client";
import {
  SPLIT_TYPE_PROGRAMMING_LABEL_MAP,
  SPLIT_TYPE_PROGRAMMING_MAP,
} from "./programming";
import { createActiveSplitWorkoutSchedule } from "./programming/createActiveSplitWorkoutSchedule";
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
} from "./programming/enums";
import {
  DeepLoggedWorkout,
  DeepTemplateWorkout,
  SplitDeep,
  WorkoutVolumeApiPayload,
} from "./types";

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

export const findActiveSplit = async (id: string) => {
  return await prisma.activeSplit.findUnique({
    where: {
      id,
    },
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
        },
      },
    },
  });
};

const getVolumeDataFromLoggedWorkouts = (
  loggedWorkouts?: SplitDeep["loggedWorkouts"],
): WorkoutVolumeApiPayload => {
  if (!loggedWorkouts?.length) {
    return {};
  }
  const volumeByWorkout: WorkoutVolumeApiPayload = {};
  loggedWorkouts.forEach((workout) => {
    if (!workout.templateWorkoutId) return;
    let totalVolume = 0;
    workout.strengthGroups.forEach((group) => {
      group.sets.forEach((set) => {
        if (set.dateLogged && set.weight && set.reps) {
          totalVolume += set.weight * set.reps;
        }
      });
    });

    if (!volumeByWorkout[workout.templateWorkoutId]) {
      volumeByWorkout[workout.templateWorkoutId] = {
        data: [],
        workoutName: workout.name,
        workoutLabel: workout.letterLabel || "",
      };
    }
    volumeByWorkout[workout.templateWorkoutId].data.push({
      dateLogged: workout?.dateLogged?.getTime() ?? new Date().getTime(),
      volume: totalVolume,
    });
  });

  // Sort data points by date and calculate trends
  Object.values(volumeByWorkout).forEach((workoutData) => {
    workoutData.data.sort((a, b) => a.dateLogged - b.dateLogged);
    if (workoutData.data.length >= 2) {
      const firstVolume = workoutData.data[0].volume;
      const firstDateLogged = workoutData.data[0].dateLogged;
      const lastVolume = workoutData.data[workoutData.data.length - 1].volume;
      const volumeChange =
        typeof firstVolume === "number" && firstVolume !== 0
          ? ((lastVolume - firstVolume) / firstVolume) * 100
          : 0;
      if (volumeChange) {
        const volumeChangePercent = Math.abs(volumeChange).toFixed(0);
        const verb = volumeChange > 0 ? "up" : "down";
        const trendText = `Volume has gone ${verb} ${volumeChangePercent}% since first logged workout (${new Date(firstDateLogged).toLocaleDateString("en-us", { day: "2-digit", month: "2-digit", year: "2-digit" })}).`;
        workoutData.trend = trendText;
      }
    }
  });

  return volumeByWorkout;
};

export const getSplitWorkoutVolume = async (
  splitId: string,
): Promise<WorkoutVolumeApiPayload> => {
  const data = await prisma.split.findUnique({
    where: {
      id: splitId,
    },
    select: {
      loggedWorkouts: {
        include: {
          strengthGroups: {
            include: {
              sets: {
                select: {
                  dateLogged: true,
                  weight: true,
                  reps: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return getVolumeDataFromLoggedWorkouts(data?.loggedWorkouts);
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

function fisherYatesShuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
/**
 * Generates a list of splits - which can be activated.
 *
 * @returns List of 5 split templates.
 */
type SampleTemplate = Partial<SplitDeep> & { muscles: string };
export const discoverSplits = async () => {
  let sampleTemplates: SampleTemplate[] = [
    {
      cadence: FB_CADENCE.THREE_DAYS_PER_WEEK,
      type: SPLIT_TYPES.FB,
      muscles: FB_MUSCLES.PP,
    },
    {
      cadence: FB_CADENCE.TWO_DAYS_PER_WEEK,
      type: SPLIT_TYPES.FB,
      muscles: FB_MUSCLES.LTA,
    },
    {
      cadence: TWO_DAY_CADENCE.TWO_DAYS_PER_WEEK,
      type: SPLIT_TYPES.TWO_DAY,
      muscles: TWO_DAY_MUSCLES.UL,
    },
    {
      cadence: TWO_DAY_CADENCE.FOUR_DAYS_PER_WEEK,
      type: SPLIT_TYPES.TWO_DAY,
      muscles: TWO_DAY_MUSCLES.PP,
    },
    {
      cadence: TWO_DAY_CADENCE.THREE_DAYS_PER_WEEK,
      type: SPLIT_TYPES.TWO_DAY,
      muscles: TWO_DAY_MUSCLES.TLA,
    },
    {
      cadence: THREE_DAY_CADENCE.THREE_DAYS_PER_WEEK_STAGGERED,
      type: SPLIT_TYPES.THREE_DAY,
      muscles: THREE_DAY_MUSCLES.PPL,
    },
    {
      cadence: THREE_DAY_CADENCE.FIVE_DAYS_PER_WEEK,
      type: SPLIT_TYPES.THREE_DAY,
      muscles: THREE_DAY_MUSCLES.PPL,
    },
    {
      cadence: FOUR_DAY_CADENCE.FOUR_DAYS_PER_WEEK,
      type: SPLIT_TYPES.FOUR_DAY,
      muscles: FOUR_DAY_MUSCLES.BBCTTSCA,
    },
    {
      cadence: FOUR_DAY_CADENCE.FOUR_ON_ONE_OFF,
      type: SPLIT_TYPES.FOUR_DAY,
      muscles: FOUR_DAY_MUSCLES.TPTPLAPLAP,
    },
  ];

  for (let template of sampleTemplates) {
    if (template.type && template.cadence) {
      // Assuming 'muscles' is a required parameter for buildSplitWorkouts
      const workouts = await buildSplitWorkouts(
        template.muscles,
        template.type,
      );
      template.workouts = workouts;
    }
  }

  return fisherYatesShuffle(sampleTemplates);
};
