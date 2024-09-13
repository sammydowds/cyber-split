import { createClient, SupabaseClient } from "@supabase/supabase-js";
const fs = require("fs");
const dotEnv = require("dotenv");
const csv = require("csv-parser");
const path = require("path");
import { Exercise } from "@prisma/client";

dotEnv.config({ path: path.resolve(".env") });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

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
  try {
    const exercises = await readCsvFile("data/exercises.csv");
    const upsertData = prepareDataForUpsert(exercises);
    const { data, error } = await supabase
      .from("Exercise")
      .upsert(upsertData)
      .select();

    if (error) {
      console.error("Error occurred during upsert operation:", error);
    } else {
      console.log(`Successfully upserted ${data?.length} records.`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the script
updateExercises();
