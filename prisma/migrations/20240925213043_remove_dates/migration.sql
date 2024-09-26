/*
  Warnings:

  - You are about to drop the column `activeOn` on the `Split` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `Split` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Split` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Split" DROP COLUMN "activeOn",
DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;
