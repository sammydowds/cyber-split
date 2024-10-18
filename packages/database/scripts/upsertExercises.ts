const fs = require("fs");
const dotEnv = require("dotenv");
const csv = require("csv-parser");
const path = require("path");
import { Exercise } from "@prisma/client";
import { prisma } from "../src/client";

dotEnv.config({ path: path.resolve(".env.local") });

// Function to read CSV file
function readCsvFile(filePath: string): Promise<Exercise[]> {
  return new Promise((resolve, reject) => {
    const results: Exercise[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: Exercise) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error: any) => reject(error));
  });
}

// Function to prepare data for upsert
function prepareDataForUpsert(exercises: any[]): Exercise[] {
  return exercises.map((exercise) => {
    // Convert empty strings to null
    Object.keys(exercise).forEach((key) => {
      let val = exercise[key as keyof Exercise] as string;
      if (["synergists", "stabilizers", "dynamicStabilizers"].includes(key)) {
        if (val?.length === 0) {
          exercise[key as keyof Exercise] = [];
        } else {
          exercise[key as keyof Exercise] = val.split(",");
        }
      } else if (val?.length === 0) {
        exercise[key as keyof Exercise] = null;
      }
    });

    return exercise;
  });
}

// Main function to run the script
async function updateExercises() {
  let results;
  try {
    const exercises = await readCsvFile("data/exercises.csv");
    const upsertData = prepareDataForUpsert(exercises);
    const upsertPromises = upsertData.map((exercise) =>
      prisma.exercise.upsert({
        where: { id: exercise.id }, // Assuming 'id' is the unique identifier
        update: exercise,
        create: exercise,
      }),
    );

    results = await Promise.all(upsertPromises);
    console.log(`Successfully upserted ${results.length} records.`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client disconnects
  }
}

// Run the script
updateExercises();
