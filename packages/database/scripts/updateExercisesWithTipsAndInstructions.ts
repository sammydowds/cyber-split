import { PrismaClient } from "@prisma/client";
import { data } from "./data/instructionsAndTips";

const prisma = new PrismaClient();

async function updateExercises() {
  console.log("Starting exercise updates...");

  try {
    for (const exercise of data) {
      console.log(`Updating exercise: ${exercise.name}`);

      await prisma.exercise.update({
        where: {
          id: exercise.id,
        },
        data: {
          instructions: exercise.instructions,
          tips: exercise.tips,
        },
      });
    }

    console.log("Successfully updated all exercises!");
  } catch (error) {
    console.error("Error updating exercises:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateExercises();
