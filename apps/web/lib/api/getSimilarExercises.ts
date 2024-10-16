import { Exercise } from "@prisma/client";
import { prisma } from "@repo/database";

interface Args {
  exercise: Exercise;
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
