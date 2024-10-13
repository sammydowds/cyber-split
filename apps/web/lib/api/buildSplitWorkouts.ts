import { Prisma } from "@prisma/client";
import { MuscleSpec } from "../programming/types";
import { prisma } from "@repo/database";

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
  spec: MuscleSpec[][],
  labels: string[],
) => {
  const workouts: any[] = [];
  const exerciseIds: string[] = [];
  for (let i = 0; i < spec.length; i++) {
    const s = spec[i];
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
      letterLabel: getWorkoutLetterFromIndex(i, spec.length),
    });
  }

  return workouts;
};
