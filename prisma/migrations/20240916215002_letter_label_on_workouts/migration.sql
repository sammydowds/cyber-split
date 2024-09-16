/*
  Warnings:

  - Added the required column `letterLabel` to the `LoggedWorkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `letterLabel` to the `TemplateWorkout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoggedWorkout" ADD COLUMN     "letterLabel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TemplateWorkout" ADD COLUMN     "letterLabel" TEXT NOT NULL;
