import { Exercise } from "@prisma/client";
import OpenAI from "openai";
const fs = require("fs");
const dotEnv = require("dotenv");
const path = require("path");
const csv = require("csv-parser");
dotEnv.config({ path: path.resolve(".env") });

const openai = new OpenAI();

const getChatGPTInstructions = async (
  exerciseName: string,
): Promise<string[]> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a fitness expert. Provide clear, step-by-step instructions for performing exercises safely.",
        },
        {
          role: "user",
          content: `Provide 3-5 clear, concise sentences for performing the exercise: ${exerciseName}. 
                 Return only the numbered steps, no additional text.`,
        },
      ],
      temperature: 0.7,
    });

    const instructions =
      response.choices[0].message.content
        ?.split("\n")
        .filter((line) => line.trim())
        .map((line) => line.replace(/^\d+\.\s*/, "").trim()) || [];

    return instructions;
  } catch (error) {
    console.error(`Error generating instructions for ${exerciseName}:`, error);
    return [];
  }
};
const getChatGPTTips = async (exerciseName: string): Promise<string[]> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a fitness expert. Provide helpful tips and common mistakes to avoid when performing exercises.",
        },
        {
          role: "user",
          content: `Provide 2-3 important tips or common mistakes to avoid for the exercise: ${exerciseName}. 
                 Return only the bullet points, no additional text.`,
        },
      ],
      temperature: 0.7,
    });

    const tips =
      response.choices[0].message.content
        ?.split("\n")
        .filter((line) => line.trim())
        .map((line) => line.replace(/^[•\-*]\s*/, "").trim()) || [];

    return tips;
  } catch (error) {
    console.error(`Error generating tips for ${exerciseName}:`, error);
    return [];
  }
};

const outputTypescriptFile = (
  data: any[],
  processed: number,
  length: number,
) => {
  const outputPath = path.join(
    __dirname,
    "../../data/exercisesWithInstructions.ts",
  );
  const tsContent = `
                   const data = ${JSON.stringify(data, null, 2)}
               `;

  fs.writeFileSync(outputPath, tsContent);
  console.log(`\nComplete! Processed ${processed}/${length} exercises`);
  console.log(`Output written to: ${outputPath}`);
};

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

async function generateTipsAndInstructionsForExercises(exercises: Exercise[]) {
  console.log(`Processing ${exercises.length} exercises...`);
  let updated = [];
  let processed = 0;

  for (const exercise of exercises) {
    try {
      const instructions: string[] = await getChatGPTInstructions(
        exercise.name,
      );
      const tips: string[] = await getChatGPTTips(exercise.name);
      updated.push({ ...exercise, instructions, tips });
      processed++;
      console.log(
        `Processed ${processed}/${exercises.length}: ${exercise.name}`,
      );
    } catch (e) {
      console.error(
        `GENERATION: could not generate instructions or tips for ${exercise.id}. Error:`,
        e,
      );
    }
  }

  return { updated, processed };
}

/**
 * One off script. Processes exercise data to add AI-generated instructions and tips for each exercise.
 * This script:
 * 1. Reads exercise data from a CSV file
 * 2. For each exercise, generates instructions and tips using ChatGPT
 * 3. Combines the original exercise data with the new instructions and tips
 *
 * Note: The function logs errors for any exercises where generation fails but continues
 * processing the remaining exercises.
 *
 * @returns {Promise<void>}
 */
const addInstructionsAndTips = async (): Promise<void> => {
  const csvFilePath = path.join(__dirname, "../../data/exercises.csv");
  const exercises: Exercise[] = await readCsvFile(csvFilePath);
  const { updated, processed } =
    await generateTipsAndInstructionsForExercises(exercises);
  outputTypescriptFile(updated, processed, exercises.length);
};

// Error handling for the main function
addInstructionsAndTips().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
