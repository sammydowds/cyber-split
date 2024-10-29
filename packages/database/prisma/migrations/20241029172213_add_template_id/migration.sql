-- AlterTable
ALTER TABLE "LoggedWorkout" ADD COLUMN     "templateWorkoutId" TEXT;

-- AddForeignKey
ALTER TABLE "LoggedWorkout" ADD CONSTRAINT "LoggedWorkout_templateWorkoutId_fkey" FOREIGN KEY ("templateWorkoutId") REFERENCES "TemplateWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
